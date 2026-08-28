export default function Navbar() {
  return (
    <nav
      className="fixed top-0 z-10 flex w-full items-center px-5 sm:px-8"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        paddingBottom: '0.75rem',
      }}
    >
      <a href="/" className="flex max-w-[55%] items-center no-underline sm:max-w-none" aria-label="Pi Studios">
        <img
          src="/logo.png"
          alt="Pi Studios"
          className="h-8 w-auto select-none sm:h-12"
          draggable={false}
        />
      </a>
    </nav>
  )
}
