'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/apiBase'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { translateError } from '@/lib/errorTranslations'

export default function RegisterProprietarioPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    celular: '',
    email: '',
    password: '',
    termos: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Real-time phone mask: (XX) XXXX-XXXX or (XX) XXXXX-XXXX
  const applyPhoneMask = (val: string) => {
    let digits = val.replace(/\D/g, '')
    if (digits.length === 0) return ''
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    
    // Apply phone mask in real-time
    if (name === 'telefone' || name === 'celular') {
      setFormData(prev => ({
        ...prev,
        [name]: applyPhoneMask(value)
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.termos) {
      setError('Você deve aceitar os Termos e Condições.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // 1. Cadastro: Usamos o e-mail como username para evitar conflitos de nomes iguais
      const res = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: formData.email, 
          email: formData.email, 
          password: formData.password,
          nome_completo: formData.nomeCompleto,
          telefone: formData.telefone,
          celular: formData.celular,
          tipo_usuario: 'proprietario',
          role: 'Authenticated'
        }),
      })
      
      let data = await res.json()
      
      if (!res.ok) {
        const errorMsg = data.error?.message === 'An error occurred during account creation' 
          ? 'Este e-mail já está cadastrado.' 
          : (data.error?.message || 'Erro ao cadastrar conta')
        throw new Error(errorMsg)
      }

      // 2. Se o cadastro for ok e retornar jwt, atualizamos os campos customizados
      if (data.jwt && data.user) {
        const updateUserId = data.user.documentId || data.user.id;
        try {
          const updateRes = await fetch(`${API_BASE_URL}/api/users/${updateUserId}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.jwt}`
            },
            body: JSON.stringify({ 
              telefone: formData.telefone,
              celular: formData.celular
            }),
          });
          
          if (updateRes.ok) {
            const updatedUser = await updateRes.json();
            data.user = updatedUser; // Update our local user obj
          }
        } catch (updateErr) {
          console.error("Não foi possível atualizar telefone:", updateErr);
        }
      }

      if (!data.jwt) {
        setSuccess('Conta criada com sucesso! Enviamos um link mágico de confirmação para o seu e-mail. Por favor, acesse sua caixa de entrada para ativar sua conta antes de fazer o login!')
        setFormData({
          nomeCompleto: '', telefone: '', celular: '', email: '', password: '', termos: false
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        login(data.jwt, data.user)
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(translateError(err.message))
    } finally {
      setLoading(false)
    }
  }

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

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Crie uma conta Proprietário(a)</h3>
              <p className="text-sm font-medium text-gray-500">Bem-vindo(a) ao alugue na hora!</p>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-md bg-green-50 text-green-800 text-sm font-medium border border-green-200">
              {success}
            </div>
          )}

          <form className="text-start w-full space-y-4" onSubmit={handleSubmit}>
            {/* 1. Nome completo */}
            <div>
              <label htmlFor="nomeCompleto" className="block text-sm font-semibold text-gray-900 mb-1">Nome completo</label>
              <input 
                id="nomeCompleto" name="nomeCompleto" type="text" required
                value={formData.nomeCompleto} onChange={handleChange}
                className="block w-full rounded-md py-2 px-3 text-gray-900 text-sm font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm" 
                placeholder="Insira seu nome completo" 
              />
            </div>

            {/* 2. Telefone and 3. Celular row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="telefone" className="block text-sm font-semibold text-gray-900 mb-1">Telefone (Fixo)</label>
                <input 
                  id="telefone" name="telefone" type="text"
                  value={formData.telefone} onChange={handleChange}
                  className="block w-full rounded-md py-2 px-3 text-gray-900 text-sm font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm" 
                  placeholder="(00) 0000-0000" 
                />
              </div>
              <div>
                <label htmlFor="celular" className="block text-sm font-semibold text-gray-900 mb-1">Celular / WhatsApp</label>
                <input 
                  id="celular" name="celular" type="text" required
                  value={formData.celular} onChange={handleChange}
                  className="block w-full rounded-md py-2 px-3 text-gray-900 text-sm font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm" 
                  placeholder="(00) 00000-0000" 
                />
              </div>
            </div>

            {/* 4. Endereço de e-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">Endereço de e-mail</label>
              <input 
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
                className="block w-full rounded-md py-2 px-3 text-gray-900 text-sm font-medium border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 shadow-sm" 
                placeholder="Insira seu e-mail" 
              />
            </div>

            {/* 5. Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1">Senha</label>
              <div className="flex relative shadow-sm rounded-md">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" name="password" required
                  value={formData.password} onChange={handleChange}
                  className="block w-full rounded-s-md py-2 px-3 border border-gray-300 text-gray-900 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 z-10" 
                  placeholder="Crie sua senha" 
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

            {/* 6. Termos e Condições */}
            <div className="flex items-start mt-4 mb-6">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="termos" name="termos" required
                  checked={formData.termos} onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termos" className="font-medium text-gray-500 cursor-pointer">
                  Eu concordo com os <Link href="/termos" className="text-primary hover:underline">Termos e Condições</Link>
                </label>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
            )}

            <div className="text-center mt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 disabled:opacity-50 shadow-sm"
              >
                {loading ? 'Cadastrando...' : 'Criar Conta e Continuar'}
              </button>
            </div>

            <p className="shrink text-gray-500 text-center text-sm md:text-base mt-8">
              Já tem uma conta?
              <Link href="/login" className="text-gray-900 font-semibold ms-1 hover:text-primary transition-colors">
                <b>Entrar</b>
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden xl:block">
          {/* We keep the same image layout style for consistency */}
          <div className="sticky top-0 w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
