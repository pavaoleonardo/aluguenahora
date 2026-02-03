"use client";

import { MagnifyingGlassIcon, MapPinIcon, HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { bairrosPorRegiao } from '@/lib/bairrosCampoGrande';

export default function SearchBar() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Search Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-2xl ring-1 ring-black/5 mx-4 sm:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          {/* City Input (Static) */}
          <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Cidade</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-primary" />
                </div>
                <input 
                  type="text" 
                  value="Campo Grande - MS" 
                  readOnly 
                  className="block w-full rounded-xl border-0 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 font-semibold ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm transition-all cursor-default"
                />
            </div>
          </div>

          {/* District Input */}
          <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Bairro</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
                <option value="">Todos os Bairros</option>
                {Object.entries(bairrosPorRegiao).map(([regiao, bairros]) => (
                    <optgroup key={regiao} label={regiao}>
                    {bairros.map((bairro) => (
                        <option key={`${regiao}-${bairro}`} value={bairro}>
                        {bairro}
                        </option>
                    ))}
                    </optgroup>
                ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>

          {/* Type Input */}
          <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Tipo de Imóvel</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HomeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-3 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
                <option>Todos os Tipos</option>
                <optgroup label="Residencial">
                    <option>Apartamento</option>
                    <option>Casa</option>
                    <option>Sobrado</option>
                    <option>Kitnet</option>
                    <option>Studio</option>
                </optgroup>
                <optgroup label="Comercial">
                    <option>Sala Comercial</option>
                    <option>Galpão</option>
                    <option>Prédio Inteiro</option>
                </optgroup>
                <optgroup label="Rural">
                    <option>Chácara</option>
                    <option>Sítio</option>
                    <option>Fazenda</option>
                </optgroup>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>

          {/* Purpose (Finalidade) Input */}
           <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">O que você busca?</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-3 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
                    <option value="">Aluguel ou Venda</option>
                    <option value="aluguel">Aluguel</option>
                    <option value="venda">Venda</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                 </div>
            </div>
          </div>

        </div>

        {/* Search Button Row */}
        <div className="mt-6">
            <button className="flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-secondary px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95">
              <MagnifyingGlassIcon className="h-6 w-6 stroke-[2.5]" />
              <span>CONFIRMAR BUSCA</span>
            </button>
        </div>
      </div>
    </div>
  );
}
