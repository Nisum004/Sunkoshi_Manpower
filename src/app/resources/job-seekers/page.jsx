'use client'
import { useState, useEffect } from 'react'
import { formOptions, contact } from '@/data/company'
import { jobs } from '@/data/jobs'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CreditCard, Camera, GraduationCap, Stethoscope, Phone, AlertTriangle } from 'lucide-react'

const requirements = [
  { Icon: CreditCard,   t:'Valid Passport',      d:'Must be valid for at least 1.5 years. If expired, renew first.' },
  { Icon: Camera,       t:'Recent Photograph',   d:'Passport-size, white background, recent.' },
  { Icon: GraduationCap,t:'Certificates',        d:'Academic certificates and any trade/skill certificates.' },
  { Icon: Stethoscope,  t:'Medical Fitness',     d:'Selected candidates will be sent for medical checkup before deployment.' },
  { Icon: Phone,        t:'Emergency Contact',   d:"Family member's name and phone number required." },
]

function JobSeekerForm() {
  const searchParams = useSearchParams()
  const preselectedJob = searchParams.get('job') || ''
  const activeJobs = jobs.filter(j => j.open)

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`https://formsubmit.co/${contact.formEmail}`, { method:'POST', body: new FormData(e.target) })
      setStatus('success')
      e.target.reset()
    } catch { setStatus('error') }
    setLoading(false)
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:56,alignItems:'start'}} className="js-grid">
      {/* Left info */}
      <div>
        <span className="section-tag">Before You Apply</span>
        <h2 className="section-title" style={{fontSize:'2rem'}}>What to <span>Prepare</span></h2>
        <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>Registering with Sunkoshi Manpower is your first step toward legitimate, safe overseas employment. We guide you through every step.</p>
        {requirements.map(({ Icon, t, d })=>(
          <div key={t} style={{display:'flex',gap:14,marginBottom:16,alignItems:'flex-start',padding:'14px 18px',background:'var(--white)',borderRadius:12,border:'1px solid var(--border)'}}>
            <span style={{flexShrink:0,color:'var(--blue)',marginTop:2}}><Icon size={22}/></span>
            <div><div style={{fontWeight:700,color:'var(--navy)',marginBottom:3,fontSize:'0.9rem'}}>{t}</div><div style={{fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.5}}>{d}</div></div>
          </div>
        ))}
        <div style={{marginTop:20,padding:'20px',background:'#FEF3C7',borderRadius:12,border:'1px solid #F59E0B',display:'flex',gap:12,alignItems:'flex-start'}}>
          <AlertTriangle size={18} color="#92400E" style={{flexShrink:0,marginTop:2}}/>
          <div style={{fontSize:'0.82rem',color:'#92400E',lineHeight:1.7}}>
            <strong>Important:</strong> Sunkoshi Manpower is a government-licensed agency. We never ask for upfront fees before a genuine job offer is made. Beware of fraudulent agents.
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{background:'var(--white)',borderRadius:20,padding:40,border:'1px solid var(--border)',boxShadow:'var(--shadow)'}}>
        <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.8rem',fontWeight:700,color:'var(--navy)',marginBottom:6}}>Job Seeker Registration</h3>
        <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:28}}>Fill in accurately. Our team will call you within 1–2 working days.</p>

        {status==='success'?(
          <div style={{padding:32,background:'#D1FAE5',borderRadius:12,textAlign:'center',color:'#065F46'}}>
            <i className="fas fa-check-circle" style={{fontSize:'2.5rem',marginBottom:12,display:'block'}}/>
            <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.4rem',marginBottom:8}}>Registration Received!</h3>
            <p>Our recruitment team will contact you within 1–2 working days. Keep your phone available.</p>
          </div>
        ):(
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Job Seeker Registration – Sunkoshi Manpower"/>
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="form_type" value="Job Seeker Registration"/>

            <div style={{background:'var(--pale)',borderRadius:10,padding:'14px 18px',marginBottom:18,fontSize:'0.8rem',fontWeight:600,color:'var(--navy)'}}>Personal Information</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div className="form-group"><label>Full Name *</label><input type="text" name="full_name" required placeholder="As on passport"/></div>
              <div className="form-group"><label>Date of Birth *</label><input type="date" name="dob" required/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div className="form-group"><label>Phone / WhatsApp *</label><input type="tel" name="phone" required placeholder="+977 98XXXXXXXX"/></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="your@email.com"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div className="form-group"><label>District / Province *</label><input type="text" name="district" required placeholder="e.g. Kathmandu, Pokhara"/></div>
              <div className="form-group"><label>Education Level *</label>
                <select name="education" required>
                  <option value="">Select...</option>
                  {['Below SLC','SLC / SEE','+2 / Intermediate','Bachelor\'s Degree','Master\'s Degree','Trade Certificate','Other'].map(e=><option key={e}>{e}</option>)}
                </select>
              </div>
            </div>

            <div style={{background:'var(--pale)',borderRadius:10,padding:'14px 18px',margin:'8px 0 18px',fontSize:'0.8rem',fontWeight:600,color:'var(--navy)'}}>Work Preference</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div className="form-group"><label>Preferred Country *</label>
                <select name="preferred_country" required>
                  <option value="">Select...</option>
                  {formOptions.countries.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Job Category *</label>
                <select name="job_category" required>
                  <option value="">Select...</option>
                  {formOptions.categories.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {activeJobs.length>0&&(
              <div className="form-group">
                <label>Applying For (Job Vacancy)</label>
                <select name="applying_for_job" defaultValue={preselectedJob}>
                  <option value="">General Registration (no specific job)</option>
                  {activeJobs.map(j=><option key={j.id} value={j.id}>{j.title} – {j.country} ({j.id})</option>)}
                </select>
              </div>
            )}

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div className="form-group"><label>Years of Experience</label>
                <select name="experience">
                  <option value="">Select...</option>
                  {['No experience (fresher)','Less than 1 year','1–2 years','3–5 years','5–10 years','10+ years'].map(e=><option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Passport Status *</label>
                <select name="passport_status" required>
                  <option value="">Select...</option>
                  {['Have valid passport','Passport expired','No passport yet'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label>Previous Work Experience / Skills</label><textarea name="experience_details" placeholder="Describe your previous work, skills, and any certifications you hold..."/></div>

            <button type="submit" className="form-submit" disabled={loading}>
              {loading?<><i className="fas fa-spinner fa-spin"/>Submitting...</>:<><i className="fas fa-paper-plane"/>Submit Registration</>}
            </button>
            {status==='error'&&<p style={{color:'#DC2626',fontSize:'0.8rem',marginTop:8,textAlign:'center'}}>Error. Please call us at {contact.hq.phones[0]}</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default function JobSeekersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="#">Resources</a><span>/</span><span>For Job Seekers</span></div>
          <h1>Find Work <em>Abroad</em></h1>
          <p>Register with Nepal's trusted agency. We connect you with legitimate, licensed employers worldwide.</p>
        </div>
      </div>
      <section style={{padding:'80px 0',background:'var(--pale)'}}>
        <div className="container">
          <Suspense fallback={<div style={{textAlign:'center',padding:40}}>Loading...</div>}>
            <JobSeekerForm/>
          </Suspense>
        </div>
      </section>
    </>
  )
}
