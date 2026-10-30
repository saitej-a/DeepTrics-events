import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Service } from '../data/services'
import { SmartImage } from './SmartImage'
import { whatsappLink } from '../lib/config'

interface ServiceModalProps {
  service: Service | null
  onClose: () => void
  onEnquire: (service: Service) => void
}

export function ServiceModal({ service, onClose, onEnquire }: ServiceModalProps) {
  useEffect(() => {
    if (!service) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [service, onClose])

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={service.title}
        >
          <motion.div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden bg-charcoal sm:max-h-[86vh]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-ivory/20 bg-ink/60 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto">
              {/* Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-5">
                <div className="aspect-[4/3] sm:col-span-3 sm:aspect-auto sm:h-[320px]">
                  <SmartImage imageKey={service.image} alt={service.title} sizes="60vw" priority />
                </div>
                <div className="aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:h-[320px]">
                  <SmartImage imageKey={service.image2} alt={`${service.title} — detail`} sizes="40vw" priority />
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <p className="eyebrow">{service.index} — Service</p>
                <h3 className="display mt-3 text-4xl text-ivory sm:text-5xl">{service.title}</h3>

                <div className="mt-6 space-y-4 text-[15px] font-light leading-relaxed text-beige">
                  {service.description.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 border-l border-gold/40 pl-3 text-sm text-ivory/85">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-4 border-t border-ivory/10 pt-8 sm:flex-row">
                  <button
                    onClick={() => onEnquire(service)}
                    className="inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ivory"
                  >
                    Enquire About This Experience
                  </button>
                  <a
                    href={whatsappLink(`Hello DeepTrics, I would like to plan a ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 border border-ivory/25 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-colors hover:border-gold hover:text-gold"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
