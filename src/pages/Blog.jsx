import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import PillTag from '../components/UI/PillTag'

export default function Blog() {
  useScrollReveal()

  return (
    <>
      <SEO 
        title="Software Engineering Blog & Insights"
        description="Technical deep dives, architectural breakdowns, and thoughts on software engineering by Wayne Kiprotich."
        url="/blog"
      />
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-14 fade-up delay-1">
        <PillTag>Writing</PillTag>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink dark:text-white mt-6 leading-tight">
          Software Engineering Blog
        </h1>

        <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
          Technical deep dives, architectural breakdowns, and thoughts on software engineering.
        </p>
      </div>

      <div className="reveal text-center py-28 bg-surface rounded-3xl border border-fog dark:border-white/10 shadow-apple">
        <PillTag>Coming Soon</PillTag>
        <h3 className="font-serif text-2xl md:text-3xl text-ink dark:text-white mt-6">
          Articles are on the way
        </h3>
        <p className="text-stone mt-3 text-[14px] max-w-sm mx-auto leading-relaxed">
          I'm writing up technical breakdowns from recent projects. Check back soon.
        </p>
      </div>
    </section>
    </>
  )
}