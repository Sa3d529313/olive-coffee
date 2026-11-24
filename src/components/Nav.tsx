import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getLenis, scrollToTarget } from '../lib/scroll'
import { ORDER_URL, img } from '../lib/brand'
import { currentPage, pageUrl, type Page } from '../lib/pages'
import { Awning, Button, CoffeeHouse, Wordmark } from './ui'

// Header labels are English only (the classic for a menu bar). Menu is a section on the
// home page; About and Visit are pages of their own.
const LINKS: { label: string; page: Page; hash?: string }[] = [
  { label: 'Menu', page: 'home', hash: '#menu' },
  { label: 'About', page: 'about' },
  { label: 'Visit', page: 'visit' },
]

const here = currentPage()

// Full-width bar. Over the home hero it is see-through; once you scroll (or on the other
// pages, which have no hero) it is cream and the shop's awning hangs underneath it.
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const solid = scrolled || here !== 'home'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open])

  // Same page: glide there. Another page: a normal link.
  const go = (e: MouseEvent, page: Page, hash?: string) => {
    setOpen(false)
    if (page !== here) return
    e.preventDefault()
    scrollToTarget(hash ?? 0)
  }

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`} lang="en" dir="ltr">
        <div className="nav__bar">
          <a className="nav__home" href={pageUrl('home')} onClick={(e) => go(e, 'home')} aria-label="Olive Coffee House, home">
            <img className="nav__logo" src={img('logo-circle.png')} alt="" />
            <span className="nav__lockup">
              <Wordmark />
              <CoffeeHouse />
            </span>
          </a>
          <nav className="nav__links" aria-label="Main">
            {LINKS.map((l) => (
              <a key={l.label} href={pageUrl(l.page, l.hash)} onClick={(e) => go(e, l.page, l.hash)} aria-current={!l.hash && l.page === here ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav__end">
            <Button href={ORDER_URL} external variant={solid ? 'green' : 'cream'} className="nav__cta">
              Order now
            </Button>
            <button className="nav__menu" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
              <span />
              <span />
            </button>
          </div>
        </div>
        <Awning className="nav__awning" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" lang="en" dir="ltr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={pageUrl(l.page, l.hash)}
                onClick={(e) => go(e, l.page, l.hash)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <Button href={ORDER_URL} external variant="cream">
                Order now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
