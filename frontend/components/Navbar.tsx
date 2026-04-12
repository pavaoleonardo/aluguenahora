'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Destaques', href: '/#destaques' },
  { name: 'Anunciar Imóveis', href: '/dashboard/novo-imovel' },
  { name: 'Alugue na hora', href: '/sobre' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="p-1 flex items-center group transition-transform hover:scale-105">
            <span className="sr-only">Alugue na Hora</span>
            <Image 
              src="/logo.svg" 
              alt="Alugue na Hora Logo" 
              width={200}
              height={42}
              className="h-11 w-auto object-contain"
              priority
            />
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
          {navigation.map((item) => {
            if (item.name === 'Anunciar Imóveis' && !user) {
              return (
                <Menu as="div" key={item.name} className="relative inline-block text-left">
                  <MenuButton className="group relative inline-flex items-center text-base font-semibold text-gray-900 transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center">
                    {item.name}
                    <ChevronDownIcon aria-hidden="true" className="ml-1 -mr-1 size-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <Link
                          href="/registro/corretor"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Sou corretor(a) / imobiliária
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/registro/proprietario"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Sou proprietário(a)
                        </Link>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              )
            }
            return (
              <Link key={item.name} href={item.href} className="group relative inline-flex text-base font-semibold text-gray-900 transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center">
                {item.name}
              </Link>
            )
          })}
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
                    Bem-vindo, <span className="text-primary font-bold">{(user.nome_completo || user.username).split(' ')[0]}</span>
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
                <Link href="/registro" className="text-base font-semibold text-gray-900 flex items-center hover:text-primary transition-colors">
                  Cadastrar
                </Link>
                <Link href="/login" className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-base font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                  <UserIcon className="w-5 h-5" />
                  Entrar
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
            <Link href="/" className="p-1 flex items-center">
              <span className="sr-only">Alugue na Hora</span>
              <Image 
                src="/logo.svg" 
                alt="Alugue na Hora Logo" 
                width={180}
                height={38}
                className="h-10 w-auto object-contain"
              />
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
                {navigation.map((item) => {
                  if (item.name === 'Anunciar Imóveis' && !user) {
                    return (
                      <div key={item.name} className="-mx-3">
                        <div className="block px-3 py-2 text-base/7 font-semibold text-gray-900">
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-1 pb-2">
                           <Link
                              href="/registro/corretor"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              Sou corretor(a) / imobiliária
                            </Link>
                            <Link
                              href="/registro/proprietario"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              Sou proprietário(a)
                            </Link>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                })}
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
                          Bem-vindo, <span className="text-primary font-bold">{(user.nome_completo || user.username).split(' ')[0]}</span>
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
                        href="/registro"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        Cadastrar
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-2 flex items-center justify-center gap-2 w-full rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
                      >
                        <UserIcon className="w-5 h-5" />
                        Entrar
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
