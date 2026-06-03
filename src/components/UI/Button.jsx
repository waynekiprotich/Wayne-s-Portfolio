import { Link } from 'react-router-dom'

export function ButtonPrimary({ children, to, href, onClick, className = '' }) {
  const base =
    'bg-black text-white hover:opacity-80 transition inline-block text-[14px] font-medium px-7 py-3 rounded-full cursor-pointer'
  const cls = `${base} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export function ButtonSecondary({ children, to, href, onClick, className = '' }) {
  const base =
    'bg-black/[0.05] text-black hover:bg-black/[0.1] transition inline-block text-[14px] font-medium px-7 py-3 rounded-full cursor-pointer'
  const cls = `${base} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}