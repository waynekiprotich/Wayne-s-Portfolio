import { memo } from 'react'
import PillTag from './PillTag'
import ProgressiveImage from './ProgressiveImage'

function LockIcon(props) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M2.5 9.5l7-7M9.5 2.5h-6M9.5 2.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ProjectCard = memo(function ProjectCard({
  id,
  tags = [],
  tech = [],
  previewImage = '',
  featured = false,
  onPreview,
  title,
  description,
  category,
  thumbStyle = {},
  delay = 0,
  codeHref = '#',
  liveHref = '#',
  github,
  live,
  project,
  priority = false,
}) {
  const resolvedCode = github || (codeHref !== '#' ? codeHref : '')
  const resolvedLive = live || (liveHref !== '#' ? liveHref : '')
  const resolvedTags = tags.length ? tags : tech

  const visibleTags = resolvedTags.slice(0, 5)
  const extraTagCount = resolvedTags.length - visibleTags.length

  const handleActivate = () => {
    onPreview && onPreview(project)
  }

  return (
    <article
      // The 'reveal' class was removed from the line below to prevent the cards from staying hidden
      className="project-card group h-full flex flex-col bg-surface rounded-3xl overflow-hidden shadow-apple transition-all duration-300 ease-out hover:shadow-apple-lg hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-ink/15 dark:focus-within:ring-white/25"
      style={{ transitionDelay: `${delay}s` }}
      onClick={handleActivate}
      role={onPreview ? 'button' : undefined}
      tabIndex={onPreview ? 0 : undefined}
      onKeyDown={(e) => {
        if (onPreview && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleActivate()
        }
      }}
      aria-label={onPreview ? `View ${title} project details` : undefined}
    >
      <div
        className="card-thumb relative aspect-video overflow-hidden bg-fog flex-shrink-0"
        style={!previewImage ? thumbStyle : {}}
      >
        {previewImage ? (
          <ProgressiveImage
            src={previewImage}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full z-0"
            imageClassName="group-hover:scale-[1.06]"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fog via-surface to-fog/60 z-0">
            <span className="font-serif text-lg text-ink/25 select-none">{title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent z-10" />

        <span className="absolute bottom-3 left-4 z-20 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/95 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {category}
        </span>

        {featured && (
          <span className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-surface/95 backdrop-blur-sm text-ink text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-apple">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <path d="M6 0l1.6 4.1L12 5l-3.3 2.9L9.7 12 6 9.5 2.3 12l1-4.1L0 5l4.4-.9L6 0z" />
            </svg>
            Featured
          </span>
        )}

        {onPreview && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors duration-300">
            <span className="opacity-0 group-hover:opacity-100 bg-surface text-ink text-[11px] font-semibold px-4 py-2 rounded-full shadow-apple-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Details
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[15px] text-ink dark:text-white mb-1.5 leading-snug">
          {title}
        </h3>
        <p className="text-[12.5px] text-stone dark:text-white/60 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {visibleTags.map((tag) => (
              <PillTag key={tag}>{tag}</PillTag>
            ))}
            {extraTagCount > 0 && (
              <span className="text-[10px] font-medium text-stone/80 dark:text-white/40 px-2.5 py-1 rounded-full bg-fog dark:bg-white/5">
                +{extraTagCount}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-1">
          {resolvedCode ? (
            <a
              href={resolvedCode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/btn flex items-center justify-center gap-1.5 bg-ink text-surface dark:bg-white dark:text-black hover:opacity-80 transition flex-1 text-center text-[11px] font-medium py-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-white"
            >
              Code
              <ArrowIcon className="w-2.5 h-2.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          ) : (
            <span className="flex items-center justify-center gap-1.5 bg-ink/5 dark:bg-white/5 text-stone dark:text-white/40 flex-1 text-center text-[11px] font-medium py-2.5 rounded-full cursor-not-allowed">
              <LockIcon className="w-2.5 h-2.5" />
              Private Repository
            </span>
          )}

          {resolvedLive && (
            <a
              href={resolvedLive}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/btn flex items-center justify-center gap-1.5 bg-ink/5 text-ink dark:bg-white/10 dark:text-white hover:bg-ink/10 dark:hover:bg-white/20 transition flex-1 text-center text-[11px] font-medium py-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-white"
            >
              Live
              <ArrowIcon className="w-2.5 h-2.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
})

export default ProjectCard