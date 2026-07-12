import { useMemo, useState } from 'react'
import CheckboxCard from './CheckboxCard'

export default function FeatureChecklist({ groups, selected, onToggle }) {
  const [query, setQuery] = useState('')

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groups
    const q = query.trim().toLowerCase()
    return groups
      .map((group) => ({
        ...group,
        features: group.features.filter((f) => f.label.toLowerCase().includes(q)),
      }))
      .filter((group) => group.features.length > 0)
  }, [groups, query])

  return (
    <div>
      <div className="relative mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search features"
          className="w-full p-3 pl-10 rounded-xl border border-fog dark:border-white/10 focus:border-ink dark:focus:border-white outline-none bg-transparent text-sm"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="space-y-6 max-h-[420px] overflow-y-auto pr-1">
        {filteredGroups.length === 0 && (
          <p className="text-sm text-pebble">No features match your search.</p>
        )}
        {filteredGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-xs font-medium uppercase tracking-wide text-stone mb-2.5">{group.label}</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {group.features.map((feature) => (
                <CheckboxCard
                  key={feature.id}
                  label={feature.label}
                  checked={selected.includes(feature.id)}
                  onToggle={() => onToggle(feature.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone mt-4">{selected.length} feature{selected.length === 1 ? '' : 's'} selected</p>
    </div>
  )
}