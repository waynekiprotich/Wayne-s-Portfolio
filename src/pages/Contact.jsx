import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'

const EMAIL = 'waynekip123@icloud.com'
const PHONE = '+25476870636'
const INSTAGRAM = 'https://www.instagram.com/mr._.w.a.y.n.e?igsh=MWYzcnFzbXR4eXdyOA%3D%3D&utm_source=qr'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/waynekiprotich',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5C5.7.5.8 5.6.8 12c0 5.1 3.3 9.5 7.9 11.1.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.1 3.4 2.1.6-.5.9-1.1 1.1-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.8 10.8 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.7 1 .7 2.1v3.1c0 .3.2.7.8.6 4.6-1.6 7.9-6 7.9-11.1C23.2 5.6 18.3.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/wayne-kiprotich-1a8ba6388',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.5h.1c.5-1 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.8v6.2zM5.3 7.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM3.5 20.4h3.6V9H3.5v11.4z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mr._.w.a.y.n.e?igsh=MWYzcnFzbXR4eXdyOA%3D%3D&utm_source=qr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:${PHONE}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.6 10.8c1.6 3.2 4.4 5.9 7.6 7.6l2.5-2.5c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.3 22 2 13.7 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
      </svg>
    ),
  },
]

export default function Contact() {
  useScrollReveal()

  return (
    <>
      <SEO 
        title="Contact Wayne Kiprotich | Full-Stack Developer"
        description="Get in touch with Wayne Kiprotich. Open for opportunities, freelance work, and collaborations in software engineering."
        url="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Wayne Kiprotich",
          "description": "Get in touch for web development and software engineering projects.",
          "url": "https://www.waynekiprotich.online/contact"
        }}
      />
      <section className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">

      <div className="text-center mb-16 fade-up delay-1">
        <PillTag>Get in Touch</PillTag>

        <h1 className="font-serif text-fluid-h1 text-ink dark:text-white mt-6 leading-tight">
          Hire a Full-Stack Developer
        </h1>

        <p className="text-pebble text-[15px] mt-4 max-w-sm mx-auto leading-relaxed">
          Open for opportunities, freelance work, and collaborations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">

        <div className="flex flex-col gap-4 h-full">

          <div className="reveal bg-surface rounded-3xl shadow-apple p-6 flex-1 flex flex-col justify-between border border-fog dark:border-white/10">
            <div>
              <PillTag>Email</PillTag>
              <SectionDivider />

              <h2 className="font-serif text-xl text-ink dark:text-white mb-2">
                Quick Email
              </h2>

              <p className="text-pebble text-[13px] mb-4">
                Send me a message anytime.
              </p>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="bg-ink text-surface dark:bg-white dark:text-black block text-center text-[13px] font-medium px-5 py-2.5 rounded-full hover:opacity-80 transition"
            >
              Send Email
            </a>
          </div>

          <a
            href="https://github.com/waynekiprotich"
            target="_blank"
            rel="noreferrer"
            className="reveal bg-surface border border-fog dark:border-white/10 rounded-3xl shadow-apple p-7 flex-1 flex flex-col justify-between hover:scale-[1.02] transition group"
          >
            <div>
              <p className="text-[12px] text-stone">See my work</p>
              <p className="font-serif text-2xl mt-1 text-ink dark:text-white">GitHub Projects</p>
            </div>

            <svg className="w-6 h-6 text-ink dark:text-white mt-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.7.5.8 5.6.8 12c0 5.1 3.3 9.5 7.9 11.1.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.1 3.4 2.1.6-.5.9-1.1 1.1-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.8 10.8 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.7 1 .7 2.1v3.1c0 .3.2.7.8.6 4.6-1.6 7.9-6 7.9-11.1C23.2 5.6 18.3.5 12 .5z" />
            </svg>
          </a>

        </div>

        <div className="flex flex-col gap-4 h-full">

          <div className="reveal bg-surface rounded-3xl shadow-apple p-7 flex items-center gap-4 flex-1 border border-fog dark:border-white/10">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="font-semibold text-ink dark:text-white text-[14px]">Available for work</p>
              <p className="text-stone text-[12px] mt-0.5">Open to full-time or contract roles</p>
            </div>
          </div>

          <div className="reveal bg-surface rounded-3xl shadow-apple p-7 flex-1 border border-fog dark:border-white/10">
            <PillTag>Socials</PillTag>

            <div className="mt-5 space-y-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-fog dark:hover:bg-white/5 transition group"
                >
                  <span className="text-pebble group-hover:text-ink dark:group-hover:text-white transition">
                    {icon}
                  </span>

                  <span className="text-[14px] text-pebble group-hover:text-ink dark:group-hover:text-white transition font-medium">
                    {label}
                  </span>

                  <span className="ml-auto text-stone text-[12px]">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal bg-surface rounded-3xl shadow-apple p-7 flex-1 border border-fog dark:border-white/10">
            <PillTag>Location</PillTag>

            <p className="font-serif text-2xl text-ink dark:text-white mt-4">
              Nairobi, Kenya
            </p>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}