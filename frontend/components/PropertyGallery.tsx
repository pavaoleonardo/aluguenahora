'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'

type FotoItem = {
  url?: string
  name?: string
  alternativeText?: string | null
  caption?: string | null
  formats?: {
    thumbnail?: { url?: string }
    small?: { url?: string }
    medium?: { url?: string }
  }
}

type PropertyGalleryProps = {
  fotos?: FotoItem[]
  foto_fachada?: FotoItem
  titulo: string
  finalidadeLabel?: string
}

export default function PropertyGallery({ fotos = [], foto_fachada, titulo, finalidadeLabel }: PropertyGalleryProps) {
  const items = useMemo(() => {
    const allItems = []

    // If fachada exists, it's the first. If not, the first of 'fotos' is the main one.
    let mainPhoto = foto_fachada
    let galleryStartIdx = 0

    if (!mainPhoto?.url && fotos.length > 0) {
      mainPhoto = fotos[0]
      galleryStartIdx = 1
    }

    if (mainPhoto?.url) {
      const url = mainPhoto.url
      const thumb = mainPhoto.formats?.thumbnail?.url || url
      // Use the direct URL which is the full size image to avoid pixelation
      allItems.push({ url: url, thumb: thumb || url, label: 'Fachada frontal' })
    }

    // Add remaining photos
    const otherPhotos = (fotos || [])
      .slice(galleryStartIdx)
      .map((foto) => {
        const url = foto?.url
        // Skip if this is the same as the main photo to avoid duplication
        if (!url || url === mainPhoto?.url) return null
        const thumb = foto?.formats?.thumbnail?.url || url
        // Prioritize full size URL
        return { url: url, thumb: thumb || url, label: foto?.caption || foto?.alternativeText || foto?.name || '' }
      })
      .filter(Boolean) as { url: string; thumb: string; label: string }[]

    return [...allItems, ...otherPhotos]
  }, [fotos, foto_fachada])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const active = items[activeIndex]
  const total = items.length

  const goPrev = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (items.length === 0) return
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goNext = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (items.length === 0) return
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goNext(e as any);
      } else if (e.key === 'ArrowLeft') {
        goPrev(e as any);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, items.length]);

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 cursor-pointer group"
        onClick={() => active && setIsModalOpen(true)}
      >
        {active ? (
          <>
            <Image
              src={active.url}
              alt={titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center z-10 pointer-events-none">
               <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </div>
            {activeIndex === 0 && (
              <div className="absolute left-0 top-0 bg-black/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white rounded-br-md z-20 h-8 flex items-center pointer-events-none">
                Fachada frontal
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">Sem Foto</div>
        )}

        {total > 0 && active ? (
          <span className="absolute right-0 top-0 rounded-bl-md bg-black/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white z-20 h-8 flex items-center pointer-events-none">
            {activeIndex + 1} / {total}
          </span>
        ) : null}
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1.5 text-xl font-semibold text-white shadow hover:bg-black/60 z-20"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1.5 text-xl font-semibold text-white shadow hover:bg-black/60 z-20"
              aria-label="Próxima foto"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, idx) => (
            <button
              key={`${item.thumb}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square min-w-[80px] overflow-hidden rounded-sm border ${
                idx === activeIndex ? 'border-secondary ring-2 ring-secondary/40' : 'border-gray-200'
              }`}
              aria-label={`Selecionar foto ${idx + 1}`}
            >
              <Image src={item.thumb} alt={`${titulo} - ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {/* Lightbox Modal */}
      {isModalOpen && active && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm px-4 py-8" onClick={() => setIsModalOpen(false)}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-50">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto" onClick={(e) => e.stopPropagation()}>
               <div className="relative w-full h-full flex items-center justify-center">
                  <Image src={active.url} alt={titulo} fill className="object-contain" quality={100} priority />
               </div>
               
               {items.length > 1 && (
                  <>
                     <button type="button" onClick={goPrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-3xl font-semibold text-white hover:bg-black/80 transition-colors z-50">
                        ‹
                     </button>
                     <button type="button" onClick={goNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-3xl font-semibold text-white hover:bg-black/80 transition-colors z-50">
                        ›
                     </button>
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest bg-black/50 px-4 py-2 rounded-full text-sm">
                        {activeIndex + 1} / {total}
                     </div>
                  </>
               )}
            </div>
         </div>
      )}
    </div>
  )
}
