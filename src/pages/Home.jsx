import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'
import StackCard from '../components/UI/StackCard'
import ProjectCard from '../components/UI/ProjectCard'

const FrontendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const BackendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const ToolsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
)

const projects = [
  {
    title: 'Stack-Battle KE',
    description: 'Coding platform',
    category: 'Stack-Battle KE',
    image: '/stack-battle-ke.png',
    delay: 0,
    codeHref: 'https://github.com/Leevy-Otieno/Stacke_Battleke_frontend',
    liveHref: 'https://stacke-battleke-frontend.vercel.app',
  },
  {
    title: 'AI Scraper',
    description: 'Automation tool',
    category: 'AI Tool',
    image: '/ai-scraper.png',
    delay: 0.07,
    codeHref: 'https://github.com/waynekiprotich',
    liveHref: '#',
  },
  {
    title: 'Portfolio',
    description: 'Developer site',
    category: 'Portfolio',
    image: '/portfolio.png',
    delay: 0.14,
    codeHref: 'https://github.com/waynekiprotich',
    liveHref: '#',
  },
  {
    title: 'NexusFlow',
    description: 'Platform',
    category: 'System',
    image: '/nexusflow.png',
    delay: 0.21,
    codeHref: 'https://github.com/waynekiprotich',
    liveHref: '#',
  },
]

export default function Home() {
  useScrollReveal()

  return (
    <>
      <header className="relative max-w-4xl mx-auto text-center px-6 pt-28 pb-24">
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #c7c7cc 0%, transparent 70%)', filter: 'blur(48px)' }}
        />

        <div className="fade-up delay-1 flex flex-col items-center gap-4 mb-2">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow-apple-lg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Wayne Kiprotich"
              className="w-full h-full object-cover"
            />
          </div>
          <PillTag>Full-Stack Developer · Nairobi</PillTag>
        </div>

        <h1 className="fade-up delay-2 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6 text-ink">
          Mastering full&#8209;stack<br />
          <em className="not-italic text-stone">engineering.</em>
        </h1>

        <p className="fade-up delay-3 text-pebble max-w-lg mx-auto mb-10 text-[15px] leading-relaxed">
          Building clean, scalable and modern web systems with React, Python and APIs.
        </p>

        <div className="fade-up delay-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="bg-black text-white text-[14px] font-medium px-7 py-3 rounded-full hover:opacity-80 transition"
          >
            View Work
          </Link>

          <Link
            to="/about"
            className="bg-black text-white text-[14px] font-medium px-7 py-3 rounded-full hover:opacity-80 transition"
          >
            About Me
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Capabilities</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-3xl md:text-4xl text-ink">My Stack</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <StackCard icon={<FrontendIcon />} title="Frontend" description="React · Tailwind CSS · JavaScript" tags={['React', 'Tailwind', 'JS']} delay={0} />
          <StackCard icon={<BackendIcon />} title="Backend" description="Python · Flask · SQL" tags={['Python', 'Flask', 'SQL']} delay={0.08} />
          <StackCard icon={<ToolsIcon />} title="Tools" description="Git · Docker · Ubuntu" tags={['Git', 'Docker', 'Ubuntu']} delay={0.16} />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <PillTag>Portfolio</PillTag>
            <SectionDivider />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">Projects</h2>
          </div>

          <Link to="/projects" className="text-[13px] text-pebble hover:text-ink transition underline underline-offset-4 hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 pb-24">
        <div className="reveal bg-white rounded-4xl px-8 py-16 sm:py-20 text-center shadow-apple relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse,#0A0A0B,transparent)', filter: 'blur(40px)' }}
          />

          <PillTag className="mb-6">Get in Touch</PillTag>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-4 leading-tight">
            Let's build something
          </h2>

          <p className="text-pebble text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Open for opportunities and collaborations.
          </p>

          <Link
            to="/contact"
            className="bg-black text-white text-[14px] font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-80 transition"
          >
            Email Me
          </Link>
        </div>
      </section>
    </>
  )
}