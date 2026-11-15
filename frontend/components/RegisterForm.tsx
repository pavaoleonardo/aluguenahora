'use client'

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent as ReactClipboardEvent,
  type FormEvent,
} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  HomeIcon,
  IdentificationIcon,
  InformationCircleIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserGroupIcon,
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

/**
 * Client spec (AlugueNaHora.pdf, p8 — "4. Senha segura?"): at least 8 characters with
 * an uppercase letter, a lowercase letter, a number and a special character. The error
 * message is the client's wording, verbatim.
 */
const PASSWORD_RULE = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[^\p{L}\d]).{8,}$/u

function validatePassword(password: string): string | null {
  if (!password) return 'Informe uma senha.'
  if (!PASSWORD_RULE.test(password)) {
    return 'A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial'
  }
  return null
}

/**
 * Miro board 11/11/2026, "Exemplos de Validações": the messages live **under the field** that
 * failed, not only in the banner at the top. Wording is the client's, verbatim.
 */
/* "(11 números)", not "(11 dígitos)": that is the wording the board's CPF example prints. */
const CPF_MESSAGE = 'Informe um CPF válido (11 números).'
const CPF_INVALID_MESSAGE = 'Informe um CPF válido.'
const CNPJ_MESSAGE = 'Informe um CNPJ válido (14 números).'
const CNPJ_INVALID_MESSAGE = 'Informe um CNPJ válido.'
const REQUIRED_MESSAGE = 'Campo obrigatório.'
const PASSWORD_MISMATCH_MESSAGE = 'As senhas não coincidem.'

/*
 * The board's own invalid example is `123.456.789-00` — **eleven digits**, still marked invalid.
 * A length check alone therefore does not implement the client's validation, so the mod-11 check
 * digits are verified here (Receita Federal algorithm, same one used by every Brazilian form).
 * CNPJ gets the same treatment: `/registro/imobiliaria` collects it.
 */
function isValidCpf(digits: string): boolean {
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false
  const checkDigit = (length: number) => {
    let sum = 0
    for (let i = 0; i < length; i += 1) sum += Number(digits[i]) * (length + 1 - i)
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }
  return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10])
}

