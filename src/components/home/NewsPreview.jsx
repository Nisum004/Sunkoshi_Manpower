'use client'
import Link from 'next/link'
import { news } from '@/data/news'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

const categoryColors = {
  Jobs:         { bg: '#DCFCE7', color: '#166534' },
  Announcement: { bg: '#DBEAFE', color: '#1E40AF' },
  Notice:       { bg: '#FEF3C7', color: '#92400E' },
  News:         { bg: '#F3E8FF', color: '#6B21A8' },
}

export default function NewsPreview() {
  const latest = news.slice(0, 3)
  return (
    <section style={{ padding: '88px 0', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-tag">Latest Updates</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>News & <span>Announcements</span></h2>
          </div>
          <Link href="/news" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>
            View All News <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="news-grid">
          {latest.map(n => {
            const cat = categoryColors[n.category] || { bg: '#F1F5F9', color: '#475569' }
            return (
              <Link key={n.slug} href={`/news/${n.slug}`} style={{ textDecoration: 'none', display: 'block', background: 'var(--white)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={n.image} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: cat.bg, color: cat.color }}>{n.category}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={11} /> {new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.45, marginBottom: 10 }}>{n.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.65 }}>{n.excerpt}</p>
                  <div style={{ marginTop: 14, fontSize: '0.8rem', fontWeight: 600, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Read More <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <style>{`@media(max-width:900px){.news-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
