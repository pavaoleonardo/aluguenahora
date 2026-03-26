'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'

type ImovelData = {
  id: number
  documentId: string
  titulo: string
  bairro: string | { bairro: string; regiao?: string }
  quartos: number
  banheiros: number
  tamanho?: number
  unidade_medida?: string
  preco: number
  condominio?: number
  iptu?: number
  finalidade?: string
  fotos: any[]
  foto_fachada?: any
  vagas?: number
}

type PropertyGridProps = {
  limit?: number
  emptyMessage: string
}

function PropertyGridContent({ limit, emptyMessage }: PropertyGridProps) {
  const [properties, setProperties] = useState<ImovelData[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const filters: any[] = []

    // Add filters from search params
    const bairro = searchParams.get('bairro')
    const tipo = searchParams.get('tipo')
    const finalidade = searchParams.get('finalidade')

    if (bairro) {
      filters.push({
        $or: [
          { bairro: { $containsi: bairro } },
          { titulo: { $containsi: bairro } }
        ]
      })
    }

    if (tipo) {
      filters.push({ tipo: { $eq: tipo } })
    }

    if (finalidade) {
      if (finalidade === 'aluguel') {
        filters.push({
          $or: [
            { finalidade: { $eq: 'aluguel' } },
            { finalidade: { $null: true } }
          ]
        })
      } else {
        filters.push({ finalidade: { $eq: finalidade } })
      }
    }

    // Build the final params object using Strapi's bracket notation
    const params: any = {
      populate: '*',
      sort: 'createdAt:desc',
    }

    if (limit) {
      params['pagination[limit]'] = limit
    }

    console.log('[PropertyGrid] Filters array:', filters)
    
    // Recursively build the filter params to correctly handle Strapi's [key][op] format
    const buildDeepFilter = (prefix: string, obj: any) => {
      if (typeof obj !== 'object' || obj === null) {
        params[prefix] = obj
        return
      }
      Object.entries(obj).forEach(([key, value]) => {
        const newPrefix = `${prefix}[${key}]`
        buildDeepFilter(newPrefix, value)
      })
    }

    filters.forEach((filter, index) => {
      buildDeepFilter(`filters[$and][${index}]`, filter)
    })

    console.log('[PropertyGrid] Fetching with params:', params)

    api
      .get('/api/imoveis', { params, timeout: 20000 })
      .then((res) => setProperties(res.data.data || []))
      .catch((error) => {
        console.error('Error fetching properties:', error)
        setProperties([])
      })
      .finally(() => setLoading(false))
  }, [limit, searchParams])

  if (loading) {
    return (
      <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-500">Carregando imóveis...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {properties.length > 0 ? (
        properties.map((property) => {
          const bairroLabel =
            typeof property.bairro === 'string' ? property.bairro : property.bairro?.bairro
          const finalidadeLabel =
            property.finalidade === 'aluguel'
              ? 'Aluguel'
              : property.finalidade === 'venda'
                ? 'Venda'
                : ''
          return (
            <Link
              key={property.id || property.documentId}
              href={`/imoveis/${property.documentId || property.id}`}
              className="group flex flex-col items-start justify-between hover:shadow-lg transition-shadow rounded-2xl p-4 bg-white border border-gray-100"
            >
              <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 aspect-[16/9]">
                {(() => {
                  const mainFoto = property.foto_fachada || (property.fotos && property.fotos[0])
                  if (!mainFoto?.url) {
                    return (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        Sem Foto
                      </div>
                    )
                  }
                  
                  // Use medium or small format for the grid to save bandwidth and load faster
                  const displayUrl = mainFoto.formats?.medium?.url || mainFoto.formats?.small?.url || mainFoto.url
                  
                  return (
                    <Image
                      src={displayUrl}
                      alt={property.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={true}
                    />
                  )
                })()}
                {finalidadeLabel ? (
                  <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white shadow">
                    {finalidadeLabel}
                  </span>
                ) : null}
              </div>
              <div className="max-w-xl w-full">
                <div className="mt-6 flex items-center gap-x-4 text-xs">
                  <span className="text-gray-500">{bairroLabel}</span>
                  <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                    Disponível
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                    {property.titulo}
                  </h3>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      property.preco || 0
                    )}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      {/* Bed Icon (Quartos) */}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                      </svg>
                      <span>{property.quartos} Quartos</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {/* Shower Icon */}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4a4 4 0 014 4v2a2 2 0 002 2h4a2 2 0 002-2V8a4 4 0 00-4-4H8zm0 0V2m4 2V2m4 2V2M12 16v6M8 18v4M16 18v4" />
                      </svg>
                      <span>{property.banheiros} Banheiros</span>
                    </span>
                    <span className="flex items-center gap-1">
                       {/* Area Icon (Arrows Pointing Out) */}
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                       </svg>
                       <span>{property.tamanho} m²</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                       {/* Car Icon for Vagas */}
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                         <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                         <circle cx="7" cy="17" r="2" />
                         <path d="M9 17h6" />
                         <circle cx="17" cy="17" r="2" />
                       </svg>
                       <span>{property.vagas || 0}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      ) : (
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default function PropertyGrid(props: PropertyGridProps) {
  return (
    <Suspense fallback={
      <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-500">Carregando...</p>
      </div>
    }>
      <PropertyGridContent {...props} />
    </Suspense>
  )
}
