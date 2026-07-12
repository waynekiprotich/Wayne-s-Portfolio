import { useState, useEffect, useMemo, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import useModal from '../hooks/useModal'
import PillTag from '../components/UI/PillTag'
import ProjectCard from '../components/UI/ProjectCard'
import ProjectPreviewModal from '../components/UI/ProjectPreviewModal'
import ModalErrorBoundary from '../components/UI/ModalErrorBoundary'
import { fetchProjects } from '../utils/api'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetical', label: 'Alphabetical' },
]

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ClearIcon(props) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="rounded-3xl overflow-hidden bg-surface shadow-apple animate-pulse"
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <div className="aspect-video bg-fog" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-2/3 rounded-full bg-fog" />
        <div className="h-3 w-full rounded-full bg-fog" />
        <div className="h-3 w-5/6 rounded-full bg-fog" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-14 rounded-full bg-fog" />
          <div className="h-5 w-14 rounded-full bg-fog" />
          <div className="h-5 w-10 rounded-full bg-fog" />
        </div>
        <div className="flex gap-2 pt-3">
          <div className="h-9 flex-1 rounded-full bg-fog" />
          <div className="h-9 flex-1 rounded-full bg-fog" />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="col-span-full flex flex-col items-center text-center py-24 px-6">
      <div className="w-14 h-14 rounded-full bg-fog flex items-center justify-center mb-5">
        <SearchIcon className="w-6 h-6 text-stone" />
      </div>
      <h3 className="font-serif text-2xl text-ink dark:text-white mb-2">No projects found</h3>
      <p className="text-[13px] text-pebble max-w-xs mb-6 leading-relaxed">
        Try changing your search or filter to see more work.
      </p>
      <button
        onClick={onReset}
        className="text-[12px] font-medium text-ink dark:text-white bg-ink/5 dark:bg-white/10 hover:bg-ink/10 dark:hover:bg-white/20 transition px-5 py-2.5 rounded-full"
      >
        Reset filters
      </button>
    </div>
  )
}

export default function Projects() {
  useScrollReveal()
  const { selectedProject, openModal, closeModal } = useModal()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProjects()
        if (isMounted) setProjects(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load projects:', err)
        if (isMounted) setError('Could not load projects. Please try again later.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadProjects()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
    return ['All', ...unique]
  }, [projects])

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase()

    let result = projects.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      if (!matchesCategory) return false
      if (!query) return true

      const haystack = [p.title, p.description, p.category, ...(p.tags || []), ...(p.tech || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return (a.title || '').localeCompare(b.title || '')
      }
      if (sortBy === 'newest') {
        const dateA = new Date(a.date || a.createdAt || a.year || 0).getTime()
        const dateB = new Date(b.date || b.createdAt || b.year || 0).getTime()
        if (dateB !== dateA) return dateB - dateA
        return (b.id ?? 0) - (a.id ?? 0)
      }
      const featuredDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      if (featuredDiff !== 0) return featuredDiff
      return (b.id ?? 0) - (a.id ?? 0)
    })

    return result
  }, [projects, search, activeCategory, sortBy])

  function resetFilters() {
    setSearch('')
    setActiveCategory('All')
  }

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label || 'Featured'

  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-28">
      <div className="relative text-center mb-16 fade-up delay-1">
        <div
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-gradient-to-b from-fog/70 to-transparent blur-3xl -z-10"
          aria-hidden="true"
        />
        <PillTag>Portfolio</PillTag>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink dark:text-white mt-6 leading-tight">
          Selected Work
        </h1>
        <p className="text-pebble text-[15px] sm:text-base mt-5 max-w-xl mx-auto leading-relaxed">
          A collection of products, tools, and client engagements built end-to-end &mdash;
          from first wireframe to production deploy.
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-10 fade-up delay-2">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <label className="relative flex-1 sm:max-w-sm">
            <span className="sr-only">Search projects</span>
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, tech, or category&hellip;"
              className="w-full bg-surface shadow-apple rounded-full pl-11 pr-10 py-3 text-[13px] text-ink dark:text-white placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-ink/15 dark:focus:ring-white/20 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-stone hover:text-ink dark:hover:text-white hover:bg-fog transition"
              >
                <ClearIcon className="w-3 h-3" />
              </button>
            )}
          </label>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className="w-full sm:w-auto flex items-center justify-between gap-3 bg-surface shadow-apple rounded-full pl-5 pr-4 py-3 text-[12px] font-medium text-ink dark:text-white hover:opacity-80 transition"
            >
              <span className="text-stone">Sort:</span>
              <span>{activeSortLabel}</span>
              <svg
                viewBox="0 0 10 6"
                fill="none"
                className={`w-2.5 h-2.5 text-stone transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {sortOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-44 bg-surface shadow-apple-lg rounded-2xl overflow-hidden py-1.5 z-30"
              >
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      role="option"
                      aria-selected={sortBy === opt.value}
                      onClick={() => {
                        setSortBy(opt.value)
                        setSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[12.5px] transition ${
                        sortBy === opt.value
                          ? 'text-ink dark:text-white font-semibold bg-fog/70 dark:bg-white/10'
                          : 'text-pebble hover:bg-fog/50 dark:hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`text-[11.5px] font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                    isActive
                      ? 'bg-ink text-surface dark:bg-white dark:text-black border-transparent shadow-apple'
                      : 'bg-surface text-pebble border-black/5 dark:border-white/10 hover:text-ink dark:hover:text-white hover:border-black/10 dark:hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {error ? (
        <div className="text-center py-20 text-red-500 text-[13px]">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} delay={i * 0.05} />)
            : visibleProjects.length > 0
            ? visibleProjects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  {...p}
                  delay={Math.min(i, 6) * 0.06}
                  onPreview={() => openModal(p)}
                />
              ))
            : <EmptyState onReset={resetFilters} />}
        </div>
      )}

      {selectedProject && (
        <ModalErrorBoundary resetKey={selectedProject.id} onError={closeModal}>
          <ProjectPreviewModal project={selectedProject} onClose={closeModal} />
        </ModalErrorBoundary>
      )}
    </section>
  )
}