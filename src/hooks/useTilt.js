import { useState, useRef, useCallback } from 'react'

export function useTilt(strength = 15) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    setTilt({ x: y * strength, y: -x * strength })
  }, [strength])

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return { ref, tilt, handleMouseMove, handleMouseLeave }
}