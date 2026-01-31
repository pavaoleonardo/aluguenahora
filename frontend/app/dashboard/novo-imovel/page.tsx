'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { bairrosPorRegiao } from '@/lib/bairrosCampoGrande'

export default function NewPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fotos, setFotos] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '', // Note: Textarea for rich text field
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => {
      if (name === 'regiao') {
        return { ...prev, regiao: value, bairro: '' }
      }
      return { ...prev, [name]: value }
    })
  }

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFotos(files)
  }

  useEffect(() => {
    if (fotos.length === 0) {
      setPreviewUrls([])
      return
    }
    const urls = fotos.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [fotos])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (!token || !userStr) throw new Error('Not authenticated')
      
      const user = JSON.parse(userStr)

      // 1. Create Property
      const res = await fetch('http://localhost:1337/api/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            titulo: formData.titulo,
            // descricao: needs to be blocks format for Strapi 5 rich text or string if changed. 
            // Assuming string/text first or we'll send a simple block.
            // If schema "descricao" is blocks, we must send structured data or clean text.
            // For now, let's assume I can send text or I need to format it.
            // If it's a "blocks" field, strict format is required. 
            // Workaround: Send a dummy block. Or check schema. Schema said `blocks`.
            descricao: [
                {
                    type: 'paragraph',
                    children: [{ type: 'text', text: formData.descricao }]
                }
            ], 
            preco: Number(formData.preco),
            quartos: Number(formData.quartos),
            banheiros: Number(formData.banheiros),
            bairro: { regiao: formData.regiao, bairro: formData.bairro },
            cidade: formData.cidade,
            finalidade: formData.finalidade,
            tipo: formData.tipo,
            tamanho: Number(formData.tamanho),
            estatus: 'pendente'
          }
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'Erro ao criar imóvel')
      }
      
      const createdProperty = await res.json()
      const propertyId = createdProperty?.data?.id

      if (propertyId && fotos.length > 0) {
        const uploadForm = new FormData()
        fotos.forEach((file) => uploadForm.append('files', file))
        uploadForm.append('ref', 'api::imovel.imovel')
        uploadForm.append('refId', String(propertyId))
        uploadForm.append('field', 'fotos')

        const uploadRes = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadForm,
        })

        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}))
          throw new Error(err.error?.message || 'Erro ao enviar fotos')
        }
      }
      
      alert('Imóvel cadastrado com sucesso! Aguardando aprovação.')
      router.push('/dashboard')

    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white px-6 py-12 lg:px-8">
       <div className="mx-auto max-w-2xl">
         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">Anunciar Imóvel</h2>
         
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Título do Anúncio</label>
                    <input type="text" name="titulo" required value={formData.titulo} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>
                
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Descrição</label>
                    <textarea name="descricao" rows={3} value={formData.descricao} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Preço (R$)</label>
                    <input type="number" name="preco" required value={formData.preco} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Finalidade</label>
                    <select
                      name="finalidade"
                      required
                      value={formData.finalidade}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    >
                      <option value="">Selecione</option>
                      <option value="aluguel">Aluguel</option>
                      <option value="venda">Venda</option>
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
                      <option value="">Selecione</option>
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

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      readOnly
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm sm:leading-6"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Região</label>
                    <select
                      name="regiao"
                      required
                      value={formData.regiao}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    >
                      <option value="">Selecione a região</option>
                      {Object.keys(bairrosPorRegiao).map((regiao) => (
                        <option key={regiao} value={regiao}>
                          {regiao}
                        </option>
                      ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Bairro</label>
                    <select
                      name="bairro"
                      required
                      value={formData.bairro}
                      onChange={handleChange}
                      disabled={!formData.regiao}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-400 disabled:ring-gray-200"
                    >
                      <option value="">
                        {formData.regiao ? 'Selecione o bairro' : 'Selecione a região primeiro'}
                      </option>
                      {(bairrosPorRegiao[formData.regiao] || []).map((bairro) => (
                        <option key={bairro} value={bairro}>
                          {bairro}
                        </option>
                      ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Quartos</label>
                    <input type="number" name="quartos" value={formData.quartos} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Banheiros</label>
                    <input type="number" name="banheiros" value={formData.banheiros} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Tamanho (m²)</label>
                    <input type="number" name="tamanho" value={formData.tamanho} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Fotos</label>
                    <input
                      type="file"
                      name="fotos"
                      accept="image/*"
                      multiple
                      onChange={handleFotosChange}
                      className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {fotos.length > 0 ? (
                      <p className="mt-2 text-xs text-gray-500">
                        {fotos.length} foto(s) selecionada(s)
                      </p>
                    ) : null}
                    {previewUrls.length > 0 ? (
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {previewUrls.map((url, idx) => (
                          <div key={url} className="relative aspect-[4/3] overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={url}
                              alt={`Prévia ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {loading ? 'Enviando...' : 'Enviar para Aprovação'}
                </button>
            </div>
         </form>
       </div>
    </div>
  )
}
