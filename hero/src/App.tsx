import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ScrubVideo from './components/ScrubVideo'

const HOME = '/hero.mp4?v=4'
const LABS = '/labs.mp4'
const STUDIO = '/studio.mp4?v=2'
const KNOCK = '/knock.mp4?v=2'

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
    const arm = () => {
      if (t) window.clearTimeout(t)
      t = window.setTimeout(() => setClip('knock'), IDLE_MS)
    }
    const dismiss = () => {
      if (clipRef.current === 'knock') setClip('home')
      arm()
    }
    const keepAlive = () => {
      if (clipRef.current === 'knock') return
      arm()
    }
    arm()
    window.addEventListener('mousemove', keepAlive, { passive: true })
    window.addEventListener('scroll', keepAlive, { passive: true })
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)
    window.addEventListener('touchstart', dismiss, { passive: true })
    return () => {
      if (t) window.clearTimeout(t)
      window.removeEventListener('mousemove', keepAlive)
      window.removeEventListener('scroll', keepAlive)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }
  }, [])

  return (
    <>
      <video src={LABS} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <video src={STUDIO} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <video src={KNOCK} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <ScrubVideo src={src} playing={playing} muted />
      <Navbar />
      <Hero
        clip={clip}
        onClipEnter={(id) => setClip(id)}
        onClipLeave={() => setClip((c) => (c === 'knock' ? c : 'home'))}
      />
    </>
  )
}
