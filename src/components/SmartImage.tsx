import { useEffect, useRef, useState } from 'react'
import { image, type StockImage } from '../data/images'

interface SmartImageProps {
  imageKey: string
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * A lazy, resilient image. Resolves a registry key to its stock entry, renders
 * with native lazy-loading, and falls back to a branded placeholder instead of
 * ever showing a broken image.
 */
export function SmartImage({ imageKey, alt, className, sizes, priority }: SmartImageProps) {
  const entry: StockImage = image(imageKey)
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFailed(false)
  }, [entry.src])

  if (!entry.src || failed) {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || entry.alt}
        className={`relative overflow-hidden bg-charcoal ${className ?? ''}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl text-gold/50 italic select-none">D</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <img
        src={entry.src}
        alt={alt || entry.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
