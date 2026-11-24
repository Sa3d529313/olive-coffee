import { useEffect, useRef, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { reducedMotion } from '../lib/scroll'

// Organic light that drifts and swirls (no round blobs). The base colour repeats so the
// field stays calm and the greens move through it. Rendered small on purpose: the browser
// stretches it smoothly, which frosts it for free. Paused when off-screen or the tab is hidden.
const PALETTES = {
  sage: ['#DDE4D0', '#F4EEE2', '#DDE4D0', '#AFC096', '#F4EEE2', '#DDE4D0', '#8FA27A', '#E9E1CF'],
  forest: ['#142A1D', '#1F3D2B', '#142A1D', '#142A1D', '#4F6B3E', '#142A1D', '#2C4A32', '#142A1D'],
}

export function Flow({ tone = 'sage', speed = 0.14 }: { tone?: keyof typeof PALETTES; speed?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!box.current) return
    let inView = false
    const update = () => setLive(inView && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      update()
    }, { rootMargin: '200px' })
    io.observe(box.current)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div className="flow" ref={box} aria-hidden="true">
      <MeshGradient
        colors={PALETTES[tone]}
        distortion={0.95}
        swirl={0.7}
        grainMixer={0}
        grainOverlay={0}
        speed={live && !reducedMotion() ? speed : 0}
        minPixelRatio={0.1}
        maxPixelCount={560 * 380}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
