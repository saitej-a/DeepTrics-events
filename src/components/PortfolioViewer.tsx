import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { PortfolioItem } from '../data/portfolio'
import { SmartImage } from './SmartImage'

interface PortfolioViewerProps {
  items: PortfolioItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function PortfolioViewer({ items, index, onClose, onNavigate }: PortfolioViewerProps) {
  const item = index === null ? null : items[index]

  const prev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  const next = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, prev, next])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
            aria-label="Close viewer"
          >
            <X size={20} />
          </button>

          <div className="relative flex h-full w-full max-w-6xl flex-col">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 overflow-hidden bg-charcoal"
            >
              <SmartImage imageKey={item.image} alt={item.title} className="h-full w-full" sizes="90vw" priority />
            </motion.div>

            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">{item.category}</p>
                <h3 className="display mt-2 text-3xl text-ivory sm:text-4xl">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-beige">
                  {item.description}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={prev}
                  className="flex h-12 w-12 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
