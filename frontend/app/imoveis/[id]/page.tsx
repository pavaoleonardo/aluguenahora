import PropertyDetailClient from '@/components/PropertyDetailClient'
import { Metadata } from 'next'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/format'
import { SITE_NAME, richTextToPlainText, socialImageUrl, truncate } from '@/lib/site'

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

/**
 * Preview description ("Resumo do anúncio") shown by WhatsApp below the thumbnail: type + purpose
 * + location + rooms, the price, then the first lines of the owner's own description.
 */
function buildShareDescription(property: ImovelShareData): string {
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
  const preco = Number(property.preco) || 0
  const valor = preco
    ? `Valor: ${formatCurrency(preco)}${property.finalidade === 'aluguel' ? '/mês' : ''}.`
    : ''

  return truncate(
    [
      `${property.tipo || 'Imóvel'} ${finalidade} em ${local}${detalhes ? ` — ${detalhes}` : ''}.`,
      valor,
      richTextToPlainText(property.descricao),
    ]
      .filter(Boolean)
      .join(' '),
    320
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
      // Fallback search by documentId if ID fetch fails
      const res = await api.get('/api/imoveis', { 
        params: { 'filters[documentId][$eq]': id, 'filters[status][$in]': ['published', 'draft'] } 
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

      // Preview card (WhatsApp / Facebook / Telegram): the listing photo, the listing title and
      // the description below. Crawlers read these tags from the server-rendered HTML only.
      const shareTitle = imovel.titulo || breadcrumbTitle;
      const shareDescription = buildShareDescription(imovel);
      const shareImage = socialImageUrl(imovel.foto_fachada?.url || imovel.fotos?.[0]?.url);
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
          images: [{ url: shareImage, alt: shareTitle }],
        },
        twitter: {
          card: 'summary_large_image',
          title: shareTitle,
          description: shareDescription,
          images: [shareImage],
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
      images: [{ url: socialImageUrl(), alt: SITE_NAME }],
    },
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />
}
