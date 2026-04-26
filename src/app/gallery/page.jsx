'use client'
import { useState } from 'react'
import { gallery, galleryCategories } from '@/data/gallery'
import { X, ZoomIn } from 'lucide-react'

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'All' ? gallery : gallery.filter(g => g.category === filter)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Gallery</span></div>
          <h1>Photo <em>Gallery</em></h1>
          <p>Moments from our sendoff events, training sessions, and milestones.</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--pale)' }}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 44 }}>
            {galleryCategories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{ padding: '9px 20px', borderRadius: 100, border: '1.5px solid', fontFamily: 'var(--ff-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  background: filter === cat ? 'var(--navy)' : 'var(--white)',
                  borderColor: filter === cat ? 'var(--navy)' : 'var(--border)',
                  color: filter === cat ? 'var(--white)' : 'var(--navy)' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="gallery-grid">
            {filtered.map(img => (
              <div key={img.id} style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '4/3' }}
                onClick={() => setLightbox(img)}
                onMouseEnter={e => e.currentTarget.querySelector('.overlay').style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.querySelector('.overlay').style.opacity = '0'}>
                <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(43,54,117,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', padding: 16, textAlign: 'center' }}>
                  <ZoomIn size={28} color="white" style={{ marginBottom: 10 }} />
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <X size={22} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%' }}>
            <img src={lightbox.src} alt={lightbox.caption} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
            <p style={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginTop: 16, fontSize: '0.88rem' }}>{lightbox.caption}</p>
          </div>
        </div>
      )}

      <style>{`@media(max-width:900px){.gallery-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.gallery-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
