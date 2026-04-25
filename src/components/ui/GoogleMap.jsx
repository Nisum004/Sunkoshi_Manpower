export default function GoogleMap({ src, title = 'Office Location', height = 420 }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-brand border border-border">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  )
}
