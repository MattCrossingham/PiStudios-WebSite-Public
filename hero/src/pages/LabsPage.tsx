import Navbar from '../components/Navbar'

const BLOCKS = [
  {
    title: 'Identity',
    body: 'Who can see what, and who can make the system do something. Access follows your organisation — not a shared chat box. People, groups, and roles stay yours.',
  },
  {
    title: 'Knowledge',
    body: 'Answers from your material, not the open internet. Documents, policies, and records stay inside the boundary you set. If someone should not see it, the system does not say it.',
  },
  {
    title: 'Agents',
    body: 'Software that takes real steps: read, decide, write back, hand off. Guardrails first. Logging. Kill switch. Not a toy that emails the world because nobody told it not to.',
  },
  {
    title: 'Production',
    body: 'Film and picture work wired as a system: continuity, versions, delivery. The same discipline we use on our own pictures — so a company can run a pipeline without living in one person’s laptop.',
  },
  {
    title: 'Deployed',
    body: 'We put it where it belongs. Your tenant, your rules, your operators. We do not list the stack on a brochure. We ship the thing and leave you in control.',
  },
]

export default function LabsPage() {
  return (
    <>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/labs-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-[78%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent md:via-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black" />
      </div>
      <main
        className="relative z-[1] min-h-dvh text-[#00e5ff]"
        style={{
          paddingTop: 'max(6rem, calc(env(safe-area-inset-top) + 5rem))',
          paddingBottom: 'max(3rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        }}
      >
        <div className="mx-auto max-w-xl md:mx-0 md:max-w-lg lg:max-w-xl">
          <div className="flex min-h-[70dvh] flex-col justify-end pb-10 md:justify-center md:pb-0">
            <p className="mb-2 text-[13px] tracking-[0.2em] uppercase opacity-70">Labs</p>
            <h1
              className="mb-6 font-normal"
              style={{ fontSize: 'clamp(22px, 5vw, 32px)', lineHeight: 1.25 }}
            >
              Systems for companies that need them built properly.
            </h1>
            <p className="text-[16px] leading-relaxed opacity-90 sm:text-[17px]">
              Identity. Knowledge that stays put. Agents that do work under control.
              Production pipelines that actually ship. Same outfit that makes the pictures.
            </p>
          </div>

          <div className="relative rounded-sm bg-black/80 py-8 pr-2 backdrop-blur-[2px] md:bg-black/90">
            {BLOCKS.map((b) => (
              <section key={b.title} className="mb-9 last:mb-0">
                <h2 className="mb-2 text-[15px] tracking-[0.12em] uppercase">{b.title}</h2>
                <p className="text-[16px] leading-relaxed opacity-90" style={{ overflowWrap: 'anywhere' }}>
                  {b.body}
                </p>
              </section>
            ))}

            <p className="mt-12 text-[15px]">
              <a href="mailto:info@pistudios.app?subject=Labs" className="text-[#00e5ff] underline underline-offset-2">
                info@pistudios.app
              </a>
              <span className="mx-3 opacity-40">/</span>
              <a href="/" className="text-[#00e5ff] no-underline opacity-80 hover:opacity-100">
                Home
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
