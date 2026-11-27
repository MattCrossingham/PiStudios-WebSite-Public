/**
 * Free checklist download, ready around 11 Dec.
 * To publish it: set SHOW_CHECKLIST to true, add the PDF at
 * hero/public/ai-governance-checklist.pdf, then rebuild.
 */
const SHOW_CHECKLIST = false

const CARDS = [
  {
    title: 'Copilot and AI readiness',
    body: 'permissions and oversharing review, data labels, acceptable-use policy, pilot and baseline.',
  },
  {
    title: 'Identity security health check',
    body: 'Entra ID, Conditional Access, MFA, privileged access/PIM, guests, app registrations.',
  },
  {
    title: 'AI agents done securely',
    body: 'agent identities, least privilege, approvals, logging and kill switch.',
  },
] as const

const CTA =
  'mailto:info@pistudios.app?subject=Book%20a%20free%2020-minute%20chat'

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-[2] bg-black text-[#00e5ff]"
      style={{
        paddingTop: 'max(5rem, calc(env(safe-area-inset-top) + 3.5rem))',
        paddingBottom: 'max(5rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <h1
          id="services-heading"
          className="max-w-3xl font-normal text-balance"
          style={{ fontSize: 'clamp(28px, 4.6vw, 48px)', lineHeight: 1.15 }}
        >
          AI governance and identity security for real organisations
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-[17px] leading-relaxed sm:text-[19px]">
          Practical, plain-English help to roll out AI safely and get identity under control.
        </p>

        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 md:mt-12 md:grid-cols-3 md:gap-5">
          {CARDS.map((card) => (
            <li key={card.title} className="h-full">
              <article className="h-full rounded-2xl border border-[#00e5ff]/30 bg-[#00e5ff]/[0.04] p-6">
                <h2 className="mb-3 text-[18px] font-normal leading-snug">{card.title}</h2>
                <p className="text-[16px] leading-relaxed">{card.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-balance text-[16px] leading-relaxed sm:mt-12 sm:text-[17px]">
          <span className="tracking-[0.14em] uppercase">How we work:</span>{' '}
          a fixed-scope review first, a clear written report, then optional hands-on help.
        </p>

        <p className="mt-8">
          <a
            href={CTA}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-[#00e5ff] px-5 py-[0.45em] text-[15px] text-black no-underline transition-[background-color,color,border-color] duration-200 hover:border-[#00e5ff] hover:bg-black hover:text-[#00e5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff]"
          >
            Book a free 20-minute chat
          </a>
        </p>

        <p hidden={!SHOW_CHECKLIST} className={SHOW_CHECKLIST ? 'mt-6 text-[16px]' : 'hidden'}>
          <a
            href="/ai-governance-checklist.pdf"
            className="text-[#00e5ff] underline underline-offset-2"
          >
            Free checklist
          </a>
        </p>
      </div>
    </section>
  )
}
