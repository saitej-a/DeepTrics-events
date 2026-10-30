import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { SERVICES, type Service } from '../data/services'
import { SmartImage } from '../components/SmartImage'
import { ServiceModal } from '../components/ServiceModal'

const VARIANTS = [
  { span: 'lg:col-span-7', aspect: 'aspect-[4/3] lg:aspect-[4/3]' },
  { span: 'lg:col-span-5', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-6', aspect: 'aspect-[4/3] lg:aspect-[16/10]' },
  { span: 'lg:col-span-6', aspect: 'aspect-[4/3] lg:aspect-[16/10]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[4/5]' },
]

interface ServicesProps {
  onEnquire: (service: Service) => void
}

export function Services({ onEnquire }: ServicesProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [openService, setOpenService] = useState<Service | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          },
        )

        const par = card.querySelector('.service-par')
        if (par) {
          gsap.fromTo(
            par,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })

      gsap.fromTo(
        '[data-services-head]',
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

  return (
    <section id="services" ref={rootRef} className="relative bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow" data-services-head>02 — Our Services</p>
            <h2
              className="display mt-6 max-w-2xl text-[clamp(2.4rem,5vw,4.5rem)] uppercase leading-[1.02] text-ivory"
              data-services-head
            >
              Everything, <span className="italic text-gold">beautifully</span> considered.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-beige/80" data-services-head>
            Ten disciplines, one standard. Select an experience to explore how we would shape it
            for you.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {SERVICES.map((service, i) => {
            const v = VARIANTS[i]
            return (
              <button
                key={service.slug}
                onClick={() => setOpenService(service)}
                className={`service-card group relative overflow-hidden bg-charcoal text-left ${v.span} ${v.aspect}`}
                data-cursor="Explore"
                aria-label={`Open ${service.title}`}
              >
                {/* Parallax image */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="service-par h-[124%] w-full">
                    <SmartImage
                      imageKey={service.image}
                      alt={service.title}
                      className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95" />
                <div className="absolute inset-0 border border-ivory/0 transition-colors duration-500 group-hover:border-gold/30" />

                {/* Index */}
                <span className="absolute left-6 top-6 text-xs font-medium tracking-[0.3em] text-gold/80">
                  {service.index}
                </span>
                <ArrowUpRight
                  size={20}
                  className="absolute right-6 top-6 text-ivory opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold/80">
                    {service.short.split(',')[0]}
                  </p>
                  <h3 className="display mt-2 text-2xl text-ivory transition-transform duration-500 group-hover:-translate-y-1 lg:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm font-light text-beige/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {service.short}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <ServiceModal service={openService} onClose={() => setOpenService(null)} onEnquire={onEnquire} />
    </section>
  )
}
