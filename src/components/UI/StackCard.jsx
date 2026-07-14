import { memo } from 'react'
import PillTag from './PillTag'

const StackCard = memo(function StackCard({
  icon,
  title,
  description,
  tags = [],
  delay = 0,
}) {
  return (
    <div
      className="reveal stack-card h-full bg-surface rounded-3xl p-7 shadow-apple hover:shadow-apple-lg transition-all duration-300 flex flex-col"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="w-9 h-9 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center mb-5">
        {icon}
      </div>

      <h3 className="font-semibold text-ink dark:text-white mb-3">
        {title}
      </h3>

      <p className="text-stone text-[13px] leading-relaxed min-h-[88px]">
        {description}
      </p>

      <div className="mt-auto pt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <PillTag key={tag}>{tag}</PillTag>
        ))}
      </div>
    </div>
  )
})

export default StackCard