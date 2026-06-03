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

  return { selectedProject, openModal, closeModal }
}