import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

const CLICKABLE = 'a, button, [role="tab"], label, input, select, textarea, [data-cursor]'
const PILL = '.btn' // the rounded pill buttons: Order now, زورونا, شوف المنيو…

// "Lens": a small green dot (with a thin cream ring so it shows on cream, green and photos)
// that follows the mouse with a light glide. Over a pill button it opens into a warm kraft
// circle with an arrow inside, pointing the way the site reads (left in Arabic, right in the
// English header). Over other links it shrinks to a tiny kraft dot instead.
// Mouse/trackpad only; touch screens keep their own behaviour.
export function Cursor() {
  const lens = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lens.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const root = document.documentElement
    root.classList.add('has-lens-cursor')

    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const x = gsap.quickTo(el, 'x', { duration: 0.22, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.22, ease: 'power3.out' })
    let shown = false

    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        root.classList.add('lens-visible')
        shown = true
      }
      x(e.clientX)
      y(e.clientY)
      // Pill buttons get the full lens with the arrow; every other clickable thing (header and
      // footer links, menu tabs…) only gets a tiny warm dot, so the text under it stays readable.
      const target = e.target as HTMLElement
      const pill = target.closest(PILL)
      const link = !pill && !!target.closest(CLICKABLE)
      el.classList.toggle('is-hover', !!pill)
      el.classList.toggle('is-link', link)
      if (pill) el.classList.toggle('is-ltr', pill.closest('[dir]')?.getAttribute('dir') === 'ltr')
    }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    const leave = () => {
      root.classList.remove('lens-visible')
      shown = false
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    root.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      root.removeEventListener('pointerleave', leave)
      root.classList.remove('has-lens-cursor', 'lens-visible')
    }
  }, [])

  return (
    <div className="lens-cursor" ref={lens} aria-hidden="true">
      <span className="lens-cursor__dot">
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}
