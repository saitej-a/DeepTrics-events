import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function Preloader({ onFinish }: { onFinish: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) {
      setDone(true)
      onFinish()
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setDone(true)
          onFinish()
        },
      })

      tl.fromTo(
        '.pre-line',
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
      )
        .fromTo(
          '.pre-word',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.08 },
          '-=0.5',
        )
        .fromTo(
          '.pre-sub',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4',
        )
        .to('.pre-inner', { opacity: 0, y: -30, duration: 0.6, delay: 0.15 })
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div className="pre-inner px-6 text-center">
        <div className="pre-line mx-auto mb-6 h-px w-16 bg-gold" />
        <h1 className="display text-4xl text-ivory sm:text-6xl">
          <span className="pre-word inline-block overflow-hidden">
            <span className="inline-block">Deep</span>
          </span>
          <span className="pre-word inline-block overflow-hidden text-gold">
            <span className="inline-block">Trics</span>
          </span>
        </h1>
        <p className="pre-sub eyebrow mt-5">Event Planners &amp; Surprise Planners</p>
      </div>
    </div>
  )
}
