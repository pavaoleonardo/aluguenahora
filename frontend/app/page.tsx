import PropertyGrid from "@/components/PropertyGrid";
import SearchBar from "@/components/SearchBar";
import NewsGrid from "@/components/NewsGrid";
import { HomeIcon, CurrencyDollarIcon, CheckBadgeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Force dynamic rendering to ensure we don't cache 403 errors
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 w-full" aria-hidden="true">
            <div className="relative left-[50%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-primary/30 opacity-40 sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        
        <div className="pb-24 pt-24 sm:pb-32 lg:pb-40 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-4xl text-center mb-16 px-4 animate-in hover:-translate-y-1 transition-transform duration-500">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 drop-shadow-sm whitespace-normal">
                        <span className="block">Seu Novo Lar</span>
                        <span className="block text-primary mt-2">Começa Aqui</span>
                    </h1>
                </div>
                
                {/* Search Bar Component */}
                <div className="mt-8 relative z-20">
                    <SearchBar />
                </div>


            </div>
        </div>
        
         {/* Second Gradient Blob */}
         <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] w-full" aria-hidden="true">
          <div className="relative left-[50%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary/30 to-orange-200 opacity-40 sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
      </div>

      {/* Featured Section */}
      <div id="destaques" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 bg-gray-50/50 rounded-3xl my-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Imóveis em Destaque</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                    Propriedades selecionadas a dedo por nossa equipe de especialistas.
                </p>
            </div>
            <button className="text-primary font-semibold hover:text-primary/80 flex items-center gap-2 group transition-all">
                Ver todos os imóveis 
                <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
        
        <PropertyGrid limit={3} emptyMessage="Nenhum imóvel em destaque encontrado no momento." />
      </div>

      {/* How It Works Section */}
      <div id="como-funciona" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <span className="text-secondary font-semibold tracking-wide uppercase text-sm">Passo a Passo</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Traga o seu imóvel e Alugue na Hora!</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">Transforme seu imóvel vazio em renda imediata.</p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    <div className="relative pl-16 group">
                        <dt className="text-lg font-bold leading-7 text-slate-900">
                            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            1. Como funciona
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-slate-600">
                            Crie sua conta gratuitamente em poucos segundos. Tenha acesso a painéis exclusivos de favoritos e alertas.
                        </dd>
                    </div>
                    <div className="relative pl-16 group">
                        <dt className="text-lg font-bold leading-7 text-slate-900">
                            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            2. Anuncie seu Imóvel
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-slate-600">
                            Utilize nossa busca inteligente para encontrar imóveis ou anuncie o seu com fotos profissionais e descrição detalhada.
                        </dd>
                    </div>
                     <div className="relative pl-16 group">
                        <dt className="text-lg font-bold leading-7 text-slate-900">
                            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            3. Feche Negócio
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-slate-600">
                            Agende visitas, negocie diretamente pela plataforma e assine o contrato digitalmente. Sem papelada.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
      </div>

       {/* Newsletter/Blog Preview (Dynamic News) */}
       <div id="noticias" className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden border-t border-gray-100">
         {/* Background accent */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-[100px]"></div>
         </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Noticias do Mercado Imobiliario</h2>
            <p className="mt-2 text-lg leading-8 text-slate-600">
              Fique por dentro das tendências e oportunidades no mercado imobiliário da nossa capital.
            </p>
          </div>
          
          <NewsGrid />

        </div>
      </div>
    </div>
  );
}
