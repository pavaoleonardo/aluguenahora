'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'
import { todosBairros } from '@/lib/bairrosCampoGrande'
import { API_BASE_URL } from '@/lib/apiBase'
import { formatCurrency, parseCurrency } from '@/lib/format'
import { compressImages } from '@/lib/image'
import {
  clearPropertyDraft,
  savePropertyDraft,
  usePropertyDraft,
  type PropertyDraftForm,
} from '@/lib/propertyDraft'

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
].sort((a, b) => a.localeCompare(b, 'pt-BR'));

const MAX_FOTOS_POR_IMOVEL = 30;
const VIDEO_MAX_MB = 60;

/**
 * Miro, `Página Anunciar Imóvel` — the six blocks the phone slides through
 * (orientations 01 to 06). The step number is also the anchor the validation jumps to.
 */
const SECTIONS = [
  {
    step: 1,
    title: 'Tipo e finalidade',
    hint: 'O que você anuncia, onde o imóvel fica e o endereço usado no mapa.',
  },
  {
    step: 2,
    title: 'Características e medidas',
    hint: 'Como o imóvel aparece na busca: título, descrição, cômodos, áreas e características.',
  },
  {
    step: 3,
    title: 'Valores e condições',
    hint: 'Renda, condomínio e IPTU — o custo mensal é somado para você conferir.',
  },
  {
    step: 4,
    title: 'Fotos do imóvel',
    hint: `Até ${MAX_FOTOS_POR_IMOVEL} fotos. A primeira é a capa usada nos resultados de busca.`,
  },
  {
    step: 5,
    title: 'Vídeo do imóvel',
    hint: 'Opcional — o vídeo complementa as fotos, não substitui.',
  },
  {
    step: 6,
    title: 'Revisar e enviar',
    hint: 'Confira o resumo e envie o anúncio para aprovação.',
  },
] as const

const TOTAL_STEPS = SECTIONS.length

type FormState = PropertyDraftForm

const EMPTY_FORM: FormState = {
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
  estado: '',
  tamanho: '',
  area_total: '',
  endereco: '',
  caracteristicas: [],
  video_url: '',
  vagas: '',
}

/**
 * Fields a visitor has to touch. `cidade` and `finalidade` are prefilled on purpose, so they
 * are excluded — otherwise an empty form would look like a started draft.
 */
const EDITABLE_FIELDS = [
  'titulo', 'descricao', 'preco', 'condominio', 'iptu', 'quartos', 'banheiros', 'bairro',
  'estado', 'tamanho', 'area_total', 'endereco', 'video_url', 'vagas', 'tipo',
] as const

const LABEL_CLASS = 'block text-sm font-bold leading-6 text-gray-900'
const INPUT_CLASS =
  'mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary text-base sm:text-sm'
const SELECT_CLASS = `${INPUT_CLASS} appearance-none bg-white pr-10`
/** Same box as INPUT_CLASS, with room for the "R$" affix. */
const PRICE_INPUT_CLASS =
  'mt-2 block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary text-base sm:text-sm'
const CARD_CLASS =
  'rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] sm:p-7'

function StepHeader({
  step,
  title,
  hint,
  headingId,
}: {
  step: number
  title: string
  hint: string
  headingId: string
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white"
      >
        {String(step).padStart(2, '0')}
      </span>
      <div>
        <h2 id={headingId} className="text-lg font-bold leading-7 text-slate-900 sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{hint}</p>
      </div>
    </div>
  )
}


function hasAnyContent(form: FormState): boolean {
  return (
    form.caracteristicas.length > 0 ||
    EDITABLE_FIELDS.some((field) => form[field].trim() !== '')
  )
}

