import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import useScrollReveal from '../hooks/useScrollReveal'
import useModal from '../hooks/useModal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'
import StackCard from '../components/UI/StackCard'
import ProjectCard from '../components/UI/ProjectCard'
import ProjectPreviewModal from '../components/UI/ProjectPreviewModal'
import ModalErrorBoundary from '../components/UI/ModalErrorBoundary'
import { fetchProjects } from '../utils/api'

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

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const SystemIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const ApiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
  </svg>
)

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="3" y1="9" x2="9" y2="9" />
  </svg>
)

const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
)

const SpeedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
)

const DeployIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <path d="M12 2 3 20h18L12 2Z" />
    <line x1="12" y1="10" x2="12" y2="15" />
  </svg>
)

const SupportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <path d="M12 2a10 10 0 0 0-10 10v3a2 2 0 0 0 2 2h1v-7H4a8 8 0 0 1 16 0h-1v7h1a2 2 0 0 0 2-2v-3A10 10 0 0 0 12 2Z" />
    <path d="M8 17v1a3 3 0 0 0 3 3h1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-ink dark:text-white">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-stone shrink-0 transition-transform duration-300">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-fog dark:text-white/10">
    <path d="M7.5 6C4.5 6 2 8.5 2 11.5S4.5 17 7.5 17c.3 2.5-1 4-3.5 5v2c4.5-1 7-4 7-8.5V11.5C11 8.5 8.5 6 7.5 6Zm10 0c-3 0-5.5 2.5-5.5 5.5S14.5 17 17.5 17c.3 2.5-1 4-3.5 5v2c4.5-1 7-4 7-8.5V11.5C21 8.5 18.5 6 17.5 6Z" />
  </svg>
)

const STATS = [
  { value: '15+', label: 'Projects Completed' },
  { value: '20+', label: 'Technologies Used' },
  { value: '25+', label: 'APIs Integrated' },
]

const SERVICES = [
  { icon: <CodeIcon />, title: 'Full-Stack Web Development', description: 'End-to-end web applications built with modern frameworks, from database to interface.' },
  { icon: <SystemIcon />, title: 'Custom Business Systems', description: 'Purpose-built internal tools that match how your business actually operates.' },
  { icon: <ApiIcon />, title: 'REST API Development', description: 'Secure, documented APIs that connect your product to the tools it depends on.' },
  { icon: <DashboardIcon />, title: 'Dashboard Development', description: 'Clear, data-dense dashboards that turn raw numbers into decisions.' },
  { icon: <DatabaseIcon />, title: 'Database Design', description: 'Schemas and queries designed to stay fast and reliable as your data grows.' },
  { icon: <SpeedIcon />, title: 'Performance Optimization', description: 'Faster load times and smoother interactions across your entire stack.' },
  { icon: <DeployIcon />, title: 'Deployment', description: 'Reliable CI/CD pipelines and infrastructure so releases are routine, not risky.' },
  { icon: <SupportIcon />, title: 'Maintenance', description: 'Ongoing support, monitoring, and updates once your product is live.' },
]

const PROCESS = [
  { step: '01', title: 'Discovery', description: 'Understanding your business, goals, and the problem worth solving.' },
  { step: '02', title: 'Planning', description: 'Scoping features, timeline, and technical approach before any code is written.' },
  { step: '03', title: 'Design', description: 'Wireframes and interface direction that put your users first.' },
  { step: '04', title: 'Development', description: 'Building in focused sprints with regular check-ins along the way.' },
  { step: '05', title: 'Testing', description: 'Verifying functionality, performance, and edge cases before launch.' },
  { step: '06', title: 'Deployment', description: 'Shipping to production with monitoring in place from day one.' },
  { step: '07', title: 'Support', description: 'Staying available for fixes, updates, and the next iteration.' },
]

const STRENGTHS = [
  'Clean, readable code',
  'Modern technologies',
  'Fast, direct communication',
  'Mobile-first design',
  'Performance focused',
  'Scalable architecture',
  'SEO friendly builds',
  'Secure development practices',
]

const FAQS = [
  { question: 'How long does a project take?', answer: 'Most business websites take 2-4 weeks, while larger platforms and custom systems typically take 6-12 weeks depending on scope and feedback cycles.' },
  { question: 'How much does a website cost?', answer: 'Pricing depends on complexity, features, and timeline. Use the project estimator for a realistic starting range, then we refine it together on a discovery call.' },
  { question: 'Do you provide hosting?', answer: 'Yes. I can set up and manage hosting, domains, and deployment, or work alongside your existing infrastructure if you already have one.' },
  { question: 'Can you redesign an existing website?', answer: 'Yes. I regularly take over existing codebases and designs, improving performance, structure, and visual design without starting from zero.' },
  { question: 'What technologies do you use?', answer: 'Mainly React, Next.js, and Tailwind CSS on the frontend, with Python, Flask, Node.js, and PostgreSQL on the backend, deployed through modern cloud platforms.' },
  { question: 'Do you provide maintenance?', answer: 'Yes. Ongoing maintenance plans cover updates, monitoring, bug fixes, and small improvements after launch.' },
]

