import { memo, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { img } from '../lib/brand'
import { pageUrl } from '../lib/pages'
import { Button, CoffeeHouse, En, Reveal, TreeMark, Wordmark } from '../components/ui'

const ROW_A = [
  { src: 'shop-front.png', alt: 'واجهة أوليف والكراسي على التراس', pos: '50% 80%' },
  { src: 'terrace-flowers.jpg', alt: 'التراس بين الورد' },
  { src: 'pastry-counter.jpg', alt: 'الفترينة وكاسات أوليف' },
  { src: 'sign-night.jpg', alt: 'يافطة أوليف بالليل' },
  { src: 'strawberry-fizz.jpg', alt: 'فراولة فيز قدام المحل' },
  { src: 'hot-cup-smile.jpg', alt: 'كاسة أوليف مكتوب عليها Smile you’re in Olive', pos: '50% 40%' },
]
const ROW_B = [
  { src: 'croissant-cream.jpg', alt: 'كرواسون كريمة مع إسبريسو' },
  { src: 'espresso-machine.jpg', alt: 'ماكينة الإسبريسو' },
  { src: 'takeaway-bag.jpg', alt: 'كيس أوليف ومشروبين' },
  { src: 'shop-night.jpg', alt: 'أوليف بالليل' },
  { src: 'cinnamon-rolls.jpg', alt: 'سينامون رول' },
]

// Dark-green room: the napkin-style lockup and a short story, then two rows of photos that
// slide in opposite directions as you scroll (and back again on the way up).
export const Place = memo(function Place() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: '.place__rows', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      gsap.fromTo('.place__row--a', { xPercent: 0 }, { xPercent: -18, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.place__row--b', { xPercent: -18 }, { xPercent: 0, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="place section" id="place" ref={root}>
      <div className="container place__intro">
        <Reveal className="lockup">
          <TreeMark />
          <Wordmark className="lockup__name" />
          <CoffeeHouse className="lockup__sub" />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="title title--light">
              <span>مكان صغير</span>
              <span className="title__accent">وابتسامة كبيرة</span>
              <En as="em">A small place with a big smile</En>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="place__text">واجهة زجاج، كم طاولة جوّا، وتراس مليان ورد. تعال على إسبريسو سريع وإنت ماشي، أو اقعد مع صحابك للمسا. ببساطة، قهوة طيبة ووجوه بتضحك.</p>
            <En as="p" className="place__en">
              A glass front, a few tables inside and a terrace full of flowers. Stop by for a quick espresso, or stay with friends until late.
            </En>
          </Reveal>
          <Reveal delay={0.14}>
            <Button href={pageUrl('visit')} variant="cream">
              تعال زورنا
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="place__rows" dir="ltr">
        <div className="place__row place__row--a">
          {ROW_A.map((p) => (
            <figure key={p.src}>
              <img src={img(p.src)} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }} />
            </figure>
          ))}
        </div>
        <div className="place__row place__row--b">
          {ROW_B.map((p) => (
            <figure key={p.src}>
              <img src={img(p.src)} alt={p.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
})
