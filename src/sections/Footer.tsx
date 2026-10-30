import { useLayoutEffect, useRef } from 'react'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { BRAND, CONTACT, NAV_LINKS, SOCIALS } from '../lib/config'
import { scrollToSection } from '../lib/scroll'

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
}

const FOOTER_SERVICES = [
  'Birthday Celebrations',
  'Surprise Planning',
  'Marriage Proposals',
  'Wedding Planning',
  'Corporate Events',
  'Decorations & Theming',
]

export function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.footer-word',
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
      gsap.fromTo(
        '[data-footer-reveal]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} className="relative overflow-hidden border-t border-ivory/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-6 pt-20 lg:px-12 lg:pt-28">
        {/* Giant wordmark */}
        <div className="overflow-hidden">
          <h2 className="display text-[clamp(3rem,13vw,11rem)] uppercase leading-none text-ivory/95">
            <span className="footer-word inline-block overflow-hidden align-bottom">
              <span className="inline-block">Deep</span>
            </span>
            <span className="footer-word inline-block overflow-hidden align-bottom text-gold">
              <span className="inline-block">Trics</span>
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-ivory/10 pt-14 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4" data-footer-reveal>
            <p className="display text-2xl text-ivory">
              Deep<span className="text-gold">Trics</span>
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-beige">
              {BRAND.description}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return Icon ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-beige transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon size={16} />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2" data-footer-reveal>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToSection(l.href)}
                    className="text-sm text-beige transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3" data-footer-reveal>
            <p className="eyebrow">Services</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection('#services')}
                    className="text-sm text-beige transition-colors hover:text-gold"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3" data-footer-reveal>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-beige">
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-gold">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              <li className="leading-relaxed">{CONTACT.address}</li>
              <li className="text-beige/70">{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-8 text-[11px] tracking-wide text-beige/50 sm:flex-row" data-footer-reveal>
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p>Photography shown is placeholder stock — replace with your own work.</p>
        </div>
      </div>
    </footer>
  )
}
