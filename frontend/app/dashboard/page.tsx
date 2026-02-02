'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/apiBase'

interface Attributes {
  titulo: string;
  preco: number;
  estatus: string;
  fotos: {
    data: { attributes: { url: string } }[] | null
  };
}

interface Imovel {
  id: number;
  documentId: string;
  // Attributes might be flattened or not depending on API response.
  // Adapting to standardized view.
  titulo: string;
  bairro?: string | { bairro: string; regiao?: string };
  preco: number;
  estatus: string; // rascunho, pendente, publicado
  finalidade?: string;
  tipo?: string;
  fotos: any[];
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, token, loading: authLoading } = useAuth()
  const [properties, setProperties] = useState<Imovel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!token || !user) {
      router.push('/login')
      setLoading(false)
      return
    }

    // Simplified fetch: backend automatically filters by the authenticated user
    fetch(`${API_BASE_URL}/api/imoveis?populate=fotos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // Handle Strapi response
      setProperties(data.data || [])
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

  }, [authLoading, token, user, router])

  if (loading) return <div className="p-8 text-center">Carregando painel...</div>

  return (
    <div className="bg-white min-h-full py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Meus Imóveis
          </h1>
          <Link
            href="/dashboard/novo-imovel"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Adicionar Novo Imóvel
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {properties.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">Você ainda não tem imóveis cadastrados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => {
                        const bairroLabel =
                          typeof property.bairro === 'string'
                            ? property.bairro
                            : property.bairro?.bairro;
                        const finalidadeLabel =
                          property.finalidade === 'aluguel'
                            ? 'Aluguel'
                            : property.finalidade === 'venda'
                              ? 'Venda'
                              : '';
                        const propertyId = property.documentId || property.id;
                        return (
                        <div key={property.id || property.documentId} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200">
                             <div className="aspect-[16/9] bg-gray-200 relative">
                                {property.fotos && property.fotos[0] ? (
                                    <Image 
                                      src={property.fotos[0]?.url} 
                                      alt={property.titulo}
                                      fill
                                      className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400">Sem Foto</div>
                                )}
                                <div className="absolute top-2 right-2">
                                     <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                         property.estatus === 'publicado' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                                         property.estatus === 'pendente' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                                         'bg-gray-50 text-gray-600 ring-gray-500/10'
                                     }`}>
                                         {property.estatus ? property.estatus.charAt(0).toUpperCase() + property.estatus.slice(1) : 'Rascunho'}
                                     </span>
                                </div>
                             </div>
                             <div className="p-4">
                                 <h3 className="text-lg font-semibold text-gray-900">{property.titulo}</h3>
                                 <p className="mt-1 text-lg font-bold text-gray-900">
                                     {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.preco || 0)}
                                 </p>
                                 {bairroLabel ? (
                                   <p className="mt-1 text-sm text-gray-500">{bairroLabel}</p>
                                 ) : null}
                                 {property.tipo ? (
                                   <p className="mt-1 text-sm text-gray-500">{property.tipo}</p>
                                 ) : null}
                                 {property.estatus !== 'publicado' ? (
                                   <p className="mt-2 text-xs font-semibold text-yellow-700">
                                     Aguardando aprovação do admin
                                   </p>
                                 ) : null}
                                 <div className="mt-4">
                                   <Link
                                     href={`/dashboard/editar/${propertyId}`}
                                     className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                   >
                                     Editar
                                   </Link>
                                 </div>
                             </div>
                        </div>
                        )
                    })}
                </div>
            )}
        </div>
      </main>
    </div>
  )
}
