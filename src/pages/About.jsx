import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'

const skills = [
  { 
    category: 'Frontend', 
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'] 
  },
  { 
    category: 'Backend', 
    items: ['Python', 'Flask', 'C', 'REST APIs', 'SQL'] 
  },
  { 
    category: 'Tools & Cloud', 
    items: ['AWS', 'Git', 'Docker', 'Ubuntu', 'VS Code'] 
  },
]

export default function About() {
  useScrollReveal()

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-16 fade-up delay-1">
        <PillTag>About Me</PillTag>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mt-6 leading-tight">
          Building modern<br />full-stack systems
        </h1>
      </div>

      <div className="reveal bg-white rounded-4xl shadow-apple p-8 sm:p-12 grid md:grid-cols-2 gap-12 items-center mb-10">
        <div className="flex justify-center md:justify-start">
          <div className="profile-ring">
            <div className="w-52 sm:w-60 aspect-[4/5] rounded-[calc(1.5rem-3px)] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://i.pinimg.com/736x/05/19/94/05199421184c6c13ccfdb930a587b546.jpg"
                alt="Wayne Kiprotich Moi"
              />
            </div>
          </div>
        </div>

        <div>
          <PillTag>Full-Stack Engineer</PillTag>
          <SectionDivider />

          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-5 text-ink">
            Turning ideas into<br />real products
          </h2>

          <p className="text-pebble text-[15px] mb-6 leading-relaxed">
            I am a Full-Stack Engineer focused on building fast, scalable, and modern web applications.
            I work across frontend and backend systems to deliver clean and reliable products.
          </p>

          <p className="text-pebble text-[15px] leading-relaxed">
            I enjoy creating smooth user experiences, designing robust APIs, and building systems that are
            simple, maintainable, and production-ready.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 mt-6 border-t border-fog">
            <div>
              <p className="text-[22px] font-semibold text-ink tracking-tight">Nairobi</p>
              <p className="text-xs text-stone mt-1 uppercase tracking-widest">Location</p>
            </div>
            <div>
              <p className="text-[22px] font-semibold text-ink tracking-tight">Full-Stack</p>
              <p className="text-xs text-stone mt-1 uppercase tracking-widest">Focus</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {skills.map(({ category, items }, i) => (
          <div
            key={category}
            className="reveal bg-white rounded-3xl p-7 shadow-apple"
            style={{ transitionDelay: `${i * 0.09}s` }}
          >
            <h3 className="font-semibold text-ink mb-4">{category}</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-pebble">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/30 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}