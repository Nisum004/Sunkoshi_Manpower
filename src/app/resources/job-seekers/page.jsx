'use client'
import { useState, useEffect, useRef } from 'react'
import { formOptions, contact } from '@/data/company'
import { useSearchParams } from 'next/navigation'
import { Suspense, lazy } from 'react'
import { CreditCard, Camera, GraduationCap, Stethoscope, Phone, AlertTriangle, Download, Printer, X } from 'lucide-react'
import dynamic from 'next/dynamic'

const BiodataTemplate = dynamic(() => import('@/components/forms/BiodataTemplate'), { ssr: false })

const requirements = [
  { Icon: CreditCard,   t:'Valid Passport',      d:'Must be valid for at least 1.5 years. If expired, renew first.' },
  { Icon: Camera,       t:'Recent Photograph',   d:'Passport-size, white background, recent.' },
  { Icon: GraduationCap,t:'Certificates',        d:'Academic certificates and any trade/skill certificates.' },
  { Icon: Stethoscope,  t:'Medical Fitness',     d:'Selected candidates will be sent for medical checkup before deployment.' },
  { Icon: Phone,        t:'Emergency Contact',   d:"Family member's name and phone number required." },
]

const LANGS = ['English', 'Hindi', 'Malay', 'Arabic']
const PROF  = ['', 'Basic', 'Good', 'Excellent']

const inputStyle = { width:'100%',padding:'10px 14px',border:'1.5px solid var(--border)',borderRadius:8,fontSize:'0.88rem',color:'var(--dark)',background:'var(--white)',outline:'none',boxSizing:'border-box' }
const labelStyle = { display:'block',fontSize:'0.78rem',fontWeight:600,color:'var(--navy)',marginBottom:5 }
const sectionLabel = { background:'var(--pale)',borderRadius:10,padding:'12px 18px',margin:'18px 0 16px',fontSize:'0.8rem',fontWeight:700,color:'var(--navy)',letterSpacing:'0.03em' }

function SectionHead({ children }) {
  return <div style={sectionLabel}>{children}</div>
}

function Field({ label, required, children }) {
  return (
    <div className="form-group" style={{marginBottom:14}}>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      {children}
    </div>
  )
}

function Input(props) {
  return <input style={inputStyle} {...props}/>
}

function Select({ children, ...props }) {
  return <select style={inputStyle} {...props}>{children}</select>
}

