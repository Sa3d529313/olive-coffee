import { memo, type MouseEvent } from 'react'
import { scrollToTarget } from '../lib/scroll'
import { INSTAGRAM_URL, MAPS_URL, ORDER_APP, ORDER_URL, PHONE_DISPLAY, PHONE_INTL, img, waLink } from '../lib/brand'
import { currentPage, pageUrl, type Page } from '../lib/pages'
import { Button, En, Wordmark } from '../components/ui'
import { Flow } from '../components/Flow'

const here = currentPage()

// Same page: glide there. Another page: a normal link.
const go = (e: MouseEvent, page: Page, hash?: string) => {
  if (page !== here) return
  e.preventDefault()
  scrollToTarget(hash ?? 0)
}

export const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <Flow tone="forest" speed={0.1} />
      <div className="container">
        <div className="footer__brand" aria-hidden="true">
          <span>أوليف</span>
          <Wordmark className="footer__wm" />
        </div>

        <div className="footer__top">
          <div className="footer__card glass">
            <img src={img('logo-circle.png')} alt="Olive Coffee House" width="72" height="72" />
            <p className="footer__slogan">
              قهوة طيبة. مخبوزات دافية. <span>وابتسامة كبيرة.</span>
              <En as="small">Good coffee. Warm bakes. Big smiles.</En>
            </p>
            <Button href={ORDER_URL} external variant="cream">
              اطلب عبر {ORDER_APP}
            </Button>
          </div>
          <nav className="footer__cols" aria-label="روابط">
            <div>
              <h4>تصفّح</h4>
              <a href={pageUrl('home', '#menu')} onClick={(e) => go(e, 'home', '#menu')}>المنيو</a>
              <a href={pageUrl('about')} onClick={(e) => go(e, 'about')}>عن أوليف</a>
              <a href={pageUrl('visit')} onClick={(e) => go(e, 'visit')}>زورونا</a>
            </div>
            <div>
              <h4>زورونا</h4>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">صوفين، قلقيلية</a>
              <span>كل يوم ٨ص – ٢ل</span>
              <a href={`tel:+${PHONE_INTL}`}>
                <bdi dir="ltr">{PHONE_DISPLAY}</bdi>
              </a>
            </div>
            <div>
              <h4>تابعونا</h4>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">إنستغرام</a>
              <a href={waLink('مرحبا أوليف 🙂')} target="_blank" rel="noreferrer">واتساب</a>
            </div>
          </nav>
        </div>

        {/* Obzervo's standard credit bar (their snippet), with the credit centred between the
            legal line and the slogan. */}
        <div className="obz-bar footer__bottom" dir="ltr" lang="en">
          <p className="obz-legal">© {new Date().getFullYear()} Olive Coffee House · Palestine · All rights reserved.</p>
          <a className="obz-credit" href="https://obzervo.github.io/" target="_blank" rel="noopener" dir="ltr">
            <span>Designed &amp; built by</span>
            <svg className="obz-mark" viewBox="676 525 580 526" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="177" strokeLinecap="round">
                <path d="M873.5 613.5H1059.5" />
                <path d="M764 801L858 963" />
                <path d="M1168 801L1074 963" />
              </g>
            </svg>
            <b>Obzervo</b>
          </a>
          <p className="obz-legal">Smile, you're in Olive</p>
        </div>
      </div>
    </footer>
  )
})
