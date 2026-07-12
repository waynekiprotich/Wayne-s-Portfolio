export default function CheckboxCard({ label, checked, onToggle, hint }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-white ${
        checked
          ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10'
          : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
      }`}
    >
      <span className="flex flex-col">
        <span className="text-sm text-ink dark:text-white">{label}</span>
        {hint && <span className="text-xs text-stone mt-0.5">{hint}</span>}
      </span>
      <span
        className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center text-xs ${
          checked
            ? 'bg-ink border-ink text-surface dark:bg-white dark:border-white dark:text-black'
            : 'border-fog dark:border-white/20'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 16 16" width="10" height="10" fill="none" aria-hidden="true">
            <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  )
}