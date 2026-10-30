import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { TESTIMONIALS } from '../data/testimonials'

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = TESTIMONIALS.length

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + count) % count)
  }, [count])

  // Auto-advance
  useEffect(() => {
    if (prefersReducedMotion() || paused) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => window.clearInterval(id)
  }, [paused, count])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-test-head]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const t = TESTIMONIALS[index]

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <p className="eyebrow text-center" data-test-head>06 — Testimonials</p>
        <h2
          className="display mt-6 text-center text-[clamp(2.2rem,4.5vw,4rem)] uppercase leading-[1.05] text-ivory"
          data-test-head
        >
          Words from those <span className="italic text-gold">who trusted us</span>.
        </h2>

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex min-h-[280px] items-center justify-center sm:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="mx-auto mb-8 h-px w-14 bg-gold/60" />
                <blockquote className="display mx-auto max-w-3xl text-2xl font-light leading-snug text-ivory sm:text-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-beige/70">{t.event}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1 transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold' : 'w-3 bg-ivory/20 hover:bg-ivory/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] tracking-wide text-beige/45">
          Sample testimonials shown for layout purposes — replace with genuine client reviews in
          src/data/testimonials.ts.
        </p>
      </div>
    </section>
  )
}
