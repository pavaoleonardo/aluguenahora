'use client'

import { useCallback, useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  HomeIcon,
  IdentificationIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import { API_BASE_URL } from '@/lib/apiBase'
import { translateError } from '@/lib/errorTranslations'
import type { RegisterField, RegisterFieldIcon, RegisterProfile } from '@/lib/registerProfiles'

/**
 * The three registration pages (Corretor PF, Imobiliária PJ, Proprietário PF) share
 * this renderer; `lib/registerProfiles.ts` holds their fields, sections and consents.
 * Field `name`s are the Strapi `up_users` attribute names, so the payload is the flat
 * form state plus `tipo_usuario` — the backend middleware in `backend/src/index.ts`
 * stashes those keys before Yup validation and writes them on `beforeCreate`.
 */

const FIELD_ICONS: Record<RegisterFieldIcon, typeof UserIcon> = {
  user: UserIcon,
  id: IdentificationIcon,
  calendar: CalendarDaysIcon,
  briefcase: BriefcaseIcon,
  building: BuildingOffice2Icon,
  mapPin: MapPinIcon,
  home: HomeIcon,
  document: DocumentTextIcon,
  mail: EnvelopeIcon,
  phone: PhoneIcon,
  lock: LockClosedIcon,
  globe: GlobeAltIcon,
  map: MapIcon,
}

const SPAN_CLASSES: Record<number, string> = {
  2: 'sm:col-span-1 lg:col-span-2',
  3: 'sm:col-span-1 lg:col-span-3',
  4: 'sm:col-span-2 lg:col-span-4',
  6: 'sm:col-span-2 lg:col-span-6',
}

const onlyDigits = (value: string) => value.replace(/\D/g, '')

const applyCpfMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

const applyCnpjMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

const applyPhoneMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

const applyCepMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 8)
  return digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5)}`
}

const applyMask = (field: RegisterField, value: string) => {
  switch (field.mask) {
    case 'cpf':
      return applyCpfMask(value)
    case 'cnpj':
      return applyCnpjMask(value)
    case 'phone':
      return applyPhoneMask(value)
    case 'cep':
      return applyCepMask(value)
    default:
      return value
  }
}

type ViaCepResponse = {
  erro?: boolean
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
}

export default function RegisterForm({ profile }: { profile: RegisterProfile }) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, string>>({})
  const [consents, setConsents] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(profile.consents.map((consent) => [consent.name, false])),
  )
  const [showPassword, setShowPassword] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const fieldsByName = useMemo(() => {
    const map: Record<string, RegisterField> = {}
    for (const section of profile.sections) {
      for (const field of section.fields) map[field.name] = field
    }
    return map
  }, [profile.sections])

  const setField = (name: string, value: string) => {
    const field = fieldsByName[name]
    setValues((prev) => ({ ...prev, [name]: field ? applyMask(field, value) : value }))
  }

  /** CEP autofill via ViaCEP (public, CORS-enabled, no key). Silent on failure. */
  const lookupCep = useCallback(async (cep: string) => {
    const digits = onlyDigits(cep)
    if (digits.length !== 8) return
    setCepLoading(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      if (!res.ok) return
      const data = (await res.json()) as ViaCepResponse
      if (data.erro) return
      setValues((prev) => ({
        ...prev,
        logradouro: prev.logradouro || data.logradouro || '',
        bairro: prev.bairro || data.bairro || '',
        cidade: prev.cidade || data.localidade || '',
        estado: prev.estado || data.uf || '',
      }))
    } catch {
      // Offline or blocked: the visitor keeps typing the address by hand.
    } finally {
      setCepLoading(false)
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const missingConsent = profile.consents.find((consent) => consent.required && !consents[consent.name])
    if (missingConsent) {
      setError('Você deve aceitar todas as declarações obrigatórias.')
      return
    }
    if ((values.password ?? '').length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }
    if (values.password !== values.confirmar_senha) {
      setError('As senhas não coincidem.')
      return
    }

    // Documents are stored digits-only; everything else is sent as typed.
    const payload: Record<string, string> = { tipo_usuario: profile.id }
    for (const section of profile.sections) {
      for (const field of section.fields) {
        if (field.name === 'password' || field.name === 'confirmar_senha') continue
        const raw = (values[field.name] ?? '').trim()
        if (!raw) continue
        payload[field.name] = field.mask === 'cpf' || field.mask === 'cnpj' ? onlyDigits(raw) : raw
      }
    }

    setLoading(true)
    try {
      // The e-mail doubles as `username`: it is the only unique identifier we can trust.
      const res = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: payload.email,
          email: payload.email,
          password: values.password,
          ...payload,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const message =
          data.error?.message === 'An error occurred during account creation'
            ? 'Este e-mail já está cadastrado.'
            : data.error?.message || 'Erro ao cadastrar conta'
        throw new Error(message)
      }

      // Belt and braces: the register controller may drop attributes it does not expect,
      // so the same payload goes through the user update while the fresh JWT is valid.
      if (data.jwt && data.user) {
        const userId = data.user.documentId || data.user.id
        try {
          await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.jwt}`,
            },
            body: JSON.stringify(payload),
          })
        } catch {
          // Secondary write only — registration itself already succeeded.
        }
      }

      if (!data.jwt) {
        setSuccess(
          'Conta criada com sucesso! Enviamos um link mágico de confirmação para o seu e-mail. Por favor, acesse sua caixa de entrada para ativar sua conta antes de fazer o login!',
        )
        setValues({})
        setConsents(Object.fromEntries(profile.consents.map((consent) => [consent.name, false])))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // Miro board 21/09/26: registration hands the visitor to the login screen.
        router.push('/login')
      }
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  const consentStep = profile.sections.length + 1

  if (success) {
    return (
      <div className="force-light min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7fafe] to-white px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-[0_6px_24px_rgba(15,23,42,0.08)]">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Cadastro enviado!</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{success}</p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-xl bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-secondary/90"
          >
            Ir para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="force-light min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7fafe] to-white">
      <RegisterBanner profile={profile} />

      <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-5xl space-y-5 px-4 pb-16 sm:px-6">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {profile.sections.map((section) => (
          <section
            key={section.step}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] sm:p-7"
          >
            <header className="mb-5 flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-lg font-bold text-white">
                {section.step}
              </span>
              <h2 className="text-base font-extrabold uppercase tracking-wide text-primary sm:text-xl">
                {section.title}
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {section.fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={values[field.name] ?? ''}
                  onChange={setField}
                  onCepLookup={lookupCep}
                  cepLoading={cepLoading}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] sm:p-7">
          <header className="mb-5 flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-lg font-bold text-white">
              {consentStep}
            </span>
            <h2 className="text-base font-extrabold uppercase tracking-wide text-primary sm:text-xl">
              Confirmações e autorizações
            </h2>
          </header>

          <ul className="space-y-3">
            {profile.consents.map((consent) => (
              <li key={consent.name}>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <input
                    type="checkbox"
                    checked={consents[consent.name] ?? false}
                    onChange={(event) =>
                      setConsents((prev) => ({ ...prev, [consent.name]: event.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-secondary focus:ring-secondary"
                  />
                  <span>
                    {consent.parts.map((part, index) =>
                      typeof part === 'string' ? (
                        <span key={`${consent.name}-${index}`}>{part}</span>
                      ) : (
                        <Link
                          key={`${consent.name}-${index}`}
                          href={part.href}
                          className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                        >
                          {part.label}
                        </Link>
                      ),
                    )}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-secondary/25 transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlusIcon className="h-6 w-6" />
          {loading ? 'Enviando...' : profile.submitLabel}
        </button>

        <p className="text-center text-xs leading-relaxed text-slate-500">{profile.footerNote}</p>

        <p className="text-center text-sm text-slate-500">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-semibold text-slate-900 hover:text-secondary">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}

const AUTOCOMPLETE: Record<string, string> = {
  nome_completo: 'name',
  representante_nome: 'name',
  email: 'email',
  password: 'new-password',
  confirmar_senha: 'new-password',
  celular: 'tel',
  telefone: 'tel',
  telefone_alternativo: 'tel',
  cep: 'postal-code',
  logradouro: 'address-line1',
  numero: 'address-line2',
  complemento: 'address-line3',
  bairro: 'address-level3',
  cidade: 'address-level2',
  estado: 'address-level1',
  data_nascimento: 'bday',
  representante_data_nascimento: 'bday',
  data_fundacao: 'bday',
  site: 'url',
}

function Field({
  field,
  value,
  onChange,
  onCepLookup,
  cepLoading,
  showPassword,
  onTogglePassword,
}: {
  field: RegisterField
  value: string
  onChange: (name: string, value: string) => void
  onCepLookup: (cep: string) => void
  cepLoading: boolean
  showPassword: boolean
  onTogglePassword: () => void
}) {
  const Icon = field.icon ? FIELD_ICONS[field.icon] : null
  const isPassword = field.type === 'password'
  const isCep = field.mask === 'cep'
  const isSelect = field.type === 'select'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : (field.type ?? 'text')
  const spanClass = SPAN_CLASSES[field.span ?? 3] ?? SPAN_CLASSES[3]
  const inputClasses = [
    'w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 text-sm font-medium text-slate-900',
    'shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none',
    'focus:ring-2 focus:ring-primary/20',
    isPassword ? 'pr-11' : isCep ? 'pr-12' : isSelect ? 'pr-9' : 'pr-3',
  ].join(' ')

  return (
    <div className={spanClass}>
      <label htmlFor={field.name} className="mb-1 block text-sm font-semibold text-slate-800">
        {field.label}
        {field.required && <span className="ml-1 text-secondary">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </span>
        )}

        {isSelect ? (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            value={value}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={`${inputClasses} appearance-none ${value ? 'text-slate-900' : 'text-slate-400'}`}
          >
            <option value="">{field.placeholder ?? 'Selecione'}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={inputType}
            required={field.required}
            value={value}
            placeholder={field.placeholder}
            onChange={(event) => onChange(field.name, event.target.value)}
            onBlur={isCep ? () => onCepLookup(value) : undefined}
            inputMode={field.mask === 'phone' ? 'tel' : field.mask ? 'numeric' : undefined}
            autoComplete={AUTOCOMPLETE[field.name] ?? 'off'}
            className={inputClasses}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}

        {isCep && (
          <button
            type="button"
            onClick={() => onCepLookup(value)}
            disabled={cepLoading}
            aria-label="Buscar endereço pelo CEP"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * The photo panel's slanted edge. The orange seam uses the *same* shape, so the two can never
 * drift apart.
 */
const WEDGE_CLIP = 'polygon(16% 0, 100% 0, 100% 100%, 0 100%)'

function RegisterBanner({ profile }: { profile: RegisterProfile }) {
  const { eyebrow, titleLead, titleAccent, subtitle, image, imageAlt, imagePosition } = profile.banner

  return (
    <header className="relative isolate overflow-hidden bg-white">
      {/*
        The orange band is the same slanted shape as the photo, pushed 28px to the left with
        `-translate-x-7` and painted first — so only a constant-width sliver of it shows along the
        diagonal, behind the photo. That is deliberate: the accent half of the title is orange too,
        and a solid orange stripe crossing the text column made those letters vanish
        ("Propr_etário", "Imob_liária"). Never let this shape reach the text column.
      */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <span aria-hidden className="absolute inset-0 -translate-x-7 bg-secondary" style={{ clipPath: WEDGE_CLIP }} />
        <div className="absolute inset-0" style={{ clipPath: WEDGE_CLIP }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="42vw"
            className="object-cover"
            style={{ objectPosition: imagePosition ?? 'center' }}
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-white via-white/25 to-transparent" />
        </div>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-20 w-36 bg-primary"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        />
      </div>

      {/* No logo here: the site Navbar already renders it, and a second one 60px below read as a
          duplicated header. */}
      <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 lg:pb-16 lg:pt-14">
        <div className="lg:max-w-[30rem]">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500 sm:text-base">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-[2.75rem]">
            {titleLead} <span className="text-secondary">{titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
        </div>
      </div>
    </header>
  )
}

