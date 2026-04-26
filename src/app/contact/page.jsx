'use client'
import { contact, company } from '@/data/company'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res  = await fetch('/api/contact.php', { method: 'POST', body: new FormData(e.target) })
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
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Contact</span></div>
          <h1>Get In <em>Touch</em></h1>
          <p>Our team is ready to help. Reach us at any of our offices or send a message below.</p>
        </div>
      </div>

      <section style={{padding:'80px 0',background:'var(--pale)'}}>
        <div className="container">
          {/* Office Cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginBottom:64}} className="offices-grid">
            {/* HQ */}
            <div style={{background:'var(--navy)',borderRadius:16,padding:28}}>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--accent)',marginBottom:18}}>Nepal Head Office</h3>
              <p style={{fontSize:'0.85rem',color:'rgba(255,255,255,0.7)',lineHeight:1.8,marginBottom:12}}>{contact.hq.address}</p>
              {contact.hq.phones.map(p=><a key={p} href={`tel:${p}`} style={{display:'block',fontSize:'0.85rem',color:'rgba(255,255,255,0.75)',marginBottom:4,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}>{p}</a>)}
              {contact.hq.emails.map(e=><a key={e} href={`mailto:${e}`} style={{display:'block',fontSize:'0.82rem',color:'rgba(255,255,255,0.6)',marginTop:4,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={ev=>ev.currentTarget.style.color='var(--accent)'}
                onMouseLeave={ev=>ev.currentTarget.style.color='rgba(255,255,255,0.6)'}>{e}</a>)}
            </div>
            {/* Branches */}
            <div style={{background:'var(--white)',borderRadius:16,padding:28,border:'1px solid var(--border)'}}>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)',marginBottom:18}}>Nepal Branch Offices</h3>
              {contact.branches.map(b=>(
                <div key={b.city} style={{marginBottom:20}}>
                  <div style={{fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--blue)',fontWeight:600,marginBottom:4}}>{b.city}</div>
                  <p style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.7}}>{b.address}</p>
                  <a href={`tel:${b.phone}`} style={{fontSize:'0.85rem',color:'var(--navy)',fontWeight:600,textDecoration:'none'}}>{b.phone}</a>
                  <p style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:2}}>Manager: {b.manager}</p>
                </div>
              ))}
            </div>
            {/* Japan */}
            <div style={{background:'var(--white)',borderRadius:16,padding:28,border:'1px solid var(--border)'}}>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)',marginBottom:4}}>Japan Offices</h3>
              <p style={{fontSize:'0.72rem',color:'var(--muted)',marginBottom:14}}>License No. {contact.japan.license}</p>
              {contact.japan.offices.map(o=>(
                <div key={o.city} style={{marginBottom:14,paddingBottom:14,borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.85rem',marginBottom:2}}>{o.city}</div>
                  <p style={{fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.6}}>{o.address}</p>
                  <a href={`tel:${o.phone}`} style={{fontSize:'0.82rem',color:'var(--blue)',fontWeight:600,textDecoration:'none'}}>{o.phone}</a>
                </div>
              ))}
              <a href={`mailto:${contact.japan.email}`} style={{fontSize:'0.82rem',color:'var(--blue)',fontWeight:600,textDecoration:'none'}}>{contact.japan.email}</a>
            </div>
          </div>

          {/* Map + Form */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}} className="contact-bottom">
            {/* Google Map */}
            <div>
              <h2 style={{fontFamily:'var(--ff-head)',fontSize:'1.6rem',fontWeight:700,color:'var(--navy)',marginBottom:20}}>Find Our <span style={{color:'var(--blue)'}}>Office</span></h2>
              <div style={{borderRadius:16,overflow:'hidden',boxShadow:'var(--shadow)',border:'1px solid var(--border)'}}>
                <iframe
                  title="Sunkoshi Manpower Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.6676658893407!2d85.33890037567369!3d27.727545524599893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19003c08ea73%3A0x2e51d5de9a490b41!2sSunkoshi%20Manpower%20Service%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1777125469851!5m2!1sen!2snp"
                  width="100%" height="400" style={{border:'none',display:'block'}}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p style={{fontSize:'0.78rem',color:'var(--muted)',marginTop:12}}>
                <i className="fas fa-map-marker-alt" style={{color:'var(--blue)',marginRight:6}}/>
                4 Dhumbharai Marg, Kathmandu — 1.9 km from Chabahil Chowk
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{fontFamily:'var(--ff-head)',fontSize:'1.6rem',fontWeight:700,color:'var(--navy)',marginBottom:20}}>Send Us a <span style={{color:'var(--blue)'}}>Message</span></h2>
              {status==='success'?(
                <div style={{padding:32,background:'#D1FAE5',borderRadius:12,textAlign:'center',color:'#065F46'}}>
                  <i className="fas fa-check-circle" style={{fontSize:'2rem',marginBottom:12,display:'block'}}/>
                  <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.3rem',marginBottom:8}}>Message Sent!</h3>
                  <p>We'll get back to you within 1–2 working days.</p>
                </div>
              ):(
                <form onSubmit={handleSubmit}>

                  <div className="form-row">
                    <div className="form-group"><label>Full Name *</label><input type="text" name="name" required placeholder="Your name"/></div>
                    <div className="form-group"><label>Phone *</label><input type="tel" name="phone" required placeholder="+977 98XXXXXXXX"/></div>
                  </div>
                  <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="your@email.com"/></div>
                  <div className="form-group"><label>Subject *</label><input type="text" name="subject" required placeholder="How can we help?"/></div>
                  <div className="form-group"><label>Message *</label><textarea name="message" required placeholder="Write your message here..." style={{minHeight:140}}/></div>
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading?<><i className="fas fa-spinner fa-spin"/>Sending...</>:<><i className="fas fa-paper-plane"/>Send Message</>}
                  </button>
                  {status==='error'&&<p style={{color:'#DC2626',fontSize:'0.8rem',marginTop:8,textAlign:'center'}}>Error sending. Please call us directly.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
