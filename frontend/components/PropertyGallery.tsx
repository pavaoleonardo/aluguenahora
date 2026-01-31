'use client'

import { useMemo, useState } from 'react'
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
  titulo: string
  finalidadeLabel?: string
}

export default function PropertyGallery({ fotos = [], titulo, finalidadeLabel }: PropertyGalleryProps) {
  const items = useMemo(() => {
    return (fotos || [])
      .map((foto) => {
        const url = foto?.url
        const thumb = foto?.formats?.thumbnail?.url || url
        const large = foto?.formats?.medium?.url || foto?.formats?.small?.url || url
        if (!url) return null
        const label = foto?.caption || foto?.alternativeText || foto?.name || ''
        return { url: large || url, thumb: thumb || url, label }
      })
      .filter(Boolean) as { url: string; thumb: string }[]
  }, [fotos])

  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]
  const total = items.length

  const goPrev = () => {
    if (items.length === 0) return
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goNext = () => {
    if (items.length === 0) return
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        {active ? (
          <Image
            src={active.url}
            alt={titulo}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">Sem Foto</div>
        )}
        <div className="absolute inset-x-0 top-0 h-1 bg-secondary/90" />
        {finalidadeLabel ? (
          <span className="absolute left-3 top-3 rounded-sm bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
            {finalidadeLabel}
          </span>
        ) : null}
        {active?.label ? (
          <span className="absolute left-3 bottom-3 rounded-sm bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {active.label}
          </span>
        ) : null}
        {total > 0 ? (
          <span className="absolute right-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
            {activeIndex + 1}/{total}
          </span>
        ) : null}
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1.5 text-xl font-semibold text-white shadow hover:bg-black/60"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1.5 text-xl font-semibold text-white shadow hover:bg-black/60"
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
    </div>
  )
}
