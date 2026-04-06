'use client'

import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
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
  originalUrl: string
  displayUrl: string
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
        originalUrl: video_url,
        displayUrl: video_url,
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
      const original = mainPhoto.url
      const display = mainPhoto.formats?.medium?.url || mainPhoto.formats?.small?.url || original
      const thumb = mainPhoto.formats?.thumbnail?.url || display
      allItems.push({ originalUrl: original, displayUrl: display, thumb: thumb, label: 'Fachada frontal', isVideo: false })
    }

    // 4. Add remaining photos
    const otherPhotos = (fotos || [])
      .slice(galleryStartIdx)
      .map((foto) => {
        const original = foto?.url
        if (!original || original === mainPhoto?.url) return null
        const display = foto?.formats?.medium?.url || foto?.formats?.small?.url || original
        const thumb = foto?.formats?.thumbnail?.url || display
        return { originalUrl: original, displayUrl: display, thumb: thumb, label: foto?.caption || foto?.alternativeText || foto?.name || '', isVideo: false }
      })
      .filter(Boolean) as GalleryItem[]

    allItems.push(...otherPhotos)

    return allItems
  }, [fotos, foto_fachada, video_url])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const total = items.length

  // Each slide is ~33.33% of the container width on desktop, 100% on mobile
  const scrollToIndex = useCallback((index: number) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth / getVisibleSlides()
    container.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    })
  }, [])

  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const goPrev = useCallback(() => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth / getVisibleSlides()
    container.scrollBy({ left: -slideWidth, behavior: 'smooth' })
  }, [])

  const goNext = useCallback(() => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth / getVisibleSlides()
    container.scrollBy({ left: slideWidth, behavior: 'smooth' })
  }, [])

  const modalGoPrev = useCallback(() => {
    setModalIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const modalGoNext = useCallback(() => {
    setModalIndex((prev) => (prev + 1) % total)
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return

      if (isModalOpen) {
        if (e.key === 'ArrowRight') modalGoNext()
        else if (e.key === 'ArrowLeft') modalGoPrev()
        else if (e.key === 'Escape') setIsModalOpen(false)
      } else {
        if (e.key === 'ArrowRight') goNext()
        else if (e.key === 'ArrowLeft') goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    if (isModalOpen) document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen, goNext, goPrev, modalGoNext, modalGoPrev])

  // Pause video when navigating away
  useEffect(() => {
    if (videoRef.current && isModalOpen) {
      const modalItem = items[modalIndex]
      if (!modalItem?.isVideo) videoRef.current.pause()
    }
  }, [modalIndex, isModalOpen, items])

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

  if (items.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[400px] bg-gray-900 flex items-center justify-center text-gray-400">
        Sem Fotos
      </div>
    )
  }

  return (
    <>
      {/* Filmstrip Carousel — Infoimóveis style */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] bg-white group/gallery">
        
        {/* Scrollable filmstrip container */}
        <div 
          ref={sliderRef}
          className="gallery-filmstrip flex gap-1 w-full h-full overflow-x-auto scroll-smooth select-none touch-pan-x"
        >
          {items.map((item, idx) => (
            <div 
              key={`${item.originalUrl}-${idx}`} 
              className="gallery-slide relative flex-shrink-0 h-full cursor-zoom-in overflow-hidden group/slide bg-gray-100"
              onClick={() => {
                setModalIndex(idx)
                setIsModalOpen(true)
              }}
            >
              {item.isVideo ? (
                <>
                  <video
                    src={item.displayUrl}
                    className="w-full h-full object-cover"
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
                    src={item.displayUrl}
                    alt={`${titulo} - Imagem ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx < 3}
                    unoptimized={true}
                  />
                </>
              )}

              {/* Per-slide counter badge (top-right) */}
              <span className="absolute right-2 top-2 rounded-md bg-black/60 px-3 py-1 text-xs font-bold text-white z-20 pointer-events-none backdrop-blur-sm shadow-sm">
                {idx + 1} / {total}
              </span>

              {/* Per-slide caption (bottom-left) — only on first photo */}
              {idx === 0 && item.label && (
                <span className="absolute left-0 bottom-0 bg-black/50 px-4 py-2 text-xs font-medium text-white z-20 pointer-events-none backdrop-blur-sm rounded-tr-md max-w-[80%] truncate">
                  Fachada frontal
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all z-30 opacity-0 group-hover/gallery:opacity-100"
              aria-label="Foto anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all z-30 opacity-0 group-hover/gallery:opacity-100"
              aria-label="Próxima foto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && items[modalIndex] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-50 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto px-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full flex items-center justify-center">
              {items[modalIndex].isVideo ? (
                <video
                  ref={videoRef}
                  src={items[modalIndex].originalUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg"
                  style={{ maxHeight: '85vh' }}
                >
                  Seu navegador não suporta a exibição de vídeos.
                </video>
              ) : (
                <Image 
                  src={items[modalIndex].originalUrl} 
                  alt={titulo} 
                  fill 
                  className="object-contain" 
                  quality={100} 
                  priority 
                  unoptimized={true} 
                />
              )}
            </div>
            
            {items.length > 1 && (
              <>
                <button type="button" onClick={modalGoPrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-5 text-4xl font-semibold text-white hover:bg-white/20 transition-colors z-50 border border-white/20 backdrop-blur-md">
                  ‹
                </button>
                <button type="button" onClick={modalGoNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-5 text-4xl font-semibold text-white hover:bg-white/20 transition-colors z-50 border border-white/20 backdrop-blur-md">
                  ›
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest bg-black/60 px-6 py-2 rounded-full text-sm border border-white/10 backdrop-blur-md">
                  {items[modalIndex].isVideo ? '🎬 Vídeo' : `${modalIndex + 1} / ${total}`}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CSS for filmstrip layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-filmstrip::-webkit-scrollbar { display: none; }
        .gallery-filmstrip { -ms-overflow-style: none; scrollbar-width: none; }
        .gallery-slide { width: 100%; }
        @media (min-width: 640px) { .gallery-slide { width: 50%; } }
        @media (min-width: 1024px) { .gallery-slide { width: 33.333%; } }
      `}} />
    </>
  )
}
