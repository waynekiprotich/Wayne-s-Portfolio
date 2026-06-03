import { useState, useCallback, useEffect } from 'react'

export default function useModal() {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = useCallback((project) => {
    setSelectedProject(project)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  useEffect(() => {
    if (!selectedProject) return

    const handler = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedProject, closeModal])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (selectedProject) {
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
      html.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
      html.style.overflow = ''
    }
  }, [selectedProject])

  return { selectedProject, openModal, closeModal }
}