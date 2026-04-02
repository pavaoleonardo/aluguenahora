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

  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const active = items[activeIndex]
  const total = items.length

  const goPrev = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (items.length <= 1) return
    setActiveIndex((prev) => {
      const nextIndex = (prev - 1 + items.length) % items.length;
      scrollToSlide(nextIndex);
      return nextIndex;
    });
  }

  const goNext = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (items.length <= 1) return
    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % items.length;
      scrollToSlide(nextIndex);
      return nextIndex;
    });
  }

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.clientWidth;
    const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Handle Keyboard Navigation (enabled for both main gallery and modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return;

      if (e.key === 'ArrowRight') {
        goNext(e);
      } else if (e.key === 'ArrowLeft') {
        goPrev(e);
      } else if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, items.length, activeIndex]);

  // Pause video when navigating away from it
  useEffect(() => {
    if (videoRef.current && !active?.isVideo) {
      videoRef.current.pause()
    }
  }, [activeIndex, active?.isVideo])

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
      {/* Main Slider Window */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full overflow-hidden bg-gray-100 group">
        
        {/* CSS Scroll Snapping Carousel Container */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide select-none touch-pan-x scroll-smooth"
        >
          {items.length > 0 ? items.map((item, idx) => (
            <div 
              key={`${item.originalUrl}-${idx}`} 
              className="w-full h-full flex-shrink-0 snap-center relative cursor-pointer overflow-hidden bg-gray-100"
              onClick={() => setIsModalOpen(true)}
            >
              {item.isVideo ? (
                <>
                  <video
                    ref={idx === activeIndex ? videoRef : null}
                    src={item.displayUrl}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
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
                    className="object-cover transition-transform duration-300"
                    priority={idx === 0}
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center z-10 pointer-events-none">
                     <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                  {item.label === 'Fachada frontal' && (
                    <div className="absolute left-0 top-0 bg-black/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white rounded-br-md z-20 h-8 flex items-center pointer-events-none">
                      Fachada frontal
                    </div>
                  )}
                </>
              )}
            </div>
          )) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 flex-shrink-0 snap-center hover:cursor-default" onClick={(e) => e.stopPropagation()}>Sem Foto</div>
          )}
        </div>

        {/* Counter Badge */}
        {total > 0 && active ? (
          <span className="absolute right-0 top-0 rounded-bl-md bg-black/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white z-20 h-8 flex items-center pointer-events-none drop-shadow-md">
            {activeIndex + 1} / {total}
          </span>
        ) : null}
        
        {/* Navigation Arrows */}
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3.5 py-2.5 text-xl font-bold text-white shadow-lg hover:bg-black/80 transition-colors z-20 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3.5 py-2.5 text-xl font-bold text-white shadow-lg hover:bg-black/80 transition-colors z-20 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Próxima foto"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {/* Thumbnails row below carousel */}
      {items.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide justify-start md:justify-center mx-auto max-w-7xl px-4 w-full">
          {items.map((item, idx) => (
            <button
              key={`thumb-${item.originalUrl}-${idx}`}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                scrollToSlide(idx);
              }}
              className={`relative aspect-[4/3] min-w-[90px] overflow-hidden rounded-md border-2 transition-all ${
                idx === activeIndex ? 'border-primary ring-2 ring-primary/40' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
              }`}
              aria-label={item.isVideo ? 'Selecionar vídeo' : `Selecionar foto ${idx + 1}`}
            >
              {item.isVideo ? (
                <>
                  <video src={item.displayUrl} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                  <PlayIconOverlay size="sm" />
                </>
              ) : (
                <Image src={item.thumb} alt={`${titulo} - ${idx + 1}`} fill className="object-cover" unoptimized={true} />
              )}
            </button>
          ))}
        </div>
      ) : null}

      {/* Lightbox Modal */}
      {isModalOpen && active && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 py-8 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-50 transition-colors">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto" onClick={(e) => e.stopPropagation()}>
               <div className="relative w-full h-full flex items-center justify-center">
                  {active.isVideo ? (
                    <video
                      src={active.originalUrl}
                      controls
                      autoPlay
                      className="max-w-full max-h-full rounded-lg"
                      style={{ maxHeight: '85vh' }}
                    >
                      Seu navegador não suporta a exibição de vídeos.
                    </video>
                  ) : (
                    <Image src={active.originalUrl} alt={titulo} fill className="object-contain" quality={100} priority unoptimized={true} />
                  )}
               </div>
               
               {items.length > 1 && (
                  <>
                     <button type="button" onClick={goPrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-5 text-4xl font-semibold text-white hover:bg-white/20 transition-colors z-50 border border-white/20 backdrop-blur-md">
                        ‹
                     </button>
                     <button type="button" onClick={goNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-5 text-4xl font-semibold text-white hover:bg-white/20 transition-colors z-50 border border-white/20 backdrop-blur-md">
                        ›
                     </button>
                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest bg-black/60 px-6 py-2 rounded-full text-sm border border-white/10 backdrop-blur-md">
                        {active.isVideo ? '🎬 Vídeo' : `${activeIndex + 1} / ${total}`}
                     </div>
                  </>
               )}
            </div>
         </div>
      )}
      
      {/* Hide scrollbar styles needed for clean carousel look */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  )
}
