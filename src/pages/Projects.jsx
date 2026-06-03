import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'
import ProjectCard from '../components/UI/ProjectCard'

const projects = [
  {
    title: 'Stack-Battle KE',
    description: 'A gamified competitive programming platform for students with real-time challenges and peer-to-peer matchups.',
    category: 'Coding Platform',
    tags: ['React', 'Flask', 'SQLAlchemy'],
    image: '/public/stack-battle-ke.png', 
    delay: 0,
    codeHref: 'https://github.com/Leevy-Otieno/Stacke_Battleke_frontend.git', 
    liveHref: 'https://stacke-battleke-frontend.vercel.app/login',                    
  },
  {
    title: 'KashFlow',
    description: 'Personal finance application featuring budget progress tracking and API-integrated trading tickers.',
    category: 'Finance App',
    tags: ['React', 'API', 'Finance'],
    image: '/images/kashflow.png',
    delay: 0.07,
    codeHref: 'https://github.com/your-github/kashflow',
    liveHref: 'https://your-live-link.com',
  },
  {
    title: 'Grid Pit Lap',
    description: 'Formula 1 dashboard tracking live standings, session data, and pit stop strategies.',
    category: 'Dashboard',
    tags: ['React', 'OpenF1 API'],
    image: '/images/grid-pit-lap.png',
    delay: 0.14,
    codeHref: 'https://github.com/your-github/grid-pit-lap',
    liveHref: 'https://your-live-link.com',
  },
  {
    title: 'NexusFlow',
    description: 'A workflow management platform for small teams. Drag-and-drop task boards with real-time collaboration.',
    category: 'System',
    tags: ['React', 'Flask', 'Tailwind'],
    image: '/images/nexusflow.png',
    delay: 0.21,
    codeHref: 'https://github.com/your-github/nexusflow',
    liveHref: 'https://your-live-link.com',
  },
]

export default function Projects() {
  useScrollReveal()

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      {/* Header */}
      <div className="text-center mb-16 fade-up delay-1">
        <PillTag>Portfolio</PillTag>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mt-6 leading-tight">
          Selected Work
        </h1>
        <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
          A collection of projects built with care, curiosity, and clean code.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.title}
            className="reveal bg-white rounded-3xl overflow-hidden shadow-apple project-card"
            style={{ transitionDelay: `${p.delay}s` }}
          >
            {/* Thumb with Image */}
            <div className="card-thumb aspect-video flex items-end p-5 relative overflow-hidden bg-black/[0.03]">
              {p.image ? (
                <img 
                  src={p.image} 
                  alt={`${p.title} preview`} 
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-fog to-pebble/20 z-0" />
              )}
              
              {/* Subtle dark gradient overlay so the text pops */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
              
              <span className="relative z-20 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                {p.category}
              </span>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="font-semibold text-[16px] text-ink mb-2">{p.title}</h3>
              <p className="text-[13px] text-stone mb-5 leading-relaxed">{p.description}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((tag) => (
                  <PillTag key={tag}>{tag}</PillTag>
                ))}
              </div>

              <div className="flex gap-3">
                <a 
                  href={p.codeHref}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="bg-black text-white hover:opacity-80 transition flex-1 text-center text-[12px] font-medium py-2.5 rounded-full"
                >
                  Code
                </a>
                <a 
                  href={p.liveHref} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white hover:opacity-80 transition flex-1 text-center text-[12px] font-medium py-2.5 rounded-full"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}