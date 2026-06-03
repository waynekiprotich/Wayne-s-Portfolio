import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
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

    // Observe all .reveal elements present now + any added later
    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    }

    observe()
    // Re-run after a tick in case elements render asynchronously
    const t = setTimeout(observe, 100)

    return () => {
      observer.disconnect()
      clearTimeout(t)
    }
  }, [])
}
