import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ScrubVideo from './components/ScrubVideo'

const HOME = '/hero.mp4?v=4'
const LABS = '/labs.mp4'

export default function App() {
  const [src, setSrc] = useState(HOME)
  const playing = src === LABS

  return (
    <>
      <video src={LABS} muted playsInline preload="auto" className="hidden" aria-hidden="true" />
      <ScrubVideo src={src} playing={playing} />
      <Navbar />
      <Hero
        onLabsEnter={() => setSrc(LABS)}
        onLabsLeave={() => setSrc(HOME)}
      />
    </>
  )
}
