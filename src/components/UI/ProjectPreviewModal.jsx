import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PillTag from './PillTag'
import useScrollLock from "../../hooks/useScrollLock";

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

function MetaItem({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone/70 mb-1">{label}</p>
      <p className="text-[13px] text-ink dark:text-white font-medium">{value}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-7 last:mb-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone mb-3">{title}</p>
      {children}
    </div>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M2.5 9.5l7-7M9.5 2.5h-6M9.5 2.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon(props) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function ProjectPreviewModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useScrollLock(!!project)

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleEsc(e) {
      if (e.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (!project) return null

  const {
    title,
    description,
    category,
    tags = [],
    tech = [],
    previewImage,
    codeHref,
    liveHref,
    overview,
    problem,
    solution,
    features = [],
    challenges,
    results,
    client,
    industry,
    duration,
    role,
    year,
    status,
  } = project

  const resolvedTags = tags.length ? tags : tech
  const resolvedCode = codeHref && codeHref !== '#' ? codeHref : ''
  const resolvedLive = liveHref && liveHref !== '#' ? liveHref : ''

  const metaItems = [
    { label: 'Client', value: client },
    { label: 'Industry', value: industry },
    { label: 'Role', value: role },
    { label: 'Duration', value: duration },
    { label: 'Year', value: year },
    { label: 'Status', value: status },
  ].filter((item) => item.value)

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 180)
  }

  function handleBackdropClick(e) {
    if (e.target === backdropRef.current) handleClose()
  }

  // Safely portal the modal to the body
  return createPortal(
    <div
      ref={backdropRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/40 dark:bg-black/65 backdrop-blur-md overscroll-none transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={`${title} project details`}
    >
      <div
        className={`w-full max-w-2xl bg-surface rounded-4xl shadow-apple-xl overflow-hidden flex flex-col max-h-[90vh] min-h-0 transition-all duration-200 ease-out ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
        }`}
      >
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

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />

          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm shadow-apple flex items-center justify-center hover:opacity-80 transition text-pebble hover:text-ink dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {status && (
            <span className="absolute top-4 left-5 text-[9px] font-semibold uppercase tracking-widest text-white/95 bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
              {status}
            </span>
          )}

          <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-apple">
            {category}
          </span>
        </div>

        <div className="p-6 sm:p-8 flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink dark:text-white mb-3 leading-tight">
            {title}
          </h2>

          <p className="text-[14px] text-pebble leading-relaxed mb-6">{description}</p>

          {metaItems.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 mb-8 pb-8 border-b border-black/5 dark:border-white/10">
              {metaItems.map((item) => (
                <MetaItem key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          )}

          {overview && (
            <Section title="Overview">
              <p className="text-[13.5px] text-pebble leading-relaxed">{overview}</p>
            </Section>
          )}

          {problem && (
            <Section title="Problem">
              <p className="text-[13.5px] text-pebble leading-relaxed">{problem}</p>
            </Section>
          )}

          {solution && (
            <Section title="Solution">
              <p className="text-[13.5px] text-pebble leading-relaxed">{solution}</p>
            </Section>
          )}

          {resolvedTags.length > 0 && (
            <Section title="Technology Stack">
              <div className="flex flex-wrap gap-2">
                {resolvedTags.map((tag) => (
                  <PillTag key={tag}>{tag}</PillTag>
                ))}
              </div>
            </Section>
          )}

          {features.length > 0 && (
            <Section title="Features">
              <div className="grid sm:grid-cols-2 gap-2.5">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 bg-fog/60 dark:bg-white/5 rounded-2xl px-3.5 py-3"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-ink/50 dark:bg-white/50 flex-shrink-0" />
                    <span className="text-[12.5px] text-ink dark:text-white/90 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {challenges && (
            <Section title="Challenges">
              <p className="text-[13.5px] text-pebble leading-relaxed">{challenges}</p>
            </Section>
          )}

          {results && (
            <Section title="Results">
              <p className="text-[13.5px] text-pebble leading-relaxed">{results}</p>
            </Section>
          )}

          {(resolvedLive || resolvedCode) && (
            <div className="flex gap-3 pt-2">
              {resolvedLive && (
                <a
                  href={resolvedLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex-1 flex items-center justify-center gap-1.5 bg-ink text-surface dark:bg-white dark:text-black text-center text-[13px] font-medium py-3 rounded-full hover:opacity-80 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-white"
                >
                  Live Demo
                  <ArrowIcon className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              )}

              {resolvedCode ? (
                <a
                  href={resolvedCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex-1 flex items-center justify-center gap-1.5 bg-ink/5 text-ink dark:bg-white/10 dark:text-white text-center text-[13px] font-medium py-3 rounded-full hover:bg-ink/10 dark:hover:bg-white/20 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-white"
                >
                  View Code
                  <ArrowIcon className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              ) : (
                <span className="flex-1 flex items-center justify-center gap-1.5 bg-ink/5 dark:bg-white/5 text-stone dark:text-white/40 text-center text-[13px] font-medium py-3 rounded-full cursor-not-allowed">
                  <LockIcon className="w-3 h-3" />
                  Private Repository
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}