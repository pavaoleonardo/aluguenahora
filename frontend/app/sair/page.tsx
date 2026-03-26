import Link from 'next/link'
import Image from 'next/image'

export default function LogoutSuccessPage() {
  return (
    <section className="h-screen w-full force-light bg-white">
      <div className="grid xl:grid-cols-2 grid-cols-1 h-full">
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

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Até a próxima!</h3>
              <p className="text-base font-medium text-gray-500">Sua sessão foi encerrada com sucesso.</p>
            </div>

            <div className="flex justify-center mb-10">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p className="shrink text-gray-500 text-center text-sm md:text-base mt-8">
              Quer voltar? 
              <Link href="/login" className="text-gray-900 font-semibold ms-1 hover:text-primary transition-colors">
                <b>Iniciar sessão</b>
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="relative w-full h-screen bg-[url('/img-2.jpg')] bg-center bg-cover border-l border-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
