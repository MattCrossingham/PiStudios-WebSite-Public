import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export default function ScrubVideo({
  src,
  playing,
  muted = true,
}: {
  src: string
  playing: boolean
  muted?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (playing) {
      video.loop = true
      const start = () => {
        video.currentTime = 0
        void video.play()
      }
      if (video.readyState >= 2) start()
      else video.addEventListener('loadeddata', start, { once: true })
      return () => {
        video.removeEventListener('loadeddata', start)
        video.pause()
      }
    }

    video.loop = false
    video.pause()

    if (!canHover()) return

    let prevX: number | null = null
    let targetTime = 0
    let seeking = false

    const clamp = (t: number) => {
      const dur = video.duration
      if (!Number.isFinite(dur) || dur <= 0) return 0
      return Math.min(Math.max(t, 0), dur)
    }

    const applySeek = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      const t = clamp(targetTime)
      if (Math.abs(video.currentTime - t) < 0.01) return
      seeking = true
      video.currentTime = t
    }

    const onSeeked = () => {
      seeking = false
      if (Math.abs(video.currentTime - clamp(targetTime)) > 0.01) applySeek()
    }

    const onMove = (clientX: number) => {
      if (prevX === null) {
        prevX = clientX
        return
      }
      const delta = clientX - prevX
      prevX = clientX
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      targetTime = clamp(
        targetTime + (delta / window.innerWidth) * SENSITIVITY * video.duration,
      )
      if (!seeking) applySeek()
    }

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX)

    window.addEventListener('mousemove', onMouseMove)
    video.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [src, playing])

  return (
    <video
      key={src}
      ref={videoRef}
      className="scrub-video"
      src={src}
      muted={muted}
      playsInline
      preload="auto"
    />
  )
}
