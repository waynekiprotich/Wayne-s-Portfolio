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

  // Changed h-11 to h-10 and px-5 to px-4 for proportional balance
  const linkClass = ({ isActive }) =>
    `inline-flex items-center justify-center h-10 px-4 rounded-full text-[15px] transition ${
      isActive
        ? 'bg-ink/10 text-ink dark:bg-white/10 dark:text-white font-medium'
        : 'text-pebble hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5 dark:hover:text-white'
    }`

  return (
    <>
      <div className="h-[72px]" />

      <div
        id="nav-root"
        className="fixed top-4 left-0 w-full flex justify-center z-50 px-4"
      >
        <div className="flex items-center gap-2 w-full max-w-5xl">
          {/* Changed px-3 to p-2 for a uniform 8px concentric gap around inner buttons */}
          <nav className="nav-glass flex-1 h-14 flex items-center justify-between rounded-full p-2">
            {/* HOME: Changed h-11 px-7 to h-10 px-6 */}
            <Link
              to="/"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-surface dark:bg-white dark:text-black text-[15px] font-semibold transition hover:opacity-90"
            >
              HOME
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={linkClass}>
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Download CV: Changed h-11 px-7 to h-10 px-6 */}
              <a
                href="/Wayne's CV.pdf"
                download="Wayne_Kiprotich_CV.pdf"
                className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-surface dark:bg-white dark:text-black text-[15px] font-semibold transition hover:opacity-90"
              >
                Download CV
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex flex-col justify-center items-center h-10 w-10 gap-[5px] rounded-full hover:bg-ink/5 dark:hover:bg-white/5 transition"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="w-5 h-[1.5px] bg-ink dark:bg-white rounded-full" />
                <span className="w-5 h-[1.5px] bg-ink dark:bg-white rounded-full" />
              </button>
            </div>
          </nav>

          {/* Theme Toggle: Kept consistent with the new 8px (p-2) mathematical ratio */}
          <div className="hidden md:flex">
            <div className="nav-glass h-14 w-14 rounded-full p-2 flex items-center justify-center">
              <button
                onClick={toggle}
                className="h-10 w-10 rounded-full flex items-center justify-center text-pebble hover:bg-ink/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-white transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 nav-glass rounded-2xl p-4 flex flex-col gap-1 md:hidden">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-3 text-[15px] rounded-xl transition ${
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
                className="flex items-center gap-2 text-[15px] text-pebble dark:text-white/80"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={16} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} />
                    Dark Mode
                  </>
                )}
              </button>
            </div>

            <div className="mt-2 pt-2 border-t border-fog dark:border-white/10">
              <a
                href="/Wayne's CV.pdf"
                download="Wayne_Kiprotich_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center h-11 leading-[44px] rounded-full bg-ink text-surface dark:bg-white dark:text-black text-[15px] font-semibold hover:opacity-90 transition"
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
