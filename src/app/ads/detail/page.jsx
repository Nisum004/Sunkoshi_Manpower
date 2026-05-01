'use client'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react'

function AdDetail() {
  const params  = useSearchParams()
  const slug    = params.get('slug')
  const [ad, setAd]           = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return }
    fetch(`/api/news.php?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(d => {
        if (d.success && d.article && d.article.category === 'Ads') setAd(d.article)
        else setNotFound(true)
        setLoading(false)
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [slug])

  if (loading) return (
    <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>
  )

  if (notFound) return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Ad not found.</p>
      <Link href="/ads" style={{ color: 'var(--blue)', fontWeight: 600 }}>Back to Ads &amp; News</Link>
    </div>
  )

  return (
    <section style={{ padding: '52px 0 80px', background: 'var(--pale)', minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: 820 }}>

        <Link href="/ads" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)',
          textDecoration: 'none', marginBottom: 28,
        }}>
          <ArrowLeft size={15}/> Back to Ads &amp; News
        </Link>

        <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>

          {/* Full image */}
          <img
            src={ad.image}
            alt={ad.title || 'Advertisement'}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          <div style={{ padding: '28px 32px 36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 14px', borderRadius: 100, background: '#FEE2E2', color: '#991B1B' }}>
                Advertisement
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Calendar size={13}/>
                {new Date(ad.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {ad.title && (
              <h1 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 24, lineHeight: 1.3 }}>
                {ad.title}
              </h1>
            )}

            {ad.content && (
              <a href={ad.content} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', background: 'var(--navy)', color: '#fff',
                borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View Details <ExternalLink size={15}/>
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default function AdDetailPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span>/</span>
            <a href="/ads">Ads &amp; News</a><span>/</span>
            <span>Advertisement</span>
          </div>
          <h1>Advertisement</h1>
        </div>
      </div>
      <Suspense fallback={<div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>}>
        <AdDetail />
      </Suspense>
    </>
  )
}
