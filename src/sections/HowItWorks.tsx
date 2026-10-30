import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

const STEPS = [
  {
    index: '01',
    title: 'Tell Us Your Idea',
    text: 'Share the person, the occasion and the feeling you want to create. A short conversation is all we need to begin.',
  },
  {
    index: '02',
    title: 'We Design Your Experience',
    text: 'We craft a concept — mood, colour, venue, budget and timeline — and present it as a story you can already imagine.',
  },
  {
    index: '03',
    title: 'We Bring Everything Together',
    text: 'Vendors, décor, choreography and every hidden detail are coordinated behind the scenes until the moment is ready.',
  },
  {
    index: '04',
    title: 'You Enjoy the Moment',
    text: 'You arrive, you are present, and the experience unfolds exactly as it was imagined. We stay in the background.',
  },
]

export function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion()

      if (!reduce) {
        gsap.fromTo(
          '[data-how-head]',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
          },
        )
      }

      // Connecting line draw
      const line = lineRef.current
      if (line) {
        const len = line.getTotalLength()
        if (reduce) {
          line.style.strokeDasharray = 'none'
          line.style.opacity = '1'
        } else {
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(line, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.how-steps',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
          })
        }
      }

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>('.how-step').forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 82%' },
            },
          )
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-ink py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow" data-how-head>05 — How It Works</p>
              <h2
                className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] uppercase leading-[1.02] text-ivory"
                data-how-head
              >
                Four steps to an <span className="italic text-gold">unforgettable</span> moment.
              </h2>
              <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-beige/80" data-how-head>
                A calm, considered process that keeps the joy yours and the logistics ours.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative lg:col-span-7">
            <svg
              className="absolute left-[22px] top-4 hidden h-full w-px lg:block"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={lineRef}
                d="M 0.5 0 L 0.5 100"
                vectorEffect="non-scaling-stroke"
                stroke="#c6a46c"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            <ol className="how-steps space-y-14">
              {STEPS.map((step) => (
                <li key={step.index} className="how-step relative flex gap-6 pl-0 lg:pl-0">
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink">
                    <span className="text-xs font-medium tracking-widest text-gold">{step.index}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="display text-3xl text-ivory lg:text-4xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-base font-light leading-relaxed text-beige">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
