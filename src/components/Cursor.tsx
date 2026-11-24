import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

const REST = 35 // degrees: the leaf's resting tilt, like the leaf on the "i" of the wordmark

// An olive leaf instead of the arrow. It follows the pointer with a light glide and tilts with
// the movement like a leaf in the air, settling back when you stop. Over links it grows and
// turns sage; on press it squeezes. Mouse/trackpad only; touch screens keep their own behaviour.
export function Cursor() {
  const leaf = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = leaf.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const root = document.documentElement
    root.classList.add('has-leaf-cursor')

    gsap.set(el, { xPercent: -50, yPercent: -50, rotate: REST })
    const x = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3.out' })
    const r = gsap.quickTo(el, 'rotate', { duration: 0.7, ease: 'power3.out' })

    let shown = false
    let lastX = 0
    let settle = 0

    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        root.classList.add('leaf-visible')
        shown = true
      }
      x(e.clientX)
      y(e.clientY)
      // Tilt with horizontal speed, then drift back to rest once the mouse stops.
      const vx = e.clientX - lastX
      lastX = e.clientX
      r(REST + gsap.utils.clamp(-40, 40, vx * 2.2))
      window.clearTimeout(settle)
      settle = window.setTimeout(() => r(REST), 90)

      const hover = !!(e.target as HTMLElement).closest('a, button, [role="tab"], label, input, [data-cursor]')
      el.classList.toggle('is-hover', hover)
    }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    const leave = () => {
      root.classList.remove('leaf-visible')
      shown = false
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    root.addEventListener('pointerleave', leave)
    return () => {
      window.clearTimeout(settle)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      root.removeEventListener('pointerleave', leave)
      root.classList.remove('has-leaf-cursor', 'leaf-visible')
    }
  }, [])

  return (
    <div className="leaf-cursor" ref={leaf} aria-hidden="true">
      <svg viewBox="0 0 20 32">
        <path className="leaf-cursor__body" d="M10 31C3 23 2 11 10 1c8 10 7 22 0 30Z" />
        <path className="leaf-cursor__vein" d="M10 27.5V6" />
      </svg>
    </div>
  )
}
