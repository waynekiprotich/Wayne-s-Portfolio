export default function SectionDivider({ center = false }) {
  return (
    <div
      className={`section-divider ${center ? 'mx-auto' : ''}`}
      style={{ marginTop: 16, marginBottom: 20 }}
    />
  )
}
