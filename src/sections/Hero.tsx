import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import { HeroScene } from '../three/HeroScene'

const HEADLINE = [
  ['WE', 'CREATE'],
  ['MOMENTS', 'THAT'],
  ['LAST', 'FOREVER.'],
]

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(true)
  const [mobile, setMobile] = useState(false)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Pause the 3D render loop when the hero is off-screen.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Cinematic text entrance, triggered once the preloader clears.
  useEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hero-anim', { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.1,
      )
        .fromTo(
          '.hero-word',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.07 },
          0.15,
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5',
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.55',
        )
        .fromTo(
          '.hero-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.3',
        )
    }, rootRef)

    return () => ctx.revert()
  }, [ready, reduced])

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* 3D scene */}
      <div className="absolute inset-0">
        <HeroScene active={active} reduced={reduced} mobile={mobile} />
      </div>

      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/20 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-28 lg:px-12">
        <p className="hero-eyebrow eyebrow hero-anim opacity-0">
          Premium Events &amp; Surprises
        </p>

        <h1 className="display mt-8 text-[clamp(2.9rem,9vw,8.5rem)] uppercase leading-[0.95] text-ivory">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="hero-word hero-anim inline-block opacity-0">
                    {word}
                    {wi < line.length - 1 ? '\u00A0' : ''}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-sub hero-anim mt-8 max-w-md text-base font-light leading-relaxed text-ivory/75 opacity-0 sm:text-lg">
          From extraordinary celebrations to beautifully unexpected surprises, we turn your
          special moments into unforgettable experiences.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={() => scrollToSection('#experiences')}
            className="hero-cta hero-anim group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ivory opacity-0"
            data-cursor
          >
            Explore Our Experiences
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="hero-cta hero-anim inline-flex items-center justify-center gap-3 border border-ivory/25 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-300 hover:border-gold hover:text-gold opacity-0"
            data-cursor
          >
            Plan Your Event
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-indicator hero-anim absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.34em] text-beige/70">Scroll</span>
        <div className="flex h-12 w-px justify-center overflow-hidden bg-ivory/15">
          <span className="scroll-dot block h-3 w-px animate-[scrollDot_2s_ease-in-out_infinite] bg-gold" />
        </div>
        <ArrowDown size={14} className="text-gold/70" />
      </div>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          60%, 100% { transform: translateY(400%); }
        }
      `}</style>
    </section>
  )
}
