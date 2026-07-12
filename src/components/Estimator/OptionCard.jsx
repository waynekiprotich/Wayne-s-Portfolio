export default function OptionCard({ label, description, selected, onClick, dense = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-white ${
        dense ? 'p-3.5' : 'p-4'
      } ${
        selected
          ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10'
          : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
      }`}
    >
      <span className="block text-sm font-medium text-ink dark:text-white">{label}</span>
      {description && <span className="block text-xs text-pebble mt-1">{description}</span>}
    </button>
  )
}