import useScrollReveal from '../hooks/useScrollReveal'
import useModal from '../hooks/useModal'
import PillTag from '../components/UI/PillTag'
import ProjectCard from '../components/UI/ProjectCard'
import ProjectPreviewModal from '../components/UI/ProjectPreviewModal'
import projects from '../data/projects'
import { useEffect } from 'react'

export default function Projects() {
  useScrollReveal()
  const { selectedProject, openModal, closeModal } = useModal()

  // 🔥 IMPORTANT: lock background scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto'
    document.documentElement.style.overflow = selectedProject ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [selectedProject])

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-14 fade-up delay-1">
          <PillTag>Portfolio</PillTag>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mt-6 leading-tight">
            Selected Work
          </h1>

          <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
            A collection of projects built with care, curiosity, and clean code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              {...p}
              onPreview={() => openModal(p)}
            />
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[9999]">
          <ProjectPreviewModal
            project={selectedProject}
            onClose={closeModal}
          />
        </div>
      )}
    </>
  )
}