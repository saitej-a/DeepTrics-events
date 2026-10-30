import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { STATS } from '../lib/config'
import { CountUp } from '../components/CountUp'
import { SmartImage } from '../components/SmartImage'

export function About() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-about-reveal]', { opacity: 1, y: 0 })
        gsap.set('.about-img', { clipPath: 'inset(0% 0 0 0)' })
        return
      }

      gsap.fromTo(
        '[data-about-reveal]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )

      gsap.fromTo(
        '.about-img',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about-img', start: 'top 78%' },
        },
      )

      gsap.fromTo(
        '.about-img img',
        { scale: 1.18 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-img', start: 'top 78%' },
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={rootRef} className="relative bg-ink py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Editorial typography */}
        <div className="lg:col-span-7">
          <p className="eyebrow" data-about-reveal>
            01 — About DeepTrics
          </p>
          <h2
            className="display mt-8 text-[clamp(2.4rem,5.5vw,5rem)] uppercase leading-[1.02] text-ivory"
            data-about-reveal
          >
            We don&rsquo;t just plan events.
            <span className="block italic text-gold">We create experiences.</span>
          </h2>
          <div className="mt-10 max-w-xl space-y-6 text-base font-light leading-relaxed text-beige lg:text-lg" data-about-reveal>
            <p>
              DeepTrics is a creative event and surprise planning company built on a simple
              conviction — that a moment, properly designed, can stay with someone for a
              lifetime.
            </p>
            <p>
              We work from the idea inward, shaping every detail around the people at the
              centre of it. The result is never a template. It is an experience that feels
              considered, personal, and quietly extraordinary.
            </p>
          </div>

          {/* Statistics */}
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ivory/10 pt-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} data-about-reveal>
                <div className="display text-4xl text-ivory lg:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix ?? ''} />
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-beige/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] tracking-wide text-beige/45" data-about-reveal>
            Figures shown are placeholders — update them in src/lib/config.ts.
          </p>
        </div>

        {/* Visual composition */}
        <div className="lg:col-span-5">
          <div className="relative lg:sticky lg:top-28">
            <div className="about-img relative aspect-[3/4] overflow-hidden bg-charcoal">
              <SmartImage imageKey="about-1" alt="An elegantly decorated event table with candlelight" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-40 border border-gold/25 p-6 lg:block" data-about-reveal>
              <p className="display text-5xl text-gold">10+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-beige/70">
                Years of craft
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
