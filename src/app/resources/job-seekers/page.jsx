'use client'
import { useState, useEffect, useRef } from 'react'
import { formOptions, contact } from '@/data/company'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CreditCard, Camera, GraduationCap, Stethoscope, Phone, AlertTriangle, Download, Printer, Eye, X, Plus, Minus } from 'lucide-react'
import BiodataTemplate from '@/components/forms/BiodataTemplate'

const requirements = [
  { Icon: CreditCard,    t:'Valid Passport',    d:'Must be valid for at least 1.5 years. If expired, renew first.' },
  { Icon: Camera,        t:'Recent Photograph', d:'Passport-size, white background, recent.' },
  { Icon: GraduationCap, t:'Certificates',      d:'Academic certificates and any trade/skill certificates.' },
  { Icon: Stethoscope,   t:'Medical Fitness',   d:'Selected candidates will be sent for medical checkup before deployment.' },
  { Icon: Phone,         t:'Emergency Contact', d:"Family member's name and phone number required." },
]

const PROF = ['', 'Basic', 'Good', 'Excellent']
const inputStyle = { width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:'0.88rem', color:'var(--dark)', background:'var(--white)', outline:'none', boxSizing:'border-box' }
const labelStyle = { display:'block', fontSize:'0.78rem', fontWeight:600, color:'var(--navy)', marginBottom:5 }
const sectionLabel = { background:'var(--pale)', borderRadius:10, padding:'12px 18px', margin:'18px 0 16px', fontSize:'0.8rem', fontWeight:700, color:'var(--navy)', letterSpacing:'0.03em' }

function SectionHead({ children }) { return <div style={sectionLabel}>{children}</div> }
function Field({ label, required, children }) {
  return (
    <div className="form-group" style={{marginBottom:14}}>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      {children}
    </div>
  )
}
function Input(props) { return <input style={inputStyle} {...props}/> }
function Sel({ children, ...props }) { return <select style={inputStyle} {...props}>{children}</select> }

