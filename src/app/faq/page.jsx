'use client'
import { useState } from 'react'
import { faqs } from '@/data/faq'
import { ChevronDown, HelpCircle, ClipboardList, FileText, DollarSign, HeartHandshake } from 'lucide-react'
import Link from 'next/link'
import { contact } from '@/data/company'

const iconMap = { HelpCircle, ClipboardList, FileText, DollarSign, HeartHandshake }

export default function FAQPage() {
  const [open, setOpen] = useState({})
  const toggle = key => setOpen(o => ({ ...o, [key]: !o[key] }))

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>FAQ</span></div>
          <h1>Frequently Asked <em>Questions</em></h1>
          <p>Everything you need to know before going abroad through Sunkoshi Manpower.</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--pale)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          {faqs.map(cat => {
            const Icon = iconMap[cat.icon] || HelpCircle
            return (
              <div key={cat.category} style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)' }}>{cat.category}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item, i) => {
                    const key = `${cat.category}-${i}`
                    const isOpen = open[key]
                    return (
                      <div key={key} style={{ background: 'var(--white)', borderRadius: 12, border: `1px solid ${isOpen ? 'var(--blue)' : 'var(--border)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                        <button onClick={() => toggle(key)} style={{ width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                          <span style={{ fontFamily: 'var(--ff-head)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4 }}>{item.q}</span>
                          <ChevronDown size={18} color="var(--blue)" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 22px 20px', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, borderTop: '1px solid var(--border)' }}>
                            <div style={{ paddingTop: 16 }}>{item.a}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Still have questions */}
          <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '40px 44px', textAlign: 'center', marginTop: 16 }}>
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>Still Have Questions?</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 28 }}>Our team is happy to answer any specific questions about your situation.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`tel:${contact.hq.phones[0]}`} className="btn btn-accent">Call Us Now</a>
              <Link href="/contact" className="btn btn-outline-white">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
