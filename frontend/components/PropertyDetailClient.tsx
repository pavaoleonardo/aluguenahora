'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { api } from '@/lib/api'
import PropertyGallery from '@/components/PropertyGallery'
import {
  ArrowsPointingOutIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  MapPinIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { formatCurrency, formatNumber } from '@/lib/format'
import { API_BASE_URL } from '@/lib/apiBase'
import { whatsappLink, whatsappShareLink } from '@/lib/contact'
import { buildShareTitle, SITE_URL } from '@/lib/site'
import dynamic from 'next/dynamic'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
      Carregando mapa...
    </div>
  ),
})

/** WhatsApp brand glyph — Heroicons ships no brand logos, so it is inlined. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.297.347-.495.116-.198.058-.371-.018-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

type BairroValue = string | { bairro: string; regiao?: string }

type ImovelDetail = {
  id: number
  documentId: string
  titulo: string
  descricao?: any
  tamanho?: number
  area_total?: number
  quartos?: number
  banheiros?: number
  bairro?: BairroValue
  estado?: string | null
  cidade?: string
  preco?: number
  finalidade?: string
  tipo?: string
  fotos?: any[]
  endereco?: string
  latitude?: number
  longitude?: number
  condominio?: number
  iptu?: number
  foto_fachada?: any
  unidade_medida?: string
  caracteristicas?: string[]
  video_url?: string
  vagas?: number
}

export default function PropertyDetailClient({ id }: { id: string }) {
  const [property, setProperty] = useState<ImovelDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  useEffect(() => {
    if (!id || id === 'undefined') {
      setLoading(false)
      setProperty(null)
      return
    }

    let active = true
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/imoveis/${id}`, {
          params: { populate: '*' },
        })
        if (active) {
          setProperty(res.data.data || null)
        }
      } catch (err: any) {
        // Fallback for documentId search if the primary fetch by ID/documentId failed
        try {
          // Same two shapes the API resolves: a numeric id (`/imoveis/55`) or a documentId. The
          // `status` filter this used to send is not a filterable key — Strapi answered 400, so the
          // fallback never worked and the page showed "Imóvel não encontrado" instead.
          const numericId = /^\d+$/.test(id)
          const res = await api.get('/api/imoveis', {
            params: {
              populate: '*',
              [numericId ? 'filters[id][$eq]' : 'filters[documentId][$eq]']: id,
            },
          })
          const data = res.data.data
          if (active) {
            // Ensure we got the specific property we filtered for (either shape of the URL id).
            const foundProperty = Array.isArray(data)
              ? data.find((p: any) => p.documentId === id || String(p.id) === id)
              : data
            setProperty(foundProperty || null)
          }
        } catch {
          if (active) setProperty(null)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchProperty()
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">Carregando imóvel...</div>
  }

  if (!property) {
    return <div className="p-8 text-center">Imóvel não encontrado.</div>
  }

  const bairroLabel =
    typeof property.bairro === 'string' ? property.bairro : property.bairro?.bairro
  const finalidadeLabel =
    property.finalidade === 'aluguel'
      ? 'Aluguel'
      : property.finalidade === 'venda'
        ? 'Venda'
        : ''

  // "Valor Total" = rent + condominium + IPTU (all the monthly expenses).
  const valorTotal =
    (Number(property.preco) || 0) + (Number(property.condominio) || 0) + (Number(property.iptu) || 0)

  // The anúncio URL rides inside the message: WhatsApp then builds the very same preview card
  // (photo + headline + description) it builds for the "Compartilhar" path, and the broker gets a
  // clickable link back to the listing instead of having to look the Cód up by hand.
  //
  // Built from SITE_URL + documentId rather than `window.location`, so it is identical during SSR
  // and after hydration, and it is always the canonical address even when the visitor arrived
  // through a legacy numeric-id URL. The `Cód:` stays because the broker quotes it in the reply.
  const propertyUrl = `${SITE_URL}/imoveis/${property.documentId || property.id}`
  const whatsappHref = whatsappLink(
    `Olá! Tenho interesse no imóvel "${property.titulo}" (Cód: ${property.id}).\n${propertyUrl}`
  )

  // "Compartilhar" opens a menu with explicit options. WhatsApp comes first because it is
  // the channel Brazilian visitors actually use; the native share sheet (missing on many
  // desktops) is offered as an extra instead of being the only path — that was the bug:
  // on desktop it either opened an OS sheet with no WhatsApp or silently copied the link.
  const shareUrl = () => (typeof window === 'undefined' ? '' : window.location.href)
  // Same helper the preview card uses for `og:title`: the message WhatsApp shows above the card
  // and the headline inside it stay identical (`titulo — R$ preço`).
  const shareText = () => buildShareTitle(property)

  const flashShareFeedback = (message: string) => {
    setShareFeedback(message)
    setTimeout(() => setShareFeedback(null), 2000)
  }

  const handleWhatsAppShare = () => {
    // No recipient in the URL (`wa.me/?text=`) — WhatsApp asks which contact to send it to.
    window.open(whatsappShareLink(`${shareText()} ${shareUrl()}`), '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl())
      flashShareFeedback('Link copiado!')
    } catch {
      setShareFeedback(null)
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator.share !== 'function') {
      // Desktop browsers without the Web Share API: copying the link is the closest thing,
      // and it keeps the menu item honest on every browser.
      await handleCopyLink()
      return
    }
    try {
      await navigator.share({ title: property.titulo, text: shareText(), url: shareUrl() })
    } catch {
      // The share sheet was dismissed (AbortError) — nothing to do.
    }
  }

  const renderDescription = () => {
    // If it's a simple string (fallback)
    if (typeof property.descricao === 'string') {
      return (
        <div className={`text-gray-700 leading-relaxed whitespace-pre-wrap transition-all duration-300 ${!isDescriptionExpanded ? 'max-h-48 overflow-hidden' : ''}`}>
          {property.descricao}
        </div>
      )
    }

    // If it's the Strapi array blocks format
    if (Array.isArray(property.descricao)) {
      return (
        <div className={`text-gray-700 leading-relaxed transition-all duration-300 ${!isDescriptionExpanded ? 'max-h-48 overflow-hidden' : ''}`}>
          {property.descricao.map((block: any, i: number) => {
            const renderChildren = (children: any[]) => {
              return children.map((child: any, j: number) => {
                let node: React.ReactNode = child.text || '';
                if (child.bold) node = <strong key={j}>{node}</strong>;
                if (child.italic) node = <em key={j}>{node}</em>;
                if (child.underline) node = <u key={j}>{node}</u>;
                if (child.strikethrough) node = <del key={j}>{node}</del>;
                if (child.code) node = <code key={j} className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">{node}</code>;
                
                if (child.type === 'link') {
                  return (
                    <a key={j} href={child.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover underline font-medium">
                      {child.children?.map((c: any) => c.text).join('')}
                    </a>
                  );
                }
                return node || <span key={j} />;
              });
            };

            switch (block.type) {
              case 'paragraph':
                return <p key={i} className="mb-4 last:mb-0 whitespace-pre-wrap">{renderChildren(block.children)}</p>;
              case 'heading': {
                const level = Math.min(Math.max(block.level || 2, 1), 6);
                const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
                const hClasses = {
                  1: "text-2xl font-bold mt-8 mb-4 text-gray-900 border-b pb-2",
                  2: "text-xl font-bold mt-6 mb-3 text-gray-900",
                  3: "text-lg font-bold mt-5 mb-2 text-gray-900",
                  4: "text-base font-bold mt-4 mb-2 text-gray-900",
                  5: "text-base font-semibold mt-4 mb-2 text-gray-900",
                  6: "text-sm font-bold mt-4 mb-2 text-gray-900 tracking-wider"
                }[level as 1|2|3|4|5|6] || "text-lg font-bold mt-6 mb-3 text-gray-900";
                
                return <Tag key={i} className={hClasses}>{renderChildren(block.children)}</Tag>;
              }
              case 'list':
                const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                const listClass = block.format === 'ordered' ? 'list-decimal pl-6 mb-4 space-y-2' : 'list-disc pl-6 mb-4 space-y-2';
                return (
                  <ListTag key={i} className={listClass}>
                    {block.children.map((item: any, k: number) => (
                      <li key={k} className="pl-1">{renderChildren(item.children)}</li>
                    ))}
                  </ListTag>
                );
              case 'quote':
                return (
                  <blockquote key={i} className="border-l-4 border-primary bg-gray-50 italic pl-6 py-4 my-6 rounded-r-lg text-gray-600 shadow-sm">
                    {renderChildren(block.children)}
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </div>
      )
    }
    
    return null;
  }

  return (
    <div className="bg-white">
      {/* Full-Screen Edge-to-Edge Filmstrip Gallery */}
      <div className="w-full bg-[#111] overflow-hidden">
        <PropertyGallery
          fotos={property.fotos}
          foto_fachada={property.foto_fachada || (property.fotos && property.fotos[0])}
          titulo={property.titulo}
          finalidadeLabel={finalidadeLabel}
          video_url={property.video_url ? `${API_BASE_URL}${property.video_url}` : undefined}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:gap-x-12">
          {/* Main Content Box */}
          <div className="flex-1">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol role="list" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  </li>
                  <li>
                    <span className="text-gray-300 px-1">{'>'}</span>
                    <span className="capitalize">{finalidadeLabel}</span>
                  </li>
                  <li>
                    <span className="text-gray-300 px-1">{'>'}</span>
                    <span className="capitalize">{property.tipo}</span>
                  </li>
                  <li>
                    <span className="text-gray-300 px-1">{'>'}</span>
                    <span className="capitalize">MS / {property.cidade || 'Campo Grande'}</span>
                  </li>
                  {bairroLabel && (
                    <li>
                      <span className="text-gray-300 px-1">{'>'}</span>
                      <span className="capitalize">{bairroLabel}</span>
                    </li>
                  )}
                  <li>
                    <span className="text-gray-300 px-1">{'>'}</span>
                    <span className="text-gray-400">Cód: {property.id}</span>
                  </li>
                </ol>
              </nav>

              <div className="flex items-center gap-2 mb-2 hidden">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary tracking-wider">
                  {property.tipo}
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 tracking-wider">
                  {finalidadeLabel}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {property.titulo}
              </h1>
              <p className="mt-4 text-4xl font-black text-primary flex items-baseline gap-1">
                <span className="text-2xl font-bold">R$</span>
                {formatNumber(property.preco || 0)}
                {property.finalidade === 'aluguel' && <span className="text-lg font-normal text-gray-500 ml-1">/ mês</span>}
              </p>

              <div className="mt-6 border-y border-gray-100 py-6">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div className="flex items-center gap-2 group transition-colors hover:text-primary">
                    <ArrowsPointingOutIcon className="h-5 w-5 text-gray-400 group-hover:text-primary" strokeWidth={1.5} />
                    <span className="text-base font-medium text-gray-900">{formatNumber(property.area_total || property.tamanho || 0)} m²</span>
                  </div>
                  
                  <div className="flex items-center gap-2 group transition-colors hover:text-primary">
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h18M3 14v4m0-4V9a2 2 0 012-2h14a2 2 0 012 2v5m0 0v4m-18 0h18M7 11a1 1 0 011-1h2a1 1 0 011 1v3H7v-3z" />
                    </svg>
                    <span className="text-base font-medium text-gray-900">{property.quartos} {property.quartos === 1 ? 'quarto' : 'quartos'}</span>
                  </div>

                  <div className="flex items-center gap-2 group transition-colors hover:text-primary">
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4a4 4 0 014 4v2m-3 0h6m-5 4v.5m2-.5v.5m2-.5v.5" />
                    </svg>
                    <span className="text-base font-medium text-gray-900">{property.banheiros} {property.banheiros === 1 ? 'banheiro' : 'banheiros'}</span>
                  </div>

                  <div className="flex items-center gap-2 group transition-colors hover:text-primary">
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2zM5 11h14M8 13h0.01M16 13h0.01M6 16v1a1 1 0 001 1h1m10-2v1a1 1 0 01-1 1h-1" />
                    </svg>
                    <span className="text-base font-medium text-gray-900">{property.vagas || 0} {property.vagas === 1 ? 'vaga' : 'vagas'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50/30">
                <div className="bg-gray-100/50 px-5 py-3 border-b border-gray-100">
                  <h3 className="text-xs font-black tracking-widest text-gray-500">Detalhes técnicos</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Localização</span>
                    <span className="text-gray-900 font-bold">{property.cidade} - MS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Bairro</span>
                    <span className="text-gray-900 font-bold">{bairroLabel}</span>
                  </div>
                  {property.estado ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Estado</span>
                      <span className="text-gray-900 font-bold">{property.estado}</span>
                    </div>
                  ) : null}
                  {property.condominio ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Condomínio</span>
                      <span className="text-gray-900 font-bold">{formatCurrency(property.condominio)}</span>
                    </div>
                  ) : null}
                  {property.iptu ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">IPTU (Mensal)</span>
                      <span className="text-gray-900 font-bold">{formatCurrency(property.iptu)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-sm border-t border-gray-200 mt-3 pt-3">
                    <span className="text-gray-900 font-bold">Valor Total</span>
                    <span className="text-primary font-black">{formatCurrency(valorTotal)}</span>
                  </div>
                </div>
              </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 lg:w-2/3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-secondary/20 hover:bg-accent transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                QUERO ALUGAR
              </a>
              <Menu as="div" className="relative flex-1">
                <MenuButton className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-center text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-colors">
                  {shareFeedback ? (
                    <>
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-600" strokeWidth={2} />
                      {shareFeedback}
                    </>
                  ) : (
                    <>
                      <ShareIcon className="h-5 w-5 flex-shrink-0 text-gray-500" strokeWidth={2} />
                      Compartilhar
                      <ChevronDownIcon className="h-4 w-4 flex-shrink-0 text-gray-400" strokeWidth={2} />
                    </>
                  )}
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-50 w-56 rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-gray-900/5 transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button
                      type="button"
                      onClick={handleWhatsAppShare}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 data-[focus]:bg-gray-50"
                    >
                      <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-[#25D366]" />
                      Enviar por WhatsApp
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 data-[focus]:bg-gray-50"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 flex-shrink-0 text-gray-400" strokeWidth={2} />
                      Copiar link
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-900 data-[focus]:bg-gray-50"
                    >
                      <ShareIcon className="h-5 w-5 flex-shrink-0 text-gray-400" strokeWidth={2} />
                      Mais opções…
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          {/* Virtual Contact Form Sidebar */}
          <div className="hidden lg:block lg:w-1/3"></div>
        </div>
        
        {/* Full-width sections below the grid */}
        <div className="mt-16 sm:mt-24">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900">Descrição completa</h3>
            </div>
            
            <div className="relative">
              {renderDescription()}
              
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
            
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group"
            >
              {isDescriptionExpanded ? (
                <>Ver menos <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg></>
              ) : (
                <>Ler descrição completa <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></>
              )}
            </button>
          </div>
        </div>

        {/* Characteristics Section */}
        {property.caracteristicas && property.caracteristicas.length > 0 && (
          <div className="mt-16 lg:mt-24 border-t border-gray-200 pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Características do imóvel</h3>
            <div className="flex flex-col gap-y-4 lg:columns-4 lg:block lg:gap-x-6">
              {[...property.caracteristicas].sort((a, b) => a.localeCompare(b, 'pt-BR')).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-700 break-inside-avoid mb-4">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Map Section */}
        {property.latitude && property.longitude && (
          <div className="mt-16 lg:mt-24">
             <div className="border-t border-gray-200 pt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Localização</h3>
                {property.endereco && (
                  <p className="mb-6 text-gray-600 flex items-start gap-2 text-lg">
                    <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /> 
                    {property.endereco}
                  </p>
                )}
                <PropertyMap 
                  latitude={property.latitude} 
                  longitude={property.longitude} 
                  titulo={property.titulo} 
                />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
