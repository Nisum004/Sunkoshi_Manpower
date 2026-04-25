import FadeIn from './FadeIn'

export default function SectionHeader({ tag, title, highlight, sub, center = false, light = false }) {
  return (
    <FadeIn className={center ? 'text-center' : ''}>
      {tag && (
        <span className={`text-xs font-semibold tracking-widest uppercase inline-block mb-3 ${light ? 'text-accent' : 'text-cobalt'}`}>
          {tag}
        </span>
      )}
      <h2 className={`font-head text-4xl md:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-navy'}`}>
        {title}{' '}
        {highlight && (
          <span className={light ? 'text-gradient' : 'text-cobalt'}>{highlight}</span>
        )}
      </h2>
      {sub && (
        <p className={`text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-muted'}`}>
          {sub}
        </p>
      )}
    </FadeIn>
  )
}
