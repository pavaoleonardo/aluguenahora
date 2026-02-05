'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import PropertyGallery from '@/components/PropertyGallery'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

type BairroValue = string | { bairro: string; regiao?: string }

type ImovelDetail = {
  id: number
  documentId: string
  titulo: string
  descricao?: any
  tamanho?: number
  quartos?: number
  banheiros?: number
  bairro?: BairroValue
  preco?: number
  finalidade?: string
  tipo?: string
  fotos?: any[]
}

export default function PropertyDetailClient({ id }: { id: string }) {
  const [property, setProperty] = useState<ImovelDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/imoveis/${id}`, {
          params: { populate: 'fotos' },
        })
        if (active) {
          setProperty(res.data.data || null)
        }
      } catch {
        try {
          const res = await api.get('/api/imoveis', {
            params: {
              populate: 'fotos',
              'filters[documentId][$eq]': id,
              'filters[publishedAt][$notNull]': true,
            },
          })
          const data = res.data.data
          if (active) {
            setProperty(Array.isArray(data) ? data[0] : data || null)
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
    if (Array.isArray(property.descricao)) {
      return property.descricao.map((block: any, i: number) => {
        if (block.type === 'paragraph') {
          return (
            <p key={i} className="mb-4">
              {block.children.map((c: any) => c.text).join('')}
            </p>
          )
        }
        return null
      })
    }
    return <p>{property.descricao}</p>
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <PropertyGallery
            fotos={property.fotos}
            titulo={property.titulo}
            finalidadeLabel={finalidadeLabel}
          />

          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {property.titulo}
            </h1>
            <p className="mt-4 text-2xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(property.preco || 0)}
            </p>
            {finalidadeLabel ? (
              <span className="mt-2 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                {finalidadeLabel}
              </span>
            ) : null}

            <div className="mt-4 border-t border-b border-gray-200 py-4 flex items-center justify-between text-sm text-gray-500">
              <span>{bairroLabel}</span>
              <div className="flex gap-6">
                <span className="flex items-center gap-2" title="Quartos">
                   {/* Bed Icon */}
                   <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M3 7h18a2 2 0 0 1 2 2v10h-2v-3H3v3H1V9a2 2 0 0 1 2-2zm2 2v3h6V9H5zm8 0v3h6V9h-6z" />
                   </svg>
                   {property.quartos} Quartos
                </span>
                <span className="flex items-center gap-2" title="Banheiros">
                   {/* Shower Icon */}
                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4a4 4 0 014 4v2a2 2 0 002 2h4a2 2 0 002-2V8a4 4 0 00-4-4H8zm0 0V2m4 2V2m4 2V2M12 16v6M8 18v4M16 18v4" />
                   </svg>
                   {property.banheiros} Banheiros
                </span>
                <span className="flex items-center gap-2" title="Área Total">
                   <ArrowsPointingOutIcon className="h-5 w-5 text-gray-400" />
                   {property.tamanho} m²
                </span>
              </div>
            </div>
            {property.tipo ? (
              <p className="mt-3 text-sm text-gray-600">Tipo: {property.tipo}</p>
            ) : null}

            <div className="mt-6 space-y-6 text-base text-gray-700">{renderDescription()}</div>

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
      </div>
    </div>
  )
}
