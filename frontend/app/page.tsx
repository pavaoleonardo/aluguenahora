import PropertyGrid from "@/components/PropertyGrid";
import { MagnifyingGlassIcon, HomeIcon, CurrencyDollarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { bairrosPorRegiao } from '@/lib/bairrosCampoGrande'

// Force dynamic rendering to ensure we don't cache 403 errors
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section with Search */}
      <div className="relative isolate overflow-hidden bg-primary pb-16 pt-14 sm:pb-20">
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-20">
             {/* Abstract background pattern or image */}
             <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                <defs><pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none" /></pattern></defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
             </svg>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Encontre o Imóvel Ideal
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              No Alugue Na Hora você encontra as melhores ofertas de imóveis para locação e venda.
            </p>
            
            {/* Search Box */}
            <div className="mt-10 rounded-lg bg-white p-4 shadow-xl">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr_1.35fr_1.1fr_0.9fr_auto] sm:items-center">
                <select className="h-11 w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6">
                  <option value="">Todos os Bairros</option>
                  {Object.entries(bairrosPorRegiao).map(([regiao, bairros]) => (
                    <optgroup key={regiao} label={`--- ${regiao.toUpperCase()} ---`}>
                      {bairros.map((bairro) => (
                        <option key={`${regiao}-${bairro}`} value={bairro}>
                          {bairro}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <input
                  type="text"
                  value="Campo Grande - MS"
                  readOnly
                  aria-readonly="true"
                  className="h-11 w-full min-w-[190px] rounded-md border-0 bg-gray-50 pl-3 pr-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm sm:leading-6"
                />
                <select className="h-11 w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6">
                    <option>Todos os Tipos</option>
                    <optgroup label="--- RESIDENCIAL ---">
                      <option>Apart Hotel / Flat / Loft</option>
                      <option>Apartamento</option>
                      <option>Apto. Cobertura / Duplex</option>
                      <option>Casa de Vila</option>
                      <option>Casa-Térrea</option>
                      <option>Casa-Térrea-Condomínio</option>
                      <option>Kitnet</option>
                      <option>Sobrado</option>
                      <option>Sobrado-Condomínio</option>
                      <option>Studio</option>
                      <option>Terreno</option>
                      <option>Terreno-Condomínio</option>
                    </optgroup>
                    <optgroup label="--- COMERCIAL ---">
                      <option>Área</option>
                      <option>Casa Comercial</option>
                      <option>Galpão / Depósito</option>
                      <option>Imóvel Comercial</option>
                      <option>Indústria / Fábrica</option>
                      <option>Ponto Comercial / Box</option>
                      <option>Pousada / Hotel / Motel</option>
                      <option>Sala / Salão / Loja</option>
                    </optgroup>
                    <optgroup label="--- RURAL ---">
                      <option>Chácara</option>
                      <option>Fazenda</option>
                      <option>Haras</option>
                      <option>Pesqueiro</option>
                      <option>Sitio</option>
                    </optgroup>
                </select>
                <select className="h-11 w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6">
                    <option>Aluguel ou Venda</option>
                    <option>Aluguel</option>
                    <option>Venda</option>
                </select>
                <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:w-auto">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div id="destaques" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Imóveis em Destaque</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Confira as novidades mais recentes adicionadas à nossa plataforma.
          </p>
        </div>
        
        <PropertyGrid limit={3} emptyMessage="Nenhum imóvel em destaque encontrado no momento." />
      </div>

      {/* How It Works Section */}
      <div id="como-funciona" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Como funciona</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Simples, rápido e seguro.</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <HomeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            Cadastre-se
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">Crie sua conta gratuitamente em poucos segundos para começar a anunciar ou buscar.</dd>
                    </div>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                             <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CheckBadgeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            Envie seu imóvel
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">Preencha os detalhes e envie fotos. Nossa equipe revisa para garantir a qualidade.</dd>
                    </div>
                     <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            Você terminou!
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">Seu imóvel é publicado e visto por milhares de interessados. Feche negócio!</dd>
                    </div>
                </dl>
            </div>
        </div>
      </div>

       {/* News / Blog Section Placeholder */}
       <div id="noticias" className="bg-white py-24 sm:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Notícias do Mercado</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Fique por dentro das últimas tendências e dicas.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
             {/* Static Mock Posts */}
             <article className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                    <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center text-gray-400">
                        Imagem
                    </div>
                </div>
                <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <time dateTime="2023-01-01" className="text-gray-500">Jan 16, 2026</time>
                        <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Dicas</span>
                    </div>
                    <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            Como escolher o imóvel ideal
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                            Dicas essenciais para quem está procurando o primeiro apartamento ou casa para alugar.
                        </p>
                    </div>
                </div>
             </article>
             {/* Repeat if needed */}
          </div>
        </div>
      </div>

    </div>
  );
}
