'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { todosBairros } from '@/lib/bairrosCampoGrande'
import { API_BASE_URL } from '@/lib/apiBase'
import { formatCurrency, parseCurrency } from '@/lib/format'
import { compressImages } from '@/lib/image'

const LISTA_CARACTERISTICAS = [
  "Academia", "Adega", "Água", "Alarme", "Algibre", "Aquecedor solar",
  "Área de lazer", "Área de serviço", "Árvores frutíferas", "Asfalto",
  "Automação residencial", "Brinquedoteca", "Caixa de água",
  "Calçada", "Câmeras de segurança", "Campo de futebol", "Canil",
  "Cerca elétrica", "Churrasqueira", "Closet", "Conveniência autônoma",
  "Copa", "Cozinha", "Cozinha americana", "Cozinha Industrial", "Cozinha planejada",
  "Deck", "Depósito", "Despensa", "Edícula", "Elevador",
  "Energia solar fotovoltaica", "Escritório", "Esgoto",
  "Estacionamento para visitas", "Gazebo", "Gradil", "Guarita",
  "Hall de entrada", "Hidromassagem", "Home theater", "Interfone",
  "Jardim", "Lago", "Lareira", "Lavabo", "Lavanderia",
  "Mezanino", "Muro", "Pé direito duplo", "Piscina", "Piscina aquecida",
  "Piscina coberta", "Piscina infantil", "Piso tátil", "Play-ground",
  "Poço artesiano", "Portão elétrico", "Portaria", "Porteiro eletrônico",
  "Quadra de areia", "Quarto empregada", "Quiosque",
  "Rampa de acessibilidade", "Recepção", "Redário", "Rede elétrica",
  "Represa", "Salão de Festas", "Salão de Jogos", "Sauna",
  "Terraço", "WC adaptado", "WC de serviço"
];

const MAX_FOTOS_POR_IMOVEL = 30;

