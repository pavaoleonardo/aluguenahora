'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
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

type GalleryItem = {
  url: string
  thumb: string
  label: string
  isVideo?: boolean
}

type PropertyGalleryProps = {
  fotos?: FotoItem[]
  foto_fachada?: FotoItem
  titulo: string
  finalidadeLabel?: string
  video_url?: string
}

export default function PropertyGallery({ fotos = [], foto_fachada, titulo, finalidadeLabel, video_url }: PropertyGalleryProps) {
  const items: GalleryItem[] = useMemo(() => {
    const allItems: GalleryItem[] = []

    // 1. Add video first if it exists
    if (video_url) {
      allItems.push({
        url: video_url,
        thumb: video_url,
        label: 'Vídeo do Imóvel',
        isVideo: true,
      })
    }

    // 2. Identify main photo (Fachada)
    let mainPhoto = foto_fachada
    let galleryStartIdx = 0

    if (!mainPhoto?.url && fotos.length > 0) {
      mainPhoto = fotos[0]
      galleryStartIdx = 1
    }

    // 3. Add main photo
    if (mainPhoto?.url) {
      const url = mainPhoto.url
      const thumb = mainPhoto.formats?.thumbnail?.url || url
      allItems.push({ url: url, thumb: thumb || url, label: 'Fachada frontal', isVideo: false })
    }

    // 4. Add remaining photos
    const otherPhotos = (fotos || [])
      .slice(galleryStartIdx)
      .map((foto) => {
        const url = foto?.url
        if (!url || url === mainPhoto?.url) return null
        const thumb = foto?.formats?.thumbnail?.url || url
        return { url: url, thumb: thumb || url, label: foto?.caption || foto?.alternativeText || foto?.name || '', isVideo: false }
      })
      .filter(Boolean) as GalleryItem[]

    allItems.push(...otherPhotos)

    return allItems
  }, [fotos, foto_fachada, video_url])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
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

  // Pause video when navigating away from it
  useEffect(() => {
    if (videoRef.current && !active?.isVideo) {
      videoRef.current.pause()
    }
  }, [activeIndex, active?.isVideo])

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
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, items.length]);

  // Play icon SVG overlay component
  const PlayIconOverlay = ({ size = 'lg' }: { size?: 'sm' | 'lg' }) => (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className={`${size === 'lg' ? 'w-16 h-16' : 'w-8 h-8'} bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm`}>
        <svg className={`${size === 'lg' ? 'w-8 h-8' : 'w-4 h-4'} text-white ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 cursor-pointer group"
        onClick={() => active && setIsModalOpen(true)}
      >
        {active ? (
          <>
            {active.isVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={active.url}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  playsInline
                  preload="metadata"
                />
                <PlayIconOverlay />
                <div className="absolute left-0 top-0 bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white rounded-br-md z-20 h-8 flex items-center pointer-events-none">
                  🎬 Vídeo
                </div>
              </>
            ) : (
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
              key={`${item.url}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square min-w-[80px] overflow-hidden rounded-sm border ${
                idx === activeIndex ? 'border-secondary ring-2 ring-secondary/40' : 'border-gray-200'
              }`}
              aria-label={item.isVideo ? 'Selecionar vídeo' : `Selecionar foto ${idx + 1}`}
            >
              {item.isVideo ? (
                <>
                  <video src={item.url} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                  <PlayIconOverlay size="sm" />
                </>
              ) : (
                <Image src={item.thumb} alt={`${titulo} - ${idx + 1}`} fill className="object-cover" />
              )}
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
                  {active.isVideo ? (
                    <video
                      src={active.url}
                      controls
                      autoPlay
                      className="max-w-full max-h-full rounded-lg"
                      style={{ maxHeight: '85vh' }}
                    >
                      Seu navegador não suporta a exibição de vídeos.
                    </video>
                  ) : (
                    <Image src={active.url} alt={titulo} fill className="object-contain" quality={100} priority />
                  )}
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
                        {active.isVideo ? '🎬 Vídeo' : `${activeIndex + 1} / ${total}`}
                     </div>
                  </>
               )}
            </div>
         </div>
      )}
    </div>
  )
}
