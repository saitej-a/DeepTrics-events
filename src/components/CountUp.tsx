import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'

interface CountUpProps {
  value: number
  suffix?: string
}

export function CountUp({ value, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = prefersReducedMotion()

    if (reduce) {
      el.textContent = `${value.toLocaleString()}${suffix}`
      return
    }

    const obj = { n: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n).toLocaleString()}${suffix}`
          },
        })
      },
    })

    return () => st.kill()
  }, [value, suffix])

  return <span ref={ref}>0{suffix}</span>
}
