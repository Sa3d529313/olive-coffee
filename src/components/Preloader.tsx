import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { Awning, CoffeeHouse, TreeMark, Wordmark } from './ui'

type Props = {
  onReveal: () => void // doors start opening: the hero intro begins behind them
  onDone: () => void // doors are fully open: safe to unmount
}

const GAP = 22 // px of air between a seam line and the logo

// Olive's own shop front as the loader. Plain cream glass under the awning, no seam yet: the
// olive tree grows up, Olive / Coffee House / the Arabic line rise in. Then the lines under the
// logo blur away while the door seam draws itself from the top down to the tree and from the
// bottom up to "Olive". The logo folds into a thin line that becomes the middle of the seam,
// the seam becomes the door frames, and the doors slide apart. Transforms and opacity only.
export function Preloader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const tree = el.querySelector<HTMLElement>('.door-intro__tree')!
    const name = el.querySelector<HTMLElement>('.door-intro__name')!

    const ctx = gsap.context(() => {
      gsap.set('.door-intro__tree > .tree-mark', { yPercent: 102 })
      gsap.set('.door-intro__line > span', { yPercent: 115 })
      gsap.set(['.door__frame', '.door__handle'], { opacity: 0 })
      gsap.set('.seam--top', { scaleY: 0, transformOrigin: '50% 0%' })
      gsap.set('.seam--bottom', { scaleY: 0, transformOrigin: '50% 100%' })
      gsap.set('.seam--mid', { scaleY: 0, transformOrigin: '50% 50%' })

      const t = gsap.timeline({ paused: true, onComplete: onDone })
      t.to('.door-intro__tree > .tree-mark', { yPercent: 0, duration: 1.4, ease: 'expo.out' }, 0)
        .to('.door-intro__line > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.4)
        // The words under the logo blur away…
        .to(['.door-intro__sub', '.door-intro__ar'], { opacity: 0, y: -6, filter: 'blur(8px)', duration: 0.7, ease: 'power2.out' }, 1.85)
        // …while the seam draws in from both ends, measured to stop just short of the logo.
        .set('.seam--top', { height: () => Math.max(0, tree.getBoundingClientRect().top - GAP) }, 1.85)
        .set('.seam--bottom', { height: () => Math.max(0, window.innerHeight - name.getBoundingClientRect().bottom - GAP) }, 1.85)
        .to(['.seam--top', '.seam--bottom'], { scaleY: 1, duration: 1, ease: 'expo.inOut' }, 1.85)
        .set('.seam--mid', {
          top: () => tree.getBoundingClientRect().top - GAP,
          height: () => name.getBoundingClientRect().bottom - tree.getBoundingClientRect().top + GAP * 2,
        }, 1.85)
        // The logo folds in on itself into a thin upright sliver (from its centre, like a door closing)…
        .to(['.door-intro__tree', '.door-intro__name'], { scaleX: 0.015, duration: 0.7, ease: 'power3.inOut' }, 2.85)
        .to(['.door-intro__tree', '.door-intro__name'], { opacity: 0, duration: 0.25, ease: 'power1.in' }, 3.3)
        // …and that sliver becomes the missing middle of the seam, closing the line.
        .to('.seam--mid', { scaleY: 1, duration: 0.55, ease: 'expo.out' }, 3.25)
        .to(['.door__frame', '.door__handle'], { opacity: 1, duration: 0.4, ease: 'power1.out' }, 3.6)
        .set('.seam', { opacity: 0 }, 4)
        .add(() => onReveal(), 4.05)
        .to('.door--left', { xPercent: -100, duration: 1.45, ease: 'expo.inOut' }, 4.05)
        .to('.door--right', { xPercent: 100, duration: 1.45, ease: 'expo.inOut' }, 4.05)
        .to('.preloader > .awning', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 4.2)
      tl.current = t
    }, root)

    let started = false
    const start = () => {
      if (started) return
      started = true
      tl.current?.play()
    }
    document.fonts.ready.then(start)
    const failsafe = window.setTimeout(start, 2500) // never hold the page
    return () => {
      window.clearTimeout(failsafe)
      tl.current = null
      ctx.revert()
    }
  }, [onReveal, onDone])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="door door--left">
        <span className="door__frame" />
        <span className="door__handle" />
      </div>
      <div className="door door--right">
        <span className="door__frame" />
        <span className="door__handle" />
      </div>
      <span className="seam seam--top" />
      <span className="seam seam--bottom" />
      <span className="seam seam--mid" />
      <Awning />
      <div className="door-intro">
        <div className="door-intro__tree">
          <TreeMark />
        </div>
        <div className="door-intro__line door-intro__name">
          <span>
            <Wordmark />
          </span>
        </div>
        <div className="door-intro__line door-intro__sub">
          <span>
            <CoffeeHouse />
          </span>
        </div>
        <div className="door-intro__line door-intro__ar">
          <span>ابتسم، إنت في أوليف</span>
        </div>
      </div>
    </div>
  )
}
