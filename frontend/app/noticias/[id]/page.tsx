'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { initialNews, NoticiaData } from '@/lib/newsData'
import { api } from '@/lib/api'
import { API_BASE_URL } from '@/lib/apiBase'
import { CalendarIcon, TagIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NoticiaDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [noticia, setNoticia] = useState<NoticiaData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return;

    // Try to find in local data first
    const localNews = initialNews.find(n => n.documentId === id);
    
    if (localNews) {
      setNoticia(localNews);
      setLoading(false);
    } else {
      // If not in local news, try API (for future Strapi integration)
      api.get(`/api/noticias`, { 
        params: { 
          'filters[documentId][$eq]': id,
          populate: 'imagem' 
        } 
      })
        .then(res => {
          if (res.data.data && res.data.data.length > 0) {
            setNoticia(res.data.data[0]);
          }
        })
        .catch(err => {
          console.error("Error fetching news:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-gray-500 font-medium">Carregando notícia...</p>
        </div>
      </div>
    )
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <div className="text-center">
            <h1 className="text-6xl font-black text-gray-100 mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Notícia não encontrada</h2>
            <Link href="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 inline-flex items-center gap-2">
            <ChevronLeftIcon className="h-4 w-4" /> Voltar para o início
            </Link>
        </div>
      </div>
    )
  }

  const imageUrl = noticia.imagem?.url
    ? (noticia.imagem.url.startsWith('http') 
        ? noticia.imagem.url 
        : (noticia.imagem.url.startsWith('/uploads/') 
            ? `${API_BASE_URL}${noticia.imagem.url}` 
            : noticia.imagem.url))
    : null;

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={noticia.titulo} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <TagIcon className="h-24 w-24 text-slate-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30">
                {noticia.categoria}
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                <CalendarIcon className="h-4 w-4" />
                {new Date(noticia.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
            </div>
            <h1 className="text-3xl md:text-6xl font-black leading-[1.1] max-w-4xl tracking-tight">
                {noticia.titulo}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-all mb-12 group font-bold text-sm">
                <div className="p-2 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronLeftIcon className="h-4 w-4 stroke-[3px]" />
                </div>
                VOLTAR PARA O INÍCIO
            </Link>

            <div className="space-y-10">
                <p className="text-xl md:text-2xl font-bold text-slate-800 leading-snug border-l-4 border-primary pl-8 py-2 italic bg-slate-50 rounded-r-2xl">
                    {noticia.resumo}
                </p>
                
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg md:text-xl font-medium">
                    {noticia.conteudo.split('\n').map((paragraph, index) => (
                        <p key={index} className="first-letter:text-4xl first-letter:font-black first-letter:text-primary first-letter:mr-1">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Sub-sections / Dividers */}
            <div className="my-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Action / CTA */}
            <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">Pronto para encontrar seu imóvel?</h3>
                        <p className="text-slate-400 font-medium max-w-md">Nossa equipe está pronta para te ajudar a encontrar a melhor oportunidade em Campo Grande e região.</p>
                    </div>
                    <Link href="/imoveis" className="bg-primary text-white px-10 py-5 rounded-2xl font-black hover:bg-white hover:text-slate-950 transition-all whitespace-nowrap shadow-xl shadow-primary/20 hover:shadow-white/10 uppercase tracking-tighter">
                        Explorar Portfólio
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </article>
  )
}