export default function Home() {
  useScrollReveal()
  const { selectedProject, openModal, closeModal } = useModal()

  const [homeProjects, setHomeProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects()
        setHomeProjects(data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    getProjects()
  }, [])

  const toggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? -1 : index))
  }

  return (
    <>
      <SEO 
        title="Full-Stack Software Engineer"
        description="Wayne Kiprotich is a full-stack developer designing and shipping production-ready web platforms."
        url="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.waynekiprotich.online/#website",
              "url": "https://www.waynekiprotich.online/",
              "name": "Wayne Kiprotich Portfolio",
              "description": "Portfolio of Wayne Kiprotich, Full-Stack Software Engineer."
            },
            {
              "@type": "Person",
              "@id": "https://www.waynekiprotich.online/#person",
              "name": "Wayne Kiprotich",
              "url": "https://www.waynekiprotich.online/",
              "image": "https://www.waynekiprotich.online/profile.png",
              "jobTitle": "Software Engineer",
              "description": "Full-Stack Software Engineer building scalable applications.",
              "sameAs": [
                "https://github.com/waynekiprotich",
                "https://www.linkedin.com/in/wayne-kiprotich-1a8ba6388"
              ]
            }
          ]
        }}
      />
      <header className="relative w-full max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto text-center px-4 sm:px-6 pt-28 pb-24">
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgb(var(--c-stone)) 0%, transparent 70%)',
            filter: 'blur(48px)'
          }}
        />

        <div className="fade-up delay-1 flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-surface shadow-apple-lg">
            <img
              src="https://i.pinimg.com/736x/05/19/94/05199421184c6c13ccfdb930a587b546.jpg"
              alt="Wayne Kiprotich"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            <PillTag>Full-Stack Developer · Nairobi</PillTag>
          </div>
        </div>

        <h1 className="fade-up delay-2 font-serif text-fluid-h1 mb-6 text-ink dark:text-white">
          Full-Stack Software Engineer
          <br />
          building modern applications 
        </h1>

        <p className="fade-up delay-3 text-pebble text-[15px] sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
          I'm Wayne Kiprotich, a full-stack developer designing and shipping production-ready web
          platforms, from customer-facing products to internal business systems, for teams that
          need software built for real-world use.
        </p>

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

      <section className="w-full max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="reveal w-[160px] bg-surface border border-fog dark:border-white/5 rounded-3xl p-5 text-center shadow-apple transition-transform duration-300 hover:-translate-y-1 hover:shadow-apple-lg"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <p className="font-serif text-fluid-h3 text-ink dark:text-white mb-1">
                {stat.value}
              </p>

              <p className="text-[12px] text-pebble leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Capabilities</PillTag>
          <SectionDivider center />

          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-3">
            My Tech Stack
          </h2>

          <p className="text-pebble text-[15px] max-w-md mx-auto leading-relaxed">
            Tools I reach for by default, chosen because they hold up in production,
            not because they are trendy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <div className="h-full transition-transform duration-300 hover:-translate-y-1">
            <StackCard
              icon={<FrontendIcon />}
              title="Frontend"
              description="Fast interfaces built with React, Next.js, and Tailwind CSS."
              tags={['React', 'TypeScript', 'Next.js', 'Tailwind']}
              delay={0}
            />
          </div>

          <div className="h-full transition-transform duration-300 hover:-translate-y-1">
            <StackCard
              icon={<BackendIcon />}
              title="Backend"
              description="Reliable APIs and business logic in Python, Flask, Node.js, and PostgreSQL."
              tags={['Python', 'Flask', 'Node.js', 'Express', 'PostgreSQL']}
              delay={0.08}
            />
          </div>

          <div className="h-full transition-transform duration-300 hover:-translate-y-1">
            <StackCard
              icon={<CloudIcon />}
              title="Cloud & DevOps"
              description="Deployment pipelines and managed infrastructure for reliable production applications."
              tags={['Docker', 'GitHub CI/CD', 'Vercel', 'Render', 'Supabase']}
              delay={0.16}
            />
          </div>

          <div className="h-full transition-transform duration-300 hover:-translate-y-1">
            <StackCard
              icon={<ToolsIcon />}
              title="Tools"
              description="Essential tools for version control, collaboration, testing, and efficient development."
              tags={['Git', 'Linux', 'Figma', 'VS Code', 'Postman']}
              delay={0.24}
            />
          </div>
        </div>
      </section>
      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <PillTag>Portfolio</PillTag>
            <SectionDivider />
            <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-2">
              Featured Software Engineering Projects
            </h2>
            <p className="text-pebble text-[15px] max-w-md leading-relaxed">
              A selection of recent builds spanning products, dashboards, and internal tools.
            </p>
          </div>

          <Link
            to="/projects"
            className="text-[13px] text-pebble hover:text-ink dark:hover:text-white transition underline underline-offset-4 hidden sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading &&
            [1, 2, 3, 4].map((placeholder) => (
              <div
                key={placeholder}
                className="animate-pulse bg-surface border border-fog dark:border-white/5 rounded-3xl h-64"
              />
            ))}

          {!loading && homeProjects.length === 0 && (
            <div className="col-span-full text-center py-16 border border-dashed border-fog dark:border-white/15 rounded-3xl">
              <p className="text-ink dark:text-white font-medium mb-2">Projects coming soon</p>
              <p className="text-pebble text-[14px] max-w-sm mx-auto mb-6">
                New case studies are being added. In the meantime, get in touch and I can share
                examples relevant to your project.
              </p>
              <Link
                to="/estimator"
                className="inline-block bg-ink text-surface dark:bg-white dark:text-black text-[13px] font-medium px-6 py-2.5 rounded-full hover:opacity-80 transition"
              >
                Start a Project
              </Link>
            </div>
          )}

          {!loading &&
            homeProjects.map((p) => (
              <div key={p.id} className="transition-transform duration-300 hover:-translate-y-1">
                <ProjectCard {...p} project={p} onPreview={openModal} />
              </div>
            ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/projects"
            className="inline-block bg-ink/5 text-ink dark:bg-white/10 dark:text-white text-[14px] font-medium px-7 py-3 rounded-full hover:bg-ink/10 dark:hover:bg-white/20 transition"
          >
            View All Projects
          </Link>
        </div>
      </section>

      <section className="w-full max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Services</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-3">
            Web Development Services
          </h2>
          <p className="text-pebble text-[15px] max-w-md mx-auto leading-relaxed">
            From a single landing page to a full internal system, here is where I typically help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-surface border border-fog dark:border-white/5 rounded-3xl p-6 shadow-apple transition-transform duration-300 hover:-translate-y-1 hover:shadow-apple-lg"
            >
              <div className="w-11 h-11 rounded-2xl bg-ink/5 dark:bg-white/10 flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-ink dark:text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-pebble text-[13px] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Process</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-3">
            How We Would Work Together
          </h2>
          <p className="text-pebble text-[15px] max-w-md mx-auto leading-relaxed">
            A straightforward process designed to keep you informed at every stage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((phase) => (
            <div
              key={phase.step}
              className="bg-surface border border-fog dark:border-white/5 rounded-3xl p-6 shadow-apple transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-stone text-[13px] font-medium mb-3">{phase.step}</p>
              <h3 className="text-ink dark:text-white font-semibold mb-2">{phase.title}</h3>
              <p className="text-pebble text-[13px] leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal text-center mb-12">
          <PillTag>Why Work With Me</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-3">
            Software Engineering Standards
          </h2>
          <p className="text-pebble text-[15px] max-w-md mx-auto leading-relaxed">
            The principles that guide every project, regardless of size or budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STRENGTHS.map((strength) => (
            <div
              key={strength}
              className="flex items-center gap-3 bg-surface border border-fog dark:border-white/5 rounded-2xl px-4 py-3.5 shadow-apple"
            >
              <span className="w-6 h-6 rounded-full bg-ink/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                <CheckIcon />
              </span>
              <span className="text-ink dark:text-white text-[13px] font-medium">{strength}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal text-center mb-10">
          <PillTag>FAQ</PillTag>
          <SectionDivider center />
          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white">
            Common Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div
                key={faq.question}
                className="bg-surface border border-fog dark:border-white/5 rounded-2xl overflow-hidden shadow-apple"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span className="text-ink dark:text-white text-[14px] font-medium">{faq.question}</span>
                  <span className={isOpen ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}>
                    <ChevronIcon />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-pebble text-[13px] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 py-16 pb-24">
        <div className="reveal bg-surface rounded-4xl px-8 py-16 sm:py-20 text-center shadow-apple relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgb(var(--c-ink)), transparent)',
              filter: 'blur(40px)'
            }}
          />

          <PillTag className="mb-6">Start Your Project</PillTag>

          <h2 className="font-serif text-fluid-h2 text-ink dark:text-white mb-4">
            Let's build something great together.
          </h2>

          <p className="text-pebble text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
            Tell me about your project and get a realistic estimate before we speak, or book a
            call directly to talk through your idea.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              to="/estimator"
              className="bg-ink text-surface dark:bg-white dark:text-black text-[14px] font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-80 transition"
            >
              Get a Free Estimate
            </Link>
          </div>

          <p className="text-stone text-[12px]">
            Response within 24 hours.
          </p>
        </div>
      </section>

      {selectedProject && (
        <ModalErrorBoundary resetKey={selectedProject.id} onError={closeModal}>
          <ProjectPreviewModal
            project={selectedProject}
            onClose={closeModal}
          />
        </ModalErrorBoundary>
      )}
    </>
  )
}