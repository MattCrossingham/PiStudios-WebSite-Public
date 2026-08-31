import Navbar from '../components/Navbar'

const BLOCKS = [
  {
    title: 'Identity',
    body: 'Who can see what, and who can make it do something. Yours — not a shared box.',
  },
  {
    title: 'Knowledge',
    body: 'Answers from your material. If they should not see it, the system does not say it.',
  },
  {
    title: 'Agents',
    body: 'Real steps: read, decide, write back, hand off. Guardrails. Logging. Kill switch.',
  },
  {
    title: 'Production',
    body: 'Pictures as a system. Continuity, versions, delivery — not one person’s laptop.',
  },
  {
    title: 'Deployed',
    body: 'Your tenant. Your rules. We ship it and leave you in control.',
  },
]

export default function LabsPage() {
  return (
    <>
      <video
        src="/labs.mp4"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/72" />
      <Navbar />
      <main
        className="relative z-[1] min-h-dvh text-[#00e5ff]"
        style={{
          paddingTop: 'max(6rem, calc(env(safe-area-inset-top) + 5rem))',
          paddingBottom: 'max(3rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        }}
      >
        <div className="mx-auto w-full max-w-xl">
          <p className="mb-3 text-[12px] tracking-[0.28em] uppercase opacity-70 sm:text-[13px]">Labs</p>
          <h1
            className="mb-5 font-normal"
            style={{ fontSize: 'clamp(28px, 7vw, 48px)', lineHeight: 1.12 }}
          >
            Systems for companies that need them built properly.
          </h1>
          <p className="mb-12 max-w-[34rem] text-[16px] leading-relaxed opacity-90 sm:text-[18px]">
            Identity. Knowledge. Agents. Production. Same outfit that makes the pictures.
          </p>

          {BLOCKS.map((b) => (
            <section key={b.title} className="mb-10 border-t border-[#00e5ff]/25 pt-5">
              <h2 className="mb-2 text-[13px] tracking-[0.18em] uppercase sm:text-[14px]">{b.title}</h2>
              <p className="text-[17px] leading-snug opacity-90 sm:text-[19px]" style={{ overflowWrap: 'anywhere' }}>
                {b.body}
              </p>
            </section>
          ))}

          <p className="mt-14 text-[15px]">
            <a
              href="mailto:info@pistudios.app?subject=Labs"
              className="inline-flex min-h-11 items-center text-[#00e5ff] underline underline-offset-2"
            >
              info@pistudios.app
            </a>
            <span className="mx-3 opacity-40">/</span>
            <a href="/" className="inline-flex min-h-11 items-center text-[#00e5ff] no-underline opacity-80 hover:opacity-100">
              Home
            </a>
          </p>
        </div>
      </main>
    </>
  )
}
