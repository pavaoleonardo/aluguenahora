import PropertyDetailClient from '@/components/PropertyDetailClient'
import { Metadata } from 'next'
import { api } from '@/lib/api'
import { SITE_NAME, buildShareTitle, richTextToPlainText, shareImage, truncate } from '@/lib/site'

/** Subset of the imóvel payload `generateMetadata` needs (see `populate: '*'` below). */
type ImovelShareData = {
  documentId?: string
  titulo?: string
  descricao?: unknown
  finalidade?: string
  tipo?: string
  cidade?: string
  bairro?: string | { bairro?: string }
  preco?: number | string
  quartos?: number
  banheiros?: number
  vagas?: number
  foto_fachada?: { url?: string } | null
  fotos?: { url?: string }[]
}

/** Plain-text location label: `bairro` is a JSON custom field that can arrive as a string or object. */
function bairroLabel(bairro: ImovelShareData['bairro']): string {
  if (typeof bairro === 'string') return bairro
  return bairro?.bairro ?? ''
}

/** Lower-case letters/digits only, so punctuation, accents and the price suffix cannot defeat a comparison. */
function normalizeShareText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** True when the owner's description is just the title again ("Apartamento Mobiliado" vs "Apartamento Mobiliado — R$ 2.000,00"). */
function repeatsTitle(descricao: string, title: string): boolean {
  const description = normalizeShareText(descricao)
  const normalizedTitle = normalizeShareText(title)
  if (!description || !normalizedTitle) return false
  return normalizedTitle === description || normalizedTitle.startsWith(description)
}

/**
 * Preview description shown by WhatsApp below the thumbnail: the same summary line the property
 * page opens with (type + purpose + location + rooms), then the first lines of the owner's own
 * description — the card carries both the "what" and the "why". `shareTitle` is passed in so a
 * description that merely repeats the headline is dropped instead of being echoed back.
 */
function buildShareDescription(property: ImovelShareData, shareTitle: string): string {
  const finalidade =
    property.finalidade === 'aluguel' ? 'para alugar' : property.finalidade === 'venda' ? 'à venda' : ''
  const local = [bairroLabel(property.bairro), property.cidade || 'Campo Grande']
    .filter(Boolean)
    .join(', ')
  const detalhes = [
    property.quartos ? `${property.quartos} dormitório${property.quartos > 1 ? 's' : ''}` : '',
    property.banheiros ? `${property.banheiros} banheiro${property.banheiros > 1 ? 's' : ''}` : '',
    property.vagas ? `${property.vagas} vaga${property.vagas > 1 ? 's' : ''}` : '',
  ]
    .filter(Boolean)
    .join(', ')

  const resumo = `${property.tipo || 'Imóvel'} ${finalidade} em ${local}${detalhes ? ` — ${detalhes}` : ''}.`
  const descricao = richTextToPlainText(property.descricao)

  return truncate(
    [resumo, descricao && !repeatsTitle(descricao, shareTitle) ? descricao : ''].filter(Boolean).join(' '),
    300
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    // Attempt to fetch property to construct a dynamic, beautiful browser tab title
    let property = null;
    try {
      const res = await api.get(`/api/imoveis/${id}`, { params: { populate: '*' } });
      property = res.data?.data;
    } catch {
      // Fallback when `/api/imoveis/:id` fails (numeric id, or a cold API): the collection endpoint
      // accepts both shapes — `filters[id]` for a numeric id, `filters[documentId]` for the opaque
      // one. The old version filtered on `status` (Strapi answers 400 "Invalid key status") and did
      // not populate, so it could never recover: the card lost its photo and description.
      const numericId = /^\d+$/.test(id);
      const res = await api.get('/api/imoveis', { 
        params: {
          populate: '*',
          [numericId ? 'filters[id][$eq]' : 'filters[documentId][$eq]']: id,
        }, 
      });
      property = res.data?.data?.[0];
    }

    if (property) {
      const imovel = property as ImovelShareData & { id?: number };
      const finalidade = imovel.finalidade === 'aluguel' ? 'Aluguel' : 'Venda';
      const tipo = imovel.tipo || 'Imóvel';
      const cidade = imovel.cidade || 'Campo Grande';
      const estado = 'MS'; // As the app is focused on MS
      const bairro = bairroLabel(imovel.bairro);

      // Infoimóveis style format: "Venda - Apartamento - MS - Campo Grande - Tiradentes"
      const breadcrumbTitle = `${finalidade} - ${tipo}${estado ? ` - ${estado}` : ''}${cidade ? ` - ${cidade}` : ''}${bairro ? ` - ${bairro}` : ''}`;

      // Preview card (WhatsApp / Facebook / Telegram): the listing photo, the same headline the
      // "Enviar por WhatsApp" share message uses (`titulo — R$ preço`) and the summary + first
      // lines of the owner's description below. Crawlers read these tags from the
      // server-rendered HTML only, never from JavaScript.
      const shareTitle = buildShareTitle(imovel);
      const shareDescription = buildShareDescription(imovel, shareTitle);
      // 1200×630 JPEG with `og:image:width`/`height`/`type` declared — the exact shape the
      // crawlers draw a large card from (see `shareImage` in lib/site.ts).
      const sharePhoto = shareImage(imovel.foto_fachada?.url || imovel.fotos?.[0]?.url, shareTitle);
      const canonicalPath = `/imoveis/${imovel.documentId || id}`;

      return {
        title: `${breadcrumbTitle} | Alugue na Hora`,
        description: shareDescription,
        alternates: { canonical: canonicalPath },
        openGraph: {
          type: 'website',
          locale: 'pt_BR',
          siteName: SITE_NAME,
          url: canonicalPath,
          title: shareTitle,
          description: shareDescription,
          images: [sharePhoto],
        },
        twitter: {
          card: 'summary_large_image',
          title: shareTitle,
          description: shareDescription,
          images: [sharePhoto.url],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: 'Detalhes do Imóvel | Alugue na Hora',
    description: 'Imóvel para alugar ou comprar em Campo Grande - MS | Alugue na Hora.',
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: SITE_NAME,
      url: `/imoveis/${id}`,
      title: 'Detalhes do Imóvel | Alugue na Hora',
      description: 'Imóvel para alugar ou comprar em Campo Grande - MS | Alugue na Hora.',
      // Explicit image: Next replaces (not deep-merges) the layout's openGraph object, so a page
      // that returns one must carry its own image or the card loses its thumbnail.
      images: [shareImage(undefined, SITE_NAME)],
    },
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />
}
