'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {
  BuildingOffice2Icon,
  EyeIcon,
  EyeSlashIcon,
  HomeModernIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/apiBase'
import { translateError } from '@/lib/errorTranslations'
import { USER_PROFILES, type UserProfileId } from '@/lib/userProfiles'

const PROFILE_ICONS: Record<UserProfileId, typeof HomeModernIcon> = {
  proprietario: HomeModernIcon,
  corretor: BuildingOffice2Icon,
}

/**
 * ENTRAR window (Miro board 21/09/26 RETOMADA).
 * Step 1: the visitor picks a profile (Proprietário / Corretor-Imobiliária).
 * Step 2: the credentials form, which is what actually authenticates.
 * The chosen profile is kept in state but does not change the destination yet
 * (decision: "leave it for now" — post-login routing still goes to /dashboard).
 */
export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const { login } = useAuth()
  const [profile, setProfile] = useState<UserProfileId | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setProfile(null)
    setEmail('')
    setPassword('')
    setShowPassword(false)
    setError('')
    setLoading(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error?.message || 'Erro ao entrar')
      }

      login(data.jwt, data.user)
      handleClose()
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  const selectedProfile = USER_PROFILES.find((option) => option.id === profile)

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-[70]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-200 data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-[70] flex min-h-full items-center justify-center overflow-y-auto p-4">
        <DialogPanel
          transition
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 transition duration-200 data-[closed]:scale-95 data-[closed]:opacity-0 sm:p-8"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <span className="sr-only">Fechar</span>
            <XMarkIcon aria-hidden="true" className="size-5" />
          </button>

          {selectedProfile === undefined ? (
            <>
              <DialogTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
                Entrar no alugue na hora
              </DialogTitle>
              <p className="mt-2 text-center text-base font-medium text-gray-500">
                Escolha seu perfil para continuar
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {USER_PROFILES.map((option) => {
                  const Icon = PROFILE_ICONS[option.id]
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setProfile(option.id)}
                      className="group flex w-full items-center gap-4 rounded-xl border-2 border-gray-200 p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
                    >
                      <span className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon aria-hidden="true" className="size-6 text-primary" />
                      </span>
                      <span>
                        <span className="block text-base font-bold text-gray-900 transition-colors group-hover:text-primary">
                          {option.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500">{option.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 text-center text-base text-gray-500">
                Ainda não tem uma conta?{' '}
                <Link
                  href="/registro"
                  onClick={handleClose}
                  className="font-semibold text-gray-900 transition-colors hover:text-primary"
                >
                  Cadastre-se
                </Link>
              </p>
            </>
          ) : (
            <>
              <DialogTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
                Bem-vindo(a) ao alugue na hora!
              </DialogTitle>
              <p className="mt-2 text-center text-base font-medium text-gray-500">
                Entre como <span className="font-semibold text-gray-700">{selectedProfile.title}</span> para continuar.
              </p>

              <form className="mt-6 text-start" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="modal-email" className="mb-2 block text-base font-semibold text-gray-900">
                    Endereço de email
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2.5 px-4 text-base font-medium text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Insira seu e-mail"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="modal-password" className="mb-2 block text-base font-semibold text-gray-900">
                    Senha
                  </label>
                  <div className="relative flex rounded-md shadow-sm">
                    <input
                      id="modal-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="z-10 block w-full rounded-s-md border border-gray-300 py-2.5 px-4 text-base font-medium text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="-ms-px z-20 inline-flex items-center justify-center rounded-e-md border border-gray-300 bg-white py-2.5 px-4 transition-colors hover:bg-gray-50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-6 mt-3 text-right">
                  <Link
                    href="/esqueci-senha"
                    onClick={handleClose}
                    className="text-base font-medium text-gray-900 transition-colors hover:text-primary"
                  >
                    <small>Esqueceu sua senha?</small>
                  </Link>
                </div>

                {error && <div className="mb-4 text-sm font-medium text-red-500">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-2.5 text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Carregando...' : 'Conecte-se'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setProfile(null)
                  setError('')
                }}
                className="mt-5 w-full text-center text-sm font-semibold text-gray-500 transition-colors hover:text-primary cursor-pointer"
              >
                ← Trocar perfil
              </button>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}