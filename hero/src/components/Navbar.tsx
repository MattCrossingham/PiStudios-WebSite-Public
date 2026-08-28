import { useState } from 'react'

const LINKS = [
  { label: 'Labs', href: '/ai-agents.html' },
  { label: 'Studio', href: 'https://filmdesigns.tv' },
  { label: 'Openings', href: 'mailto:matt@pistudios.app?subject=Openings' },
  { label: 'Shop', href: 'https://nospeaky.ai' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a href="/" className="flex items-center gap-3 text-[#00e5ff] no-underline">
          <span
            className="text-[21px] tracking-tight sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pi Studios®
          </span>
          <span
            className="select-none text-[25px] sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        <div className="hidden text-[23px] text-[#00e5ff] md:flex">
          {LINKS.map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span>, </span>}
              <a
                href={link.href}
                className="text-[#00e5ff] no-underline transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>

        <a
          href="mailto:matt@pistudios.app"
          className="hidden text-[23px] text-[#00e5ff] underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="flex flex-col gap-[5px] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-[2px] w-6 bg-[#00e5ff] transition duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#00e5ff] transition duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#00e5ff] transition duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[32px] font-medium text-[#00e5ff] no-underline"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:matt@pistudios.app"
          className="text-[32px] font-medium text-[#00e5ff] underline"
          onClick={() => setOpen(false)}
        >
          Get in touch
        </a>
      </div>
    </>
  )
}
