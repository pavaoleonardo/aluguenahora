"use client";

import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, HomeIcon, CurrencyDollarIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { bairrosPorRegiao } from '@/lib/bairrosCampoGrande';

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState<'aluguel' | 'venda'>('aluguel');

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs for Rent/Sale */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/20 backdrop-blur-md p-1 rounded-full inline-flex shadow-lg border border-white/30">
          <button
            onClick={() => setActiveTab('aluguel')}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'aluguel'
                ? 'bg-secondary text-white shadow-md transform scale-105'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Alugar
          </button>
          <button
            onClick={() => setActiveTab('venda')}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'venda'
                ? 'bg-secondary text-white shadow-md transform scale-105'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-2xl ring-1 ring-black/5 mx-4 sm:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Location Input */}
          <div className="md:col-span-4 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Localização</label>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>

          {/* Type Input */}
          <div className="md:col-span-3 relative group border-t md:border-t-0 md:border-l border-gray-100 md:pl-4 pt-4 md:pt-0">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-7 flex items-center pointer-events-none">
              <HomeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Tipo de Imóvel</label>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-2.5 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>

           {/* Price/Advanced Filter Input (Simplified as Price Range or Filter placeholder) */}
           <div className="md:col-span-3 relative group border-t md:border-t-0 md:border-l border-gray-100 md:pl-4 pt-4 md:pt-0">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-7 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-10">Faixa de Preço</label>
                <select className="block w-full rounded-xl border-0 bg-gray-50 py-2.5 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all hover:bg-gray-100 cursor-pointer appearance-none">
                    <option value="">Qualquer Valor</option>
                    <option value="1000">Até R$ 1.000</option>
                    <option value="2000">Até R$ 2.000</option>
                    <option value="3000">Até R$ 3.000</option>
                    <option value="5000">Até R$ 5.000</option>
                    <option value="10000">Acima de R$ 5.000</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                 </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 pt-4 md:pt-0">
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95">
              <MagnifyingGlassIcon className="h-5 w-5 stroke-[2.5]" />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
