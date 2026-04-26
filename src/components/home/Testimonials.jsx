'use client'
import { useState, useEffect } from 'react'
import { testimonials } from '@/data/testimonials'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  const prev = () => { setPaused(true); setActive(a => (a - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setPaused(true); setActive(a => (a + 1) % testimonials.length) }
  const t = testimonials[active]

  return (
    <section style={{ padding: '88px 0', background: 'var(--navy)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Real Stories</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Workers Who <span style={{ color: 'var(--accent)' }}>Changed Their Lives</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto' }}>Thousands of Nepali families live better today because of their courage to work abroad — and our commitment to place them safely.</p>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '44px 48px', textAlign: 'center', minHeight: 300 }}>
            <img src={t.photo} alt={t.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', margin: '0 auto 20px' }}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
            </div>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.85, marginBottom: 28, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ fontFamily: 'var(--ff-head)', fontWeight: 700, color: 'var(--white)', fontSize: '1rem' }}>{t.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className={`fi fi-${t.flag}`} style={{ width: 18, height: 13, display: 'inline-block', borderRadius: 2 }} />
              <span>{t.job} · {t.company}</span>
              <span>·</span>
              <span style={{ color: 'var(--accent)' }}>{t.salary}</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              <ChevronLeft size={18} />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setPaused(true); setActive(i) }}
                  style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
            <button onClick={next} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
