export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center px-5 py-4 sm:px-8 sm:py-5">
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
    </nav>
  )
}
