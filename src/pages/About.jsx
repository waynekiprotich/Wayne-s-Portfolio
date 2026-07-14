import SEO from '../components/SEO'
import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Python', 'Flask', 'FastAPI', 'REST APIs', 'PostgreSQL'],
  },
  {
    category: 'Tools & Infra',
    items: ['Supabase', 'Git', 'Docker', 'AWS', 'Vite'],
  },
]

const stats = [
  { value: '3+', label: 'Shipped Projects' },
  { value: 'Nairobi', label: 'Based In' },
  { value: 'Full-Stack', label: 'Focus' },
  { value: 'Open', label: 'For Work' },
]

const timeline = [
  {
    period: 'Now',
    title: 'Freelance Full-Stack Engineer',
    description:
      'Building production web apps for clients and my own products — from schools and IT retailers to internal tools — while taking on new freelance work.',
  },
  {
    period: 'Recent',
    title: 'PersonalOS',
    description:
      'A 15-route productivity suite built on Next.js 15 and Supabase, with an AI coach, live analytics, and a full gamification system.',
  },
  {
    period: 'Recent',
    title: 'Stack Battle KE',
    description:
      'A competitive coding platform for Kenyan university students — Flask + PostgreSQL backend, React frontend, JWT auth, and a live code-execution engine, built end to end as a final-year project.',
  },
]

export default function About() {
  useScrollReveal()

  return (
    <>
      <SEO 
        title="Full-Stack Developer based in Nairobi"
        description="Learn more about Wayne Kiprotich, a full-stack software engineer building modern web applications."
        url="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": "Wayne Kiprotich",
            "jobTitle": "Full Stack Developer",
            "description": "Full-stack engineer based in Nairobi, working independently with clients and on own products."
          }
        }}
      />
      
      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">
      <div className="text-center mb-16 fade-up delay-1">
        <PillTag>About Me</PillTag>
        <h1 className="font-serif text-fluid-h1 text-ink mt-6 leading-tight">
          Full-Stack Developer<br />based in Nairobi
        </h1>
      </div>

      {/* Profile + intro */}
      <div className="reveal bg-surface rounded-4xl shadow-apple p-8 sm:p-12 grid md:grid-cols-2 gap-12 items-center mb-6">
        <div className="flex justify-center md:justify-start">
          <div className="profile-ring">
            <div className="w-52 sm:w-60 aspect-[4/5] rounded-[calc(1.5rem-3px)] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/profile.png"
                alt="Portrait of Wayne Kiprotich, Software Engineer"
              />
            </div>
          </div>
        </div>

        <div>
          <PillTag>Full-Stack Engineer</PillTag>
          <SectionDivider />

          <h2 className="font-serif text-fluid-h2 leading-tight mb-5 text-ink">
            Turning ideas into<br />real products
          </h2>

          <p className="text-pebble text-[15px] mb-6 leading-relaxed">
            I'm a full-stack engineer based in Nairobi, working independently with clients and
            on my own products. I move fluidly between frontend and backend — designing the
            data model one hour, polishing a transition the next.
          </p>

          <p className="text-pebble text-[15px] leading-relaxed">
            I care about systems that are simple to reason about and safe to change — clean
            APIs, sensible schemas, and interfaces that feel considered rather than assembled.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="reveal bg-surface rounded-3xl shadow-apple p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center sm:text-left">
            <p className="text-xl sm:text-[22px] font-semibold text-ink tracking-tight">
              {value}
            </p>
            <p className="text-xs text-stone mt-1 uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Currently building / timeline */}
      <div className="mb-6 fade-up">
        <PillTag>Currently</PillTag>
        <h3 className="font-serif text-fluid-h3 text-ink mt-4 mb-8">
          What I've been building
        </h3>
      </div>

      <div className="space-y-4 mb-16">
        {timeline.map(({ period, title, description }, i) => (
          <div
            key={title}
            className="reveal bg-surface rounded-3xl shadow-apple p-7 sm:p-8 grid sm:grid-cols-[100px_1fr] gap-4 sm:gap-8"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <p className="text-xs font-semibold text-stone uppercase tracking-widest pt-1">
              {period}
            </p>
            <div>
              <h4 className="font-semibold text-ink text-[17px] mb-2">{title}</h4>
              <p className="text-pebble text-[14px] leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6 fade-up">
        <PillTag>Toolkit</PillTag>
        <h3 className="font-serif text-fluid-h3 text-ink mt-4 mb-8">
          Technologies I work with
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {skills.map(({ category, items }, i) => (
          <div
            key={category}
            className="reveal bg-surface rounded-3xl p-7 shadow-apple"
            style={{ transitionDelay: `${i * 0.09}s` }}
          >
            <h3 className="font-semibold text-ink mb-4">{category}</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-pebble">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/30 dark:bg-white/30 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="reveal bg-surface rounded-4xl shadow-apple p-10 sm:p-14 text-center">
        <h3 className="font-serif text-fluid-h3 text-ink mb-3">
          Have a project in mind?
        </h3>
        <p className="text-pebble text-[15px] mb-7 max-w-md mx-auto leading-relaxed">
          I'm currently taking on new freelance work — happy to talk through what you're
          building and whether I'm a good fit.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-ink text-surface px-7 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </section>
    </>
  )
}