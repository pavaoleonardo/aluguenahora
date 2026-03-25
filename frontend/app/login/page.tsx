'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/apiBase'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      router.push('/dashboard')
      router.refresh()
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Bem-vindo(a) ao alugue na hora!</h3>
              <p className="text-base font-medium text-gray-500">Bem-vindo de volta! Faça login para continuar.</p>
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

            <div className="mb-4">
              <label htmlFor="password" className="block text-base font-semibold text-gray-900 mb-2">
                Senha
              </label>
              <div className="flex relative shadow-sm rounded-md">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-s-md py-2.5 px-4 border border-gray-300 text-gray-900 text-base font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10" 
                  placeholder="Digite sua senha" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="inline-flex items-center justify-center py-2.5 px-4 border rounded-e-md -ms-px border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary z-20 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-x-1 gap-y-2 mb-6 mt-3">
              <div className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  id="checkbox-signin" 
                  className="h-4 w-4 text-base rounded border-gray-300 text-primary focus:ring focus:ring-primary focus:ring-offset-0" 
                />
                <label className="text-base ms-2 text-gray-500 font-medium align-middle select-none cursor-pointer" htmlFor="checkbox-signin">
                  Lembre de mim
                </label>
              </div>
              <Link href="/login" className="text-base text-gray-900 hover:text-primary font-medium transition-colors">
                <small>Esqueceu sua senha?</small>
              </Link>
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
            )}

            <div className="text-center mb-7">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
              >
                {loading ? 'Carregando...' : 'Conecte-se'}
              </button>
            </div>

            <p className="shrink text-gray-500 text-center text-lg mt-8">
              Não tem uma conta?
              <Link href="/registro" className="text-gray-900 font-semibold ms-1 hover:text-primary transition-colors">
                <b>Cadastre-se</b>
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden xl:block">
          <div className="relative w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
