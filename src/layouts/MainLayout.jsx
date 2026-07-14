import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-surface dark:focus:bg-white dark:focus:text-black">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 page-enter" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
