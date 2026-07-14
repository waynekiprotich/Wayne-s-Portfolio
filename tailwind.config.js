/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontSize: {
        'fluid-h1': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1' }],
        'fluid-h2': ['clamp(2rem, 4vw + 1rem, 3.5rem)', { lineHeight: '1.2' }],
        'fluid-h3': ['clamp(1.5rem, 3vw + 0.5rem, 2.25rem)', { lineHeight: '1.3' }],
        'fluid-base': ['clamp(1rem, 1vw + 0.75rem, 1.125rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1.125rem, 1.5vw + 0.75rem, 1.375rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.875rem, 0.5vw + 0.75rem, 1rem)', { lineHeight: '1.5' }],
      },
      colors: {
        ink:     'rgb(var(--c-ink) / <alpha-value>)',
        mist:    'rgb(var(--c-mist) / <alpha-value>)',
        fog:     'rgb(var(--c-fog) / <alpha-value>)',
        stone:   'rgb(var(--c-stone) / <alpha-value>)',
        pebble:  'rgb(var(--c-pebble) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        page:    'rgb(var(--c-page) / <alpha-value>)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'apple':    '0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'apple-lg': '0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'apple-xl': '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
