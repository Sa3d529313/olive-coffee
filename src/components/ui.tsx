import type { MouseEvent, ReactNode } from 'react'
import { motion } from 'motion/react'
import { scrollToTarget } from '../lib/scroll'
import { img } from '../lib/brand'

/** English text inside the Arabic (RTL) page. */
export function En({ children, className, as: Tag = 'span' }: { children: ReactNode; className?: string; as?: 'span' | 'p' | 'em' | 'small' }) {
  return (
    <Tag lang="en" className={`en ${className ?? ''}`.trim()}>
      {children}
    </Tag>
  )
}

/** Fade up once when it scrolls into view. */
export function Reveal({ children, delay = 0, y = 40, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Arrow() {
  return (
    <svg className="btn__arrow" width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The label is stacked twice; on hover one rolls out and the copy rolls in. */
export function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="btn__label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

type Variant = 'green' | 'cream' | 'outline' | 'glass' | 'kraft'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  href: string
  external?: boolean
  onClick?: () => void
  className?: string
}

/** Pill button with a rolling label; in-page anchors go through Lenis. */
export function Button({ children, variant = 'green', arrow = true, href, external, onClick, className = '' }: ButtonProps) {
  const click = (e: MouseEvent) => {
    onClick?.()
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollToTarget(href)
    }
  }
  return (
    <a href={href} className={`btn btn--${variant} ${className}`.trim()} onClick={click} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <RollLabel>{children}</RollLabel>
      {arrow && <Arrow />}
    </a>
  )
}

/** The olive tree from the logo, as a single-colour mark (takes currentColor). */
export function TreeMark({ className }: { className?: string }) {
  return <span className={`tree-mark ${className ?? ''}`.trim()} style={{ ['--tree' as string]: `url(${img('tree-mark.png')})` }} aria-hidden="true" />
}

/** Lettering cut from the logo, drawn as a mask so it takes the text colour. Height = 1em. */
function Lettering({ file, ratio, label, className }: { file: string; ratio: number; label: string; className?: string }) {
  return (
    <span
      className={`lettering ${className ?? ''}`.trim()}
      role="img"
      aria-label={label}
      style={{ ['--wm' as string]: `url(${img(file)})`, aspectRatio: String(ratio) }}
    />
  )
}

/** "Olive" (images/wordmark.png, 1506×451, leaf with its vein on the i). */
export const Wordmark = ({ className }: { className?: string }) => <Lettering file="wordmark.png" ratio={1506 / 451} label="Olive" className={`wordmark ${className ?? ''}`} />

/** "Coffee House" (images/coffee-house.png, 2010×266), the lighter line under Olive. */
export const CoffeeHouse = ({ className }: { className?: string }) => <Lettering file="coffee-house.png" ratio={2010 / 266} label="Coffee House" className={className} />

/** "Coffee" on its own (images/coffee.png, 971×266), same letters as in Coffee House. */
export const CoffeeWord = ({ className }: { className?: string }) => <Lettering file="coffee.png" ratio={971 / 266} label="Coffee" className={className} />

/** The shop's awning: "Olive" + a leaf (with its centre vein, like the leaf on the i), repeated, sliding slowly. Two identical halves loop seamlessly;
 *  each half must be wider than the widest screen (36 items ≈ 3800px), or the end shows. */
export function Awning({ className, count = 36 }: { className?: string; count?: number }) {
  const half = Array.from({ length: count })
  return (
    <div className={`awning ${className ?? ''}`.trim()} aria-hidden="true">
      <div className="awning__track">
        {[0, 1].map((copy) => (
          <div className="awning__group" key={copy}>
            {half.map((_, i) => (
              <span className="awning__item" key={i}>
                <Wordmark />
                <svg viewBox="0 0 20 32" className="awning__leaf">
                  <path d="M10 31C3 23 2 11 10 1c8 10 7 22 0 30Z" />
                  <path className="awning__vein" d="M10 27.5V6" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
