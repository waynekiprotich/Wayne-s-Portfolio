import { useEffect, useRef } from 'react'

export default function useScrollLock(active) {
  const scrollY = useRef(0)

  useEffect(() => {
    if (!active) return

    scrollY.current = window.scrollY
    const { style } = document.body

    document.documentElement.style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY.current}px`
    style.left = '0'
    style.right = '0'

    return () => {
      document.documentElement.style.overflow = ''
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      window.scrollTo(0, scrollY.current)
    }
  }, [active])
}