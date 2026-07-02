export default function PillTag({ children, className = '' }) {
  return (
    <span
      className={`inline-block bg-ink/5 dark:bg-white/10 rounded-full text-[0.7rem] font-medium tracking-[0.04em] text-pebble dark:text-white/80 px-[10px] py-1 ${className}`}
    >
      {children}
    </span>
  )
}
