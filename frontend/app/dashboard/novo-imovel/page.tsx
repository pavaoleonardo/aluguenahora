'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { todosBairros } from '@/lib/bairrosCampoGrande'
import { API_BASE_URL } from '@/lib/apiBase'
import { formatCurrency, parseCurrency } from '@/lib/format'
import { compressImages } from '@/lib/image'

const LISTA_CARACTERISTICAS = [
  "Água", "Asfalto", "Calçada", "Elevador", "Esgoto", "Muro", "Piso tátil", 
  "Rampa de acessibilidade", "Rede elétrica", "WC adaptado", "Academia", 
  "Adega", "Alarme", "Algibre", "Aquecedor solar", "Área de lazer", 
  "Área de serviço", "Árvores frutíferas", "Automação residencial", 
  "Brinquedoteca", "Caixa de água", "Câmeras de segurança", "Campo de futebol", 
  "Canil", "Cerca elétrica", "Churrasqueira", "Closet", "Conveniência autônoma", 
  "Copa", "Cozinha", "Cozinha americana", "Cozinha Industrial", "Cozinha planejada", 
  "Deck", "Depósito", "Despensa", "Edícula", "Energia solar fotovoltaica", 
  "Escritório", "Estacionamento para visitas", "Gazebo", "Gradil", "Guarita", 
  "Hall de entrada", "Hidromassagem", "Home theater", "Interfone", "Jardim", 
  "Lago", "Lareira", "Lavabo", "Lavanderia", "Mezanino", "Pé direito duplo", 
  "Piscina", "Piscina aquecida", "Piscina coberta", "Piscina infantil", 
  "Play-ground", "Poço artesiano", "Portão elétrico", "Portaria", 
  "Porteiro eletrônico", "Quadra de areia", "Quarto empregada", "Quiosque", 
  "Recepção", "Redário", "Represa", "Salão de Festas", "Salão de Jogos", 
  "Sauna", "Terraço", "WC de serviço"
];

const MAX_FOTOS_POR_IMOVEL = 8;

