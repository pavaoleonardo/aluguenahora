'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  documentId?: string
  username: string
  email: string
  nome_completo?: string
  tipo_usuario?: 'corretor' | 'imobiliaria' | 'proprietario'
  creci?: string
  nome_imobiliaria?: string
  telefone?: string
  celular?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// The cookie is only a hint so the Next.js proxy can gate /dashboard on the server.
// It is NOT the credential (the JWT in localStorage is), and Strapi enforces auth on
// every API call. Secure is applied only on HTTPS so http://localhost keeps working.
function authCookie(value: string, maxAge: number) {
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
  return `token=${value}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        // Corrupted payload: drop it instead of crashing on every page load.
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        document.cookie = authCookie('', 0)
      }
    }
    setLoading(false)
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    // Also set a cookie so Next.js middleware can protect routes server-side
    document.cookie = authCookie(newToken, 2592000)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Clear the cookie too
    document.cookie = authCookie('', 0)
    router.push('/sair')
    router.refresh()
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
