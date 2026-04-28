'use client'
import { useState } from 'react'
import { clients } from '@/data/company'

const TABS = [
  { code: 'my', label: 'Malaysia' },
  { code: 'sa', label: 'Saudi Arabia' },
  { code: 'ae', label: 'UAE' },
  { code: 'qa', label: 'Qatar' },
  { code: 'om', label: 'Oman' },
  { code: 'jp', label: 'Japan' },
]

export default function ClientsTabs() {
  const [active, setActive] = useState('my')

  const grouped = {}
  TABS.forEach(t => { grouped[t.code] = clients.filter(c => c.flag === t.code) })
  const current = grouped[active] || []

  return (
    <section style={{ padding: '72px 0', background: 'var(--pale)' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-tag">Trusted By</span>
          <h2 className="section-title">Our <span>Valued Clients</span></h2>
          <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Over 120 verified employer companies across 6 countries who trust Sunkoshi Manpower for their workforce needs.
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {TABS.map(t => {
            const count = grouped[t.code].length
            const on = active === t.code
            return (
              <button key={t.code} onClick={() => setActive(t.code)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 100, cursor: 'pointer',
                  border: on ? '2px solid var(--navy)' : '1.5px solid var(--border)',
                  background: on ? 'var(--navy)' : 'var(--white)',
                  color: on ? '#fff' : 'var(--navy)',
                  fontWeight: 600, fontSize: '0.83rem',
                  transition: 'all 0.18s',
                }}>
                <span className={`fi fi-${t.code}`}
                  style={{ width: 18, height: 14, display: 'inline-block', backgroundSize: 'cover', borderRadius: 2, flexShrink: 0 }} />
                {t.label}
                <span style={{
                  background: on ? 'rgba(255,255,255,0.22)' : 'var(--pale)',
                  color: on ? '#fff' : 'var(--navy)',
                  borderRadius: 100, fontSize: '0.72rem', fontWeight: 700,
                  padding: '1px 7px', marginLeft: 2,
                }}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="clients-grid">
          {current.map((c, i) => (
            <div key={i}
              style={{
                background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10,
                padding: '11px 16px',
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)',
                transition: 'border-color 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(43,54,117,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}>
              <span style={{ lineHeight: 1.3 }}>{c.name}</span>
            </div>
          ))}
        </div>

      </div>
      <style>{`
        @media(max-width:900px){.clients-grid{grid-template-columns:repeat(3,1fr)!important}}
        @media(max-width:600px){.clients-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </section>
  )
}
