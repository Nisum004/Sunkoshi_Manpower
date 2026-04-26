import { destinations } from '@/data/destinations'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Briefcase, MapPin, CheckCircle, ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return destinations.map(d => ({ slug: d.slug }))
}

export function generateMetadata({ params }) {
  const d = destinations.find(d => d.slug === params.slug)
  if (!d) return {}
  return {
    title: `Work in ${d.name} — Jobs, Salary & Requirements`,
    description: `${d.overview.slice(0, 155)}...`,
    alternates: { canonical: `https://www.sunkoshimanpower.com/destinations/${d.slug}` },
  }
}

export default function DestinationDetail({ params }) {
  const d = destinations.find(d => d.slug === params.slug)
  if (!d) notFound()

  const others = destinations.filter(x => x.slug !== d.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src={d.heroImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,30,80,0.55) 0%, rgba(20,30,80,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '60px 0 48px' }}>
          <div className="container">
            <div className="breadcrumb" style={{ marginBottom: 16 }}><a href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</a><span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span><a href="/destinations" style={{ color: 'rgba(255,255,255,0.7)' }}>Destinations</a><span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span><span style={{ color: 'var(--accent)' }}>{d.name}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <span className={`fi fi-${d.flag}`} style={{ width: 40, height: 30, display: 'inline-block', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
              <h1 style={{ fontFamily: 'var(--ff-head)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'white', margin: 0 }}>Work in {d.name}</h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', fontStyle: 'italic' }}>{d.tagline}</p>
          </div>
        </div>
      </div>

      <section style={{ padding: '72px 0', background: 'var(--pale)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'start' }} className="dest-detail-grid">
          <div>
            {/* Overview */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Overview</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.85 }}>{d.overview}</p>
            </div>

            {/* Popular Jobs */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>Popular Job Categories</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {d.popularJobs.map(j => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--pale)', borderRadius: 8 }}>
                    <CheckCircle size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>{j}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>Requirements</h2>
              {d.requirements.map(r => (
                <div key={r} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <CheckCircle size={16} color="#16A34A" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--dark)' }}>{r}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>Benefits & Perks</h2>
              {d.benefits.map(b => (
                <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <CheckCircle size={16} color="var(--blue)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--dark)' }}>{b}</span>
                </div>
              ))}
            </div>

            <Link href="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 28, fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> All Destinations
            </Link>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Stats */}
            <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 20 }}>At a Glance</h3>
              {[
                { label: 'Avg. Salary', value: d.avgSalaryNPR, sub: d.avgSalary },
                { label: 'Workers Placed', value: d.workersDeployed },
                { label: 'Processing Time', value: d.processingTime },
                { label: 'Contract', value: d.contractDuration },
                { label: 'Visa Type', value: d.visaType },
              ].map(s => (
                <div key={s.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 14, marginBottom: 14 }}>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--ff-head)', fontWeight: 700, color: 'var(--white)', fontSize: '0.95rem' }}>{s.value}</div>
                  {s.sub && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.sub}</div>}
                </div>
              ))}
            </div>

            {/* Cities */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 24, border: '1px solid var(--border)', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Popular Cities</h3>
              {d.popularCities.map(city => (
                <div key={city} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem', color: 'var(--dark)', marginBottom: 8 }}>
                  <MapPin size={13} color="var(--blue)" /> {city}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--pale)', borderRadius: 16, padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Ready to Apply?</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 16 }}>Register now and our team will contact you within 1–2 working days.</p>
              <Link href="/resources/job-seekers" className="btn btn-accent" style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}>Apply Now</Link>
              <Link href="/jobs" className="btn" style={{ display: 'block', textAlign: 'center', background: 'var(--white)', color: 'var(--navy)', border: '1px solid var(--border)' }}>View Open Jobs</Link>
            </div>

            {/* Other destinations */}
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Other Destinations</h3>
              {others.map(o => (
                <Link key={o.slug} href={`/destinations/${o.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none' }}>
                  <span className={`fi fi-${o.flag}`} style={{ width: 24, height: 18, display: 'inline-block', borderRadius: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>{o.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: 'auto' }}>{o.avgSalaryNPR}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <style>{`@media(max-width:900px){.dest-detail-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
