import { memo, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { img } from '../lib/brand'
import { Button, CoffeeWord, En, Wordmark } from '../components/ui'

// Layered backgrounds: the generated hero (images/hero.jpg) sits on top once it exists; until
// then the real cup-in-the-leaves photo shows through underneath. Same for the phone version.
const BG = {
  ['--hero' as string]: `url(${img('hero.jpg')}), url(${img('cup-leaves.jpg')})`,
  ['--hero-m' as string]: `url(${img('hero-mobile.jpg')}), url(${img('hero.jpg')}), url(${img('cup-leaves.jpg')})`,
}

export const Hero = memo(function Hero({ play }: { play: boolean }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero .line-mask > span', { yPercent: 115 })
      gsap.set(['.hero__accent', '.hero__foot > *'], { opacity: 0, y: 24 })
      gsap.set('.hero__img', { scale: 1.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!play) return
    const ctx = gsap.context(() => {
      gsap.to('.hero__img', { scale: 1, duration: 2.4, ease: 'expo.out' })
      gsap.to('.hero .line-mask > span', { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.35 })
      gsap.to(['.hero__accent', '.hero__foot > *'], { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.7 })

      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__bg', { yPercent: 20, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [play])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__img" style={BG} />
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="sr-only">أوليف كوفي هاوس، قلقيلية. ابتسم، إنت في أوليف.</span>
          <span className="hero__word hero__word--left line-mask" aria-hidden="true">
            <span>
              <Wordmark className="hero__wm" />
            </span>
          </span>
          <span className="hero__gap" aria-hidden="true" />
          <span className="hero__word hero__word--right" aria-hidden="true">
            <span className="line-mask">
              <span>
                <CoffeeWord className="hero__coffee" />
              </span>
            </span>
            <em className="hero__accent">ابتسم، إنت في أوليف</em>
          </span>
        </h1>
      </div>

      <div className="hero__foot">
        <p className="hero__meta">
          <span>صوفين، قلقيلية</span>
          <span className="dot" />
          <span>مفتوح كل يوم من ٨ الصبح لـ ٢ بالليل</span>
          <En className="hero__en">Sofin, Qalqilya · Open daily 8 AM – 2 AM</En>
        </p>
        <Button href="#menu" variant="glass">
          شوف المنيو
        </Button>
      </div>
    </section>
  )
})
