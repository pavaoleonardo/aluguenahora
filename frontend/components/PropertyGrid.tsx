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

    const vagas = searchParams.get('vagas')
    if (vagas) {
      filters.push({ vagas: { $gte: Number(vagas) } })
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
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      {/* Bed Icon (Quartos) - QuintoAndar Style */}
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h18M3 14v4m0-4V9a2 2 0 012-2h14a2 2 0 012 2v5m0 0v4m-18 0h18M7 11a1 1 0 011-1h2a1 1 0 011 1v3H7v-3z" />
                      </svg>
                      <span>{property.quartos} {property.quartos === 1 ? 'Quarto' : 'Quartos'}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      {/* Shower Icon (Banheiros) - QuintoAndar Style */}
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4a4 4 0 014 4v2m-3 0h6m-5 4v.5m2-.5v.5m2-.5v.5" />
                      </svg>
                      <span>{property.banheiros} {property.banheiros === 1 ? 'Banh.' : 'Banh.'}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                       {/* Area Icon (Ruler) - QuintoAndar Style */}
                       <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5M5 12v2m4-2v2m4-2v2m4-2v2" />
                       </svg>
                       <span>{property.tamanho} m²</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                       {/* Car/Garage Icon (Vagas - Front View) - QuintoAndar Style */}
                       <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2zM5 11h14M8 13h0.01M16 13h0.01M6 16v1a1 1 0 001 1h1m10-2v1a1 1 0 01-1 1h-1" />
                       </svg>
                       <span>{property.vagas || 0} {property.vagas === 1 ? 'Vaga' : 'Vagas'}</span>
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
