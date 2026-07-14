import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observeFallback = () => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'))
      }
      observeFallback()
      const tFallback = setTimeout(observeFallback, 100)
      return () => clearTimeout(tFallback)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    }

    observe()
    const t = setTimeout(observe, 100)

    return () => {
      observer.disconnect()
      clearTimeout(t)
    }
  }, [])
}