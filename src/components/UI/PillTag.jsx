export default function PillTag({ children, className = '' }) {
  return (
    <span
      className={`inline-block bg-black/[0.055] rounded-full text-[0.7rem] font-medium tracking-[0.04em] text-pebble px-[10px] py-1 ${className}`}
    >
      {children}
    </span>
  )
}
