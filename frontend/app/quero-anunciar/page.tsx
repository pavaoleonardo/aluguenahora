'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { API_BASE_URL } from '@/lib/apiBase'
import { translateError } from '@/lib/errorTranslations'
import { whatsappDisplayNumber, whatsappLink } from '@/lib/contact'

// Public partner signup page (/quero-anunciar).
// Two profiles: "corretor / imobiliária" (CRECI) and "proprietário" (CPF).
// Both reuse the existing users-permissions flow: POST /api/auth/local/register
// followed by PUT /api/users/:id for the custom fields — the same pattern used by
// /registro/corretor and /registro/proprietario.
// Document validation (CPF checksum, CNPJ/Receita, ViaCEP, Turnstile, Cloudflare)
// is intentionally NOT wired yet: this page only creates the account.

type Perfil = 'corretor' | 'proprietario'

type DadosBase = {
  nomeCompleto: string
  telefone: string
  celular: string
  email: string
  password: string
  termos: boolean
}

const inputClass =
  'block w-full rounded-md py-2 px-3 text-gray-900 text-sm font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm'

const labelClass = 'block text-sm font-semibold text-gray-900 mb-1'

const somenteDigitos = (valor: string) => valor.replace(/\D/g, '')

// Real-time phone mask: (XX) XXXX-XXXX or (XX) XXXXX-XXXX
const mascararTelefone = (valor: string) => {
  const d = somenteDigitos(valor)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`
}

// Real-time CPF mask: 000.000.000-00
const mascararCpf = (valor: string) => {
  const d = somenteDigitos(valor).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

const mascararCampo = (nome: string, valor: string) => {
  if (nome === 'telefone' || nome === 'celular') return mascararTelefone(valor)
  if (nome === 'cpf') return mascararCpf(valor)
  return valor
}

export default function QueroAnunciarPage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState<Perfil>('corretor')
  const [corretor, setCorretor] = useState({
    nomeCompleto: '',
    nomeImobiliaria: '',
    creci: '',
    telefone: '',
    celular: '',
    email: '',
    password: '',
    termos: false,
  })
  const [proprietario, setProprietario] = useState({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    celular: '',
    email: '',
    password: '',
    termos: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const handleCorretorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    // Apply masks in real-time
    const valor = type === 'checkbox' ? checked : mascararCampo(name, value)
    setCorretor((prev) => ({ ...prev, [name]: valor }))
  }

  const handleProprietarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const valor = type === 'checkbox' ? checked : mascararCampo(name, value)
    setProprietario((prev) => ({ ...prev, [name]: valor }))
  }

  const trocarPerfil = (novo: Perfil) => {
    setPerfil(novo)
    setError('')
    setSuccess('')
    setShowPassword(false)
  }

  const enviarCadastro = async (
    e: React.FormEvent<HTMLFormElement>,
    dados: DadosBase,
    camposExtras: Record<string, string>
  ) => {
    e.preventDefault()

    if (!dados.termos) {
      setError('Você deve aceitar os termos e condições.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // 1. Cadastro: usamos o e-mail como username para evitar conflitos de nomes iguais
      const res = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: dados.email,
          email: dados.email,
          password: dados.password,
          nome_completo: dados.nomeCompleto,
          telefone: dados.telefone,
          celular: dados.celular,
          ...camposExtras,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMsg =
          data.error?.message === 'An error occurred during account creation'
            ? 'Este e-mail já está cadastrado.'
            : data.error?.message || 'Erro ao cadastrar conta'
        throw new Error(errorMsg)
      }

      // 2. Cadastro ok: gravamos os campos customizados no usuário recém-criado
      if (data.jwt && data.user) {
        const updateUserId = data.user.documentId || data.user.id
        try {
          const updateRes = await fetch(`${API_BASE_URL}/api/users/${updateUserId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.jwt}`,
            },
            body: JSON.stringify({
              telefone: dados.telefone,
              celular: dados.celular,
              ...camposExtras,
            }),
          })

          if (updateRes.ok) {
            data.user = await updateRes.json() // Update our local user obj
          }
        } catch (updateErr) {
          console.error('Não foi possível atualizar dados secundários:', updateErr)
        }
      }

      if (!data.jwt) {
        setSuccess(
          'Conta criada com sucesso! Enviamos um link de confirmação para o seu e-mail. Acesse sua caixa de entrada para ativar a conta antes de fazer o login!'
        )
        setCorretor({
          nomeCompleto: '',
          nomeImobiliaria: '',
          creci: '',
          telefone: '',
          celular: '',
          email: '',
          password: '',
          termos: false,
        })
        setProprietario({
          nomeCompleto: '',
          cpf: '',
          telefone: '',
          celular: '',
          email: '',
          password: '',
          termos: false,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // Registration succeeded: hand the user to the login screen instead of
        // auto-logging them in (Miro board 21/09/26: "deve levar direto ao login").
        router.push('/login')
      }
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitCorretor = (e: React.FormEvent<HTMLFormElement>) =>
    enviarCadastro(e, corretor, {
      nome_imobiliaria: corretor.nomeImobiliaria,
      creci: corretor.creci,
      tipo_usuario: 'corretor',
    })

  const handleSubmitProprietario = (e: React.FormEvent<HTMLFormElement>) =>
    enviarCadastro(e, proprietario, {
      // CPF gravado apenas com dígitos (forma canônica para futura validação)
      cpf: somenteDigitos(proprietario.cpf),
      tipo_usuario: 'proprietario',
    })
  return (
    <section className="min-h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 min-h-screen">
        <div className="max-w-xl mx-auto w-full flex flex-col justify-center items-center py-10 px-6">
          <div className="text-center mb-8 w-full">
            <Link href="/" className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
              <Image
                src="/logo.svg"
                alt="Alugue na Hora Logo"
                width={160}
                height={60}
                className="h-12 w-auto mx-auto object-contain"
              />
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Anuncie seus imóveis</h1>
            <p className="text-sm font-medium text-gray-500">
              Crie sua conta gratuitamente e publique seus imóveis para quem procura em Campo Grande e região.
            </p>
          </div>

          {/* Escolha do perfil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8" role="tablist" aria-label="Tipo de anunciante">
            <button
              type="button"
              role="tab"
              aria-selected={perfil === 'corretor'}
              onClick={() => trocarPerfil('corretor')}
              className={`text-start rounded-lg border p-4 transition-colors ${
                perfil === 'corretor'
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="block text-sm font-bold">Sou corretor ou imobiliária</span>
              <span
                className={`block text-xs font-medium mt-1 ${
                  perfil === 'corretor' ? 'text-gray-100' : 'text-gray-500'
                }`}
              >
                Tenho CRECI e quero anunciar minha carteira
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={perfil === 'proprietario'}
              onClick={() => trocarPerfil('proprietario')}
              className={`text-start rounded-lg border p-4 transition-colors ${
                perfil === 'proprietario'
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="block text-sm font-bold">Sou proprietário</span>
              <span
                className={`block text-xs font-medium mt-1 ${
                  perfil === 'proprietario' ? 'text-gray-100' : 'text-gray-500'
                }`}
              >
                Quero anunciar o meu próprio imóvel
              </span>
            </button>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-md bg-green-50 text-green-800 text-sm font-medium border border-green-200">
              {success}
            </div>
          )}

          {perfil === 'corretor' ? (
            <form className="text-start w-full space-y-4" onSubmit={handleSubmitCorretor}>
              {/* 1. Nome completo */}
              <div>
                <label htmlFor="c-nomeCompleto" className={labelClass}>Nome completo</label>
                <input
                  id="c-nomeCompleto" name="nomeCompleto" type="text" required
                  value={corretor.nomeCompleto} onChange={handleCorretorChange}
                  className={inputClass}
                  placeholder="Insira seu nome completo"
                />
              </div>

              {/* 2. Nome da imobiliária */}
              <div>
                <label htmlFor="c-nomeImobiliaria" className={labelClass}>Nome da imobiliária (opcional)</label>
                <input
                  id="c-nomeImobiliaria" name="nomeImobiliaria" type="text"
                  value={corretor.nomeImobiliaria} onChange={handleCorretorChange}
                  className={inputClass}
                  placeholder="Insira o nome da imobiliária"
                />
              </div>

              {/* 3. CRECI */}
              <div>
                <label htmlFor="c-creci" className={labelClass}>CRECI</label>
                <input
                  id="c-creci" name="creci" type="text" required
                  value={corretor.creci} onChange={handleCorretorChange}
                  className={inputClass}
                  placeholder="Ex: 12345-F"
                />
              </div>

              {/* 4. Telefone e 5. Celular */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-telefone" className={labelClass}>Telefone (fixo)</label>
                  <input
                    id="c-telefone" name="telefone" type="text" inputMode="tel"
                    value={corretor.telefone} onChange={handleCorretorChange}
                    className={inputClass}
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="c-celular" className={labelClass}>Celular / WhatsApp</label>
                  <input
                    id="c-celular" name="celular" type="text" inputMode="tel" required
                    value={corretor.celular} onChange={handleCorretorChange}
                    className={inputClass}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              {/* 6. E-mail */}
              <div>
                <label htmlFor="c-email" className={labelClass}>Endereço de e-mail</label>
                <input
                  id="c-email" name="email" type="email" required
                  value={corretor.email} onChange={handleCorretorChange}
                  className={inputClass}
                  placeholder="Insira seu e-mail"
                />
              </div>

              {/* 7. Senha */}
              <div>
                <label htmlFor="c-password" className={labelClass}>Senha</label>
                <div className="flex relative shadow-sm rounded-md">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="c-password" name="password" required
                    value={corretor.password} onChange={handleCorretorChange}
                    className="block w-full rounded-s-md py-2 px-3 border border-gray-300 text-gray-900 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10"
                    placeholder="Crie sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="inline-flex items-center justify-center py-2 px-3 border rounded-e-md -ms-px border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary z-20 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* 8. Termos */}
              <div className="flex items-start mt-4 mb-6">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="c-termos" name="termos" required
                    checked={corretor.termos} onChange={handleCorretorChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="c-termos" className="font-medium text-gray-500 cursor-pointer">
                    Eu concordo com os <Link href="/termos" className="text-primary hover:underline">Termos e condições</Link>
                  </label>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
                >
                  {loading ? 'Cadastrando...' : 'Criar conta e continuar'}
                </button>
              </div>
            </form>
          ) : (
            <form className="text-start w-full space-y-4" onSubmit={handleSubmitProprietario}>
              {/* 1. Nome completo */}
              <div>
                <label htmlFor="p-nomeCompleto" className={labelClass}>Nome completo</label>
                <input
                  id="p-nomeCompleto" name="nomeCompleto" type="text" required
                  value={proprietario.nomeCompleto} onChange={handleProprietarioChange}
                  className={inputClass}
                  placeholder="Insira seu nome completo"
                />
              </div>

              {/* 2. CPF */}
              <div>
                <label htmlFor="p-cpf" className={labelClass}>CPF</label>
                <input
                  id="p-cpf" name="cpf" type="text" inputMode="numeric" maxLength={14} required
                  value={proprietario.cpf} onChange={handleProprietarioChange}
                  className={inputClass}
                  placeholder="000.000.000-00"
                />
                <p className="mt-1 text-xs font-medium text-gray-500">
                  Usamos o CPF para identificar você e evitar cadastros duplicados.
                </p>
              </div>

              {/* 3. Telefone e 4. Celular */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p-telefone" className={labelClass}>Telefone (fixo)</label>
                  <input
                    id="p-telefone" name="telefone" type="text" inputMode="tel"
                    value={proprietario.telefone} onChange={handleProprietarioChange}
                    className={inputClass}
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="p-celular" className={labelClass}>Celular / WhatsApp</label>
                  <input
                    id="p-celular" name="celular" type="text" inputMode="tel" required
                    value={proprietario.celular} onChange={handleProprietarioChange}
                    className={inputClass}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              {/* 5. E-mail */}
              <div>
                <label htmlFor="p-email" className={labelClass}>Endereço de e-mail</label>
                <input
                  id="p-email" name="email" type="email" required
                  value={proprietario.email} onChange={handleProprietarioChange}
                  className={inputClass}
                  placeholder="Insira seu e-mail"
                />
              </div>

              {/* 6. Senha */}
              <div>
                <label htmlFor="p-password" className={labelClass}>Senha</label>
                <div className="flex relative shadow-sm rounded-md">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="p-password" name="password" required
                    value={proprietario.password} onChange={handleProprietarioChange}
                    className="block w-full rounded-s-md py-2 px-3 border border-gray-300 text-gray-900 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10"
                    placeholder="Crie sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="inline-flex items-center justify-center py-2 px-3 border rounded-e-md -ms-px border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary z-20 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* 7. Termos */}
              <div className="flex items-start mt-4 mb-6">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="p-termos" name="termos" required
                    checked={proprietario.termos} onChange={handleProprietarioChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="p-termos" className="font-medium text-gray-500 cursor-pointer">
                    Eu concordo com os <Link href="/termos" className="text-primary hover:underline">Termos e condições</Link>
                  </label>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
                >
                  {loading ? 'Cadastrando...' : 'Criar conta e continuar'}
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-sm font-medium text-center">{error}</div>
          )}

          <p className="shrink text-gray-500 text-center text-sm md:text-base mt-8">
            Já tem uma conta?
            <Link href="/login" className="text-gray-900 font-semibold ms-1 hover:text-primary transition-colors">
              <b>Entrar</b>
            </Link>
          </p>

          <p className="text-gray-500 text-center text-sm mt-4">
            Prefere falar com a gente?{' '}
            <a
              href={whatsappLink('Olá! Quero anunciar meus imóveis no Alugue na Hora.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              WhatsApp {whatsappDisplayNumber()}
            </a>
          </p>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-0 w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}

