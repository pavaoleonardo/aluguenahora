import Link from 'next/link'
import Image from 'next/image'

export default function RegistroPage() {
  return (
    <section className="min-h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 min-h-screen">
        <div className="max-w-xl mx-auto w-full flex flex-col justify-center items-center py-10 px-6">
          <div className="text-center mb-10 w-full">
            <Link href="/" className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
              <Image
                src="/logo.svg"
                alt="Alugue na Hora Logo"
                width={160}
                height={60}
                className="h-12 w-auto mx-auto object-contain"
              />
            </Link>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Criar uma conta</h3>
            <p className="text-sm font-medium text-gray-500">Bem-vindo(a) ao Alugue na Hora! Selecione o tipo de conta:</p>
          </div>

          <div className="w-full flex flex-col gap-4">
            {/* Opção Corretor / Imobiliária */}
            <Link
              href="/registro/corretor"
              className="group flex items-center gap-5 w-full p-5 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors text-base">Sou Corretor / Imobiliária</p>
                <p className="text-sm text-gray-500 mt-0.5">Anuncie imóveis de seus clientes e gerencie sua carteira</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-primary ml-auto flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Opção Proprietário */}
            <Link
              href="/registro/proprietario"
              className="group flex items-center gap-5 w-full p-5 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 group-hover:text-secondary transition-colors text-base">Sou Proprietário(a)</p>
                <p className="text-sm text-gray-500 mt-0.5">Anuncie seu próprio imóvel diretamente na plataforma</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-secondary ml-auto flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <p className="shrink text-gray-500 text-center text-sm md:text-base mt-10">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-gray-900 font-semibold hover:text-primary transition-colors">
              <b>Entrar</b>
            </Link>
          </p>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-0 w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
