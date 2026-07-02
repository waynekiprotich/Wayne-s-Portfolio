import { Link } from 'react-router-dom'

export function ButtonPrimary({ children, to, href, onClick, className = '' }) {
  const base =
    'bg-ink text-surface dark:bg-white dark:text-black hover:opacity-80 transition inline-block text-[14px] font-medium px-7 py-3 rounded-full cursor-pointer'
  const cls = `${base} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export function ButtonSecondary({ children, to, href, onClick, className = '' }) {
  const base =
    'bg-ink/5 text-ink dark:bg-white/10 dark:text-white hover:bg-ink/10 dark:hover:bg-white/20 transition inline-block text-[14px] font-medium px-7 py-3 rounded-full cursor-pointer'
  const cls = `${base} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}