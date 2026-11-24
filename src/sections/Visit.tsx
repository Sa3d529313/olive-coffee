import { memo, useEffect, useState } from 'react'
import { INSTAGRAM_URL, MAPS_URL, ORDER_APP, ORDER_URL, PHONE_DISPLAY, PHONE_INTL, isOpenNow, waLink } from '../lib/brand'
import { Button, En, Reveal } from '../components/ui'

// The pin Olive shares on Instagram resolves to "Al-Sabi Nursery Co., Sofin, Qalqilya"
// (a search for "Olive coffee house" lands on a different shop in Jordan).
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent('Al-Sabi Nursery Co.، صوفين, Qalqilya')}&z=16&output=embed`

export const Visit = memo(function Visit() {
  const [open, setOpen] = useState(isOpenNow())
  useEffect(() => {
    const t = window.setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="visit section section--first" id="visit">
      <div className="container visit__grid">
        <div>
          <Reveal>
            <h2 className="title">
              <span>زورونا</span>
              <En as="em">Come by, we'll save you a seat</En>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className={`status ${open ? 'is-open' : ''}`}>
              <span className="status__dot" />
              {open ? 'مفتوح هلأ، لحد الساعة ٢ بالليل' : 'مسكّر هلأ، بنفتح الساعة ٨ الصبح'}
            </p>
            <dl className="info">
              <div>
                <dt>وين</dt>
                <dd>
                  صوفين، قلقيلية
                  <En as="small">Sofin, Qalqilya</En>
                </dd>
              </div>
              <div>
                <dt>إمتى</dt>
                <dd>
                  كل يوم، ٨ الصبح – ٢ بالليل
                  <En as="small">Every day, 8 AM – 2 AM</En>
                </dd>
              </div>
              <div>
                <dt>تلفون</dt>
                <dd>
                  <a href={`tel:+${PHONE_INTL}`} dir="ltr">
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.14} className="visit__actions">
            <Button href={MAPS_URL} external>
              الاتجاهات
            </Button>
            <Button href={ORDER_URL} external variant="outline">
              اطلب عبر {ORDER_APP}
            </Button>
            <Button href={waLink('مرحبا أوليف 🙂')} external variant="outline" arrow={false}>
              واتساب
            </Button>
            <Button href={INSTAGRAM_URL} external variant="outline" arrow={false}>
              إنستغرام
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="visit__map">
          <iframe title="خريطة أوليف" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={MAP_EMBED} />
        </Reveal>
      </div>
    </section>
  )
})
