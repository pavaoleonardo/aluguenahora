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
  preco: number
  finalidade?: string
  fotos: any[]
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
    const params: Record<string, string | number | boolean> = {
      populate: 'fotos',
      sort: 'createdAt:desc',
      'filters[publishedAt][$notNull]': true,
    }

    // Add filters from search params
    const bairro = searchParams.get('bairro')
    const tipo = searchParams.get('tipo')
    const finalidade = searchParams.get('finalidade')

    if (bairro) {
      params['filters[bairro][bairro][$eq]'] = bairro
    }
    if (tipo) {
      params['filters[tipo][$eq]'] = tipo
    }
    if (finalidade) {
      params['filters[finalidade][$eq]'] = finalidade
    }

    if (limit) {
      params['pagination[limit]'] = limit
    }

    api
      .get('/api/imoveis', { params, timeout: 8000 })
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
                {property.fotos && property.fotos[0]?.url ? (
                  <Image
                    src={property.fotos[0]?.url}
                    alt={property.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Sem Foto
                  </div>
                )}
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
                      {/* Bed Icon */}
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M3 7h18a2 2 0 0 1 2 2v10h-2v-3H3v3H1V9a2 2 0 0 1 2-2zm2 2v3h6V9H5zm8 0v3h6V9h-6z" />
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
                    <span>•</span>
                    <span className="flex items-center gap-1">
                       {/* Area Icon (Arrows Pointing Out) */}
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                       </svg>
                       <span>{property.tamanho} m²</span>
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
