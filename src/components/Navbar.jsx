import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/estimator', label: 'Inquiry' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('#nav-root')) setMenuOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition ${
      isActive
        ? 'bg-ink/[0.08] text-ink font-medium'
        : 'text-pebble hover:bg-black/[0.05] hover:text-ink'
    }`

  return (
    <>
      <div className="h-[72px] w-full" />
      
      <div id="nav-root" className="fixed top-4 left-0 w-full flex justify-center z-50 px-4">
        <nav className="nav-glass w-full max-w-5xl flex justify-between items-center rounded-full px-5 py-3">
          <Link 
            to="/" 
            className="bg-black text-white font-semibold text-[15px] tracking-tight px-5 py-2 rounded-full hover:opacity-80 transition"
          >
            HOME
          </Link>

          <div className="hidden md:flex gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Wayne's CV.pdf"
              download="Wayne_Kiprotich_CV.pdf"
              className="bg-black text-white text-[13px] font-medium px-5 py-2 rounded-full hidden md:inline-block hover:opacity-80 transition"
            >
              Download CV
            </a>

            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="w-5 h-[1.5px] bg-ink rounded-full block" />
              <span className="w-5 h-[1.5px] bg-ink rounded-full block" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="absolute top-16 left-4 right-4 nav-glass rounded-2xl p-4 flex flex-col gap-1 md:hidden">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm rounded-xl transition ${
                    isActive
                      ? 'bg-ink/[0.07] text-ink font-medium'
                      : 'text-pebble hover:text-ink hover:bg-black/[0.04]'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            <div className="mt-2 pt-2 border-t border-fog">
              <a
                href="/Wayne's CV.pdf"
                download="Wayne_Kiprotich_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white block text-center text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-80 transition"
                onClick={() => setMenuOpen(false)}
              >
                Download CV
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}