function JobSeekerForm() {
  const searchParams = useSearchParams()
  const preselectedJob = searchParams.get('job') || ''

  const [activeJobs, setActiveJobs]     = useState([])
  const [selectedJob, setSelectedJob]   = useState(preselectedJob)
  const [declared, setDeclared]         = useState(false)
  const [status, setStatus]             = useState('')
  const [loading, setLoading]           = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [showPreview, setShowPreview]     = useState(false)
  const [downloading, setDownloading]     = useState(false)

  // Language rows — English is always first and fixed
  const [langRows, setLangRows] = useState([
    { id: 'english', name: 'English', fixed: true, speaking: '', reading: '', writing: '' }
  ])

  const captureRef = useRef(null)

  useEffect(() => {
    fetch('/api/jobs.php?open=1')
      .then(r => r.json())
      .then(data => {
        const jobs = data.jobs || []
        setActiveJobs(jobs)
        if (preselectedJob && jobs.find(j => j.id === preselectedJob)) setSelectedJob(preselectedJob)
      })
      .catch(() => {})
  }, [preselectedJob])

  function addLangRow() {
    if (langRows.length >= 4) return
    setLangRows(r => [...r, { id: Date.now(), name: '', fixed: false, speaking: '', reading: '', writing: '' }])
  }
  function removeLangRow(id) { setLangRows(r => r.filter(x => x.id !== id)) }
  function updateLang(id, field, val) { setLangRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x)) }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.target)
    const dataObj = Object.fromEntries(fd.entries())
    // Attach job title for PDF
    const matched = activeJobs.find(j => j.id === selectedJob)
    if (matched) dataObj.job_title = `${matched.title} – ${matched.country}`
    // Attach language rows for PDF
    dataObj.languages = langRows.filter(r => r.name.trim()).map(r => ({
      name: r.name, speaking: r.speaking, reading: r.reading, writing: r.writing,
    }))
    fd.append('languages_json', JSON.stringify(dataObj.languages))
    try {
      const res  = await fetch('/api/apply.php', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setSubmittedData(dataObj)
        e.target.reset()
        setDeclared(false)
        setLangRows([{ id: 'english', name: 'English', fixed: true, speaking: '', reading: '', writing: '' }])
      } else setStatus('error')
    } catch { setStatus('error') }
    setLoading(false)
  }

  function getBiodataHTML() {
    const el = captureRef.current
    if (!el) return null
    const origin = window.location.origin
    return el.outerHTML.replace(/src="\/images\//g, `src="${origin}/images/`)
  }

  function openBiodataWindow(autoPrint = false) {
    const win = window.open('', '_blank', 'width=860,height=1100')
    if (!win) { alert('Please allow popups for this site.'); return }
    const name = submittedData?.full_name || 'Applicant'
    const html = getBiodataHTML() || ''
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8">
      <title>${name}_Sunkoshi</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0;
            -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
        html, body { width: 210mm; background: #fff; color: #1a3a8c; }
        @page { size: A4 portrait; margin: 0; }
      </style>
    </head><body>${html}</body></html>`)
    win.document.close()
    if (autoPrint) setTimeout(() => { try { win.focus(); win.print() } catch(e) {} }, 800)
  }

  function printBiodata() { openBiodataWindow(true) }

  async function downloadPDF() {
    const el = captureRef.current
    if (!el) return
    const rawName = submittedData?.full_name || 'Applicant'
    const filename = rawName.trim().replace(/\s+/g, '_') + '_Sunkoshi'
    setDownloading(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, logging: false,
        width: 794, windowWidth: 794,
        backgroundColor: '#ffffff',
      })
      const imgData = canvas.toDataURL('image/jpeg', 0.97)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = (canvas.height * pdfW) / canvas.width
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)
      pdf.save(filename + '.pdf')
    } catch {
      alert('PDF generation failed. Please use the Print button instead.')
    }
    setDownloading(false)
  }

  return (
    <>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:56,alignItems:'start'}} className="js-grid">

      {/* Left info */}
      <div>
        <span className="section-tag">Before You Apply</span>
        <h2 className="section-title" style={{fontSize:'2rem'}}>What to <span>Prepare</span></h2>
        <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>Registering with Sunkoshi Manpower is your first step toward legitimate, safe overseas employment. We guide you through every step.</p>
        {requirements.map(({ Icon, t, d }) => (
          <div key={t} style={{display:'flex',gap:14,marginBottom:16,alignItems:'flex-start',padding:'14px 18px',background:'var(--white)',borderRadius:12,border:'1px solid var(--border)'}}>
            <span style={{flexShrink:0,color:'var(--blue)',marginTop:2}}><Icon size={22}/></span>
            <div>
              <div style={{fontWeight:700,color:'var(--navy)',marginBottom:3,fontSize:'0.9rem'}}>{t}</div>
              <div style={{fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.5}}>{d}</div>
            </div>
          </div>
        ))}
        <div style={{marginTop:20,padding:'20px',background:'#FEF3C7',borderRadius:12,border:'1px solid #F59E0B',display:'flex',gap:12,alignItems:'flex-start'}}>
          <AlertTriangle size={18} color="#92400E" style={{flexShrink:0,marginTop:2}}/>
          <div style={{fontSize:'0.82rem',color:'#92400E',lineHeight:1.7}}>
            <strong>Important:</strong> Sunkoshi Manpower is a government-licensed agency. We never ask for upfront fees before a genuine job offer is made. Beware of fraudulent agents.
          </div>
        </div>

        {/* Download blank form */}
        <div style={{marginTop:20,padding:'18px 20px',background:'var(--white)',borderRadius:12,border:'1px solid var(--border)',display:'flex',gap:14,alignItems:'center'}}>
          <div style={{flexShrink:0,width:44,height:44,background:'var(--pale)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Download size={20} color="var(--navy)"/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.88rem',marginBottom:2}}>Prefer a paper form?</div>
            <div style={{fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.5}}>Download the blank application form, fill by hand, and bring it to our office.</div>
          </div>
          <a href="/api/download-form.php" target="_blank" style={{
            display:'inline-flex',alignItems:'center',gap:6,
            padding:'9px 18px',background:'var(--navy)',color:'#fff',
            borderRadius:8,fontWeight:700,fontSize:'0.82rem',
            textDecoration:'none',whiteSpace:'nowrap',flexShrink:0,
          }}>
            <Download size={14}/> Download Form
          </a>
        </div>
      </div>

      {/* Form card */}
      <div style={{background:'var(--white)',borderRadius:20,padding:40,border:'1px solid var(--border)',boxShadow:'var(--shadow)'}}>

        {/* Logo + heading */}
        <div style={{textAlign:'center',marginBottom:24}}>
          <img src="/images/logo.png" alt="Sunkoshi Manpower"
            style={{width:64,height:64,objectFit:'contain',display:'block',margin:'0 auto 10px'}}
            onError={e=>{e.target.style.display='none'}}/>
          <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.7rem',fontWeight:700,color:'var(--navy)',marginBottom:4}}>Job Seeker Registration</h3>
          <p style={{fontSize:'0.83rem',color:'var(--muted)'}}>Fill in accurately. Our team will call you within 1–2 working days.</p>
        </div>

        {status === 'success' ? (
          <div>
            <div style={{padding:24,background:'#D1FAE5',borderRadius:12,textAlign:'center',color:'#065F46',marginBottom:20}}>
              <i className="fas fa-check-circle" style={{fontSize:'2.5rem',marginBottom:10,display:'block'}}/>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.4rem',marginBottom:6}}>Registration Received!</h3>
              <p style={{fontSize:'0.88rem',marginBottom:0}}>Our team will contact you within 1–2 working days.</p>
            </div>
            <div style={{background:'var(--pale)',borderRadius:12,padding:20,border:'1px solid var(--border)'}}>
              <p style={{fontWeight:700,color:'var(--navy)',marginBottom:14,fontSize:'0.92rem'}}>Your Biodata is ready — download, print, or share:</p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:12}}>
                <button onClick={downloadPDF} disabled={downloading}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--navy)',color:'#fff',border:'none',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:downloading?'not-allowed':'pointer',opacity:downloading?0.7:1}}>
                  <Download size={15}/>{downloading ? 'Generating…' : 'Download PDF'}
                </button>
                <button onClick={printBiodata}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer'}}>
                  <Printer size={15}/>Print
                </button>
                <button onClick={() => setShowPreview(v => !v)}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer'}}>
                  <Eye size={15}/>{showPreview ? 'Hide' : 'Preview'}
                </button>
              </div>
              <p style={{fontSize:'0.74rem',color:'var(--muted)'}}>After downloading, send via WhatsApp or email as an attachment.</p>
            </div>

            {/* Preview modal */}
            {showPreview && (
              <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:9999,overflowY:'auto',padding:'32px 16px'}}
                onClick={() => setShowPreview(false)}>
                <div style={{maxWidth:860,margin:'0 auto',position:'relative'}} onClick={e => e.stopPropagation()}>
                  <button onClick={() => setShowPreview(false)}
                    style={{position:'absolute',top:-14,right:-14,zIndex:10,background:'var(--navy)',border:'none',borderRadius:'50%',width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
                    <X size={16}/>
                  </button>
                  <div style={{borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,0.4)',transform:'scale(0.88)',transformOrigin:'top center'}}>
                    <BiodataTemplate data={submittedData}/>
                  </div>
                  <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:16}}>
                    <button onClick={downloadPDF} disabled={false}
                      style={{display:'flex',alignItems:'center',gap:8,padding:'11px 22px',background:'var(--navy)',color:'#fff',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}>
                      <Download size={15}/>Download PDF
                    </button>
                    <button onClick={printBiodata}
                      style={{display:'flex',alignItems:'center',gap:8,padding:'11px 22px',background:'var(--white)',color:'var(--navy)',border:'1.5px solid var(--border)',borderRadius:8,fontWeight:600,cursor:'pointer'}}>
                      <Printer size={15}/>Print
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* ── Personal Information ── */}
            <SectionHead>Personal Information</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Full Name" required><Input type="text" name="full_name" required placeholder="As on passport"/></Field>
              <Field label="Date of Birth" required><Input type="text" name="dob" required placeholder="DD/MM/YYYY" maxLength={10} onInput={e=>{let v=e.target.value.replace(/\D/g,'');if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);if(v.length>5)v=v.slice(0,5)+'/'+v.slice(5);e.target.value=v.slice(0,10)}}/></Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Nationality" required><Input type="text" name="nationality" required placeholder="e.g. Nepali"/></Field>
              <Field label="Religion">
                <Sel name="religion">
                  <option value="">Select...</option>
                  {['Hindu','Buddhist','Muslim','Christian','Other'].map(r=><option key={r}>{r}</option>)}
                </Sel>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Gender" required>
                <Sel name="gender" required>
                  <option value="">Select...</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </Sel>
              </Field>
              <Field label="Marital Status">
                <Sel name="marital_status">
                  <option value="">Select...</option>
                  <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                </Sel>
              </Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Height (cm)"><Input type="number" name="height_cm" placeholder="e.g. 168" min="100" max="250"/></Field>
              <Field label="Weight (kg)"><Input type="number" name="weight_kg" placeholder="e.g. 65" min="30" max="200"/></Field>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Phone / WhatsApp" required><Input type="tel" name="phone" required placeholder="+977 98XXXXXXXX"/></Field>
              <Field label="Email"><Input type="email" name="email" placeholder="your@email.com"/></Field>
            </div>
            <Field label="Permanent Address / District" required>
              <Input type="text" name="district" required placeholder="e.g. Kathmandu, Sindhupalchok"/>
            </Field>

            {/* ── Passport ── */}
            <SectionHead>Passport Details</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
              <Field label="Passport Number"><Input type="text" name="passport_no" placeholder="e.g. Pa1234567"/></Field>
              <Field label="Passport Validity"><Input type="text" name="passport_validity" placeholder="DD/MM/YYYY" maxLength={10} onInput={e=>{let v=e.target.value.replace(/\D/g,'');if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);if(v.length>5)v=v.slice(0,5)+'/'+v.slice(5);e.target.value=v.slice(0,10)}}/></Field>
              <Field label="Passport Status" required>
                <Sel name="passport_status" required>
                  <option value="">Select...</option>
                  {['Have valid passport','Passport expired','No passport yet'].map(p=><option key={p}>{p}</option>)}
                </Sel>
              </Field>
            </div>

            {/* ── Education ── */}
            <SectionHead>Education</SectionHead>
            <Field label="Education Level" required>
              <Sel name="education" required>
                <option value="">Select...</option>
                {["Primary School","Secondary School (SLC/SEE)","+2 / Higher Secondary","Bachelor's Degree","Master's Degree","Trade / Skill Certificate","Other"].map(e=><option key={e}>{e}</option>)}
              </Sel>
            </Field>

            {/* ── Language Skills ── */}
            <SectionHead>Language Skills</SectionHead>
            <div style={{overflowX:'auto',marginBottom:8}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead>
                  <tr style={{background:'var(--navy)',color:'var(--white)'}}>
                    <th style={{padding:'9px 12px',textAlign:'left',fontWeight:600,borderRadius:'8px 0 0 0',minWidth:130}}>Language</th>
                    <th style={{padding:'9px 12px',textAlign:'center',fontWeight:600}}>Speaking</th>
                    <th style={{padding:'9px 12px',textAlign:'center',fontWeight:600}}>Reading</th>
                    <th style={{padding:'9px 12px',textAlign:'center',fontWeight:600,borderRadius:'0 8px 0 0'}}>Writing</th>
                    <th style={{padding:'9px 8px',width:32}}></th>
                  </tr>
                </thead>
                <tbody>
                  {langRows.map((row, i) => (
                    <tr key={row.id} style={{background: i%2===0 ? 'var(--pale)' : 'var(--white)'}}>
                      <td style={{padding:'6px 8px',border:'1px solid var(--border)'}}>
                        {row.fixed
                          ? <span style={{fontWeight:600,color:'var(--navy)',paddingLeft:6}}>English</span>
                          : <input
                              value={row.name}
                              onChange={e => updateLang(row.id, 'name', e.target.value)}
                              placeholder="Enter language"
                              style={{...inputStyle,padding:'5px 8px',fontSize:'0.8rem'}}/>
                        }
                      </td>
                      {['speaking','reading','writing'].map(skill => (
                        <td key={skill} style={{padding:'5px 8px',border:'1px solid var(--border)',textAlign:'center'}}>
                          <select
                            value={row[skill]}
                            onChange={e => updateLang(row.id, skill, e.target.value)}
                            style={{...inputStyle,padding:'5px 6px',fontSize:'0.78rem',textAlign:'center'}}>
                            {PROF.map(p => <option key={p} value={p}>{p || '—'}</option>)}
                          </select>
                        </td>
                      ))}
                      <td style={{padding:'4px',border:'1px solid var(--border)',textAlign:'center'}}>
                        {!row.fixed && (
                          <button type="button" onClick={() => removeLangRow(row.id)}
                            style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted)',padding:4,display:'flex',alignItems:'center'}}>
                            <Minus size={14}/>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {langRows.length < 4 && (
              <button type="button" onClick={addLangRow}
                style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.8rem',fontWeight:600,color:'var(--blue)',background:'none',border:'1.5px dashed var(--border)',borderRadius:8,padding:'7px 14px',cursor:'pointer',marginBottom:4}}>
                <Plus size={14}/> Add Language ({4 - langRows.length} more allowed)
              </button>
            )}

            {/* ── Work Preference ── */}
            <SectionHead>Work Preference</SectionHead>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Preferred Country" required>
                <Sel name="preferred_country" required>
                  <option value="">Select...</option>
                  {formOptions.countries.map(c=><option key={c}>{c}</option>)}
                </Sel>
              </Field>
              <Field label="Job Category" required>
                <Sel name="job_category" required>
                  <option value="">Select...</option>
                  {formOptions.categories.map(c=><option key={c}>{c}</option>)}
                </Sel>
              </Field>
            </div>
            <Field label="Applying For (Job Vacancy)">
              <Sel name="applying_for_job" value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
                <option value="">General Registration (no specific job)</option>
                {activeJobs.map(j => <option key={j.id} value={j.id}>{j.title} – {j.country} ({j.id})</option>)}
              </Sel>
            </Field>
            <Field label="Years of Experience">
              <Sel name="experience">
                <option value="">Select...</option>
                {['No experience (fresher)','Less than 1 year','1–2 years','3–5 years','5–10 years','10+ years'].map(e=><option key={e}>{e}</option>)}
              </Sel>
            </Field>

            {/* ── Work Experience ── */}
            <SectionHead>Working Experience</SectionHead>
            <div style={{overflowX:'auto',marginBottom:4}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead>
                  <tr style={{background:'var(--navy)',color:'var(--white)'}}>
                    <th style={{padding:'9px 12px',textAlign:'left',fontWeight:600,borderRadius:'8px 0 0 0',width:'24%'}}>Period (Year)</th>
                    <th style={{padding:'9px 12px',textAlign:'left',fontWeight:600,width:'38%'}}>Occupation / Job Description</th>
                    <th style={{padding:'9px 12px',textAlign:'left',fontWeight:600,borderRadius:'0 8px 0 0'}}>Name of Company</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3].map((n,i) => (
                    <tr key={n} style={{background: i%2===0 ? 'var(--pale)' : 'var(--white)'}}>
                      <td style={{padding:'6px 8px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_period`} placeholder="e.g. 2020–2022" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                      <td style={{padding:'6px 8px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_occupation`} placeholder="e.g. Factory Worker" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                      <td style={{padding:'6px 8px',border:'1px solid var(--border)'}}>
                        <input name={`exp${n}_company`} placeholder="Company name" style={{...inputStyle,padding:'5px 8px',fontSize:'0.78rem'}}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Field label="Additional Skills / Certifications">
              <textarea name="experience_details" style={{...inputStyle,minHeight:80,resize:'vertical'}}
                placeholder="Any other skills, trade certificates, or relevant information..."/>
            </Field>

            {/* ── Declaration ── */}
            <div style={{background:'var(--pale)',borderRadius:10,padding:'16px 18px',margin:'18px 0 20px',border:'1px solid var(--border)'}}>
              <label style={{display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer'}}>
                <input type="checkbox" name="declaration" required checked={declared} onChange={e => setDeclared(e.target.checked)}
                  style={{marginTop:3,width:16,height:16,flexShrink:0,accentColor:'var(--blue)',cursor:'pointer'}}/>
                <span style={{fontSize:'0.82rem',color:'var(--dark)',lineHeight:1.6}}>
                  I hereby declare that the above statements given are true and correct to the best of my knowledge.
                </span>
              </label>
            </div>

            <button type="submit" className="form-submit" disabled={loading || !declared}>
              {loading
                ? <><i className="fas fa-spinner fa-spin"/>Submitting...</>
                : <><i className="fas fa-paper-plane"/>Submit Registration</>}
            </button>
            {status === 'error' && (
              <p style={{color:'#DC2626',fontSize:'0.8rem',marginTop:8,textAlign:'center'}}>
                Error. Please call us at {contact.hq.phones[0]}
              </p>
            )}
          </form>
        )}
      </div>
    </div>

    {/* Off-screen capture target — rendered as soon as submittedData is set so captureRef is never null when buttons are clicked */}
    {submittedData && (
      <div style={{position:'fixed',left:'-9999px',top:0,width:794,pointerEvents:'none'}}>
        <BiodataTemplate ref={captureRef} data={submittedData}/>
      </div>
    )}
    </>
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
