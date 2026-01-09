import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">AlugueNaHora</div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/imoveis" className="text-gray-700 hover:text-blue-600 transition-colors">
              Imóveis
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contato
            </Link>
          </nav>

          <a
            href="https://wa.me/5567999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
