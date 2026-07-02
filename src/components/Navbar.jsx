import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import useTheme from '../hooks/useTheme'

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
  const { theme, toggle } = useTheme()

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
        ? 'bg-ink/10 text-ink dark:bg-white/10 dark:text-white font-medium'
        : 'text-pebble hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5 dark:hover:text-white'
    }`

  return (
    <>
      <div className="h-[72px] w-full" />
      
      <div id="nav-root" className="fixed top-4 left-0 w-full flex justify-center z-50 px-4">
        {/* Main Wrapper for Desktop Layout */}
        <div className="flex items-center gap-3 w-full max-w-5xl">
          
          {/* Main Navigation Pill */}
          <nav className="nav-glass flex-1 flex justify-between items-center rounded-full px-5 py-3">
            <Link 
              to="/" 
              className="bg-ink text-surface dark:bg-white dark:text-black font-semibold text-[15px] tracking-tight px-5 py-2 rounded-full hover:opacity-80 transition"
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
                className="bg-ink text-surface dark:bg-white dark:text-black text-[13px] font-medium px-5 py-2 rounded-full hidden md:inline-block hover:opacity-80 transition"
              >
                Download CV
              </a>

              <button
                className="md:hidden flex flex-col gap-[5px] p-1"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="w-5 h-[1.5px] bg-ink dark:bg-white rounded-full block transition-colors" />
                <span className="w-5 h-[1.5px] bg-ink dark:bg-white rounded-full block transition-colors" />
              </button>
            </div>
          </nav>

          {/* Theme Toggle Pill */}
          <div className="hidden md:flex">
            <div className="nav-glass rounded-full p-2 flex items-center justify-center">
              <button
                onClick={toggle}
                className="p-2 rounded-full text-pebble hover:bg-ink/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-white transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 nav-glass rounded-2xl p-4 flex flex-col gap-1 md:hidden">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm rounded-xl transition ${
                    isActive
                      ? 'bg-ink/10 text-ink dark:bg-white/10 dark:text-white font-medium'
                      : 'text-pebble hover:text-ink hover:bg-ink/5 dark:hover:text-white dark:hover:bg-white/5'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            <div className="flex justify-center py-3 border-t border-fog dark:border-white/10 mt-2">
              <button
                onClick={toggle}
                className="flex items-center gap-2 text-sm text-pebble dark:text-white/80"
              >
                {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
              </button>
            </div>

            <div className="mt-2 pt-2 border-t border-fog dark:border-white/10">
              <a
                href="/Wayne's CV.pdf"
                download="Wayne_Kiprotich_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-surface dark:bg-white dark:text-black block text-center text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-80 transition"
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