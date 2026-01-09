import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const imoveis = await payload.find({
    collection: 'imoveis',
    where: {
      destaque: { equals: true },
      status: { equals: 'disponivel' },
    },
    limit: 9,
    depth: 1,
  })

  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Encontre o Imóvel dos Seus Sonhos</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Casas, apartamentos e muito mais em Campo Grande - MS
          </p>
          <Link
            href="/imoveis"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Ver Todos os Imoveis
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Imoveis em Destaque</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imoveis.docs.map((imovel) => (
            <Link
              key={imovel.id}
              href={`/imoveis/${imovel.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm">Foto em breve</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded text-white text-xs font-bold ${imovel.finalidade === 'venda' ? 'bg-red-500' : 'bg-blue-500'}`}
                  >
                    {imovel.finalidade === 'venda' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">{imovel.titulo}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  {typeof imovel.bairro === 'object' && imovel.bairro?.nome}
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  R$ {imovel.preco?.toLocaleString('pt-BR')}
                  {imovel.finalidade === 'aluguel' && (
                    <span className="text-gray-500 text-base ml-2">/mes</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Anuncie Seu Imovel</h2>
          <p className="text-xl text-gray-300 mb-12">
            Divulgue seu imovel para milhares de interessados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Cadastre-se</h3>
              <p className="text-gray-300">Crie sua conta gratuitamente</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Adicione Detalhes</h3>
              <p className="text-gray-300">Preencha as informacoes</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Pronto!</h3>
              <p className="text-gray-300">Comece a receber contatos</p>
            </div>
          </div>
          <div className="mt-12">
            <a
              href="https://wa.me/5567999999999"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold"
            >
              Anunciar Meu Imovel
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Ultimas Noticias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Mercado imobiliario aquece em CG</h3>
              <p className="text-gray-600 mb-4">
                Crescimento de 15% nas vendas no ultimo trimestre.
              </p>
              <Link href="#" className="text-blue-600 font-semibold">
                Ler mais
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Como valorizar seu imovel</h3>
              <p className="text-gray-600 mb-4">Pequenas reformas podem aumentar o valor.</p>
              <Link href="#" className="text-blue-600 font-semibold">
                Ler mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Nao encontrou o que procura?</h2>
          <p className="text-xl text-gray-600 mb-8">Entre em contato conosco!</p>

          <a
            href="https://wa.me/5567999999999"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
