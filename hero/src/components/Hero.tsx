import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPE_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const EMAIL = 'matt@pistudios.app'

const PILLS = [
  { label: 'Labs', href: '/ai-agents.html', clip: true },
  { label: 'Studio', href: 'https://filmdesigns.tv', clip: false },
  { label: 'Openings', href: 'mailto:matt@pistudios.app?subject=Openings', clip: false },
  { label: 'Shop', href: 'https://nospeaky.ai', clip: false },
]

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function isCoarse() {
  return !window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export default function Hero({
  labsOn,
  onLabsEnter,
  onLabsLeave,
}: {
  labsOn: boolean
  onLabsEnter: () => void
  onLabsLeave: () => void
}) {
  const { displayed, done } = useTypewriter(TYPE_TEXT, 38, 600)
  const [copied, setCopied] = useState(false)
  const [pillsOn, setPillsOn] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setPillsOn(true), 400)
    return () => clearTimeout(id)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  const pillClass =
    'inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-[#00e5ff] px-4 py-[0.45em] mx-[0.15em] mb-[0.45em] text-[14px] text-black no-underline transition-colors duration-200 hover:bg-black hover:text-[#00e5ff] sm:min-h-0 sm:px-5 sm:text-[15px] sm:py-[0.3em]'

  return (
    <section
      className="relative z-[1] flex h-dvh flex-col justify-end overflow-hidden md:justify-center"
      style={{
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
        paddingTop: 'max(5.5rem, calc(env(safe-area-inset-top) + 4rem))',
      }}
      onClick={() => {
        if (labsOn && isCoarse()) onLabsLeave()
      }}
    >
      <div className="relative z-10 w-full max-w-xl">
        <p
          className="mb-4 text-[#00e5ff] sm:mb-6"
          style={{
            fontSize: 'clamp(16px, 4.6vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '2.6em',
          }}
        >
          {displayed}
          {!done && (
            <span className="cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-[#00e5ff]" />
          )}
        </p>

        <div
          className="flex flex-wrap"
          style={{
            opacity: pillsOn ? 1 : 0,
            transform: pillsOn ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILLS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              className={pillClass}
              onMouseEnter={p.clip ? onLabsEnter : undefined}
              onMouseLeave={p.clip && !isCoarse() ? onLabsLeave : undefined}
              onClick={(e) => {
                e.stopPropagation()
                if (!p.clip || !isCoarse()) return
                if (!labsOn) {
                  e.preventDefault()
                  onLabsEnter()
                }
              }}
            >
              {p.label}
            </a>
          ))}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              void copyEmail()
            }}
            className="mx-[0.15em] mb-[0.45em] inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full border border-[#00e5ff] bg-transparent px-4 py-[0.45em] text-[13px] text-[#00e5ff] transition-colors duration-200 hover:bg-[#00e5ff] hover:text-black sm:min-h-0 sm:gap-3 sm:px-5 sm:text-[15px] sm:py-[0.3em]"
          >
            <span className="max-w-full truncate">
              Reach us:{' '}
              <span className="underline underline-offset-1">
                {copied ? 'copied' : EMAIL}
              </span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
