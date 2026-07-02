export default function Footer() {
  return (
    <footer className="w-full border-t border-fog dark:border-white/10 py-4 mt-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-sm font-medium text-ink dark:text-white">
            Wayne Kiprotich
          </h2>

          <p className="text-[11px] text-pebble">
            Software Engineer
          </p>
        </div>

        {/* Center Icons */}
        <div className="flex items-center gap-5">

          {/* GitHub */}
          <a
            href="https://github.com/waynekiprotich"
            target="_blank"
            rel="noreferrer"
            className="text-stone hover:text-ink dark:hover:text-white transition duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.7.5.8 5.6.8 12c0 5.1 3.3 9.5 7.9 11.1.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.1 3.4 2.1.6-.5.9-1.1 1.1-1.7-2.6-.3-5.3-1.3-5.3-5.7 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2a10.7 10.7 0 015.7 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.7 1 .7 2v3c0 .3.2.7.8.6 4.6-1.6 7.9-6 7.9-11.1C23.2 5.6 18.3.5 12 .5z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/wayne-kiprotich-1a8ba6388"
            target="_blank"
            rel="noreferrer"
            className="text-stone hover:text-ink dark:hover:text-white transition duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.4 20.4h-3.6v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.8v5.7H9.3V9h3.4v1.5h.1c.5-.9 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.8v6.2zM5.3 7.4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM3.5 20.4h3.6V9H3.5v11.4z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:waynekip123@icloud.com"
            className="text-stone hover:text-ink dark:hover:text-white transition duration-300 hover:scale-110"
            aria-label="Email"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>

        {/* Right */}
        <p className="text-[10px] text-stone text-center md:text-right">
          © {new Date().getFullYear()} Wayne Kiprotich
        </p>
      </div>
    </footer>
  )
}