export default function NewPropertyPage() {
  const router = useRouter()
  const { user, token, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fotos, setFotos] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    condominio: '',
    iptu: '',
    quartos: '',
    banheiros: '',
    bairro: '',
    cidade: 'Campo Grande',
    finalidade: 'aluguel',
    tipo: '',
    tamanho: '',
    area_total: '',
    endereco: '',
    caracteristicas: [] as string[],
  })
  const [geocoding, setGeocoding] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [showBairroSuggestions, setShowBairroSuggestions] = useState(false)
  const [bairroSuggestions, setBairroSuggestions] = useState<string[]>([])
  const bairroRef = useRef<HTMLDivElement>(null)

  // Geocode address using OpenStreetMap Nominatim API (free)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
    if (!address.trim()) return null
    
    // Try different address formats
    const addressVariations = [
      `${address}, ${formData.bairro}, ${formData.cidade}, MS, Brasil`,
      `${address}, ${formData.cidade}, MS, Brasil`,
      `${address}, ${formData.cidade}, Brasil`
    ].filter(v => v.length > 0);

    for (const fullAddress of addressVariations) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`,
          { headers: { 'User-Agent': 'AlugueNaHora-App/1.0 (pavaoleonardo@gmail.com)' } }
        )
        const data = await response.json()
        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
        }
      } catch (error) {
        console.error('Geocoding error variation:', fullAddress, error)
      }
    }
    return null
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formatted = formatCurrency(value)
    setFormData(prev => ({ ...prev, [name]: formatted }))
  }

  const handleCharacteristicToggle = (char: string) => {
    setFormData(prev => {
      const current = prev.caracteristicas;
      if (current.includes(char)) {
        return { ...prev, caracteristicas: current.filter(c => c !== char) };
      } else {
        return { ...prev, caracteristicas: [...current, char] };
      }
    });
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
      setBairroSuggestions(todosBairros) // Show all
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

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > MAX_FOTOS_POR_IMOVEL) {
      alert(`Você pode enviar no máximo ${MAX_FOTOS_POR_IMOVEL} fotos por imóvel.`)
    }
    setFotos(files.slice(0, MAX_FOTOS_POR_IMOVEL))
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

  useEffect(() => {
    if (authLoading) return

    if (!token || !user) {
      router.push('/login?redirect=/dashboard/novo-imovel')
    }
  }, [authLoading, token, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeocoding(true)

    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (!token || !userStr) throw new Error('Not authenticated')

      // Geocode the address to get coordinates
      let latitude: number | null = null
      let longitude: number | null = null
      if (formData.endereco) {
        const coords = await geocodeAddress(formData.endereco)
        if (coords) {
          latitude = coords.lat
          longitude = coords.lon
        }
      }
      setGeocoding(false)

      // 1. Compress Fotos (especially useful for heavy mobile photos)
      let filesToUpload = fotos
      if (fotos.length > 0) {
        setCompressing(true)
        filesToUpload = await compressImages(fotos)
        setCompressing(false)
      }

      // 2. Upload Fotos
      const uploadedFotoIds: number[] = []
      if (filesToUpload.length > 0) {
        // Upload serially to avoid high memory peaks on free-tier backend instances.
        for (const file of filesToUpload) {
          const uploadForm = new FormData()
          uploadForm.append('files', file)

          const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: uploadForm,
          })

          const uploadData = await uploadRes.json()
          if (!uploadRes.ok) {
            throw new Error(uploadData?.error?.message || 'Erro ao enviar foto')
          }

          if (Array.isArray(uploadData) && uploadData[0]?.id) {
            uploadedFotoIds.push(uploadData[0].id)
          }
        }
      }

      // 3. Create Property
      const res = await fetch(`${API_BASE_URL}/api/imoveis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            titulo: formData.titulo,
            descricao: [
                {
                    type: 'paragraph',
                    children: [{ type: 'text', text: formData.descricao }]
                }
            ], 
            preco: parseCurrency(formData.preco),
            condominio: parseCurrency(formData.condominio),
            iptu: parseCurrency(formData.iptu),
            quartos: Number(formData.quartos),
            banheiros: Number(formData.banheiros),
            bairro: { regiao: '', bairro: formData.bairro },
            cidade: formData.cidade,
            finalidade: formData.finalidade,
            tipo: formData.tipo,
            tamanho: Number(formData.tamanho.replace(',', '.')),
            area_total: Number(formData.area_total.replace(',', '.')),
            endereco: formData.endereco || null,
            latitude: latitude,
            longitude: longitude,
            fotos: uploadedFotoIds,
            caracteristicas: formData.caracteristicas,
          },
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'Erro ao criar imóvel')
      }
      
      alert('Imóvel cadastrado com sucesso! Aguardando aprovação.')
      router.push('/dashboard')

    } catch (error: any) {
      console.error('Submit error:', error)
      let message = error.message
      if (message === 'Failed to fetch') {
        message = 'Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online. (Se estiver usando o Render gratuito, o servidor pode estar "acordando")'
      }
      alert(message)
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
                    <label className="block text-sm font-medium leading-6 text-gray-900">Descrição do Imóvel</label>
                    <textarea name="descricao" rows={3} value={formData.descricao} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">VALOR (R$)</label>
                    <input type="text" name="preco" required value={formData.preco} onChange={handlePriceChange} placeholder="R$ 0,00" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
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
                      <option value="venda">Venda</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Condomínio (Mensal)</label>
                    <input type="text" name="condominio" value={formData.condominio} onChange={handlePriceChange} placeholder="R$ 0,00" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">IPTU (Mensal)</label>
                    <input type="text" name="iptu" value={formData.iptu} onChange={handlePriceChange} placeholder="R$ 0,00" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Tipo do imóvel</label>
                    <select
                      name="tipo"
                      required
                      value={formData.tipo}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    >
                      <option value="">TODOS OS IMÓVEIS</option>
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
                          setBairroSuggestions(todosBairros);
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

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Endereço Completo</label>
                    <input
                      type="text"
                      name="endereco"
                      placeholder="Ex: Rua das Flores, 123"
                      value={formData.endereco}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <p className="mt-1 text-xs text-gray-500">O endereço será usado para mostrar a localização no mapa</p>
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
                    <label className="block text-sm font-medium leading-6 text-gray-900">ÁREA CONSTRUÍDA / ÚTIL (m²)</label>
                    <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} placeholder="0,00" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">ÁREA TOTAL (m²)</label>
                    <input type="text" name="area_total" value={formData.area_total} onChange={handleChange} placeholder="0,00" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                </div>

                {/* Characteristics Section */}
                <div className="sm:col-span-2 mt-4">
                  <label className="block text-lg font-bold text-gray-900 mb-4 border-b pb-2">Características</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {LISTA_CARACTERISTICAS.map((item) => (
                      <label key={item} className="relative flex items-center group cursor-pointer">
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            checked={formData.caracteristicas.includes(item)}
                            onChange={() => handleCharacteristicToggle(item)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-colors"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <span className="text-gray-700 group-hover:text-primary transition-colors">{item}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Fotos do Imóvel</label>
                    <p className="mt-1 text-xs text-gray-500 mb-4">Dica: A primeira foto selecionada será usada como a principal (fachada) nos resultados de busca.</p>
                    
                    <div className="flex flex-col items-start gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-md bg-white px-6 py-2.5 text-sm font-bold text-primary shadow-sm ring-1 ring-inset ring-primary hover:bg-gray-50 transition-all uppercase"
                      >
                        ENVIAR FOTOS
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        name="fotos"
                        accept="image/*"
                        multiple
                        required
                        onChange={handleFotosChange}
                        className="hidden"
                      />
                    </div>
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
                            {idx === 0 && (
                                <div className="absolute top-0 left-0 bg-primary text-white text-[10px] px-2 py-0.5 font-bold uppercase rounded-br-md">
                                    Principal
                                </div>
                            )}
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
                  {loading ? (
                    geocoding ? 'Localizando endereço...' : 
                    compressing ? 'Otimizando fotos...' : 
                    'Enviando...'
                  ) : 'Enviar para Aprovação'}
                </button>
            </div>
         </form>
       </div>
    </div>
  )
}
