import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../lib/config'
import { scrollToSection } from '../lib/scroll'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    // Allow the menu to close before scrolling on mobile.
    window.setTimeout(() => scrollToSection(href), open ? 120 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ${
          scrolled ? 'bg-ink/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-[padding] duration-500 lg:px-12 ${
            scrolled ? 'py-4' : 'py-6'
          }`}
          aria-label="Primary"
        >
          {/* Wordmark */}
          <button
            onClick={() => go('#home')}
            className="group flex flex-col items-start"
            aria-label="DeepTrics — back to top"
            data-cursor
          >
            <span className="display text-2xl leading-none text-ivory">
              Deep<span className="text-gold">Trics</span>
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.34em] text-beige/70">
              Event &amp; Surprise Planners
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => go(link.href)}
                  className="group relative text-[12px] font-medium uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:text-ivory"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => go('#contact')}
              className="hidden border border-gold/50 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink lg:inline-block"
              data-cursor
            >
              Plan Your Event
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-ink/98 px-8 backdrop-blur-sm lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => go(link.href)}
                    className="display block text-5xl text-ivory transition-colors hover:text-gold"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <button
                onClick={() => go('#contact')}
                className="border border-gold/50 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-gold"
              >
                Plan Your Event
              </button>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-beige/60">{BRAND.fullName}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
