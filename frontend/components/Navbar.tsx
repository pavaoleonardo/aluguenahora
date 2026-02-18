'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Buscar Imóveis', href: '/imoveis' },
  { name: 'Anunciar Imóveis', href: '/dashboard/novo-imovel' },
  { name: 'Sobre', href: '/sobre' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="p-1.5 flex flex-col items-center group transition-transform hover:scale-105">
            <span className="sr-only">Alugue na Hora</span>
            <Image 
              src="/mascot-final.png" 
              alt="Mascot" 
              width={80}
              height={80}
              className="h-16 w-auto object-contain"
            />
            <div className="text-[#003399] font-extrabold text-base tracking-tight -mt-1 group-hover:text-primary transition-colors">
              Alugue na Hora
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-base font-semibold text-gray-900 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-6 items-center">
          {!loading && (
            user ? (
              <>
                <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-sm text-gray-700">
                  <Link href="/dashboard" className="font-semibold text-gray-900 hover:text-primary transition-colors">
                    Painel
                  </Link>
                  <span className="text-gray-300">•</span>
                  <span className="font-medium text-gray-600">
                    Bem-vindo, <span className="text-primary font-bold">{user.username}</span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <button
                    onClick={logout}
                    className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-base font-semibold text-gray-900 flex items-center hover:text-primary transition-colors">
                  Entrar
                </Link>
                <Link href="/register" className="rounded-full bg-primary px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                  Cadastrar Imóveis
                </Link>
              </>
            )
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-1.5 font-bold text-xl text-primary">
              Alugue<span className="text-accent">NaHora</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                {!loading && (
                  user ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-700">
                        <Link
                          href="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-semibold text-gray-900 hover:text-primary transition-colors"
                        >
                          Painel
                        </Link>
                        <span className="text-gray-300">•</span>
                        <span className="font-medium text-gray-600">
                          Bem-vindo, <span className="text-primary font-bold">{user.username}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                        >
                          Sair
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-2 text-center block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
                      >
                        Cadastrar Imóveis
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
