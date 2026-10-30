import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, prefersReducedMotion } from '../lib/motion'
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from '../data/portfolio'
import { SmartImage } from '../components/SmartImage'
import { PortfolioViewer } from '../components/PortfolioViewer'

export function Portfolio() {
  const rootRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<'All' | PortfolioCategory>('All')
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  const filtered = filter === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-work-head]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const openViewer = (id: string) => {
    const idx = filtered.findIndex((p) => p.id === id)
    if (idx >= 0) setViewerIndex(idx)
  }

  return (
    <section id="work" ref={rootRef} className="relative bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <p className="eyebrow" data-work-head>04 — Our Work</p>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2
            className="display max-w-2xl text-[clamp(2.4rem,5vw,4.5rem)] uppercase leading-[1.02] text-ivory"
            data-work-head
          >
            A selection of <span className="italic text-gold">celebrations</span>.
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2" data-work-head role="tablist" aria-label="Filter projects">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  filter === cat
                    ? 'border-gold bg-gold text-ink'
                    : 'border-ivory/15 text-beige hover:border-gold/60 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial grid */}
        <motion.div layout className="mt-14 grid auto-rows-[15rem] grid-cols-2 gap-4 sm:auto-rows-[17rem] lg:grid-cols-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => openViewer(item.id)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden bg-charcoal text-left ${
                  item.tall ? 'row-span-2' : 'row-span-1'
                }`}
                data-cursor="View Project"
                aria-label={`View ${item.title}`}
              >
                <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
                  <SmartImage
                    imageKey={item.image}
                    alt={item.title}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{item.category}</p>
                  <h3 className="display mt-1 text-xl text-ivory lg:text-2xl">{item.title}</h3>
                  <p className="mt-1 max-w-xs text-xs font-light text-beige/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 text-[11px] tracking-wide text-beige/45" data-work-head>
          Sample portfolio shown as a preview — replace with your completed events in
          src/data/portfolio.ts.
        </p>
      </div>

      <PortfolioViewer
        items={filtered}
        index={viewerIndex}
        onClose={() => setViewerIndex(null)}
        onNavigate={setViewerIndex}
      />
    </section>
  )
}
