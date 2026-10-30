import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis: Lenis | null = null

/**
 * Create and manage the Lenis smooth-scroll instance, synchronised with GSAP
 * ScrollTrigger. Call once from the app shell.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time: number) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

/** Smoothly scroll to a section, falling back to native behaviour. */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 })
  } else {
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}
