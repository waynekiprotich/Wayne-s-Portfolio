import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import PillTag from '../components/UI/PillTag'
import SectionDivider from '../components/UI/SectionDivider'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, LayoutTemplate, Layers,
  Smartphone, Gauge, Search, Wrench, Sparkles
} from 'lucide-react'

export default function Services() {
  useScrollReveal()

  const services = [
    {
      icon: Globe,
      title: "Custom Website Development",
      desc: "Tailored websites built from scratch to match your brand and business goals — no templates, no shortcuts."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Development",
      desc: "Online stores with secure checkout, product management, and payment integrations that convert visitors into customers."
    },
    {
      icon: LayoutTemplate,
      title: "Frontend Development",
      desc: "Pixel-perfect, interactive interfaces built with React and modern tooling for a smooth user experience."
    },
    {
      icon: Layers,
      title: "Full-Stack Web Applications",
      desc: "End-to-end applications — from database design to deployment — built to scale with your business."
    },
    {
      icon: Smartphone,
      title: "Responsive Web Design",
      desc: "Sites that look and work great on every screen, from mobile phones to large desktop displays."
    },
    {
      icon: Gauge,
      title: "Website Performance Optimization",
      desc: "Faster load times and smoother interactions through code splitting, caching, and image optimization."
    },
    {
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      desc: "On-page SEO best practices to help your site rank higher and reach the right audience organically."
    },
    {
      icon: Wrench,
      title: "Website Maintenance",
      desc: "Ongoing updates, bug fixes, and monitoring so your site stays secure and reliable long after launch."
    },
    {
      icon: Sparkles,
      title: "UI/UX Improvements",
      desc: "Audits and redesigns that improve usability, accessibility, and the overall feel of your product."
    },
  ]

  return (
    <>
      <SEO 
        title="Professional Web Development Services"
        description="Professional web development services including custom websites, e-commerce, and full-stack applications in Kenya."
        url="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Web Development",
          "provider": {
            "@type": "Person",
            "name": "Wayne Kiprotich"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Kenya"
          },
          "description": "Custom websites, e-commerce, and full-stack web applications."
        }}
      />
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-20 fade-up delay-1">
        <PillTag>Services</PillTag>
        <h1 className="font-serif text-4xl sm:text-6xl text-ink dark:text-white mt-6 leading-tight">
          Professional Web Development Services
        </h1>
        <p className="text-pebble text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          As a Software Engineer and Web Developer in Kenya, I design and build fast, modern, and responsive web applications that help businesses and startups establish a strong online presence.
        </p>
      </div>

      <div className="reveal mb-20 bg-surface p-10 rounded-3xl shadow-apple border border-fog dark:border-white/10">
        <h2 className="text-2xl font-semibold text-ink dark:text-white mb-4">How I Solve Problems</h2>
        <p className="text-pebble leading-relaxed">
          Whether you need a custom website, an e-commerce store, or a complex web application, I provide scalable, high-performance solutions. Every project I undertake as a Full-Stack Developer focuses on clean code, responsive design, and SEO best practices to ensure your platform is beautiful, performant, and visible to search engines.
        </p>
      </div>

      <ul className="grid md:grid-cols-3 gap-6 mb-20" role="list">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <li
              key={service.title}
              className={`reveal delay-${(i % 3) + 1} bg-surface p-7 rounded-2xl shadow-apple border border-fog dark:border-white/10 flex flex-col items-start text-left hover:shadow-lg transition-shadow`}
            >
              <div className="w-11 h-11 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-ink dark:text-white" strokeWidth={1.75} />
              </div>
              <h3 className="font-medium text-ink dark:text-white mb-2">{service.title}</h3>
              <p className="text-pebble text-sm leading-relaxed">{service.desc}</p>
            </li>
          )
        })}
      </ul>

      <div className="reveal mb-20">
        <h2 className="text-2xl font-semibold text-ink dark:text-white mb-8 text-center">Why Work With Me?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["Modern Practices", "Responsive Design", "SEO-Focused", "Clean Code", "Accessibility First", "Mobile-First"].map((item) => (
            <span key={item} className="px-4 py-2 bg-ink/5 dark:bg-white/10 text-ink dark:text-white rounded-full text-sm font-medium">{item}</span>
          ))}
        </div>
      </div>

      <div className="reveal text-center bg-ink text-surface dark:bg-white dark:text-black p-12 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Ready to build something great?</h2>
        <p className="mb-8 opacity-80 max-w-lg mx-auto">Whether you're a startup looking for a React Developer or a business needing Custom Website Development, let's get in touch.</p>
        <Link to="/contact" className="bg-surface text-ink dark:bg-black dark:text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
          Get In Touch
        </Link>
      </div>
    </section>
    </>
  )
}