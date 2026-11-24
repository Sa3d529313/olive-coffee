import { memo, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { ORDER_URL, img } from '../lib/brand'
import { Button, En, Reveal, TreeMark } from '../components/ui'
import { Flow } from '../components/Flow'

// The reference's "New drink" band, in Olive's greens.
export const Signature = memo(function Signature() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      gsap.fromTo('.sig__arch img', { yPercent: -8, scale: 1.15 }, { yPercent: 8, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sig" id="signature" ref={root}>
      <Flow tone="sage" />
      <div className="container sig__grid">
        <div className="sig__copy">
          <Reveal>
            <p className="sig__kicker">مشروب أوليف المميّز</p>
            <h2 className="sig__title" lang="en">
              <span className="sig__light">Olive</span>
              <em>signature</em>
              <span className="sig__dark">drink</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="sig__name">
              موهيتو ليمون أزرق
              <En as="small">Blue Lemon Mojito</En>
            </h3>
            <p className="sig__desc">ليمون فريش، نعنع وبلو كوراساو فوق صودا وثلج كتير. لونين بكاسة وحدة، والكل بصوّرها قبل أول شفطة.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="sig__stats">
              <div>
                <strong>ليمون</strong>
                <span>ونعنع فريش</span>
              </div>
              <div>
                <strong lang="en">2</strong>
                <span>طبقات لون</span>
              </div>
              <div>
                <strong>مثلّج</strong>
                <span>بيتحضّر عالطلب</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <Button href={ORDER_URL} external>
              اطلبه هلأ
            </Button>
          </Reveal>
        </div>

        <div className="sig__visual">
          <div className="sig__arch">
            <img src={img('blue-mojito.jpg')} alt="موهيتو ليمون أزرق قدام أوليف" loading="lazy" />
          </div>
          <div className="sig__sticker" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="sticker-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text>
                <textPath href="#sticker-circle" textLength="224">
                  SMILE · YOU'RE IN OLIVE · SMILE · YOU'RE IN OLIVE ·
                </textPath>
              </text>
            </svg>
            <TreeMark />
          </div>
        </div>
      </div>
    </section>
  )
})
