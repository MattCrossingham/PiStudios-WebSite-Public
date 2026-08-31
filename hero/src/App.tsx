import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ScrubVideo from './components/ScrubVideo'

const HOME = '/hero.mp4?v=4'
const LABS = '/labs.mp4'
const STUDIO = '/studio.mp4?v=1'
const KNOCK = '/knock.mp4?v=1'

const IDLE_MS = 60_000

type Clip = 'home' | 'labs' | 'studio' | 'knock'

export default function App() {
  const [clip, setClip] = useState<Clip>('home')
  const clipRef = useRef(clip)
  clipRef.current = clip

  const src =
    clip === 'labs' ? LABS : clip === 'studio' ? STUDIO : clip === 'knock' ? KNOCK : HOME
  const playing = clip !== 'home'

  useEffect(() => {
    let t: number | undefined
    const bump = () => {
      if (clipRef.current === 'knock') setClip('home')
      if (t) window.clearTimeout(t)
      t = window.setTimeout(() => setClip('knock'), IDLE_MS)
    }
    bump()
    const evs = ['mousemove', 'keydown', 'pointerdown', 'touchstart', 'scroll'] as const
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }))
    return () => {
      if (t) window.clearTimeout(t)
      evs.forEach((e) => window.removeEventListener(e, bump))
    }
  }, [])

  return (
    <>
      <video src={LABS} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <video src={STUDIO} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <video src={KNOCK} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <ScrubVideo src={src} playing={playing} muted={clip !== 'knock'} />
      <Navbar />
      <Hero
        clip={clip}
        onClipEnter={(id) => setClip(id)}
        onClipLeave={() => setClip((c) => (c === 'knock' ? c : 'home'))}
      />
    </>
  )
}
