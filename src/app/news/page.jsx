'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

const categoryColors = {
  Jobs:         { bg: '#DCFCE7', color: '#166534' },
  Announcement: { bg: '#DBEAFE', color: '#1E40AF' },
  Notice:       { bg: '#FEF3C7', color: '#92400E' },
  News:         { bg: '#F3E8FF', color: '#6B21A8' },
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop'

export default function NewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/news.php')
      .then(r => r.json())
      .then(data => { setArticles(data.articles || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>News</span></div>
          <h1>News & <em>Announcements</em></h1>
        </div>
      </div>
      <section style={{padding:'80px 0',background:'var(--pale)',textAlign:'center'}}>
        <i className="fas fa-spinner fa-spin" style={{fontSize:'2rem',color:'var(--muted)'}}/>
      </section>
    </>
  )

  const [featured, ...rest] = articles
  if (!featured) return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>News</span></div>
          <h1>News & <em>Announcements</em></h1>
        </div>
      </div>
      <section style={{padding:'80px 0',background:'var(--pale)',textAlign:'center',color:'var(--muted)'}}>
        <p>No articles published yet.</p>
      </section>
    </>
  )

  const cat = categoryColors[featured.category] || { bg: '#F1F5F9', color: '#475569' }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>News</span></div>
          <h1>News & <em>Announcements</em></h1>
          <p>Stay updated with the latest job openings, notices, and company news.</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--pale)' }}>
        <div className="container">
          {/* Featured */}
          <Link href={`/news/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, background: 'var(--white)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 48, textDecoration: 'none', transition: 'box-shadow 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            className="news-featured">
            <img src={featured.image || DEFAULT_IMAGE} alt={featured.title} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '36px 36px 36px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: 100, background: cat.bg, color: cat.color }}>Featured · {featured.category}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 14 }}>{featured.title}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: 20 }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 20 }}>
                <Calendar size={13} /> {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)' }}>Read Full Article <ArrowRight size={14} /></div>
            </div>
          </Link>

          {/* Grid */}
          {rest.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="news-grid">
              {rest.map(n => {
                const c = categoryColors[n.category] || { bg: '#F1F5F9', color: '#475569' }
                return (
                  <Link key={n.slug} href={`/news/${n.slug}`} style={{ display: 'block', background: 'var(--white)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <img src={n.image || DEFAULT_IMAGE} alt={n.title} style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 100, background: c.bg, color: c.color }}>{n.category}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}><Calendar size={10} /> {new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 8 }}>{n.title}</h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{n.excerpt}</p>
                      <div style={{ marginTop: 12, fontSize: '0.78rem', fontWeight: 600, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 4 }}>Read More <ArrowRight size={12} /></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <style>{`
        @media(max-width:900px){.news-featured{grid-template-columns:1fr!important}.news-grid{grid-template-columns:1fr!important}}
        .news-featured img{height:240px!important}
        @media(max-width:900px){.news-featured>div{padding:24px!important}}
      `}</style>
    </>
  )
}