function formatDraftMoment(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NewPropertyPage() {
  const router = useRouter()
  const { user, token, loading: authLoading } = useAuth()

  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [geocoding, setGeocoding] = useState(false)
  const [compressing, setCompressing] = useState(false)

  const [fotos, setFotos] = useState<File[]>([])
  const fileInputId = 'foto-upload-input'

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const videoInputId = 'video-upload-input'

  const [buscaCaracteristica, setBuscaCaracteristica] = useState('')

  const [showBairroSuggestions, setShowBairroSuggestions] = useState(false)
  const [bairroSuggestions, setBairroSuggestions] = useState<string[]>([])
  const bairroRef = useRef<HTMLDivElement>(null)

  const [draftNoticeDismissed, setDraftNoticeDismissed] = useState(false)
  const draft = usePropertyDraft()
  const userId = user ? String(user.id) : null

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Object URLs are derived, not stored: a `setState` inside an effect would trip
  // `react-hooks/set-state-in-effect` (the rule this repo runs), and the cleanup below
  // revokes the previous batch every time the selection changes.
  const previewUrls = useMemo(() => fotos.map((file) => URL.createObjectURL(file)), [fotos])
  useEffect(() => () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url))
  }, [previewUrls])

  const custoMensal = useMemo(
    () => parseCurrency(formData.preco) + parseCurrency(formData.condominio) + parseCurrency(formData.iptu),
    [formData.preco, formData.condominio, formData.iptu]
  )

  const caracteristicasFiltradas = useMemo(() => {
    const termo = buscaCaracteristica.trim().toLowerCase()
    if (!termo) return LISTA_CARACTERISTICAS
    return LISTA_CARACTERISTICAS.filter((item) => item.toLowerCase().includes(termo))
  }, [buscaCaracteristica])

  /** A draft is only offered while the form is still untouched, so autosave never re-opens it. */
  const restorableDraft =
    !draftNoticeDismissed && draft && draft.userId === userId && !hasAnyContent(formData) ? draft : null

  // Geocode address using OpenStreetMap Nominatim API (free)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
    if (!address.trim()) return null

    // Try different address formats
    const addressVariations = [
      `${address}, ${formData.bairro}, ${formData.cidade}, MS, Brasil`,
      `${address}, ${formData.cidade}, MS, Brasil`,
      `${address}, ${formData.cidade}, Brasil`,
    ].filter((value) => value.length > 0)

    for (const fullAddress of addressVariations) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
          { headers: { 'User-Agent': 'AlugueNaHora-App/1.0 (pavaoleonardo@gmail.com)' } }
        )
        const data: Array<{ lat: string; lon: string }> = await response.json()
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: formatCurrency(value) }))
  }

  const handleCharacteristicToggle = (char: string) => {
    setFormData((prev) => {
      const current = prev.caracteristicas
      if (current.includes(char)) {
        return { ...prev, caracteristicas: current.filter((item) => item !== char) }
      }
      return { ...prev, caracteristicas: [...current, char] }
    })
  }

  const handleBairroChange = (val: string) => {
    setFormData((prev) => ({ ...prev, bairro: val }))
    if (val.length > 0) {
      const filtered = todosBairros
        .filter((bairro) => bairro.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 5)
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

  useEffect(() => {
    if (authLoading) return

    if (!token || !user) {
      router.push('/login?redirect=/dashboard/novo-imovel')
    }
  }, [authLoading, token, user, router])

  /**
   * Orientation 11: the draft is saved while you type (debounced), so closing the tab does
   * not lose the text. Photos and the video are `File` objects and cannot be stored.
   */
  useEffect(() => {
    if (!userId || submitted) return
    if (!hasAnyContent(formData)) return
    const timer = window.setTimeout(() => {
      savePropertyDraft(userId, formData)
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [formData, userId, submitted])

  const handleSaveDraft = () => {
    if (!userId) {
      setErrors(['Faça login novamente para salvar o rascunho.'])
      return
    }
    setErrors([])
    savePropertyDraft(userId, formData)
  }

  /** Orientation 12: "Continuar de onde parei" — an explicit click, so nothing is overwritten. */
  const handleRestoreDraft = () => {
    if (!restorableDraft) return
    setFormData(restorableDraft.form)
    setDraftNoticeDismissed(true)
    setStep(1)
    setErrors([])
  }

  const handleDiscardDraft = () => {
    clearPropertyDraft()
    setDraftNoticeDismissed(true)
  }

  /** Per-step validation, so "Continuar" cannot walk past an empty required field. */
  const validateStep = (target: number): string[] => {
    const list: string[] = []
    if (target === 1) {
      if (!formData.tipo) list.push('Tipo do imóvel é obrigatório.')
      if (!formData.bairro.trim()) list.push('Bairro é obrigatório.')
    }
    if (target === 2 && !formData.titulo.trim()) list.push('Título do anúncio é obrigatório.')
    if (target === 3 && !formData.preco.trim()) list.push('Valor (R$) é obrigatório.')
    if (target === 4 && fotos.length === 0) list.push('Selecione pelo menos uma foto do imóvel.')
    return list
  }

  /** Same messages and same order as the single-page form this replaced. */
  const validateAll = (): string[] => {
    const list: string[] = []
    if (!formData.titulo.trim()) list.push('Título do anúncio é obrigatório.')
    if (!formData.preco.trim()) list.push('Valor (R$) é obrigatório.')
    if (!formData.tipo) list.push('Tipo do imóvel é obrigatório.')
    if (!formData.bairro.trim()) list.push('Bairro é obrigatório.')
    if (fotos.length === 0) list.push('Selecione pelo menos uma foto do imóvel.')
    return list
  }

  const firstInvalidStep = (): number => {
    for (const section of SECTIONS) {
      if (validateStep(section.step).length > 0) return section.step
    }
    return TOTAL_STEPS
  }

  const goToStep = (target: number) => {
    setStep(Math.min(TOTAL_STEPS, Math.max(1, target)))
    trackRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const goToNext = () => {
    const stepErrors = validateStep(step)
    if (stepErrors.length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors([])
    goToStep(step + 1)
  }

  const goToPrevious = () => {
    setErrors([])
    goToStep(step - 1)
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    // Above `lg` the six blocks are a vertical stack; a swipe must never flip a step there.
    if (window.matchMedia('(min-width: 1024px)').matches) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return

    if (deltaX < 0) goToNext()
    else goToPrevious()
  }

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // Appends instead of replacing: orientation 04 allows up to 30 photos and a reorder.
      setFotos((prev) => {
        const next = [...prev, ...files]
        if (next.length > MAX_FOTOS_POR_IMOVEL) {
          alert(`Você pode enviar no máximo ${MAX_FOTOS_POR_IMOVEL} fotos por imóvel.`)
        }
        return next.slice(0, MAX_FOTOS_POR_IMOVEL)
      })
    }
    e.target.value = ''
  }

  const handleMoveFotoToCapa = (index: number) => {
    setFotos((prev) => {
      if (index <= 0 || index >= prev.length) return prev
      const next = [...prev]
      const [foto] = next.splice(index, 1)
      next.unshift(foto)
      return next
    })
  }

  const handleRemoveFoto = (index: number) => {
    setFotos((prev) => prev.filter((_, position) => position !== index))
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > VIDEO_MAX_MB * 1024 * 1024) {
        alert(`O vídeo deve ter no máximo ${VIDEO_MAX_MB}MB.`)
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
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error?.message || 'Erro no upload do vídeo')
      }

      const result: { url?: string } = await response.json()
      if (result.url) setFormData((prev) => ({ ...prev, video_url: result.url ?? '' }))
      alert('Vídeo enviado com sucesso!')
    } catch (err) {
      console.error('Video upload error:', err)
      alert(err instanceof Error ? err.message : 'Erro ao enviar vídeo.')
    } finally {
      setUploadingVideo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Full manual validation (HTML5 validation is unreliable on mobile browsers)
    const validationErrors = validateAll()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      // Jump to the block that holds the first missing field, so the message is not orphaned.
      goToStep(firstInvalidStep())
      return
    }
    setErrors([])

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
        const uploadForm = new FormData()
        filesToUpload.forEach((file) => uploadForm.append('files', file))

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
          uploadData.forEach((foto: { id: number }) => uploadedFotoIds.push(foto.id))
        }
      }

      // 3. Create Property
      const res = await fetch(`${API_BASE_URL}/api/imoveis`, {
        method: 'POST',
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
            vagas: Number(formData.vagas),
            bairro: { regiao: '', bairro: formData.bairro },
            cidade: formData.cidade,
            finalidade: formData.finalidade,
            tipo: formData.tipo,
            estado: formData.estado || null,
            tamanho: Number(formData.tamanho.replace(',', '.')),
            area_total: Number(formData.area_total.replace(',', '.')),
            endereco: formData.endereco || null,
            latitude: latitude,
            longitude: longitude,
            fotos: uploadedFotoIds,
            caracteristicas: formData.caracteristicas,
            video_url: formData.video_url,
          },
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'Erro ao criar imóvel')
      }

      clearPropertyDraft()
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Submit error:', error)
      let message = error instanceof Error ? error.message : 'Erro ao criar imóvel'
      if (message === 'Failed to fetch') {
        message =
          'Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online.'
      }
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="force-light min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7fafe] to-white px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-[0_6px_24px_rgba(15,23,42,0.08)]">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
          </div>
          {/* "Tela de sucesso", verbatim from the board's Anunciar Imóvel frame. */}
          <h1 className="text-xl font-bold text-slate-900">Cadastro recebido!</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Suas informações foram enviadas para análise.
          </p>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-primary/5 px-4 py-3 text-left text-sm leading-relaxed text-slate-600">
            <InformationCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Nossa equipe entrará em contato em até 24 horas.</span>
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-xl bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-secondary/90"
          >
            Ir para o meu painel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="force-light bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div ref={trackRef} className="scroll-mt-24">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Anunciar imóvel</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Seis etapas rápidas. No celular, deslize para o lado — ou use{' '}
            <span className="font-bold">Continuar</span> — para avançar; no computador as seis aparecem na
            mesma página.
          </p>
        </div>

        {/* Orientation 12 — recovering a draft saved in this browser. */}
        {restorableDraft && (
          <div className="mt-5 rounded-2xl border border-secondary/30 bg-secondary/5 p-4 sm:p-5">
            <p className="text-sm font-bold text-slate-900">Você tem um rascunho salvo</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Salvo em {formatDraftMoment(restorableDraft.savedAt)} neste navegador. As fotos e o vídeo
              precisam ser escolhidos novamente.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRestoreDraft}
                className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-secondary/90"
              >
                Continuar de onde parei
              </button>
              <button
                type="button"
                onClick={handleDiscardDraft}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50"
              >
                Começar do zero
              </button>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4">
            <h2 className="mb-2 text-sm font-bold text-red-800">Por favor corrija os seguintes erros:</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Phones: which block is on screen. Hidden from `lg` up, where all six are stacked. */}
        <div className="mt-6 lg:hidden">
          <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
            <span>
              Etapa {String(step).padStart(2, '0')} de {TOTAL_STEPS}
            </span>
            <span className="truncate text-right text-slate-600">{SECTIONS[step - 1].title}</span>
          </div>
          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-valuenow={step}
            aria-label="Progresso do cadastro do imóvel"
          >
            <div
              className="h-full rounded-full bg-secondary transition-all"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* The clip box must live on this static ancestor, never on the track itself: a track that
            both translates and clips hides its own active panel (and its touch targets) once shifted. */}
        <form onSubmit={handleSubmit} noValidate className="mt-4 overflow-x-clip">
          <div
            className="property-steps lg:space-y-5"
            style={{ '--ahn-step-shift': `${-(step - 1) * 100}%` } as React.CSSProperties}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-1">
              <StepHeader
                step={SECTIONS[0].step}
                title={SECTIONS[0].title}
                hint={SECTIONS[0].hint}
                headingId="etapa-1"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS} htmlFor="tipo">
                    Tipo do imóvel
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className={SELECT_CLASS}
                  >
                    <option value="">Selecione o tipo...</option>
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
                  <label className={LABEL_CLASS} htmlFor="finalidade">
                    Finalidade
                  </label>
                  <select
                    id="finalidade"
                    name="finalidade"
                    value={formData.finalidade}
                    onChange={handleChange}
                    disabled
                    className={`${SELECT_CLASS} cursor-not-allowed bg-gray-100`}
                  >
                    <option value="aluguel">Aluguel</option>
                  </select>
                </div>
                <div className="relative" ref={bairroRef}>
                  <label className={LABEL_CLASS} htmlFor="bairro">
                    Bairro
                  </label>
                  <input
                    id="bairro"
                    type="text"
                    name="bairro"
                    autoComplete="off"
                    placeholder="Comece a digitar o bairro..."
                    value={formData.bairro}
                    onChange={(e) => handleBairroChange(e.target.value)}
                    onFocus={() => {
                      if (formData.bairro.length === 0) setBairroSuggestions(todosBairros)
                      setShowBairroSuggestions(true)
                    }}
                    className={INPUT_CLASS}
                  />
                  {showBairroSuggestions && bairroSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                      {bairroSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, bairro: suggestion }))
                            setShowBairroSuggestions(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="cidade">
                    Cidade/UF
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    value="Campo Grande - MS"
                    disabled
                    className={`${INPUT_CLASS} cursor-not-allowed bg-gray-100`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={LABEL_CLASS} htmlFor="endereco">
                    Endereço completo
                  </label>
                  <input
                    id="endereco"
                    type="text"
                    name="endereco"
                    placeholder="Ex: Rua das Flores, 123"
                    value={formData.endereco}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    O endereço é usado para posicionar o imóvel no mapa.
                  </p>
                </div>
              </div>
            </section>

            {/* 02 — Características e medidas */}
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-2">
              <StepHeader
                step={SECTIONS[1].step}
                title={SECTIONS[1].title}
                hint={SECTIONS[1].hint}
                headingId="etapa-2"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={LABEL_CLASS} htmlFor="titulo">
                    Título do anúncio
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    name="titulo"
                    maxLength={90}
                    placeholder="Ex: Casa 3 quartos com quintal no Jardim dos Estados"
                    value={formData.titulo}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Um título curto e específico aparece melhor nos resultados de busca.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className={LABEL_CLASS} htmlFor="descricao">
                    Descrição do imóvel
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={5}
                    placeholder="Descreva os ambientes, a vizinhança, o que está incluso no aluguel..."
                    value={formData.descricao}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="quartos">
                    Quartos
                  </label>
                  <input
                    id="quartos"
                    type="number"
                    name="quartos"
                    min={0}
                    value={formData.quartos}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="banheiros">
                    Banheiros
                  </label>
                  <input
                    id="banheiros"
                    type="number"
                    name="banheiros"
                    min={0}
                    value={formData.banheiros}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="vagas">
                    Vagas de garagem
                  </label>
                  <input
                    id="vagas"
                    type="number"
                    name="vagas"
                    min={0}
                    value={formData.vagas}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="estado">
                    Estado (UF)
                  </label>
                  <input
                    id="estado"
                    type="text"
                    name="estado"
                    maxLength={2}
                    placeholder="MS"
                    value={formData.estado}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="tamanho">
                    Área útil (m²)
                  </label>
                  <input
                    id="tamanho"
                    type="text"
                    inputMode="decimal"
                    name="tamanho"
                    placeholder="Ex: 120"
                    value={formData.tamanho}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="area_total">
                    Área total (m²)
                  </label>
                  <input
                    id="area_total"
                    type="text"
                    inputMode="decimal"
                    name="area_total"
                    placeholder="Ex: 250"
                    value={formData.area_total}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Orientation 08: the full list stays, with a search box on top so it is findable. */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900">Características do imóvel</p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {formData.caracteristicas.length} selecionada
                    {formData.caracteristicas.length === 1 ? '' : 's'}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Quanto mais características você marcar, mais filtros de busca o anúncio atende.
                </p>
                <input
                  type="search"
                  value={buscaCaracteristica}
                  onChange={(e) => setBuscaCaracteristica(e.target.value)}
                  placeholder="Buscar característica (ex: piscina)"
                  aria-label="Buscar característica"
                  className={INPUT_CLASS}
                />
                <div className="mt-3 grid max-h-56 grid-cols-1 gap-1 overflow-y-auto pr-1 sm:grid-cols-2">
                  {caracteristicasFiltradas.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={formData.caracteristicas.includes(item)}
                        onChange={() => handleCharacteristicToggle(item)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="truncate">{item}</span>
                    </label>
                  ))}
                </div>
                {caracteristicasFiltradas.length === 0 && (
                  <p className="mt-3 text-xs text-slate-500">Nenhuma característica encontrada.</p>
                )}
                {formData.caracteristicas.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, caracteristicas: [] }))}
                    className="mt-3 text-xs font-bold text-slate-500 underline-offset-2 hover:text-primary hover:underline"
                  >
                    Limpar seleção
                  </button>
                )}
              </div>
            </section>

            {/* 03 — Valores e condições */}
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-3">
              <StepHeader
                step={SECTIONS[2].step}
                title={SECTIONS[2].title}
                hint={SECTIONS[2].hint}
                headingId="etapa-3"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS} htmlFor="preco">
                    Valor do aluguel (R$)
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                      R$
                    </span>
                    <input
                      id="preco"
                      type="text"
                      inputMode="numeric"
                      name="preco"
                      placeholder="0,00"
                      value={formData.preco}
                      onChange={handlePriceChange}
                      className={PRICE_INPUT_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="condominio">
                    Condomínio (R$)
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                      R$
                    </span>
                    <input
                      id="condominio"
                      type="text"
                      inputMode="numeric"
                      name="condominio"
                      placeholder="0,00"
                      value={formData.condominio}
                      onChange={handlePriceChange}
                      className={PRICE_INPUT_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="iptu">
                    IPTU mensal (R$)
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                      R$
                    </span>
                    <input
                      id="iptu"
                      type="text"
                      inputMode="numeric"
                      name="iptu"
                      placeholder="0,00"
                      value={formData.iptu}
                      onChange={handlePriceChange}
                      className={PRICE_INPUT_CLASS}
                    />
                  </div>
                </div>
              </div>

              {/* Orientation 03 — the monthly cost the visitor sees is the sum of the three. */}
              <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Custo mensal estimado
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">{formatCurrency(custoMensal)}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Aluguel + condomínio + IPTU informados acima. É o valor que o inquilino vê primeiro.
                </p>
              </div>
            </section>

            {/* 04 — Fotos do imóvel */}
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-4">
              <StepHeader
                step={SECTIONS[3].step}
                title={SECTIONS[3].title}
                hint={SECTIONS[3].hint}
                headingId="etapa-4"
              />
              <input
                id={fileInputId}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFotosChange}
                className="sr-only"
              />
              <label
                htmlFor={fileInputId}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 9.75h.008v.008H18V9.75zM3.75 5.25h16.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z"
                    />
                  </svg>
                </span>
                <span className="mt-2 text-sm font-bold text-slate-700">
                  {fotos.length === 0 ? 'Selecionar fotos' : 'Adicionar mais fotos'}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  JPG, PNG ou WebP — até {MAX_FOTOS_POR_IMOVEL} fotos
                </span>
              </label>

              {fotos.length > 0 && (
                <>
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    {fotos.length} de {MAX_FOTOS_POR_IMOVEL} fotos — a primeira é usada como capa
                  </p>
                  <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {fotos.map((file, index) => (
                      <li
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                      >
                        <div className="relative aspect-[4/3] w-full bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewUrls[index] ?? ''}
                            alt={`Pré-visualização da foto ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          {index === 0 && (
                            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                              <StarIcon className="h-3 w-3" aria-hidden="true" />
                              Capa
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-1 p-2">
                          {index === 0 ? (
                            <span className="text-[11px] text-slate-400">Primeira foto</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleMoveFotoToCapa(index)}
                              className="text-[11px] font-bold text-secondary hover:underline"
                            >
                              Definir capa
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveFoto(index)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 transition-colors hover:text-red-600"
                          >
                            <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            Remover
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setFotos([])}
                    className="mt-3 text-xs font-bold text-slate-500 underline-offset-2 hover:text-primary hover:underline"
                  >
                    Remover todas as fotos
                  </button>
                </>
              )}

              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                As fotos não ficam no rascunho salvo: se você sair da página, será preciso escolhê-las
                novamente.
              </p>
            </section>

            {/* 05 — Vídeo do imóvel */}
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-5">
              <StepHeader
                step={SECTIONS[4].step}
                title={SECTIONS[4].title}
                hint={SECTIONS[4].hint}
                headingId="etapa-5"
              />

              <input
                id={videoInputId}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="sr-only"
              />
              <label
                htmlFor={videoInputId}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>
                <span className="mt-2 text-sm font-bold text-slate-700">
                  {videoFile ? 'Trocar vídeo selecionado' : 'Selecionar vídeo'}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  MP4 ou MOV — até {VIDEO_MAX_MB} MB
                </span>
              </label>

              {videoFile && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="truncate text-sm font-bold text-slate-700">{videoFile.name}</p>
                  <p className="text-xs text-slate-500">
                    {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleVideoUpload}
                      disabled={uploadingVideo}
                      className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {uploadingVideo ? 'Enviando vídeo...' : 'Enviar vídeo'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50"
                    >
                      Descartar arquivo
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5">
                <label className={LABEL_CLASS} htmlFor="video_url">
                  Ou informe o link do vídeo
                </label>
                <input
                  id="video_url"
                  type="url"
                  name="video_url"
                  placeholder="https://youtu.be/..."
                  value={formData.video_url}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                />
                <p className="mt-1 text-xs text-gray-500">
                  YouTube, Vimeo ou um arquivo já enviado. O último valor informado é o que vale.
                </p>
              </div>

              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
                O vídeo é opcional e <span className="font-bold">não substitui as fotos</span> —
                anúncios com boas fotos recebem mais contato.
              </p>
            </section>

            {/* 06 — Revisar e enviar */}
            <section className={`${CARD_CLASS} w-full shrink-0`} aria-labelledby="etapa-6">
              <StepHeader
                step={SECTIONS[5].step}
                title={SECTIONS[5].title}
                hint={SECTIONS[5].hint}
                headingId="etapa-6"
              />

              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ['Tipo do imóvel', formData.tipo || 'Não informado'],
                  ['Finalidade', 'Aluguel'],
                  ['Bairro', formData.bairro || 'Não informado'],
                  ['Título', formData.titulo || 'Não informado'],
                  ['Aluguel', formData.preco || 'Não informado'],
                  ['Condomínio', formData.condominio || 'Não informado'],
                  ['IPTU', formData.iptu || 'Não informado'],
                  ['Custo mensal estimado', formatCurrency(custoMensal)],
                  ['Área útil', formData.tamanho ? `${formData.tamanho} m²` : 'Não informada'],
                  ['Área total', formData.area_total ? `${formData.area_total} m²` : 'Não informada'],
                  [
                    'Cômodos',
                    `${formData.quartos || 0} quarto(s) · ${formData.banheiros || 0} banheiro(s) · ${
                      formData.vagas || 0
                    } vaga(s)`,
                  ],
                  ['Fotos', `${fotos.length} foto(s) — 1ª é a capa`],
                  ['Vídeo', formData.video_url ? 'Informado' : 'Não informado'],
                  ['Características', `${formData.caracteristicas.length} selecionada(s)`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 px-3 py-2">
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? compressing
                    ? 'Comprimindo fotos...'
                    : geocoding
                      ? 'Localizando endereço...'
                      : 'Enviando...'
                  : 'Enviar para revisão'}
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="mt-3 w-full rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50"
              >
                Salvar rascunho
              </button>

              <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                Todo anúncio passa por uma revisão da equipe antes de ficar público.
              </p>

            </section>
          </div>

          {/* Mobile-only step navigation: the six blocks are wider than the screen here. */}
          <div className="mt-4 space-y-3 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={step === 1}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                Voltar
              </button>
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary/90"
                >
                  Continuar
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <span className="flex-1 text-center text-xs font-bold leading-snug text-slate-500">
                  Revise o resumo e toque em Enviar para revisão
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Salvar rascunho
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
