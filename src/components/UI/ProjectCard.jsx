import PillTag from './PillTag'

export default function ProjectCard({
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
}) {
  const resolvedCode = github || codeHref
  const resolvedLive = live || liveHref
  const resolvedTags = tags.length ? tags : tech

  return (
    <article
      className="reveal project-card bg-surface rounded-3xl overflow-hidden shadow-apple group cursor-pointer"
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onPreview && onPreview({ id, title, description, category, tags: resolvedTags, tech, previewImage, codeHref: resolvedCode, liveHref: resolvedLive, featured })}
      role={onPreview ? 'button' : undefined}
      tabIndex={onPreview ? 0 : undefined}
      onKeyDown={(e) => {
        if (onPreview && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onPreview({ id, title, description, category, tags: resolvedTags, tech, previewImage, codeHref: resolvedCode, liveHref: resolvedLive, featured })
        }
      }}
      aria-label={onPreview ? `View ${title} project details` : undefined}
    >
      <div
        className="card-thumb aspect-video flex items-end p-4 relative overflow-hidden bg-fog"
        style={!previewImage ? thumbStyle : {}}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-fog to-stone/20 z-0" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        <span className="relative z-20 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90">
          {category}
        </span>

        {featured && (
          <span className="absolute top-3 right-3 z-20 bg-surface text-ink text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-apple">
            Featured
          </span>
        )}

        {onPreview && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
            <span className="opacity-0 group-hover:opacity-100 bg-surface text-ink text-[11px] font-semibold px-4 py-2 rounded-full shadow-apple-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Details
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-[15px] text-ink mb-1.5 leading-snug">{title}</h3>
        <p className="text-[12px] text-stone mb-4 leading-relaxed line-clamp-2">{description}</p>

        {resolvedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resolvedTags.slice(0, 4).map((tag) => (
              <PillTag key={tag}>{tag}</PillTag>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <a
            href={resolvedCode}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-ink text-surface dark:bg-white dark:text-black hover:opacity-80 transition flex-1 text-center text-[11px] font-medium py-2.5 rounded-full"
          >
            Code
          </a>
          <a
            href={resolvedLive}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-ink/5 text-ink dark:bg-white/10 dark:text-white hover:bg-ink/10 dark:hover:bg-white/20 transition flex-1 text-center text-[11px] font-medium py-2.5 rounded-full"
          >
            Live Demo
          </a>
        </div>
      </div>
    </article>
  )
}