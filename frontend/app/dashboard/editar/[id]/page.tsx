'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { todosBairros } from '@/lib/bairrosCampoGrande'
import { API_BASE_URL } from '@/lib/apiBase'

type BairroValue = { regiao: string; bairro: string } | string | null

type ImovelForm = {
  titulo: string
  descricao: string
  preco: string
  quartos: string
  banheiros: string
  bairro: string
  regiao: string
  cidade: string
  finalidade: string
  tipo: string
  tamanho: string
}

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ImovelForm>({
    titulo: '',
    descricao: '',
    preco: '',
    quartos: '',
    banheiros: '',
    bairro: '',
    regiao: '',
    cidade: 'Campo Grande',
    finalidade: '',
    tipo: '',
    tamanho: '',
  })
  const [showBairroSuggestions, setShowBairroSuggestions] = useState(false)
  const [bairroSuggestions, setBairroSuggestions] = useState<string[]>([])
  const bairroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    if (!id) return

    fetch(`${API_BASE_URL}/api/imoveis/${id}?populate=fotos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const item = data.data
        if (!item) throw new Error('Imóvel não encontrado')
        const bairroValue: BairroValue = item.bairro ?? ''
        
        // Handle legacy bairro object or string
        const bairro = typeof bairroValue === 'string' 
          ? bairroValue 
          : (bairroValue?.bairro || '')

        setFormData({
          titulo: item.titulo || '',
          descricao: Array.isArray(item.descricao)
            ? item.descricao.map((b: any) => b?.children?.map((c: any) => c.text).join('')).join('\n\n')
            : item.descricao || '',
          preco: item.preco != null ? String(item.preco) : '',
          quartos: item.quartos != null ? String(item.quartos) : '',
          banheiros: item.banheiros != null ? String(item.banheiros) : '',
          bairro,
          regiao: '',
          cidade: item.cidade || 'Campo Grande',
          finalidade: item.finalidade || '',
          tipo: item.tipo || '',
          tamanho: item.tamanho != null ? String(item.tamanho) : '',
        })
      })
      .catch((err) => {
        console.error('Error loading property:', err)
        alert('Erro ao carregar imóvel.')
        router.push('/dashboard')
      })
      .finally(() => setLoading(false))
  }, [id, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBairroChange = (val: string) => {
    setFormData({ ...formData, bairro: val })
    if (val.length > 0) {
      const filtered = todosBairros.filter(b => 
        b.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5)
      setBairroSuggestions(filtered)
      setShowBairroSuggestions(true)
    } else {
      setBairroSuggestions(todosBairros.slice(0, 50)) // Show more initially
      setShowBairroSuggestions(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bairroRef.current && !bairroRef.current.contains(event.target as Node)) {
        setShowBairroSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')

      const res = await fetch(`${API_BASE_URL}/api/imoveis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            titulo: formData.titulo,
            descricao: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: formData.descricao }],
              },
            ],
            preco: Number(formData.preco),
            quartos: Number(formData.quartos),
            banheiros: Number(formData.banheiros),
            bairro: { regiao: '', bairro: formData.bairro },
            cidade: formData.cidade,
            finalidade: formData.finalidade,
            tipo: formData.tipo,
            tamanho: Number(formData.tamanho),
            estatus: 'pendente',
          },
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'Erro ao atualizar imóvel')
      }

      alert('Imóvel atualizado. Aguardando aprovação.')
      router.push('/dashboard')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando imóvel...</div>

  return (
    <div className="bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
          Editar Imóvel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Título do Anúncio</label>
              <input
                type="text"
                name="titulo"
                required
                value={formData.titulo}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Descrição</label>
              <textarea
                name="descricao"
                rows={3}
                value={formData.descricao}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Preço (R$)</label>
              <input
                type="number"
                name="preco"
                required
                value={formData.preco}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Finalidade</label>
              <select
                name="finalidade"
                required
                value={formData.finalidade}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 cursor-default pointer-events-none bg-gray-50"
              >
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Tipo de Imóvel</label>
              <select
                name="tipo"
                required
                value={formData.tipo}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              >
                <option value="">Quais imóveis voce procura?</option>
                <optgroup label="--- RESIDENCIAL ---">
                  <option value="Apart Hotel / Flat / Loft">Apart Hotel / Flat / Loft</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Apto. Cobertura / Duplex">Apto. Cobertura / Duplex</option>
                  <option value="Casa de Vila">Casa de Vila</option>
                  <option value="Casa-Térrea">Casa-Térrea</option>
                  <option value="Casa-Térrea-Condomínio">Casa-Térrea-Condomínio</option>
                  <option value="Kitnet">Kitnet</option>
                  <option value="Sobrado">Sobrado</option>
                  <option value="Sobrado-Condomínio">Sobrado-Condomínio</option>
                  <option value="Studio">Studio</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Terreno-Condomínio">Terreno-Condomínio</option>
                </optgroup>
                <optgroup label="--- COMERCIAL ---">
                  <option value="Área">Área</option>
                  <option value="Casa Comercial">Casa Comercial</option>
                  <option value="Galpão / Depósito">Galpão / Depósito</option>
                  <option value="Imóvel Comercial">Imóvel Comercial</option>
                  <option value="Indústria / Fábrica">Indústria / Fábrica</option>
                  <option value="Ponto Comercial / Box">Ponto Comercial / Box</option>
                  <option value="Pousada / Hotel / Motel">Pousada / Hotel / Motel</option>
                  <option value="Sala / Salão / Loja">Sala / Salão / Loja</option>
                </optgroup>
                <optgroup label="--- RURAL ---">
                  <option value="Chácara">Chácara</option>
                  <option value="Fazenda">Fazenda</option>
                  <option value="Haras">Haras</option>
                  <option value="Pesqueiro">Pesqueiro</option>
                  <option value="Sitio">Sitio</option>
                </optgroup>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                readOnly
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-2 relative" ref={bairroRef}>
              <label className="block text-sm font-medium leading-6 text-gray-900">Bairro</label>
              <input
                type="text"
                name="bairro"
                required
                placeholder="Comece a digitar o bairro..."
                value={formData.bairro}
                onChange={(e) => handleBairroChange(e.target.value)}
                onFocus={() => {
                  if (formData.bairro.length === 0) {
                    setBairroSuggestions(todosBairros.slice(0, 50));
                  }
                  setShowBairroSuggestions(true);
                }}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              {showBairroSuggestions && bairroSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-48 overflow-y-auto">
                  {bairroSuggestions.map((suggestion: string) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => { setFormData({...formData, bairro: suggestion}); setShowBairroSuggestions(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Quartos</label>
              <input
                type="number"
                name="quartos"
                value={formData.quartos}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Banheiros</label>
              <input
                type="number"
                name="banheiros"
                value={formData.banheiros}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Tamanho (m²)</label>
              <input
                type="number"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
