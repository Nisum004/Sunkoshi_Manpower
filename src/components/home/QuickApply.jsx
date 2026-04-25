'use client'
import Link from 'next/link'
import { formOptions, contact } from '@/data/company'
import { useState } from 'react'
import { Gift, Zap, Lock, Globe } from 'lucide-react'

const features = [
  { Icon: Gift,  t:'Completely Free',   d:'No fees for initial registration.' },
  { Icon: Zap,   t:'Fast Response',     d:'Response within 1–2 working days.' },
  { Icon: Lock,  t:'Confidential',      d:'Your information is fully private.' },
  { Icon: Globe, t:'Global Placements', d:'Gulf, Malaysia, Japan and more.'    },
]

export default function QuickApply() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formsubmit.co/${contact.formEmail}`, { method:'POST', body:data })
      if(res.ok){ setStatus('success'); form.reset() } else setStatus('error')
    } catch { setStatus('error') }
    setLoading(false)
  }

  return (
    <section id="apply" style={{padding:'100px 0',background:'var(--pale)'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}} className="apply-grid">
          <div>
            <span className="section-tag">Get Started</span>
            <h2 className="section-title">Drop Us Your <span>Information</span></h2>
            <p className="section-sub" style={{marginBottom:32}}>Our representative will review your details and contact you shortly. Free and confidential.</p>
            {features.map(({ Icon, t, d })=>(
              <div key={t} style={{display:'flex',gap:14,marginBottom:20,alignItems:'flex-start'}}>
                <div style={{width:38,height:38,background:'var(--white)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2,border:'1px solid var(--border)',color:'var(--blue)'}}>
                  <Icon size={18}/>
                </div>
                <div><div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.9rem',marginBottom:2}}>{t}</div><div style={{fontSize:'0.82rem',color:'var(--muted)'}}>{d}</div></div>
              </div>
            ))}
            <div style={{marginTop:16,padding:'20px 24px',background:'var(--navy)',borderRadius:12,color:'rgba(255,255,255,0.8)',fontSize:'0.85rem',lineHeight:1.8}}>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',color:'var(--accent)',fontWeight:700,marginBottom:8}}>Want to fill a complete form?</div>
              <Link href="/resources/job-seekers" style={{color:'var(--accent)',fontWeight:600,textDecoration:'none'}}>→ Job Seeker Form</Link><br/>
              <Link href="/resources/employers" style={{color:'var(--accent)',fontWeight:600,textDecoration:'none'}}>→ Employer Requirements Form</Link>
            </div>
          </div>
          <div style={{background:'var(--white)',borderRadius:20,padding:40,border:'1px solid var(--border)',boxShadow:'var(--shadow)'}}>
            <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.6rem',fontWeight:700,color:'var(--navy)',marginBottom:6}}>Quick Inquiry</h3>
            <p style={{fontSize:'0.84rem',color:'var(--muted)',marginBottom:24}}>Fill in and our team contacts you.</p>
            {status==='success'?<div style={{padding:'20px',background:'#D1FAE5',borderRadius:10,color:'#065F46',textAlign:'center',fontSize:'0.9rem',fontWeight:600}}><i className="fas fa-check-circle"/> Thank you! We will contact you soon.</div>:
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="Quick Inquiry – Sunkoshi Manpower"/>
              <input type="hidden" name="_captcha" value="false"/>
              <div className="form-row" style={{gap:14,display:'grid',gridTemplateColumns:'1fr 1fr',marginBottom:14}}>
                <div className="form-group"><label>Full Name *</label><input type="text" name="name" placeholder="Your name" required/></div>
                <div className="form-group"><label>Phone *</label><input type="tel" name="phone" placeholder="+977 98XXXXXXXX" required/></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="your@email.com"/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div className="form-group"><label>Country *</label>
                  <select name="country" required>
                    <option value="">Select...</option>
                    {formOptions.countries.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Category *</label>
                  <select name="category" required>
                    <option value="">Select...</option>
                    {formOptions.categories.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Message</label><textarea name="message" placeholder="Your experience and availability..." style={{minHeight:80}}/></div>
              <button type="submit" className="form-submit" disabled={loading}>{loading?<><i className="fas fa-spinner fa-spin"/>Sending...</>:<><i className="fas fa-paper-plane"/>Submit My Details</>}</button>
              {status==='error'&&<p style={{color:'#DC2626',fontSize:'0.8rem',textAlign:'center',marginTop:8}}>Something went wrong. Please try again or call us directly.</p>}
            </form>}
          </div>
        </div>
      </div>
    </section>
  )
}
