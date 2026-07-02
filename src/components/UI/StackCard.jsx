import PillTag from './PillTag'

export default function StackCard({ icon, title, description, tags = [], delay = 0 }) {
  return (
    <div
      className="reveal stack-card bg-surface rounded-3xl p-7 shadow-apple hover:shadow-apple-lg transition-shadow"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="w-9 h-9 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-semibold text-ink mb-2">{title}</h3>
      <p className="text-stone text-[13px] leading-relaxed">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <PillTag key={tag}>{tag}</PillTag>
        ))}
      </div>
    </div>
  )
}
