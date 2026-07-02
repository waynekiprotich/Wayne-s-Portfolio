import { useState } from 'react'
import PillTag from '../components/UI/PillTag'

const FEATURE_OPTIONS = [
  { label: 'User Authentication', cost: 15000 },
  { label: 'Payment Integration', cost: 20000 },
  { label: 'Admin Dashboard', cost: 18000 },
  { label: 'CMS / Blog', cost: 10000 },
  { label: 'Booking / Scheduling', cost: 15000 },
  { label: 'Search & Filtering', cost: 8000 },
  { label: 'Third-Party API Integration', cost: 12000 },
  { label: 'Multi-language Support', cost: 10000 },
]

const TYPE_BASE = {
  'Business Website': 25000,
  'Portfolio': 15000,
  'E-commerce': 45000,
  'Custom Web App': 60000,
}

const PAGE_MULTIPLIER = {
  '1-3 pages': 1,
  '4-7 pages': 1.3,
  '8-15 pages': 1.7,
  '15+ pages': 2.2,
}

const TIMELINE_ADJUST = {
  'Flexible': 1,
  '1-2 months': 1.1,
  '2-4 weeks': 1.3,
  'Rush (under 2 weeks)': 1.6,
}

export default function Estimator() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    type: '',
    pages: '',
    features: [],
    style: '',
    timeline: '',
    budget: '',
    description: '',
    contact: { name: '', email: '' },
  })
  const [error, setError] = useState('')

  const steps = [
    { id: 1, title: 'Project Type' },
    { id: 2, title: 'Scope' },
    { id: 3, title: 'Features' },
    { id: 4, title: 'Style' },
    { id: 5, title: 'Timeline' },
    { id: 6, title: 'Budget' },
    { id: 7, title: 'Details' },
    { id: 8, title: 'Contact' },
  ]

  const update = (patch) => setData((d) => ({ ...d, ...patch }))

  const goNext = () => {
    setError('')
    setStep((s) => Math.min(s + 1, steps.length))
  }
  const goBack = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 1))
  }

  const toggleFeature = (label) => {
    update({
      features: data.features.includes(label)
        ? data.features.filter((f) => f !== label)
        : [...data.features, label],
    })
  }

  const calculateEstimate = () => {
    const base = TYPE_BASE[data.type] || 25000
    const pageMult = PAGE_MULTIPLIER[data.pages] || 1
    const featureCost = data.features.reduce((sum, label) => {
      const f = FEATURE_OPTIONS.find((opt) => opt.label === label)
      return sum + (f ? f.cost : 0)
    }, 0)
    const timelineMult = TIMELINE_ADJUST[data.timeline] || 1

    const low = Math.round(((base * pageMult + featureCost) * timelineMult) / 1000) * 1000
    const high = Math.round((low * 1.35) / 1000) * 1000
    return { low, high }
  }

  const handleSubmit = () => {
    if (!data.contact.name.trim() || !data.contact.email.trim()) {
      setError('Please add your name and email so I can reach you.')
      return
    }
    console.log('Estimate request submitted:', { ...data, estimate: calculateEstimate() })
    update({ submitted: true })
  }

  const canProceed = () => {
    switch (step) {
      case 2: return !!data.pages
      case 4: return !!data.style
      case 5: return !!data.timeline
      case 6: return !!data.budget
      default: return true
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-12">
        <PillTag>Project Estimator</PillTag>
        <h1 className="font-serif text-4xl text-ink mt-6">Get a Project Estimate</h1>
        <p className="text-pebble mt-3">
          Answer a few quick questions and get an instant ballpark estimate.
        </p>

        <div className="flex items-center justify-between mt-8 mb-2 text-xs text-pebble">
          <span>Step {step} of {steps.length}</span>
          <span>{steps[step - 1].title}</span>
        </div>
        <div className="w-full bg-fog dark:bg-white/10 h-2 rounded-full">
          <div
            className="bg-ink dark:bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-surface p-8 rounded-3xl shadow-apple-lg border border-fog dark:border-white/5 min-h-[320px] flex flex-col">
        <div className="flex-1 text-ink">
          {step === 1 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">What do you need?</h2>
              {Object.keys(TYPE_BASE).map((item) => (
                <button
                  key={item}
                  onClick={() => { update({ type: item }); goNext() }}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    data.type === item ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">How many pages or screens?</h2>
              {Object.keys(PAGE_MULTIPLIER).map((item) => (
                <button
                  key={item}
                  onClick={() => update({ pages: item })}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    data.pages === item ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-1">Which features do you need?</h2>
              <p className="text-pebble text-sm mb-4">Select all that apply — skip if you're not sure yet.</p>
              {FEATURE_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => toggleFeature(opt.label)}
                  className={`w-full flex items-center justify-between text-left p-4 rounded-xl border transition ${
                    data.features.includes(opt.label) ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                    data.features.includes(opt.label) ? 'bg-ink border-ink text-surface dark:bg-white dark:border-white dark:text-black' : 'border-fog dark:border-white/20'
                  }`}>
                    {data.features.includes(opt.label) ? '✓' : ''}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">What style are you going for?</h2>
              {['Minimal & Modern', 'Bold & Colorful', 'Corporate & Professional', 'Playful & Creative'].map((item) => (
                <button
                  key={item}
                  onClick={() => update({ style: item })}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    data.style === item ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">What's your timeline?</h2>
              {Object.keys(TIMELINE_ADJUST).map((item) => (
                <button
                  key={item}
                  onClick={() => update({ timeline: item })}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    data.timeline === item ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">What's your budget range?</h2>
              {['Under KES 50,000', 'KES 50,000 – 150,000', 'KES 150,000 – 350,000', 'KES 350,000+'].map((item) => (
                <button
                  key={item}
                  onClick={() => update({ budget: item })}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    data.budget === item ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10' : 'border-fog dark:border-white/10 hover:border-ink dark:hover:border-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Anything else I should know?</h2>
              <textarea
                value={data.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="Briefly describe your project, goals, or any existing branding/references..."
                rows={6}
                className="w-full p-4 rounded-xl border border-fog dark:border-white/10 focus:border-ink dark:focus:border-white outline-none resize-none bg-transparent"
              />
            </div>
          )}

          {step === 8 && !data.submitted && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Estimate</h2>
              <div className="bg-mist dark:bg-white/5 p-6 rounded-2xl mb-6 text-sm text-pebble dark:text-white/80 space-y-1">
                <p><strong className="text-ink dark:text-white">Project:</strong> {data.type}</p>
                <p><strong className="text-ink dark:text-white">Scope:</strong> {data.pages}</p>
                <p><strong className="text-ink dark:text-white">Features:</strong> {data.features.length ? data.features.join(', ') : 'None selected'}</p>
                <p><strong className="text-ink dark:text-white">Style:</strong> {data.style}</p>
                <p><strong className="text-ink dark:text-white">Timeline:</strong> {data.timeline}</p>
                <div className="pt-3 mt-3 border-t border-fog dark:border-white/10">
                  <p className="text-lg font-semibold text-ink dark:text-white">
                    Estimated Range: KES {calculateEstimate().low.toLocaleString()} – {calculateEstimate().high.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone mt-1">Final pricing depends on full requirements — this is a starting point.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={data.contact.name}
                  onChange={(e) => update({ contact: { ...data.contact, name: e.target.value } })}
                  className="p-3 rounded-xl border border-fog dark:border-white/10 focus:border-ink dark:focus:border-white outline-none bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={data.contact.email}
                  onChange={(e) => update({ contact: { ...data.contact, email: e.target.value } })}
                  className="p-3 rounded-xl border border-fog dark:border-white/10 focus:border-ink dark:focus:border-white outline-none bg-transparent"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-ink text-surface dark:bg-white dark:text-black px-8 py-3 rounded-full font-medium hover:opacity-80 transition"
              >
                Send Request
              </button>
            </div>
          )}

          {step === 8 && data.submitted && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-3">Request Sent ✓</h2>
              <p className="text-pebble dark:text-white/80">Thanks {data.contact.name.split(' ')[0]}! I'll get back to you at {data.contact.email} within 24 hours.</p>
            </div>
          )}
        </div>

        {step > 1 && step < 8 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-fog dark:border-white/5">
            <button onClick={goBack} className="text-stone dark:text-pebble underline text-sm">Back</button>
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="bg-ink text-surface dark:bg-white dark:text-black px-6 py-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
        {step === 8 && !data.submitted && (
          <div className="flex justify-start mt-4">
            <button onClick={goBack} className="text-stone dark:text-pebble underline text-sm">Back</button>
          </div>
        )}
      </div>
    </section>
  )
}