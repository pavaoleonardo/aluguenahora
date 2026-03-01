'use client'

import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MaintenanceOverlay() {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // If auth is still loading or component hasn't mounted, render nothing
  if (loading || !mounted) return null

  // If user is logged in (you or Jackson), hide the maintenance screen!
  if (user) return null

  // If user is trying to access the login page, let them through
  // so you can actually login to bypass this!
  if (pathname.startsWith('/login')) return null

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white p-6 backdrop-blur-md">
      {/* Animated gradient background mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary blur-[150px] rounded-full mix-blend-screen animate-blob" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary blur-[150px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 mb-8 ring-4 ring-white/5 shadow-inner">
          <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
          Site em<br />
          <span className="text-primary transparent">Construção</span>
        </h1>
        
        <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
          Estamos preparando uma plataforma incrível para você encontrar e anunciar seu imóvel com facilidade.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-semibold text-white">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          Voltamos em breve
        </div>
      </div>
    </div>
  )
}
