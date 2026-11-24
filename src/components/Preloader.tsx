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
// bottom up to "Olive". The logo fades, the seam becomes the door frames, and the doors slide
// apart. Transforms and opacity only.
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

      const t = gsap.timeline({ paused: true, onComplete: onDone })
      t.to('.door-intro__tree > .tree-mark', { yPercent: 0, duration: 1.4, ease: 'expo.out' }, 0)
        .to('.door-intro__line > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.4)
        // The words under the logo blur away…
        .to(['.door-intro__sub', '.door-intro__ar'], { opacity: 0, y: -6, filter: 'blur(8px)', duration: 0.7, ease: 'power2.out' }, 1.85)
        // …while the seam draws in from both ends, measured to stop just short of the logo.
        .set('.seam--top', { height: () => Math.max(0, tree.getBoundingClientRect().top - GAP) }, 1.85)
        .set('.seam--bottom', { height: () => Math.max(0, window.innerHeight - name.getBoundingClientRect().bottom - GAP) }, 1.85)
        .to(['.seam--top', '.seam--bottom'], { scaleY: 1, duration: 1, ease: 'expo.inOut' }, 1.85)
        // The logo steps back and the seam closes into the doors' frames.
        .to(['.door-intro__tree', '.door-intro__name'], { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' }, 2.85)
        .to(['.door__frame', '.door__handle'], { opacity: 1, duration: 0.45, ease: 'power1.out' }, 3.05)
        .set('.seam', { opacity: 0 }, 3.5)
        .add(() => onReveal(), 3.55)
        .to('.door--left', { xPercent: -100, duration: 1.45, ease: 'expo.inOut' }, 3.55)
        .to('.door--right', { xPercent: 100, duration: 1.45, ease: 'expo.inOut' }, 3.55)
        .to('.preloader > .awning', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 3.7)
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
