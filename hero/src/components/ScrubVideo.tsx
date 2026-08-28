import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8
const SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'

export default function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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
  }, [])

  return (
    <video
      ref={videoRef}
      className="scrub-video"
      src={SRC}
      muted
      playsInline
      preload="auto"
    />
  )
}