type ExistingFoto = {
  id: number
  url: string
}

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const { user, token, loading: authLoading } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [geocoding, setGeocoding] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const videoInputId = 'video-upload-input'
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newFotos, setNewFotos] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [existingFotos, setExistingFotos] = useState<ExistingFoto[]>([])
  const [activePhotoUrl, setActivePhotoUrl] = useState<string | null>(null)
  
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
    video_url: '',
  })

  const [showBairroSuggestions, setShowBairroSuggestions] = useState(false)
  const [bairroSuggestions, setBairroSuggestions] = useState<string[]>([])
  const bairroRef = useRef<HTMLDivElement>(null)

  // Geocode address using OpenStreetMap Nominatim API (free)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
    if (!address.trim()) return null
    const addressVariations = [
      `${address}, ${formData.bairro}, ${formData.cidade}, MS, Brasil`,
      `${address}, ${formData.cidade}, MS, Brasil`,
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

  useEffect(() => {
    if (authLoading) return
    if (!token || !user) {
      router.push('/login')
      return
    }

    if (!id) return

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoUrl(null);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/imoveis/${id}?populate=*&status=draft`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        const item = data.data
        if (!item) throw new Error('Imóvel não encontrado')

        // Parse description
        const descText = Array.isArray(item.descricao)
          ? item.descricao.map((b: any) => b?.children?.map((c: any) => c.text).join('')).join('\n\n')
          : item.descricao || ''

        // Format bairro
        const bairro = typeof item.bairro === 'string' ? item.bairro : (item.bairro?.bairro || '')

        setFormData({
          titulo: item.titulo || '',
          descricao: descText,
          preco: item.preco != null ? formatCurrency(item.preco) : '',
          condominio: item.condominio != null ? formatCurrency(item.condominio) : '',
          iptu: item.iptu != null ? formatCurrency(item.iptu) : '',
          quartos: item.quartos != null ? String(item.quartos) : '',
          banheiros: item.banheiros != null ? String(item.banheiros) : '',
          bairro,
          cidade: item.cidade || 'Campo Grande',
          finalidade: item.finalidade || 'aluguel',
          tipo: item.tipo || '',
          tamanho: item.tamanho != null ? String(item.tamanho).replace('.', ',') : '',
          area_total: item.area_total != null ? String(item.area_total).replace('.', ',') : '',
          endereco: item.endereco || '',
          caracteristicas: Array.isArray(item.caracteristicas) ? item.caracteristicas : [],
          video_url: item.video_url || '',
        })

        if (item.fotos) {
          setExistingFotos(item.fotos.map((f: any) => ({ id: f.id, url: f.url })))
        }
      } catch (err) {
        console.error('Error loading property:', err)
        alert('Erro ao carregar imóvel.')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [id, router, authLoading, token, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 60 * 1024 * 1024) {
        alert('O vídeo deve ter no máximo 60MB.')
        e.target.value = ''
        return
      }
      setVideoFile(file)
    }
  }

  const handleVideoUpload = async () => {
    if (!videoFile) return

    try {
      setUploadingVideo(true)
      const data = new FormData()
      data.append('video', videoFile)

      const response = await fetch(`${API_BASE_URL}/api/imoveis/upload-video`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Erro no upload do vídeo')
      }

      const result = await response.json()
      setFormData(prev => ({ ...prev, video_url: result.url }))
      alert('Vídeo enviado com sucesso!')
    } catch (err: any) {
      console.error('Video upload error:', err)
      alert(err.message || 'Erro ao enviar vídeo.')
    } finally {
      setUploadingVideo(false)
    }
  }

  const handleBairroChange = (val: string) => {
    setFormData({ ...formData, bairro: val })
    if (val.length > 0) {
      const filtered = todosBairros.filter(b => b.toLowerCase().includes(val.toLowerCase())).slice(0, 5)
      setBairroSuggestions(filtered)
      setShowBairroSuggestions(true)
    } else {
      setBairroSuggestions(todosBairros)
      setShowBairroSuggestions(true)
    }
  }

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const availableSlots = MAX_FOTOS_POR_IMOVEL - existingFotos.length - newFotos.length

    if (availableSlots <= 0) {
      alert(`Limite de ${MAX_FOTOS_POR_IMOVEL} fotos por imóvel atingido.`)
      return
    }

    if (files.length > availableSlots) {
      alert(`Você só pode adicionar mais ${availableSlots} foto(s) neste imóvel.`)
    }

    setNewFotos(prev => [...prev, ...files.slice(0, availableSlots)])
  }

  const removeExistingFoto = (id: number) => {
    setExistingFotos(prev => prev.filter(f => f.id !== id))
  }

  const removeNewFoto = (idx: number) => {
    setNewFotos(prev => prev.filter((_, i) => i !== idx))
  }

  useEffect(() => {
    const urls = newFotos.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [newFotos])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setGeocoding(true)

    try {
      // 1. Geocode
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

      // 2. Compress New Fotos
      let filesToUpload = newFotos
      if (newFotos.length > 0) {
        setCompressing(true)
        filesToUpload = await compressImages(newFotos)
        setCompressing(false)
      }

      // 3. Upload New Fotos
      const newlyUploadedIds: number[] = []
      if (filesToUpload.length > 0) {
        const uploadForm = new FormData()
        filesToUpload.forEach(file => uploadForm.append('files', file))

        const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadForm,
        })
        const uploadData = await uploadRes.json()

        if (!uploadRes.ok) {
          throw new Error(uploadData?.error?.message || 'Erro ao enviar fotos')
        }

        if (Array.isArray(uploadData)) {
          uploadData.forEach(foto => newlyUploadedIds.push(foto.id))
        }
      }

      // 3. Final Foto List
      const finalFotoIds = [...existingFotos.map(f => f.id), ...newlyUploadedIds]

      // 4. Update Property
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
            latitude: latitude || undefined,
            longitude: longitude || undefined,
            fotos: finalFotoIds,
            caracteristicas: formData.caracteristicas,
            video_url: formData.video_url,
            publishedAt: null, // Force into draft mode for admin approval
          },
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'Erro ao atualizar imóvel')
      }

      alert('Imóvel atualizado! Aguardando aprovação administrativa.')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Update error:', error)
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Carregando dados do imóvel...</div>

  return (
    <div className="bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">Editar Imóvel</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Título do Anúncio</label>
              <input type="text" name="titulo" required value={formData.titulo} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Descrição do Imóvel</label>
              <textarea name="descricao" rows={4} value={formData.descricao} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">VALOR (R$)</label>
              <input type="text" name="preco" required value={formData.preco} onChange={handlePriceChange} placeholder="R$ 0,00" className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Finalidade</label>
              <select name="finalidade" required value={formData.finalidade} disabled onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary text-base sm:text-sm bg-gray-100 cursor-not-allowed appearance-none">
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Cidade/UF</label>
              <input
                type="text"
                value="Campo Grande - MS"
                disabled
                className="mt-2 block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary text-base sm:text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Tipo do imóvel</label>
              <select name="tipo" required value={formData.tipo} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm">
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

            <div className="sm:col-span-2 relative" ref={bairroRef}>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Bairro</label>
              <input type="text" name="bairro" required value={formData.bairro} onChange={(e) => handleBairroChange(e.target.value)} onFocus={() => setShowBairroSuggestions(true)} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
              {showBairroSuggestions && bairroSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-48 overflow-y-auto">
                  {bairroSuggestions.map((s) => (
                    <button key={s} type="button" onClick={() => { setFormData({...formData, bairro: s}); setShowBairroSuggestions(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">{s}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">Endereço Completo</label>
              <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">ÁREA CONSTRUÍDA (m²)</label>
              <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 font-bold uppercase">ÁREA TOTAL (m²)</label>
              <input type="text" name="area_total" value={formData.area_total} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
            </div>

            {/* Characteristics Grid */}
            <div className="sm:col-span-2 mt-4">
              <label className="block text-lg font-bold text-gray-900 mb-4 border-b pb-2 uppercase">Características</label>
              <div className="columns-2 sm:columns-3 md:columns-4 gap-4 border p-4 rounded-lg bg-gray-50/30">
                {LISTA_CARACTERISTICAS.map((item) => (
                  <label key={item} className="relative flex items-center group cursor-pointer break-inside-avoid mb-3">
                    <input type="checkbox" checked={formData.caracteristicas.includes(item)} onChange={() => handleCharacteristicToggle(item)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                    <span className="ml-3 text-xs text-gray-700 font-medium group-hover:text-primary">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Photos Section */}
            <div className="sm:col-span-2 bg-gray-50/50 p-6 rounded-xl border-2 border-dashed border-gray-200">
              <label className="block text-sm font-bold text-gray-900 uppercase mb-4">Gerenciar Fotos</label>
              
              {/* Existing Photos */}
              {existingFotos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Fotos Atuais</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {existingFotos.map((foto) => (
                      <div key={foto.id} className="relative aspect-square rounded-lg overflow-hidden border bg-white group cursor-pointer" onClick={() => setActivePhotoUrl(foto.url)}>
                        <img src={foto.url} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeExistingFoto(foto.id); }} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Photos Preview */}
              {newFotos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Novas Fotos</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {previewUrls.map((url, idx) => (
                      <div key={url} className="relative aspect-square rounded-lg overflow-hidden border bg-white group cursor-pointer" onClick={() => setActivePhotoUrl(url)}>
                        <img src={url} className="h-full w-full object-cover border-2 border-primary group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeNewFoto(idx); }} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-md bg-white px-8 py-3 text-sm font-bold text-primary shadow-sm ring-1 ring-inset ring-primary hover:bg-white/80 transition-all uppercase">
                  ENVIAR FOTOS
                </button>
                <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFotosChange} className="hidden" />
                <p className="mt-2 text-[10px] text-gray-500">As fotos passarão pela aprovação do administrador</p>
              </div>

              {/* Edit Page Lightbox Modal */}
              {activePhotoUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4 py-8" onClick={() => setActivePhotoUrl(null)}>
                  <button type="button" onClick={() => setActivePhotoUrl(null)} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-[101]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto" onClick={(e) => e.stopPropagation()}>
                    <img src={activePhotoUrl} alt="Visualização em tamanho real" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
              )}
            </div>

            {/* VIDEO SECTION */}
            <div className="sm:col-span-2 border rounded-xl p-6 bg-gray-50/50">
              <label className="block text-sm font-bold text-gray-900 uppercase mb-4">Vídeo do Imóvel</label>
              <p className="mt-1 text-xs text-gray-500 mb-4">Selecione um vídeo de até 60MB. Se o imóvel já possui um vídeo, o novo irá substituí-lo.</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label
                  htmlFor={videoInputId}
                  className="rounded-md bg-white px-6 py-3 text-base font-bold text-secondary shadow-sm ring-1 ring-inset ring-secondary hover:bg-gray-50 active:bg-gray-100 transition-all uppercase cursor-pointer select-none"
                >
                  {videoFile ? '🔄 Trocar Vídeo' : '🎬 Selecionar Vídeo'}
                </label>
                <input
                  type="file"
                  id={videoInputId}
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="sr-only"
                />

                {videoFile && !formData.video_url.includes(videoFile.name) && (
                  <button
                    type="button"
                    onClick={handleVideoUpload}
                    disabled={uploadingVideo}
                    className="rounded-md bg-secondary px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-secondary-hover transition-all uppercase disabled:opacity-50"
                  >
                    {uploadingVideo ? '⏳ Enviando...' : '☁️ Upload Vídeo'}
                  </button>
                )}

                {formData.video_url && (
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <span className="text-xl">✅</span>
                    <span>{videoFile ? 'Novo Vídeo Pronto!' : 'Vídeo Atual Ativo'}</span>
                  </div>
                )}
              </div>

              {videoFile && (
                <p className="mt-2 text-xs text-gray-500">
                  Selecionado: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-8 gap-4">
            <button type="button" onClick={() => router.push('/dashboard')} className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={saving} className="rounded-md bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50">
              {saving ? (
                geocoding ? 'Localizando...' : 
                compressing ? 'Otimizando fotos...' : 
                'Salvando...'
              ) : 'Salvar e Enviar para Aprovação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
