import { useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPE_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const EMAIL = 'matt@pistudios.app'

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPE_TEXT, 38, 600)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <p
          className="mb-5 text-[#00e5ff] sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: 54,
          }}
        >
          {displayed}
          {!done && (
            <span className="cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-[#00e5ff]" />
          )}
        </p>

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#00e5ff] bg-transparent px-4 py-[0.3em] text-[13px] text-[#00e5ff] transition-colors duration-200 hover:bg-[#00e5ff] hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
        >
          <span>
            Reach us:{' '}
            <span className="underline underline-offset-1">
              {copied ? 'copied' : EMAIL}
            </span>
          </span>
          <CopyIcon />
        </button>
      </div>
    </section>
  )
}
