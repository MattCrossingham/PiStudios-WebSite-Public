import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export default function ScrubVideo({
  src,
  playing,
}: {
  src: string
  playing: boolean
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
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    video.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [src, playing])

  return (
    <video
      key={src}
      ref={videoRef}
      className="scrub-video"
      src={src}
      muted
      playsInline
      preload="auto"
    />
  )
}
