'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/lib/api'

type ImovelData = {
  id: number
  documentId: string
  titulo: string
  bairro: string | { bairro: string; regiao?: string }
  quartos: number
  banheiros: number
  preco: number
  finalidade?: string
  fotos: any[]
}

type PropertyGridProps = {
  limit?: number
  emptyMessage: string
}

export default function PropertyGrid({ limit, emptyMessage }: PropertyGridProps) {
  const [properties, setProperties] = useState<ImovelData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params: Record<string, string | number | boolean> = {
      populate: 'fotos',
      sort: 'createdAt:desc',
      'filters[publishedAt][$notNull]': true,
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
  }, [limit])

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
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 10V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4M14 10V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
                      </svg>
                      <span>{property.quartos} Quartos</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {/* Shower Icon */}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                      <span>{property.banheiros} Banheiros</span>
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
