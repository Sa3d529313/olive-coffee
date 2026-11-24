import { useCallback, useEffect, useState } from 'react'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './lib/scroll'
import { arrivalHash, currentPage, shouldPlayIntro } from './lib/pages'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Moments } from './sections/Moments'
import { Menu } from './sections/Menu'
import { Signature } from './sections/Signature'
import { Place } from './sections/Place'
import { Visit } from './sections/Visit'
import { Footer } from './sections/Footer'

const page = currentPage()

export default function App() {
  // The glass doors open on the home page whenever the site is opened or reloaded.
  const [loading, setLoading] = useState(() => page === 'home' && shouldPlayIntro())
  const [revealed, setRevealed] = useState(!loading)

  useEffect(() => {
    const lenis = initSmoothScroll()
    if (loading) lenis.stop()
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    if (!loading) landOnHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => {
    setLoading(false)
    initSmoothScroll().start()
    window.setTimeout(() => ScrollTrigger.refresh(), 1000)
    landOnHash()
  }, [])

  return (
    <>
      {loading && <Preloader onReveal={onReveal} onDone={onDone} />}
      <Nav />
      <main>
        {page === 'home' && (
          <>
            <Hero play={revealed} />
            <Place />
            <Menu />
            <Signature />
          </>
        )}
        {page === 'about' && <Moments />}
        {page === 'visit' && <Visit />}
      </main>
      <Footer />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

// Arrived from another page with a #section (e.g. "Menu" from About): glide to it once laid out.
function landOnHash() {
  if (!arrivalHash) return
  window.setTimeout(() => {
    ScrollTrigger.refresh()
    scrollToTarget(arrivalHash)
  }, 400)
}
