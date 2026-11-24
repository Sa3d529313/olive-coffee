import { memo, useEffect, useState } from 'react'
import { img, isOpenNow } from '../lib/brand'
import { En, Reveal, TreeMark } from '../components/ui'

// "What Olive is" as a grid of tiles: real photos with a short Arabic line and an English
// whisper under it, one green tile with the live opening status, one kraft tile with the cup.
export const Moments = memo(function Moments() {
  const [open, setOpen] = useState(isOpenNow())
  useEffect(() => {
    const t = window.setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="moments section section--first" id="moments">
      <div className="container">
        <Reveal className="moments__head">
          <h2 className="title">
            <span>ابتسم،</span> <span className="title__accent">إنت في أوليف</span>
            <En as="em">Smile, you're in Olive</En>
          </h2>
          <p className="moments__lead">
            محل قهوة صغير بواجهة زجاج على طريق صوفين. قهوة طيبة، مشروبات باردة بكل الألوان، فترينة مليانة كرواسون وكيك، وطاولة إلك لحد الساعة ٢ بالليل.
            <En as="small">A small glass coffee house on the road in Sofin.</En>
          </p>
        </Reveal>

        <div className="bento">
          <Reveal className="tile tile--photo tile--a" delay={0}>
            <img src={img('terrace-flowers.jpg')} alt="طاولات التراس بين الورد" loading="lazy" />
            <div className="tile__cap">
              <strong>قعدة بين الورد</strong>
              <En as="small">A terrace full of flowers</En>
            </div>
          </Reveal>

          <Reveal className="tile tile--green tile--b" delay={0.06}>
            <span className={`tile__status ${open ? 'is-open' : ''}`}>
              <i />
              {open ? 'مفتوح هلأ' : 'مسكّر هلأ'}
            </span>
            <p className="tile__big">
              ٨ الصبح
              <br />
              لـ ٢ بالليل
            </p>
            <En as="small">Every day, 8 AM – 2 AM</En>
            <TreeMark />
          </Reveal>

          <Reveal className="tile tile--photo tile--c" delay={0.12}>
            <img src={img('pastry-counter.jpg')} alt="فترينة الكرواسون وكاسات أوليف" loading="lazy" />
            <div className="tile__cap">
              <strong>كرواسون وكيك بالفترينة</strong>
              <En as="small">Croissants & cakes</En>
            </div>
          </Reveal>

          <Reveal className="tile tile--photo tile--d" delay={0.06}>
            <img src={img('espresso-machine.jpg')} alt="ماكينة الإسبريسو" loading="lazy" />
            <div className="tile__cap">
              <strong>قهوتك زي ما بتحبها</strong>
              <En as="small">Your coffee, your way</En>
            </div>
          </Reveal>

          <Reveal className="tile tile--kraft tile--e" delay={0.12}>
            <img src={img('hot-cup-smile.jpg')} alt="كاسة أوليف مكتوب عليها Smile you're in Olive" loading="lazy" />
            <div className="tile__cap">
              <strong>بارد، سخن، وبكل الألوان</strong>
              <En as="small">Iced, hot & every colour</En>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
})
