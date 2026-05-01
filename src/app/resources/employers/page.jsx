'use client'
import { useState } from 'react'
import { formOptions, contact } from '@/data/company'
import { Zap, CheckCircle, ClipboardList, Globe, RefreshCw } from 'lucide-react'

const whyUs = [
  { Icon: Zap,           t:'Fast Turnaround',       d:'We deploy within your timeline with 48-hour advance notice before each departure.' },
  { Icon: CheckCircle,   t:'Pre-screened Candidates',d:'All applicants go through our multi-stage screening and trade test process.' },
  { Icon: ClipboardList, t:'Full Documentation',     d:'We handle all Nepal-side legal documents — demand letters, MOL approvals, contracts.' },
  { Icon: Globe,         t:'Any Country',            d:'We are licensed to deploy to Gulf, Malaysia, Japan, South Korea and beyond.' },
  { Icon: RefreshCw,     t:'Replacement Guarantee',  d:'If a worker cannot perform, we manage replacements as per our service agreement.' },
]

export default function EmployersPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res  = await fetch('/api/employer.php', { method: 'POST', body: new FormData(e.target) })
      const data = await res.json()
      if (data.success) { setStatus('success'); e.target.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
    setLoading(false)
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="#">Resources</a><span>/</span><span>For Employers</span></div>
          <h1>Hire <em>Nepali Workers</em></h1>
          <p>Tell us your requirements. We source, screen, train and deploy the right workforce for you.</p>
        </div>
      </div>

      <section style={{padding:'80px 0',background:'var(--pale)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:56,alignItems:'start'}} className="emp-grid">
            {/* Left */}
            <div>
              <span className="section-tag">Why Partner With Us</span>
              <h2 className="section-title" style={{fontSize:'2rem'}}>Your Trusted Recruitment <span>Partner in Nepal</span></h2>
              <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:28}}>We have 30 years of experience supplying quality Nepali manpower to Gulf, Malaysia, and Japan. Our compliance, documentation, and deployment process is fully managed for you.</p>
              {whyUs.map(({ Icon, t, d })=>(
                <div key={t} style={{display:'flex',gap:14,marginBottom:20,alignItems:'flex-start',padding:'16px 20px',background:'var(--white)',borderRadius:12,border:'1px solid var(--border)'}}>
                  <span style={{flexShrink:0,color:'var(--blue)',marginTop:2}}><Icon size={22}/></span>
                  <div><div style={{fontWeight:700,color:'var(--navy)',marginBottom:4}}>{t}</div><div style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.6}}>{d}</div></div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{background:'var(--white)',borderRadius:20,padding:40,border:'1px solid var(--border)',boxShadow:'var(--shadow)'}}>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.8rem',fontWeight:700,color:'var(--navy)',marginBottom:6}}>Post Your Requirement</h3>
              <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:28}}>Our team will respond within 1–2 working days with a tailored proposal.</p>

              {status==='success'?(
                <div style={{padding:32,background:'#D1FAE5',borderRadius:12,textAlign:'center',color:'#065F46'}}>
                  <i className="fas fa-check-circle" style={{fontSize:'2.5rem',marginBottom:12,display:'block'}}/>
                  <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.4rem',marginBottom:8}}>Requirement Received!</h3>
                  <p>Our recruitment team will contact you within 1–2 working days with a tailored proposal.</p>
                </div>
              ):(
                <form onSubmit={handleSubmit}>

                  <div style={{background:'var(--pale)',borderRadius:10,padding:'16px 20px',marginBottom:20,fontSize:'0.82rem',color:'var(--muted)'}}>
                    <strong style={{color:'var(--navy)'}}>Company Information</strong>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div className="form-group"><label>Company Name *</label><input type="text" name="company_name" required placeholder="Your company name"/></div>
                    <div className="form-group"><label>Contact Person *</label><input type="text" name="contact_person" required placeholder="Your full name"/></div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div className="form-group"><label>Email Address *</label><input type="email" name="email" required placeholder="company@email.com"/></div>
                    <div className="form-group"><label>Phone / WhatsApp *</label><input type="tel" name="phone" required placeholder="+966 XXXXXXXXX"/></div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div className="form-group"><label>Country *</label>
                      <select name="country" required>
                        <option value="">Select country...</option>
                        {formOptions.countries.map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label>Industry / Sector *</label>
                      <select name="sector" required>
                        <option value="">Select sector...</option>
                        {formOptions.sectors.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{background:'var(--pale)',borderRadius:10,padding:'16px 20px',margin:'8px 0 20px',fontSize:'0.82rem',color:'var(--muted)'}}>
                    <strong style={{color:'var(--navy)'}}>Manpower Requirements</strong>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div className="form-group"><label>Job Title / Category *</label><input type="text" name="job_title" required placeholder="e.g. Electrician, Welder"/></div>
                    <div className="form-group"><label>Number of Workers *</label>
                      <select name="workers_needed" required>
                        <option value="">Select range...</option>
                        {formOptions.workers.map(w=><option key={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div className="form-group"><label>Offered Salary</label><input type="text" name="salary" placeholder="e.g. SAR 1,200/month"/></div>
                    <div className="form-group"><label>Expected Deployment Date</label><input type="text" name="deployment_date" placeholder="DD/MM/YYYY" maxLength={10} onInput={e=>{let v=e.target.value.replace(/\D/g,'');if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);if(v.length>5)v=v.slice(0,5)+'/'+v.slice(5);e.target.value=v.slice(0,10)}}/></div>
                  </div>
                  <div className="form-group"><label>Benefits Provided</label><input type="text" name="benefits" placeholder="e.g. Free accommodation, food, transport"/></div>
                  <div className="form-group"><label>Specific Requirements / Notes</label><textarea name="requirements" placeholder="Experience needed, age range, certifications, special skills..."/></div>

                  <button type="submit" className="form-submit" disabled={loading} style={{marginTop:8}}>
                    {loading?<><i className="fas fa-spinner fa-spin"/>Submitting...</>:<><i className="fas fa-handshake"/>Submit Requirement</>}
                  </button>
                  {status==='error'&&<p style={{color:'#DC2626',fontSize:'0.8rem',marginTop:8,textAlign:'center'}}>Error. Please email us directly at {contact.hq.emails[0]}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
