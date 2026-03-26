'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { API_BASE_URL } from '@/lib/apiBase'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function NovaSenhaForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code) {
      setError('Código inválido ou ausente. Por favor, clique no link recebido no seu e-mail para tentar novamente.')
      return
    }

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          password, 
          passwordConfirmation 
        }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error?.message || 'Erro ao redefinir a senha.')
      }

      setMessage('Sua senha foi alterada com sucesso! Redirecionando para o login...')
      
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto w-full flex flex-col justify-center items-center p-6">
      <div className="text-center mb-7 w-full">
        <Link href="/" className="inline-block mb-8 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
           <Image 
             src="/logo.svg" 
             alt="Alugue na Hora Logo" 
             width={160}
             height={60}
             className="h-12 w-auto mx-auto object-contain"
           />
        </Link>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Bem-vindo(a) ao alugue na hora.</h3>
          <p className="text-base font-medium text-gray-500">Alterar a senha e confirmar a senha</p>
        </div>
      </div>

      <form className="text-start w-full space-y-4" onSubmit={handleSubmit}>
        {/* Nova Senha */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1">Nova Senha</label>
          <div className="flex relative shadow-sm rounded-md">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-s-md py-2.5 px-3 border border-gray-300 text-gray-900 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10" 
              placeholder="Digite sua senha" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
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

        {/* Confirmar nova senha */}
        <div>
          <label htmlFor="passwordConfirmation" className="block text-sm font-semibold text-gray-900 mb-1">Confirmar nova senha</label>
          <div className="flex relative shadow-sm rounded-md">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              id="passwordConfirmation" 
              required
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="block w-full rounded-s-md py-2.5 px-3 border border-gray-300 text-gray-900 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10" 
              placeholder="Digite sua senha de confirmação" 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="inline-flex items-center justify-center py-2 px-3 border rounded-e-md -ms-px border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary z-20 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 text-red-500 text-sm font-medium">{error}</div>
        )}
        
        {message && (
          <div className="mt-4 text-green-600 text-sm font-medium">{message}</div>
        )}

        <div className="text-center mt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Processando...' : 'Alterar a senha'}
          </button>
        </div>
        
        {!code && !error && !message && (
          <div className="mt-6 p-4 rounded bg-yellow-50 text-yellow-800 text-sm border border-yellow-200">
            Aviso: Esta página necessita do código de segurança recebido no seu e-mail para funcionar.
          </div>
        )}
      </form>
    </div>
  )
}

export default function NovaSenhaPage() {
  return (
    <section className="min-h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 min-h-screen">
        <Suspense fallback={<div className="flex flex-col items-center justify-center h-full p-6 text-gray-500">Carregando processo de recuperação...</div>}>
          <NovaSenhaForm />
        </Suspense>

        <div className="hidden xl:block">
          <div className="sticky top-0 w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
