'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

const FILTERS = ['All', 'Ads', 'News', 'Jobs', 'Announcement', 'Notice']

const categoryColors = {
  Jobs:         { bg: '#DCFCE7', color: '#166534' },
  Announcement: { bg: '#DBEAFE', color: '#1E40AF' },
  Notice:       { bg: '#FEF3C7', color: '#92400E' },
  News:         { bg: '#F3E8FF', color: '#6B21A8' },
  Ads:          { bg: '#FEE2E2', color: '#991B1B' },
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop'

export default function AdsPage() {
  const [items, setItems]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [active, setActive]     = useState('All')

  useEffect(() => {
    fetch('/api/news.php')
      .then(r => r.json())
      .then(d => { setItems(d.articles || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? items : items.filter(i => i.category === active)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span>/</span><span>Ads &amp; News</span>
          </div>
          <h1>Ads &amp; <em>News</em></h1>
          <p>Latest advertisements, job openings, notices, and company announcements.</p>
        </div>
      </div>

      <section style={{ padding: '64px 0', background: 'var(--pale)' }}>
        <div className="container">

          {/* ── Filter tabs ── */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{
                padding: '8px 22px', borderRadius: 100, border: '1.5px solid',
                borderColor: active === f ? 'var(--navy)' : 'var(--border)',
                background: active === f ? 'var(--navy)' : 'var(--white)',
                color: active === f ? '#fff' : 'var(--navy)',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {f}
                {f !== 'All' && (
                  <span style={{ marginLeft: 6, fontSize: '0.7rem', opacity: 0.7 }}>
                    ({items.filter(i => i.category === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Content grid ── */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="ads-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div className="skeleton" style={{ height: 200 }}/>
                  <div style={{ padding: 18 }}>
                    <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 10 }}/>
                    <div className="skeleton" style={{ height: 18, marginBottom: 8 }}/>
                    <div className="skeleton" style={{ height: 14, width: '70%' }}/>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)', fontSize: '1rem' }}>
              No {active === 'All' ? 'content' : active} found.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="ads-grid">
              {filtered.map((item, i) => {
                const isAd = item.category === 'Ads'
                const c    = categoryColors[item.category] || { bg: '#F1F5F9', color: '#475569' }

                if (isAd) return (
                  <Link key={i} href={`/ads/detail/?slug=${item.slug}`} style={{
                    display: 'flex', flexDirection: 'column',
                    background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
                    border: '1px solid var(--border)', transition: 'all 0.3s', textDecoration: 'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <img src={item.image || DEFAULT_IMAGE} alt={item.title || 'Advertisement'}
                      style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'top left', display: 'block', flexShrink: 0 }}/>
                    <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 10px', borderRadius: 100, background: c.bg, color: c.color }}>Advertisement</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Calendar size={10}/> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {item.title && (
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4 }}>{item.title}</div>
                      )}
                    </div>
                  </Link>
                )

                // News / article card
                return (
                  <Link key={i} href={`/news/${item.slug}`} style={{
                    display: 'block', background: 'var(--white)', borderRadius: 16,
                    overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <img src={item.image || DEFAULT_IMAGE} alt={item.title}
                      style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}/>
                    <div style={{ padding: '16px 20px 20px' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 100, background: c.bg, color: c.color }}>{item.category}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Calendar size={10}/> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{item.excerpt}</p>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Read More <ArrowRight size={12}/>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:900px){ .ads-grid{ grid-template-columns:1fr 1fr!important } }
        @media(max-width:600px){ .ads-grid{ grid-template-columns:1fr!important } }
      `}</style>
    </>
  )
}
