export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  required,
  error,
  rows,
  min,
}) {
  const baseClasses =
    'w-full p-3 rounded-xl border border-fog dark:border-white/10 focus:border-ink dark:focus:border-white outline-none bg-transparent text-sm text-ink dark:text-white placeholder:text-stone'

  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink dark:text-white mb-1.5">
        {label}
        {required && <span className="text-stone"> *</span>}
      </span>

      {type === 'select' && (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={baseClasses}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.id || opt} value={opt.id || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 5}
          className={`${baseClasses} resize-none`}
        />
      )}

      {type !== 'select' && type !== 'textarea' && (
        <input
          type={type}
          value={value}
          min={min}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}

      {error && <span className="block text-xs text-red-500 mt-1.5">{error}</span>}
    </label>
  )
}