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
