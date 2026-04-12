import Link from 'next/link';
import Image from 'next/image';
import PropertyGrid from "@/components/PropertyGrid";
import SearchBar from "@/components/SearchBar";
import NewsGrid from "@/components/NewsGrid";
import { HomeIcon, CurrencyDollarIcon, CheckBadgeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Force dynamic rendering to ensure we don't cache 403 errors
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="bg-white overflow-x-clip">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Photo Background */}
        <div className="absolute inset-0 -z-10 bg-white">
            <Image 
                src="/hero-bg.png" 
                alt="Alugue na Hora Background" 
                fill 
                className="object-cover object-right" 
                priority 
                unoptimized
            />
            {/* No gradient overlay needed; the QuintoAndar style uses a crisp image behind a solid white card */}
        </div>
        
        <div className="pt-24 pb-12 sm:pb-16 lg:pb-24 min-h-[calc(100vh-80px)] flex flex-col justify-end relative">
            <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 relative z-10">
                {/* Floating Left Card explicitly matching QuintoAndar dimensions */}
                <div className="bg-white rounded-[2rem] p-8 sm:p-10 max-w-[540px] shadow-2xl animate-in slide-in-from-left-8 duration-700">
                    
                    {/* QuintoAndar-style Pill Tabs (adds correct vertical height distribution) */}
                    <div className="flex items-center gap-2 mb-8 bg-gray-50/80 p-1.5 rounded-full inline-flex border border-gray-100">
                        <span className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-full shadow-sm text-sm border border-gray-200">Buscar Imóveis</span>
                        <Link href="/registro/proprietario" className="text-slate-600 font-semibold px-6 py-2.5 rounded-full hover:text-slate-900 transition-colors text-sm">Anunciar Imóveis</Link>
                    </div>

                    <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                        <span className="block">Achei, gostei,</span>
                        <span className="block text-secondary mt-1">aluguei na hora!</span>
                    </h1>
                    
                    {/* Search Bar Component configured vertically */}
                    <div className="mt-2 relative z-20">
                        <SearchBar orientation="vertical" />
                    </div>
                </div>
            </div>
        </div>
        
         {/* Second Gradient Blob Removed for Image Clarity */}
      </div>

      {/* Featured Section */}
      <div id="destaques" className="mx-auto max-w-7xl px-6 pt-12 pb-24 sm:pt-16 sm:pb-32 lg:px-8 bg-gray-50/50 rounded-3xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Imóveis em Destaque</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                    Propriedades selecionadas a dedo por nossa equipe de especialistas.
                </p>
            </div>
            <Link href="/imoveis" className="text-primary font-semibold hover:text-primary/80 flex items-center gap-2 group transition-all">
                Ver todos os imóveis 
                <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
        
        <PropertyGrid emptyMessage="Nenhum imóvel em destaque encontrado no momento." />
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
