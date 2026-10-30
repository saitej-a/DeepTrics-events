import { useEffect, useRef, useState } from 'react'
import { isTouchDevice, prefersReducedMotion } from '../lib/motion'

type CursorMode = 'default' | 'link' | 'text'

/**
 * Custom cursor: a small gold dot and a trailing ring that expands on
 * interactive elements and shows a contextual label (set via data-cursor-label).
 * Disabled entirely on touch devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const mode = useRef<CursorMode>('default')
  const label = useRef('')

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return
    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let scale = 1
    let ringScale = 1
    let raf = 0

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        '[data-cursor], a, button, [role="button"], input, select, textarea, label',
      ) as HTMLElement | null
      if (target) {
        const custom = target.getAttribute('data-cursor')
        label.current = target.getAttribute('data-cursor-label') ?? (custom ? 'Open' : '')
        mode.current = custom === 'text' ? 'text' : 'link'
        ringScale = custom === 'text' ? 3.4 : 2.2
      } else {
        label.current = ''
        mode.current = 'default'
        ringScale = 1
      }
    }

    const onDown = () => {
      scale = 0.8
    }
    const onUp = () => {
      scale = 1
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
        labelRef.current.style.opacity = label.current ? '1' : '0'
        if (labelRef.current.textContent !== label.current) {
          labelRef.current.textContent = label.current
        }
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-10 w-10 rounded-full border border-gold/50"
        style={{ willChange: 'transform', transition: 'scale 200ms' }}
      />
      <div
        ref={labelRef}
        className="fixed left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink"
        style={{ willChange: 'transform', opacity: 0 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">{label.current}</span>
      </div>
    </div>
  )
}
