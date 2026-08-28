export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center px-5 py-4 sm:px-8 sm:py-5">
      <a href="/" className="flex items-center no-underline" aria-label="Pi Studios">
        <img
          src="/logo.png"
          alt="Pi Studios"
          className="h-10 w-auto sm:h-12 select-none"
          draggable={false}
        />
      </a>
    </nav>
  )
}
