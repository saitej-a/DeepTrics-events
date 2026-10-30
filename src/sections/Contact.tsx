import { useLayoutEffect, useRef } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { CONTACT, whatsappLink } from '../lib/config'
import { EnquiryForm } from '../components/EnquiryForm'

interface ContactProps {
  initialEventType?: string | null
}

export function Contact({ initialEventType }: ContactProps) {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-contact-reveal]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={rootRef} className="relative bg-ink py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + contact info */}
          <div className="lg:col-span-5">
            <p className="eyebrow" data-contact-reveal>07 — Contact &amp; Booking</p>
            <h2
              className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[1.0] text-ivory"
              data-contact-reveal
            >
              Let&rsquo;s create something <span className="italic text-gold">unforgettable</span>.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-beige" data-contact-reveal>
              Tell us about your idea and we will respond with how we would bring it to life. No
              obligation — just a conversation about the moment you want to make.
            </p>

            <div className="mt-12 space-y-6" data-contact-reveal>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-gold">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-beige/60">Phone</span>
                  <span className="text-sm text-ivory transition-colors group-hover:text-gold">{CONTACT.phone}</span>
                </span>
              </a>

              <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-gold">
                  <Mail size={17} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-beige/60">Email</span>
                  <span className="text-sm text-ivory transition-colors group-hover:text-gold">{CONTACT.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-gold">
                  <MapPin size={17} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-beige/60">Studio</span>
                  <span className="text-sm text-ivory">{CONTACT.address}</span>
                </span>
              </div>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 border border-gold/50 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
              data-contact-reveal
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7" data-contact-reveal>
            <EnquiryForm initialEventType={initialEventType} />
            <p className="mt-4 text-[11px] tracking-wide text-beige/45">
              Contact details are placeholders — update them in src/lib/config.ts and your .env
              file.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
