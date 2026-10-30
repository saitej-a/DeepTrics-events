import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { SIGNATURE_EXPERIENCES } from '../data/signature'
import { SmartImage } from '../components/SmartImage'

export function Signature() {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '[data-sig-head]',
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
      }
    }, rootRef)

    // Horizontal scroll, desktop only. Kept outside the context so its
    // ScrollTrigger/pin can be reverted independently.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const pin = pinRef.current
      if (!track || !pin) return
      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          pin,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    })

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section id="experiences" ref={rootRef} className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 pt-28 lg:px-12 lg:pt-36">
        <p className="eyebrow" data-sig-head>03 — Signature Experiences</p>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2
            className="display max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] uppercase leading-[1.02] text-ivory"
            data-sig-head
          >
            Moments we <span className="italic text-gold">love</span> to create.
          </h2>
          <p className="max-w-xs text-sm font-light leading-relaxed text-beige/80" data-sig-head>
            Scroll through the experiences that define what we do best.
          </p>
        </div>
      </div>

      {/* Pinned horizontal stage (vertical stack on mobile) */}
      <div ref={pinRef} className="mt-12 lg:mt-10 lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-6 pb-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:pb-0"
        >
          {SIGNATURE_EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="group relative aspect-[4/3] w-full overflow-hidden bg-charcoal lg:aspect-auto lg:h-[66vh] lg:w-[44vw] lg:shrink-0"
              data-cursor="Discover"
            >
              <div className="h-full w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]">
                <SmartImage
                  imageKey={exp.image}
                  alt={exp.title}
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />

              <span className="display absolute left-6 top-6 text-6xl text-ivory/20">
                {exp.index}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Signature</p>
                <h3 className="display mt-2 text-3xl text-ivory lg:text-4xl">{exp.title}</h3>
                <p className="mt-2 max-w-sm text-sm font-light text-beige/85">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
