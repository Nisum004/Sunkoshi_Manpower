'use client'
import Link from 'next/link'
import { destinations } from '@/data/destinations'
import { Clock, Briefcase, ArrowRight } from 'lucide-react'

export default function DestinationsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Destinations</span></div>
          <h1>Where We <em>Place Workers</em></h1>
          <p>Sunkoshi Manpower deploys Nepali workers to 6 countries — each with verified employers, fair contracts, and our full support.</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--pale)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="dest-grid">
            {destinations.map(d => (
              <Link key={d.slug} href={`/destinations/${d.slug}`} style={{ display: 'block', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none', background: 'var(--white)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <img src={d.heroImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className={`fi fi-${d.flag}`} style={{ width: 28, height: 21, display: 'inline-block', borderRadius: 3 }} />
                    <span style={{ fontFamily: 'var(--ff-head)', fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>{d.name}</span>
                  </div>
                </div>
                <div style={{ padding: '22px 24px' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 16, fontStyle: 'italic' }}>{d.tagline}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 600, minWidth: 80 }}>Salary</span>
                      <span style={{ color: 'var(--dark)' }}>{d.avgSalaryNPR}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 600, minWidth: 80, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> Process</span>
                      <span style={{ color: 'var(--dark)' }}>{d.processingTime}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 600, minWidth: 80, display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={12} /> Placed</span>
                      <span style={{ color: 'var(--dark)' }}>{d.workersDeployed} workers</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--blue)' }}>
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.dest-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
