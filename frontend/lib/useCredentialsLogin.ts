'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/apiBase'
import { translateError } from '@/lib/errorTranslations'

type CredentialsLoginOptions = {
  /** Where to navigate after a successful sign-in. */
  redirectTo?: string
  /** Runs once the session is stored and before the navigation (e.g. close a modal). */
  onSuccess?: () => void
}

/**
 * Single source of the e-mail/password sign-in flow.
 * Shared by the /login page and the ENTRAR LoginModal so the two can never drift apart.
 * The caller owns the markup; this hook owns the request, the session and the errors.
 */
export function useCredentialsLogin({
  redirectTo = '/dashboard',
  onSuccess,
}: CredentialsLoginOptions = {}) {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((visible) => !visible)
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
      onSuccess?.()
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    loading,
    handleSubmit,
  }
}
