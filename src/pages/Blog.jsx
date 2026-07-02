import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'

export default function Blog() {
  useScrollReveal()

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      {/* Header Section */}
      <div className="text-center mb-14 fade-up delay-1">
        <PillTag>Writing</PillTag>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink dark:text-white mt-6 leading-tight">
          Thoughts & Insights
        </h1>

        <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
          I'm currently putting together some technical deep dives and thoughts on software engineering. Stay tuned for updates!
        </p>
      </div>

      {/* Coming Soon Placeholder */}
      <div className="reveal text-center py-24 bg-surface rounded-3xl border border-fog dark:border-white/10 shadow-apple">
        <h3 className="text-xl font-medium text-ink dark:text-white">Coming Soon</h3>
        <p className="text-stone mt-2 text-[14px]">Technical articles and insights are currently in the works.</p>
      </div>
    </section>
  )
}