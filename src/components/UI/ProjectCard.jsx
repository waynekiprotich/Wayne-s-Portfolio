export default function ProjectCard({ title, description, category, thumbStyle = {}, delay = 0, codeHref = '#', liveHref = '#' }) {
  return (
    <div
      className="reveal project-card bg-white rounded-3xl overflow-hidden shadow-apple"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Thumbnail */}
      <div
        className="card-thumb aspect-[4/3] flex items-end p-4"
        style={thumbStyle}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-pebble/60">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-[14px] text-ink mb-1">{title}</h3>
        <p className="text-[12px] text-stone mb-4 leading-snug">{description}</p>
        <div className="flex gap-2">
          <a
            href={codeHref}
            className="bg-black text-white hover:opacity-80 transition flex-1 text-center text-[11px] font-medium py-2 rounded-full"
          >
            Code
          </a>
          <a
            href={liveHref}
            className="bg-black text-white hover:opacity-80 transition flex-1 text-center text-[11px] font-medium py-2 rounded-full"
          >
            Live
          </a>
        </div>
      </div>
    </div>
  )
}