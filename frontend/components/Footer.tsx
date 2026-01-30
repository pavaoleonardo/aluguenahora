import Link from 'next/link'
import Image from 'next/image'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Imóveis', href: '/imoveis' },
    { name: 'Anunciar', href: '/dashboard/novo-imovel' },
    { name: 'Sobre', href: '/sobre' },
  ],
  legal: [
    { name: 'Privacidade', href: '#' },
    { name: 'Termos', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.488 2h-.173zM12.315 4.539a18.705 18.705 0 00-4.257.087c-1.354.062-2.126.295-2.607.49a2.955 2.955 0 00-1.08.702 2.955 2.955 0 00-.702 1.08c-.194.48-.428 1.252-.49 2.607a18.71 18.71 0 00-.087 3.59v.667c0 1.57.013 2.03.087 3.59.062 1.354.295 2.126.49 2.607.2.533.468.96.82 1.312.353.353.78.62 1.313.82.48.194 1.252.428 2.607.49a18.711 18.711 0 003.59.087h.667c1.57 0 2.03-.013 3.59-.087 1.354-.062 2.126-.295 2.607-.49a2.955 2.955 0 001.08-.702 2.955 2.955 0 00.702-1.08c.194-.48.428-1.252.49-2.607.037-.996.06-1.65.087-4.257l.001-1.385c-.027-2.67-.05-3.325-.087-4.257-.062-1.354-.295-2.126-.49-2.607a2.955 2.955 0 00-.702-1.08 2.955 2.955 0 00-1.08-.702c-.48-.194-1.252-.428-2.607-.49a18.72 18.72 0 00-4.293-.087z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M12.315 7.828a4.488 4.488 0 100 8.976 4.488 4.488 0 000-8.976zm0 2.539a1.948 1.948 0 110 3.896 1.948 1.948 0 010-3.896z"
            clipRule="evenodd"
          />
          <circle cx="17.07" cy="6.93" r="1.144" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
             <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Alugue Na Hora</span>
                 {/* White version of logo or just text if logo is dark */}
                 {/* Usually we'd want a reversed logo for dark bg, but let's use the image and assume it might work or text fallback */}
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">Alugue<span className="text-secondary">NaHora</span></span>
                 </div>
              </Link>
            <p className="text-sm leading-6 text-gray-300">
              Facilitando a sua vida na hora de alugar ou comprar o imóvel dos seus sonhos.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navegação</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Contato</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="text-sm leading-6 text-gray-300">
                    Campo Grande, MS - Brasil
                  </li>
                  <li className="text-sm leading-6 text-gray-300">
                    contato@aluguenahora.com.br
                  </li>
                  <li className="text-sm leading-6 text-gray-300">
                    +55 (67) 99999-9999
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Alugue Na Hora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
