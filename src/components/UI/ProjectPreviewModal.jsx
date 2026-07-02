import { useRef, useEffect } from 'react'
import PillTag from './PillTag'

function ImagePlaceholder({ title, category }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-fog via-surface to-fog/60 select-none">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone/60">
        {category}
      </span>
      <span className="font-serif text-2xl text-ink/30">{title}</span>
    </div>
  )
}

export default function ProjectPreviewModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const closeButtonRef = useRef(null)

  if (!project) return null

  const {
    title,
    description,
    category,
    tags = [],
    tech = [],
    previewImage,
    codeHref,
    liveHref
  } = project

  const resolvedTags = tags.length ? tags : tech

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleEsc(e) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  function handleBackdropClick(e) {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/40 dark:bg-black/60 backdrop-blur-sm overscroll-none"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={`${title} project details`}
    >
      <div className="w-full max-w-2xl bg-surface rounded-4xl shadow-apple-xl overflow-hidden flex flex-col max-h-[90vh] min-h-0">
        <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-fog">
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${title} screenshot`}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder title={title} category={category} />
          )}

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm shadow-apple flex items-center justify-center hover:opacity-80 transition text-pebble hover:text-ink dark:hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-apple">
            {category}
          </span>
        </div>

        <div className="p-6 sm:p-8 flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3 leading-tight">
            {title}
          </h2>

          <p className="text-[14px] text-pebble leading-relaxed mb-6">
            {description}
          </p>

          {resolvedTags.length > 0 && (
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {resolvedTags.map((tag) => (
                  <PillTag key={tag}>{tag}</PillTag>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {liveHref && liveHref !== '#' && (
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-ink text-surface dark:bg-white dark:text-black text-center text-[13px] font-medium py-3 rounded-full hover:opacity-80 transition"
              >
                Live Demo
              </a>
            )}

            {codeHref && codeHref !== '#' && (
              <a
                href={codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-ink/5 text-ink dark:bg-white/10 dark:text-white text-center text-[13px] font-medium py-3 rounded-full hover:bg-ink/10 dark:hover:bg-white/20 transition"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}