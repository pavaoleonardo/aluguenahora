'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import PropertyGallery from '@/components/PropertyGallery'
import { ArrowsPointingOutIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { formatCurrency, formatNumber } from '@/lib/format'
import { API_BASE_URL } from '@/lib/apiBase'
import dynamic from 'next/dynamic'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
      Carregando mapa...
    </div>
  ),
})

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
}

export default function PropertyDetailClient({ id }: { id: string }) {
  const [property, setProperty] = useState<ImovelDetail | null>(null)
  const [loading, setLoading] = useState(true)

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
          const res = await api.get('/api/imoveis', {
            params: {
              populate: '*',
              'filters[documentId][$eq]': id,
              'filters[status][$in]': ['published', 'draft'],
            },
          })
          const data = res.data.data
          if (active) {
            // Ensure we got the specific property we filtered for
            const foundProperty = Array.isArray(data) ? data.find((p: any) => p.documentId === id) : data
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

  const renderDescription = () => {
    // If it's a simple string (fallback)
    if (typeof property.descricao === 'string') {
      return <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{property.descricao}</div>
    }

    // If it's the Strapi array blocks format
    if (Array.isArray(property.descricao)) {
      return (
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
          {property.descricao.map((block: any, i: number) => {
            // Render the children text with proper formatting
            const renderChildren = (children: any[]) => {
              return children.map((child: any, j: number) => {
                let text = child.text || '';
                if (child.bold) text = <strong key={j}>{text}</strong>;
                if (child.italic) text = <em key={j}>{text}</em>;
                if (child.underline) text = <u key={j}>{text}</u>;
                if (child.strikethrough) text = <del key={j}>{text}</del>;
                if (child.code) text = <code key={j} className="bg-gray-100 rounded px-1 py-0.5 text-sm">{text}</code>;
                
                if (child.type === 'link') {
                  return (
                    <a key={j} href={child.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover underline">
                      {child.children?.map((c: any) => c.text).join('')}
                    </a>
                  );
                }
                return text || <span key={j} />;
              });
            };

            switch (block.type) {
              case 'paragraph':
                return <p key={i} className="mb-4 last:mb-0">{renderChildren(block.children)}</p>;
              case 'heading': {
                const level = Math.min(Math.max(block.level || 2, 1), 6);
                const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
                const hClasses = {
                  1: "text-2xl font-bold mt-8 mb-4 text-gray-900",
                  2: "text-xl font-bold mt-6 mb-3 text-gray-900",
                  3: "text-lg font-bold mt-5 mb-2 text-gray-900",
                  4: "text-base font-bold mt-4 mb-2 text-gray-900",
                  5: "text-base font-semibold mt-4 mb-2 text-gray-900",
                  6: "text-sm font-bold mt-4 mb-2 text-gray-900 uppercase tracking-wider"
                }[level as 1|2|3|4|5|6] || "text-lg font-bold mt-6 mb-3 text-gray-900";
                
                return <Tag key={i} className={hClasses}>{renderChildren(block.children)}</Tag>;
              }
              case 'list':
                const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                const listClass = block.format === 'ordered' ? 'list-decimal pl-6 mb-6 space-y-2' : 'list-disc pl-6 mb-6 space-y-2';
                return (
                  <ListTag key={i} className={listClass}>
                    {block.children.map((item: any, k: number) => (
                      <li key={k} className="pl-1">{renderChildren(item.children)}</li>
                    ))}
                  </ListTag>
                );
              case 'quote':
                return (
                  <blockquote key={i} className="border-l-4 border-primary/40 bg-gray-50/50 italic pl-4 py-3 my-6 rounded-r-lg text-gray-600">
                    {renderChildren(block.children)}
                  </blockquote>
                );
              case 'code':
                return (
                  <pre key={i} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm">
                    <code>{renderChildren(block.children)}</code>
                  </pre>
                );
              case 'image':
                return (
                  <div key={i} className="my-8 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={block.image.url} alt={block.image.alternativeText || ''} className="w-full h-auto object-cover" />
                  </div>
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
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <PropertyGallery
            fotos={property.fotos}
            foto_fachada={property.foto_fachada || (property.fotos && property.fotos[0])}
            titulo={property.titulo}
            finalidadeLabel={finalidadeLabel}
            video_url={property.video_url ? `${API_BASE_URL}${property.video_url}` : undefined}
          />

          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {property.titulo}
            </h1>
            <p className="mt-4 text-3xl font-bold text-primary">
              {formatCurrency(property.preco || 0)}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <span className="flex items-center gap-2" title="Quartos">
                   <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M3 7h18a2 2 0 0 1 2 2v10h-2v-3H3v3H1V9a2 2 0 0 1 2-2zm2 2v3h6V9H5zm8 0v3h6V9h-6z" />
                   </svg>
                   {property.quartos} Quartos
                </span>
                <span className="flex items-center gap-2" title="Banheiros">
                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4a4 4 0 014 4v2a2 2 0 002 2h4a2 2 0 002-2V8a4 4 0 00-4-4H8zm0 0V2m4 2V2m4 2V2M12 16v6M8 18v4M16 18v4" />
                   </svg>
                   {property.banheiros} Banheiros
                </span>
                <span className="flex items-center gap-2" title="Área Total">
                   <ArrowsPointingOutIcon className="h-5 w-5 text-gray-400" />
                   {formatNumber(property.area_total || 0)} m²
                </span>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Dados do Imóvel</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50 w-1/3">Tipo</td>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{property.tipo}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">Cidade/UF</td>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{property.cidade} - MS</td>
                  </tr>
                  <tr>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">Bairro</td>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{bairroLabel}</td>
                  </tr>
                  {property.endereco && (
                    <tr>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">Endereço</td>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{property.endereco}</td>
                    </tr>
                  )}
                   <tr>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">ÁREA CONSTRUÍDA (m²)</td>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{formatNumber(property.tamanho || 0)}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">ÁREA TOTAL (m²)</td>
                    <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{formatNumber(property.area_total || 0)}</td>
                  </tr>
                  {property.condominio ? (
                    <tr>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">Condomínio</td>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{formatCurrency(property.condominio)}</td>
                    </tr>
                  ) : null}
                  {property.iptu ? (
                    <tr>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50/50">IPTU</td>
                      <td className="whitespace-normal break-words px-4 py-2 text-sm text-gray-900">{formatCurrency(property.iptu)} mensal</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Tenho Interesse
              </button>
              <Link
                href="/imoveis"
                className="flex-1 rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Voltar para Lista
              </Link>
            </div>
          </div>
        </div>
        
        {/* Full-width sections below the grid */}
        <div className="mt-16 lg:mt-24 border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Descrição Completa</h3>
          <div className="space-y-6 text-base text-gray-700">{renderDescription()}</div>
        </div>

        {/* Characteristics Section */}
        {property.caracteristicas && property.caracteristicas.length > 0 && (
          <div className="mt-16 lg:mt-24 border-t border-gray-200 pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Características do Imóvel</h3>
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
  )
}
