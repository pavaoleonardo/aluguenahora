'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NewspaperIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/outline'
import { api } from '@/lib/api'
import { API_BASE_URL } from '@/lib/apiBase'
import { initialNews, NoticiaData } from '@/lib/newsData'

export default function NewsGrid() {
  const [news, setNews] = useState<NoticiaData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/noticias', { 
      params: { 
        populate: 'imagem',
        sort: 'data:desc',
        'pagination[limit]': 3
      } 
    })
    .then(res => {
      const apiNews = res.data.data || []
      // If we have news in Strapi, use them. Otherwise, use our curated initial news.
      setNews(apiNews.length > 0 ? apiNews : initialNews)
    })
    .catch(err => {
      console.error('Error fetching news:', err)
      setNews(initialNews)
    })
    .finally(() => setLoading(false))
  }, [])

  const getIcon = (categoria: string) => {
    switch (categoria) {
      case 'Investimento': return <CurrencyDollarIcon className="h-12 w-12 opacity-40 group-hover:scale-110 transition-transform" />
      case 'Alta Demanda': return <HomeIcon className="h-12 w-12 opacity-40 group-hover:scale-110 transition-transform" />
      default: return <NewspaperIcon className="h-12 w-12 opacity-40 group-hover:scale-110 transition-transform" />
    }
  }

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'Valorização': return 'bg-blue-50 text-primary'
      case 'Investimento': return 'bg-orange-50 text-secondary'
      case 'Alta Demanda': return 'bg-green-50 text-green-700'
      default: return 'bg-gray-50 text-gray-600'
    }
  }

  const getImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  }

  if (loading) {
     return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
        </div>
     )
  }

  if (news.length === 0) return null

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {news.map((item) => {
        const imageUrl = getImageUrl(item.imagem?.url);
        return (
          <Link 
            key={item.id}
            href={item.link || `/noticias/${item.documentId}`} 
            className="flex flex-col items-start justify-between bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
          >
            <div className="relative w-full">
              <div className={`aspect-[16/9] w-full rounded-2xl object-cover flex items-center justify-center overflow-hidden ${
                item.categoria === 'Investimento' ? 'bg-secondary/5 text-secondary' : 
                item.categoria === 'Alta Demanda' ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'
              }`}>
                {imageUrl ? (
                  <img src={imageUrl} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <>
                      {getIcon(item.categoria)}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </>
                )}
              </div>
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime={item.data} className="text-gray-500 font-medium">
                  {new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </time>
                <span className={`relative z-10 rounded-full px-3 py-1.5 font-bold ${getCategoryColor(item.categoria)}`}>
                  {item.categoria}
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-bold leading-6 text-slate-900 group-hover:text-primary transition-colors">
                  {item.titulo}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {item.resumo}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  )
}
