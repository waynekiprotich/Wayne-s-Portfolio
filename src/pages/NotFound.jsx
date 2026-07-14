import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PillTag from '../components/UI/PillTag'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Wayne Kiprotich</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="fade-up delay-1">
          <PillTag>404</PillTag>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mt-6 leading-tight">
            Page not found
          </h1>
          
          <p className="text-pebble text-[15px] mt-4 mb-8 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink text-surface px-7 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Go back home
          </Link>
        </div>
      </section>
    </>
  )
}