function JobSeekerForm() {
  const searchParams = useSearchParams()
  const preselectedJob = searchParams.get('job') || ''

  const [activeJobs, setActiveJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(preselectedJob)
  const [declared, setDeclared] = useState(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [showBiodata, setShowBiodata] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const biodataRef = useRef(null)

  useEffect(() => {
    fetch('/api/jobs.php?open=1')
      .then(r => r.json())
      .then(data => {
        const jobs = data.jobs || []
        setActiveJobs(jobs)
        if (preselectedJob && jobs.find(j => j.id === preselectedJob)) {
          setSelectedJob(preselectedJob)
        }
      })
      .catch(() => {})
  }, [preselectedJob])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.target)
    const dataObj = Object.fromEntries(fd.entries())
    // attach job title for the PDF
    const matchedJob = activeJobs.find(j => j.id === selectedJob)
    if (matchedJob) dataObj.job_title = `${matchedJob.title} – ${matchedJob.country}`
    try {
      const res  = await fetch('/api/apply.php', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setSubmittedData(dataObj)
        e.target.reset()
        setDeclared(false)
      } else setStatus('error')
    } catch { setStatus('error') }
    setLoading(false)
  }

  async function downloadPDF() {
    if (!biodataRef.current) return
    setPdfLoading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')
      const canvas = await html2canvas(biodataRef.current, {
        scale: 2, useCORS: true, backgroundColor: '#ffffff',
        width: 794, windowWidth: 794,
      })
      const imgData = canvas.toDataURL('image/jpeg', 0.97)
      const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' })
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
      pdf.save(`Sunkoshi_Biodata_${submittedData?.full_name || 'Application'}.pdf`)
    } catch(err) { console.error(err) }
    setPdfLoading(false)
  }

  function printBiodata() {
    const el = biodataRef.current
    if (!el) return
    const win = window.open('', '_blank')
    win.document.write(`<html><head><title>Sunkoshi Biodata</title>
      <style>body{margin:0;padding:0}@media print{body{margin:0}}</style>
      </head><body>${el.outerHTML}</body></html>`)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
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
        <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:24}}>Fill in accurately. Our team will call you within 1–2 working days.</p>

        {status==='success'?(
          <div>
            <div style={{padding:24,background:'#D1FAE5',borderRadius:12,textAlign:'center',color:'#065F46',marginBottom:20}}>
              <i className="fas fa-check-circle" style={{fontSize:'2.5rem',marginBottom:10,display:'block'}}/>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.4rem',marginBottom:6}}>Registration Received!</h3>
              <p style={{fontSize:'0.88rem',marginBottom:0}}>Our team will contact you within 1–2 working days. Keep your phone available.</p>
            </div>
            <div style={{background:'var(--pale)',borderRadius:12,padding:20,border:'1px solid var(--border)'}}>
              <p style={{fontWeight:700,color:'var(--navy)',marginBottom:14,fontSize:'0.92rem'}}>
                Your Biodata is ready — download, print, or share it:
              </p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:16}}>
                <button onClick={downloadPDF} disabled={pdfLoading}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--navy)',color:'#fff',border:'none',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer'}}>
                  <Download size={16}/>{pdfLoading ? 'Generating…' : 'Download PDF'}
                </button>
                <button onClick={printBiodata}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer'}}>
                  <Printer size={16}/>Print
                </button>
                <button onClick={()=>setShowBiodata(v=>!v)}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer'}}>
                  {showBiodata ? 'Hide' : 'Preview'} Biodata
                </button>
              </div>
              <p style={{fontSize:'0.75rem',color:'var(--muted)'}}>
                After downloading, you can send it via WhatsApp or email as an attachment.
              </p>
            </div>

            {/* Hidden template for capture */}
            <div style={{position:'fixed',left:'-9999px',top:0,zIndex:-1,pointerEvents:'none'}}>
              <BiodataTemplate ref={biodataRef} data={submittedData}/>
            </div>

            {/* Preview modal */}
            {showBiodata && (
              <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:9999,overflow:'auto',padding:'40px 20px'}} onClick={()=>setShowBiodata(false)}>
                <div style={{maxWidth:860,margin:'0 auto',position:'relative'}} onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>setShowBiodata(false)}
                    style={{position:'absolute',top:-16,right:-16,zIndex:10,background:'var(--navy)',border:'none',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
                    <X size={18}/>
                  </button>
                  <div style={{borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,0.5)',transform:'scale(0.9)',transformOrigin:'top center'}}>
                    <BiodataTemplate data={submittedData}/>
                  </div>
                  <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:20}}>
                    <button onClick={downloadPDF} disabled={pdfLoading}
                      style={{display:'flex',alignItems:'center',gap:8,padding:'12px 24px',background:'var(--navy)',color:'#fff',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}>
                      <Download size={16}/>{pdfLoading ? 'Generating…' : 'Download PDF'}
                    </button>
                    <button onClick={printBiodata}
                      style={{display:'flex',alignItems:'center',gap:8,padding:'12px 24px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,cursor:'pointer'}}>
                      <Printer size={16}/>Print
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ):(
          <form onSubmit={handleSubmit}>

            {/* ── Personal Information ── */}
            <SectionHead>Personal Information</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Full Name" required>
                <Input type="text" name="full_name" required placeholder="As on passport"/>
              </Field>
              <Field label="Date of Birth" required>
                <Input type="date" name="dob" required/>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Nationality" required>
                <Input type="text" name="nationality" required placeholder="e.g. Nepali"/>
              </Field>
              <Field label="Religion">
                <Select name="religion">
                  <option value="">Select...</option>
                  {['Hindu','Buddhist','Muslim','Christian','Other'].map(r=><option key={r}>{r}</option>)}
                </Select>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Gender" required>
                <Select name="gender" required>
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Marital Status">
                <Select name="marital_status">
                  <option value="">Select...</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </Select>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Height (cm)">
                <Input type="number" name="height_cm" placeholder="e.g. 168" min="100" max="250"/>
              </Field>
              <Field label="Weight (kg)">
                <Input type="number" name="weight_kg" placeholder="e.g. 65" min="30" max="200"/>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Phone / WhatsApp" required>
                <Input type="tel" name="phone" required placeholder="+977 98XXXXXXXX"/>
              </Field>
              <Field label="Email">
                <Input type="email" name="email" placeholder="your@email.com"/>
              </Field>
            </div>
            <Field label="Permanent Address / District" required>
              <Input type="text" name="district" required placeholder="e.g. Kathmandu, Sindhupalchok"/>
            </Field>

            {/* ── Passport ── */}
            <SectionHead>Passport Details</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
              <Field label="Passport Number">
                <Input type="text" name="passport_no" placeholder="e.g. Pa1234567"/>
              </Field>
              <Field label="Passport Validity">
                <Input type="date" name="passport_validity"/>
              </Field>
              <Field label="Passport Status" required>
                <Select name="passport_status" required>
                  <option value="">Select...</option>
                  {['Have valid passport','Passport expired','No passport yet'].map(p=><option key={p}>{p}</option>)}
                </Select>
              </Field>
            </div>

            {/* ── Education ── */}
            <SectionHead>Education</SectionHead>
            <Field label="Education Level" required>
              <Select name="education" required>
                <option value="">Select...</option>
                {['Primary School','Secondary School (SLC/SEE)','+2 / Higher Secondary','Bachelor\'s Degree','Master\'s Degree','Trade / Skill Certificate','Other'].map(e=><option key={e}>{e}</option>)}
              </Select>
            </Field>

            {/* ── Language Skills ── */}
            <SectionHead>Language Skills</SectionHead>
            <div style={{overflowX:'auto',marginBottom:4}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead>
                  <tr style={{background:'var(--navy)',color:'var(--white)'}}>
                    <th style={{padding:'9px 14px',textAlign:'left',fontWeight:600,borderRadius:'8px 0 0 0'}}>Language</th>
                    <th style={{padding:'9px 14px',textAlign:'center',fontWeight:600}}>Speaking</th>
                    <th style={{padding:'9px 14px',textAlign:'center',fontWeight:600}}>Reading</th>
                    <th style={{padding:'9px 14px',textAlign:'center',fontWeight:600,borderRadius:'0 8px 0 0'}}>Writing</th>
                  </tr>
                </thead>
                <tbody>
                  {LANGS.map((lang, i) => (
                    <tr key={lang} style={{background: i%2===0 ? 'var(--pale)' : 'var(--white)'}}>
                      <td style={{padding:'8px 14px',fontWeight:600,color:'var(--navy)',border:'1px solid var(--border)'}}>{lang}</td>
                      {['speaking','reading','writing'].map(skill => (
                        <td key={skill} style={{padding:'6px 10px',border:'1px solid var(--border)',textAlign:'center'}}>
                          <select name={`lang_${lang.toLowerCase()}_${skill}`} style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}>
                            {PROF.map(p=><option key={p} value={p}>{p||'—'}</option>)}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Work Preference ── */}
            <SectionHead>Work Preference</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Preferred Country" required>
                <Select name="preferred_country" required>
                  <option value="">Select...</option>
                  {formOptions.countries.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Job Category" required>
                <Select name="job_category" required>
                  <option value="">Select...</option>
                  {formOptions.categories.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
            </div>
            <Field label="Applying For (Job Vacancy)">
              <Select name="applying_for_job" value={selectedJob} onChange={e=>setSelectedJob(e.target.value)}>
                <option value="">General Registration (no specific job)</option>
                {activeJobs.map(j=><option key={j.id} value={j.id}>{j.title} – {j.country} ({j.id})</option>)}
              </Select>
            </Field>
            <Field label="Years of Experience">
              <Select name="experience">
                <option value="">Select...</option>
                {['No experience (fresher)','Less than 1 year','1–2 years','3–5 years','5–10 years','10+ years'].map(e=><option key={e}>{e}</option>)}
              </Select>
            </Field>

            {/* ── Work Experience ── */}
            <SectionHead>Working Experience</SectionHead>
            <div style={{overflowX:'auto',marginBottom:4}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead>
                  <tr style={{background:'var(--navy)',color:'var(--white)'}}>
                    <th style={{padding:'9px 14px',textAlign:'left',fontWeight:600,borderRadius:'8px 0 0 0',width:'22%'}}>Period (Year)</th>
                    <th style={{padding:'9px 14px',textAlign:'left',fontWeight:600,width:'38%'}}>Occupation / Job Description</th>
                    <th style={{padding:'9px 14px',textAlign:'left',fontWeight:600,borderRadius:'0 8px 0 0'}}>Name of Company</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3].map((n,i) => (
                    <tr key={n} style={{background: i%2===0 ? 'var(--pale)' : 'var(--white)'}}>
                      <td style={{padding:'6px 10px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_period`} placeholder="e.g. 2020–2022" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                      <td style={{padding:'6px 10px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_occupation`} placeholder="e.g. Factory Worker" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                      <td style={{padding:'6px 10px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_company`} placeholder="Company name" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Field label="Additional Skills / Certifications">
              <textarea name="experience_details" style={{...inputStyle,minHeight:80,resize:'vertical'}} placeholder="Any other skills, trade certificates, or relevant information..."/>
            </Field>

            {/* ── Declaration ── */}
            <div style={{background:'var(--pale)',borderRadius:10,padding:'16px 18px',margin:'18px 0 20px',border:'1px solid var(--border)'}}>
              <label style={{display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer'}}>
                <input type="checkbox" name="declaration" required checked={declared} onChange={e=>setDeclared(e.target.checked)}
                  style={{marginTop:3,width:16,height:16,flexShrink:0,accentColor:'var(--blue)',cursor:'pointer'}}/>
                <span style={{fontSize:'0.82rem',color:'var(--dark)',lineHeight:1.6}}>
                  I hereby declare that the above statements given are true and correct to the best of my knowledge.
                </span>
              </label>
            </div>

            <button type="submit" className="form-submit" disabled={loading || !declared}>
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
