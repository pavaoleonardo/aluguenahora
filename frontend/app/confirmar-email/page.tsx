'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { API_BASE_URL } from '@/lib/apiBase'

function ConfirmarEmailContent() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para o login após 4 segundos
    const timer = setTimeout(() => {
      router.push('/login')
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="max-w-lg mx-auto w-full flex flex-col justify-center items-center p-6">
      <div className="text-center mb-7 w-full">
        <Link href="/" className="inline-block mb-10 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
           <Image 
             src="/logo.svg" 
             alt="Alugue na Hora Logo" 
             width={160}
             height={60}
             className="h-12 w-auto mx-auto object-contain"
           />
        </Link>

        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">E-mail Confirmado!</h3>
            <p className="text-base font-medium text-gray-500">Sua conta foi ativada com sucesso. Redirecionando para o login...</p>
          </div>
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <Link href="/login" className="inline-flex justify-center items-center px-6 py-2.5 bg-primary hover:bg-primary-hover font-bold text-base text-white rounded-md transition-all duration-300 shadow-sm w-full">
            Ir para o Login agora
          </Link>
        </>
      </div>
    </div>
  )
}

export default function ConfirmarEmailPage() {
  return (
    <section className="h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 h-full">
        <Suspense fallback={<div className="flex flex-col justify-center items-center h-full p-6 text-gray-500">Iniciando confirmação...</div>}>
          <ConfirmarEmailContent />
        </Suspense>

        <div className="hidden xl:block">
          <div className="relative w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
