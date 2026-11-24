import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Always open at the top, even on refresh. Must go through ScrollTrigger; it otherwise
// writes history.scrollRestoration back to 'auto' on every refresh().
ScrollTrigger.clearScrollMemory('manual')

let lenis: Lenis | null = null

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis) return lenis
  const reduce = reducedMotion()
  // lerp 0.085 = long, soft glide that eases to a stop.
  lenis = new Lenis({ lerp: reduce ? 1 : 0.085, smoothWheel: !reduce, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTarget(target: string | number) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6 })
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: target, behavior: 'smooth' })
}

export { gsap, ScrollTrigger }
