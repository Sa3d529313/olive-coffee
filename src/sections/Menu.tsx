import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MENU } from '../lib/menu'
import { MENU_PHOTOS } from '../lib/menuPhotos'
import { ORDER_APP, ORDER_URL } from '../lib/brand'
import { Button, En, Reveal, TreeMark } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const
const photoOf = (name: string) => MENU_PHOTOS[name] ?? null

// Phones and tablets (the one-column layout): the arch sits above the list, so a photo shown
// there is off-screen when you tap a dish further down. There the photo opens inside the row.
const PHONE = '(max-width: 960px)'
function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches)
  useEffect(() => {
    const mq = window.matchMedia(PHONE)
    const on = () => setPhone(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return phone
}

// The leaf that sits beside every heading on Olive's printed menu.
function Leaf({ className }: { className?: string }) {
  return (
    <svg className={`leaf ${className ?? ''}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 3C11 3 4 8 4 16c0 1.6.4 3 1 4 1-4 4-8 9-10-4 3-6.4 6.3-7.4 10.4C7.9 20.8 9 21 10 21c8 0 11-8 11-18Z" />
    </svg>
  )
}

// Olive – The Kitchen, built after the shop's printed menu: off-white, olive green, a leaf by
// each heading, an arch, names and prices joined by a thin line. Hover (or tap) a dish and its
// photo fills the arch.
export const Menu = memo(function Menu() {
  const [id, setId] = useState(MENU[0].id)
  const section = MENU.find((s) => s.id === id)!
  const [active, setActive] = useState(section.items[0].name)
  // Phone: which dish is opened by a tap (none at first; tap again to close).
  const [open, setOpen] = useState<string | null>(null)
  const phone = usePhone()
  const photo = phone ? null : photoOf(active)

  const pick = (sid: string) => {
    setId(sid)
    setActive(MENU.find((s) => s.id === sid)!.items[0].name)
    setOpen(null)
  }

  return (
    <section className="menu section" id="menu">
      <div className="container">
        <Reveal className="menu__head">
          <h2 className="title">
            <span>المنيو</span>
            <En as="em">Olive – The Kitchen</En>
          </h2>
          <Button href={ORDER_URL} external variant="outline">
            اطلب عبر {ORDER_APP}
          </Button>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="menu__tabs" role="tablist" aria-label="أقسام المنيو">
            {MENU.map((s) => (
              <button key={s.id} role="tab" aria-selected={id === s.id} className={`menu__tab ${id === s.id ? 'is-active' : ''}`} onClick={() => pick(s.id)}>
                <span>{s.ar}</span>
                <En as="small">{s.en}</En>
                {id === s.id && <motion.i layoutId="menu-line" className="menu__line" transition={{ duration: 0.6, ease: EASE }} />}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="menu__body">
          <div className={`menu__arch ${photo ? 'has-photo' : ''}`}>
            <TreeMark />
            <AnimatePresence initial={false}>
              {photo && (
                <motion.img
                  key={photo}
                  className="menu__photo"
                  src={photo}
                  alt=""
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={section.id}
                className="menu__arch-text"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Leaf />
                <h3>{section.ar}</h3>
                <En as="p" className="menu__arch-en">
                  {section.en}
                </En>
                {section.sub && <p className="menu__arch-sub">{section.sub}</p>}
                {section.until && <p className="menu__until">⏱ {section.until}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={section.id}
              className="menu__list"
              initial="hide"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.05 } }, hide: {} }}
            >
              {section.items.map((item) => {
                const thumb = photoOf(item.name)
                const opened = phone && open === item.name && !!thumb
                return (
                  <motion.li
                    key={item.name}
                    className={`menu__row ${(phone ? opened : item.name === active) ? 'is-active' : ''} ${thumb ? 'has-thumb' : ''}`}
                    variants={{ hide: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.7, ease: EASE }}
                    onMouseEnter={() => !phone && setActive(item.name)}
                    onClick={() => (phone ? setOpen(open === item.name ? null : item.name) : setActive(item.name))}
                    aria-expanded={phone && thumb ? opened : undefined}
                  >
                    {thumb && <img className="menu__thumb" src={thumb} alt="" loading="lazy" />}
                    <h4 className="menu__name">{item.name}</h4>
                    <span className="menu__dots" aria-hidden="true" />
                    <span className="menu__price" lang="en">
                      {item.price}
                      <small>₪</small>
                    </span>
                    <p className="menu__desc">{item.desc}</p>
                    <AnimatePresence initial={false}>
                      {opened && (
                        <motion.div
                          className="menu__open"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                        >
                          <img src={thumb!} alt={item.name} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
        </div>

        <p className="menu__foot">الأسعار بالشيكل · أطباق الفطور والبيض حتى الساعة ١٢ ظهراً · الصور للعرض فقط</p>
      </div>
    </section>
  )
})