const CNPJ_WEIGHTS: [number[], number[]] = [
  [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
]

function isValidCnpj(digits: string): boolean {
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false
  const checkDigit = (weights: number[]) => {
    const sum = weights.reduce((total, weight, index) => total + Number(digits[index]) * weight, 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }
  return checkDigit(CNPJ_WEIGHTS[0]) === Number(digits[12]) && checkDigit(CNPJ_WEIGHTS[1]) === Number(digits[13])
}

/** Length first (the client's wording), then the check digits. `null` means "nothing to report". */
function maskError(field: RegisterField, raw: string): string | null {
  const digits = onlyDigits(raw)
  if (field.mask === 'cpf') {
    if (digits.length !== 11) return CPF_MESSAGE
    if (!isValidCpf(digits)) return CPF_INVALID_MESSAGE
  }
  if (field.mask === 'cnpj') {
    if (digits.length !== 14) return CNPJ_MESSAGE
    if (!isValidCnpj(digits)) return CNPJ_INVALID_MESSAGE
  }
  return null
}

/** "Controle de caracteres no campo de texto" — one cap for every free-text input. */
const MAX_FIELD_LENGTH = 160

export default function RegisterForm({ profile }: { profile: RegisterProfile }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [consents, setConsents] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(profile.consents.map((consent) => [consent.name, false])),
  )
  const [showPassword, setShowPassword] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [emailTaken, setEmailTaken] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pendingConfirmation, setPendingConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  /*
   * Mobile accordion: the board's phone mock shows the five sections as collapsible rows with
   * chevrons. Section 1 starts open so a phone does not land on a form with nothing to fill;
   * desktop ignores this state entirely (every body carries `lg:block`).
   */
  const [openSections, setOpenSections] = useState<number[]>(() => [1])

  const toggleSection = (step: number) =>
    setOpenSections((prev) => (prev.includes(step) ? prev.filter((value) => value !== step) : [...prev, step]))

  const fieldsByName = useMemo(() => {
    const map: Record<string, RegisterField> = {}
    for (const section of profile.sections) {
      for (const field of section.fields) map[field.name] = field
    }
    return map
  }, [profile.sections])

  /** Field name -> its section step, so a failed submit can open the collapsed block it lives in. */
  const stepByField = useMemo(() => {
    const map: Record<string, number> = {}
    for (const section of profile.sections) {
      for (const field of section.fields) map[field.name] = section.step
    }
    return map
  }, [profile.sections])

  /**
   * Fields the visitor has already left at least once. From that moment on they re-check on every
   * keystroke — the board's "Exibir mensagens de validação em tempo real".
   */
  const touched = useRef<Set<string>>(new Set())

  /**
   * One field's message from an **explicit** value snapshot: reading `values` from the closure
   * would lag one keystroke behind when called from `setField`. `null` = nothing to report, and
   * empty fields stay silent outside submit on purpose — otherwise tabbing through the form on a
   * phone paints every field red.
   */
  const fieldMessage = useCallback(
    (name: string, raw: string, snapshot: Record<string, string>): string | null => {
      const field = fieldsByName[name]
      if (!field) return null
      const value = raw.trim()
      if (!value) return null
      if (field.type === 'password') {
        if (name === 'confirmar_senha') {
          return snapshot.password !== snapshot.confirmar_senha ? PASSWORD_MISMATCH_MESSAGE : null
        }
        return validatePassword(value)
      }
      return maskError(field, value)
    },
    [fieldsByName],
  )

  const setField = (name: string, value: string) => {
    const field = fieldsByName[name]
    const nextValue = field ? applyMask(field, value) : value
    const snapshot = { ...values, [name]: nextValue }
    setValues(snapshot)

    /*
     * Real-time validation, part two: once a field has been left, every keystroke re-evaluates it,
     * so a wrong value stops being wrong the instant it is corrected (and vice versa). Fields the
     * visitor has not reached yet are only cleared, never newly marked.
     */
    const updates: Record<string, string | null> = {
      [name]: touched.current.has(name) ? fieldMessage(name, nextValue, snapshot) : null,
    }
    // The two password fields depend on each other: fixing one re-checks the other.
    if (name === 'password' && touched.current.has('confirmar_senha')) {
      updates.confirmar_senha = fieldMessage('confirmar_senha', snapshot.confirmar_senha ?? '', snapshot)
    }
    if (name === 'confirmar_senha' && touched.current.has('password')) {
      updates.password = fieldMessage('password', snapshot.password ?? '', snapshot)
    }

    setFieldErrors((prev) => {
      let changed = false
      const updated = { ...prev }
      for (const [key, message] of Object.entries(updates)) {
        if (message) {
          if (updated[key] !== message) {
            updated[key] = message
            changed = true
          }
        } else if (updated[key]) {
          delete updated[key]
          changed = true
        }
      }
      return changed ? updated : prev
    })
  }

  /*
   * Live validation (board `11/11/2026`, *Exemplos de Validações*): leaving a field that has
   * something in it prints the message immediately, without waiting for the button.
   */
  const validateOnBlur = (name: string) => {
    touched.current.add(name)
    const message = fieldMessage(name, values[name] ?? '', values)
    setFieldErrors((prev) => {
      if (message) return prev[name] === message ? prev : { ...prev, [name]: message }
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
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

  /*
   * Miro board 11/11/2026, "Exemplos de Validações" → the third example is the *positive* one:
   * a green "Senhas iguais." tick once the password meets the rule and both fields agree. It is
   * evaluated while typing, so the visitor sees the form react before pressing the button.
   */
  const passwordsSecure =
    Boolean(values.password) &&
    !validatePassword(values.password ?? '') &&
    values.password === values.confirmar_senha

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setFieldErrors({})
    setEmailTaken(false)

    const missingConsent = profile.consents.find((consent) => consent.required && !consents[consent.name])

    /*
     * Field-level validation (Miro board 11/11/2026, "Exemplos de Validações"): the message is
     * printed under the failing field, the field is marked and **what was typed is kept** — the
     * client asked for exactly that in the PDF ("marcar o campo e manter os dados digitados").
     * The form is `noValidate`, so this runs before the browser's native bubbles and every
     * message below is the client's Portuguese wording.
     */
    const nextFieldErrors: Record<string, string> = {}
    for (const section of profile.sections) {
      for (const field of section.fields) {
        if (field.type === 'password') continue // the two password fields are checked below
        const raw = (values[field.name] ?? '').trim()
        if (field.required && !raw) nextFieldErrors[field.name] = REQUIRED_MESSAGE
        else if (raw) {
          const maskProblem = maskError(field, raw)
          if (maskProblem) nextFieldErrors[field.name] = maskProblem
        }
      }
    }
    const passwordProblem = validatePassword(values.password ?? '')
    if (passwordProblem) nextFieldErrors.password = passwordProblem
    if (values.password !== values.confirmar_senha) {
      nextFieldErrors.confirmar_senha = PASSWORD_MISMATCH_MESSAGE
    }
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      const firstInvalid = profile.sections
        .flatMap((section) => section.fields)
        .find((field) => nextFieldErrors[field.name])
      if (firstInvalid) {
        // Same reason: the failing field may be inside a collapsed mobile section.
        const step = stepByField[firstInvalid.name]
        if (step) setOpenSections((prev) => (prev.includes(step) ? prev : [...prev, step]))
        window.requestAnimationFrame(() => {
          document.getElementById(firstInvalid.name)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        })
      }
      return
    }

    if (missingConsent) {
      // The consent block is a collapsible section on a phone: open it, or the message has nowhere to land.
      setOpenSections((prev) => (prev.includes(consentStep) ? prev : [...prev, consentStep]))
      setError('Você deve aceitar todas as declarações obrigatórias.')
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
        const duplicate = data.error?.message === 'An error occurred during account creation'
        if (duplicate) setEmailTaken(true)
        const message = duplicate
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

      /*
       * Miro board 11/11/2026 ("Tela de Sucesso (após o envio)"): the flow ends on this screen —
       * no redirect to /login. Clearing the form is the board's "Limpar os campos após envio";
       * `pendingConfirmation` only covers the Strapi setup that also requires e-mail confirmation.
       */
      setPendingConfirmation(!data.jwt)
      setSuccess(true)
      setValues({})
      setConsents(Object.fromEntries(profile.consents.map((consent) => [consent.name, false])))
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
          {/* Verbatim from the Miro board 11/11/2026, "Tela de Sucesso (após o envio)" —
              "Inserir esse texto ao final do cadastro". */}
          <h1 className="text-xl font-bold text-slate-900">Cadastro recebido!</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Suas informações foram enviadas para análise.
          </p>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-primary/5 px-4 py-3 text-left text-sm leading-relaxed text-slate-600">
            <InformationCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Nossa equipe entrará em contato em até 24 horas.</span>
          </p>
          {pendingConfirmation && (
            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
              Enviamos um link de confirmação para o seu e-mail. Ative a conta antes de fazer o login.
            </p>
          )}
          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-secondary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="force-light min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7fafe] to-white">
      <RegisterBanner profile={profile} />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-6 w-full max-w-5xl space-y-5 px-4 pb-16 sm:px-6"
      >
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
            {emailTaken && (
              <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                <Link href="/login" className="font-bold underline underline-offset-2 hover:no-underline">
                  Já tenho conta
                </Link>
                <Link href="/esqueci-senha" className="font-bold underline underline-offset-2 hover:no-underline">
                  Recuperar senha
                </Link>
              </p>
            )}
          </div>
        )}

        {/*
          Board 11/11/2026 desktop mock: three reassurance cards sit beside the personal-data block.
          Copy verbatim, except the board's "Sua informações" — an obvious typo, rendered as "Suas".
        */}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheckIcon,
              title: 'Cadastro seguro',
              text: 'Seus dados são tratados com segurança.',
            },
            {
              icon: LockClosedIcon,
              title: 'Dados protegidos',
              text: 'Suas informações não são compartilhadas.',
            },
            {
              icon: UserGroupIcon,
              title: 'Análise pela equipe',
              text: 'Seu cadastro será avaliado por nossa equipe.',
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/5">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-primary">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {profile.sections.map((section) => {
          const isOpen = openSections.includes(section.step)
          const bodyId = `section-${section.step}`
          return (
            <section
              key={section.step}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] sm:p-7"
            >
              {/*
                Board 11/11/2026: `01 Dados Pessoais` — a small orange number beside the title, and on
                the phone each block is a collapsible row with a chevron (that is the phone mock). The
                desktop mock shows every section open, so the collapsed body carries `lg:block` and the
                toggle simply cannot hide anything on a wide screen.
              */}
              <header className={isOpen ? 'mb-5' : 'lg:mb-5'}>
                <h2>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.step)}
                    aria-expanded={isOpen}
                    aria-controls={bodyId}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <span className="text-sm font-extrabold tracking-[0.08em] text-secondary">
                      {String(section.step).padStart(2, '0')}
                    </span>
                    <span className="text-base font-extrabold text-primary sm:text-lg">{section.title}</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={`ml-auto h-5 w-5 shrink-0 text-slate-400 transition-transform lg:hidden ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h2>
              </header>

              <div id={bodyId} className={isOpen ? 'block' : 'hidden lg:block'}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {section.fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={values[field.name] ?? ''}
                  error={fieldErrors[field.name]}
                  onChange={setField}
                  onFieldBlur={validateOnBlur}
                  onCepLookup={lookupCep}
                  cepLoading={cepLoading}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                />
              ))}
                </div>

                {section.fields.some((field) => field.type === 'password') && (
                  <div className="mt-4 space-y-2">
                    {/* The board puts this tip behind an ⓘ, not a padlock. */}
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      <InformationCircleIcon
                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                        aria-hidden="true"
                      />
                      <span>Use uma senha longa e exclusiva. Recomendamos pelo menos 15 caracteres.</span>
                    </p>
                    {/* Board's third example, the positive one: green check + "Senhas iguais." */}
                    {passwordsSecure && (
                      <p
                        role="status"
                        className="flex items-center gap-2 text-xs font-bold text-emerald-600 sm:text-sm"
                      >
                        <CheckCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        Senhas iguais.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
          )
        })}

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] sm:p-7">
          <header className={openSections.includes(consentStep) ? 'mb-5' : 'lg:mb-5'}>
            <h2>
              <button
                type="button"
                onClick={() => toggleSection(consentStep)}
                aria-expanded={openSections.includes(consentStep)}
                aria-controls={`section-${consentStep}`}
                className="flex w-full items-center gap-3 text-left"
              >
                <span className="text-sm font-extrabold tracking-[0.08em] text-secondary">
                  {String(consentStep).padStart(2, '0')}
                </span>
                <span className="text-base font-extrabold text-primary sm:text-lg">Confirmações</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className={`ml-auto h-5 w-5 shrink-0 text-slate-400 transition-transform lg:hidden ${
                    openSections.includes(consentStep) ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h2>
          </header>

          <div
            id={`section-${consentStep}`}
            className={openSections.includes(consentStep) ? 'block' : 'hidden lg:block'}
          >
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
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-secondary/25 transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlusIcon className="h-6 w-6" />
          {loading ? 'Enviando...' : profile.submitLabel}
        </button>

        {/* Board: the 24-hour note sits behind an ⓘ inside a soft box, under the button. */}
        <p className="flex items-start justify-center gap-2 rounded-xl bg-primary/5 px-4 py-3 text-xs leading-relaxed text-slate-600">
          <InformationCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{profile.footerNote}</span>
        </p>

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
  error,
  onChange,
  onFieldBlur,
  onCepLookup,
  cepLoading,
  showPassword,
  onTogglePassword,
}: {
  field: RegisterField
  value: string
  error?: string
  onChange: (name: string, value: string) => void
  onFieldBlur: (name: string) => void
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
    /*
     * `text-base` on phones, `text-sm` from `sm` up: iOS Safari zooms the whole page when a
     * focused input is smaller than 16px, which reads as "the form is not responsive on mobile".
     */
    'w-full rounded-lg border bg-white py-3 pl-11 text-base font-medium text-slate-900 sm:text-sm',
    'shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2',
    error
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-slate-200 focus:border-primary focus:ring-primary/20',
    isPassword ? 'pr-11' : isCep ? 'pr-12' : isSelect ? 'pr-9' : 'pr-3',
  ].join(' ')
  const errorId = `${field.name}-error`
  /*
   * Miro board 11/11/2026, "Observações para o programador": "Impedir copiar e colar o texto do
   * campo". Applied to the two password fields only — blocking paste on CPF/phone would force
   * people to retype numbers a second time. Remove this block if the client meant every field.
   */
  const noClipboard = isPassword
    ? {
        onPaste: (event: ReactClipboardEvent<HTMLInputElement>) => event.preventDefault(),
        onCopy: (event: ReactClipboardEvent<HTMLInputElement>) => event.preventDefault(),
        onCut: (event: ReactClipboardEvent<HTMLInputElement>) => event.preventDefault(),
      }
    : {}

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
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`${inputClasses} appearance-none ${value ? 'text-slate-900' : 'text-slate-400'}`}
            onBlur={() => onFieldBlur(field.name)}
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
            maxLength={MAX_FIELD_LENGTH}
            onChange={(event) => onChange(field.name, event.target.value)}
            onBlur={() => {
              onFieldBlur(field.name)
              if (isCep) onCepLookup(value)
            }}
            inputMode={field.mask === 'phone' ? 'tel' : field.mask ? 'numeric' : undefined}
            autoComplete={AUTOCOMPLETE[field.name] ?? 'off'}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={inputClasses}
            {...noClipboard}
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
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      ) : isCep ? (
        /* Board 11/11/2026, green arrow #3: the hint sits under the CEP field itself. */
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
          Digite o CEP para preencher o endereço automaticamente.
        </p>
      ) : null}
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
          {/* Miro board 11/11/2026 — the green arrow under the title ("fazer as inclusões nas setas
              verde") points at this line, and the mobile mock carries it too. */}
          <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
            <InformationCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <span>
              Os campos com <span className="font-bold text-secondary">*</span> são obrigatórios. Leva apenas
              alguns minutos.
            </span>
          </p>
        </div>
      </div>
    </header>
  )
}

