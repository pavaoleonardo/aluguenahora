'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { API_BASE_URL } from '@/lib/apiBase'

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error?.message || 'Erro ao enviar e-mail de recuperação.')
      }

      setMessage('Um e-mail de recuperação foi enviado se este e-mail estiver cadastrado.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 h-full">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Esqueceu sua senha?</h3>
              <p className="text-base font-medium text-gray-500">Insira seu endereço de e-mail para redefinir sua conta.</p>
            </div>
          </div>

          <form className="text-start w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-base font-semibold text-gray-900 mb-2">
                Endereço de email
              </label>
              <input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md py-2.5 px-4 text-gray-900 text-base font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm" 
                placeholder="Insira seu e-mail" 
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
            )}
            
            {message && (
              <div className="mb-4 text-green-600 text-sm font-medium">{message}</div>
            )}

            <div className="flex justify-between items-center mt-8">
              <Link href="/login" className="inline-flex justify-center items-center text-primary hover:text-primary-hover font-semibold transition-colors">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar para iniciar sessão
              </Link>

              <button 
                type="submit" 
                disabled={loading}
                className="relative inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
              >
                {loading ? 'Enviando...' : 'Recuperar sua senha'}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden xl:block">
          <div className="relative w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
