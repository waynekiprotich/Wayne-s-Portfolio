import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import useModal from '../hooks/useModal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'
import StackCard from '../components/UI/StackCard'
import ProjectCard from '../components/UI/ProjectCard'
import ProjectPreviewModal from '../components/UI/ProjectPreviewModal'
import projects from '../data/projects'

const FrontendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const BackendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const CloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.7-1.6A4.5 4.5 0 0 0 6.5 19h11Z" />
  </svg>
)

const ToolsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
)

const homeProjects = projects.slice(0, 4)

export default function Home() {
  useScrollReveal()
  const { selectedProject, openModal, closeModal } = useModal()

  return (
    <>
      <header className="relative max-w-4xl mx-auto text-center px-6 pt-28 pb-24">
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgb(var(--c-stone)) 0%, transparent 70%)',
            filter: 'blur(48px)'
          }}
        />

        <div className="fade-up delay-1 flex flex-col items-center gap-4 mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-surface shadow-apple-lg">
            <img
              src="https://i.pinimg.com/736x/05/19/94/05199421184c6c13ccfdb930a587b546.jpg"
              alt="Wayne Kiprotich"
              className="w-full h-full object-cover"
            />
          </div>

          <PillTag>Full-Stack Developer · Nairobi</PillTag>
        </div>

        <h1 className="fade-up delay-2 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6 text-ink dark:text-white">
          Hi! I'm Wayne Kiprotich.
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl">
            Building modern web systems.
          </span>
        </h1>

        <div className="fade-up delay-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/estimator"
            className="bg-ink text-surface dark:bg-white dark:text-black text-[14px] font-medium px-7 py-3 rounded-full hover:opacity-80 transition"
          >
            Start a Project
          </Link>

          <Link
            to="/projects"
            className="bg-ink/5 text-ink dark:bg-white/10 dark:text-white text-[14px] font-medium px-7 py-3 rounded-full hover:bg-ink/10 dark:hover:bg-white/20 transition"
          >
            View My Work
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Capabilities</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-3xl md:text-4xl text-ink dark:text-white">
            My Stack
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StackCard
            icon={<FrontendIcon />}
            title="Frontend"
            description="React · TypeScript · Next.js · Tailwind CSS · JavaScript"
            tags={['React', 'TypeScript', 'Next.js', 'Tailwind', 'JavaScript']}
            delay={0}
          />

          <StackCard
            icon={<BackendIcon />}
            title="Backend"
            description="Python · Flask · Node.js · Express · PostgreSQL"
            tags={['Python', 'Flask', 'Node.js', 'Express', 'PostgreSQL']}
            delay={0.08}
          />

          <StackCard
            icon={<CloudIcon />}
            title="Cloud & DevOps"
            description="Docker · GitHub Actions · Vercel · Render · Supabase"
            tags={['Docker', 'GitHub CI/CD', 'Vercel', 'Render', 'Supabase']}
            delay={0.16}
          />

          <StackCard
            icon={<ToolsIcon />}
            title="Tools"
            description="Git · Linux · Figma · VS Code · Postman"
            tags={['Git', 'Linux', 'Figma', 'VS Code', 'Postman']}
            delay={0.24}
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <PillTag>Portfolio</PillTag>
            <SectionDivider />
            <h2 className="font-serif text-3xl md:text-4xl text-ink dark:text-white">
              Projects
            </h2>
          </div>

          <Link
            to="/projects"
            className="text-[13px] text-pebble hover:text-ink dark:hover:text-white transition underline underline-offset-4 hidden sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeProjects.map((p) => (
            <ProjectCard key={p.id} {...p} onPreview={openModal} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 pb-24">
        <div className="reveal bg-surface rounded-4xl px-8 py-16 sm:py-20 text-center shadow-apple relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgb(var(--c-ink)), transparent)',
              filter: 'blur(40px)'
            }}
          />

          <PillTag className="mb-6">Start Your Project</PillTag>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink dark:text-white mb-4 leading-tight">
            Ready to build something?
          </h2>

          <p className="text-pebble text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Get a quick sense of cost for your next project before we chat.
          </p>

          <Link
            to="/estimator"
            className="bg-ink text-surface dark:bg-white dark:text-black text-[14px] font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-80 transition"
          >
            Get a free estimate
          </Link>
        </div>
      </section>

      {selectedProject && (
        <ProjectPreviewModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </>
  )
}