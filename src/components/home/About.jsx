'use client'
import Link from 'next/link'
import { highlights, company } from '@/data/company'
import { Landmark, MapPin, GraduationCap, Trophy } from 'lucide-react'

const iconMap = { Landmark, MapPin, GraduationCap, Trophy }

export default function About() {
  return (
    <section id="about" style={{padding:'100px 0',background:'var(--white)'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="about-grid">
          <div style={{position:'relative'}}>
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop" alt="Sunkoshi team" style={{width:'100%',borderRadius:16,aspectRatio:'4/3',objectFit:'cover',boxShadow:'var(--shadow)'}}/>
            <div style={{position:'absolute',bottom:-24,right:-24,background:'var(--navy)',borderRadius:14,padding:'20px 24px',textAlign:'center',boxShadow:'var(--shadow)'}}>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'2.6rem',fontWeight:700,color:'var(--accent)',lineHeight:1}}>30</div>
              <div style={{fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.7)',marginTop:4}}>Years of Trust</div>
            </div>
          </div>
          <div>
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">Valued as Gold,<br/><span>Clear as Water</span></h2>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.8,marginBottom:16}}>Named after the golden Sunkoshi River flowing from the Himalayan range of Mount Everest, our company reflects its namesake — valued as gold, clear and transparent as water.</p>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.8,marginBottom:24}}>Since {company.established}, we have deployed thousands of skilled Nepali workers to Gulf countries, Malaysia, and Japan from our Kathmandu office — just 3.5km from Tribhuvan International Airport.</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
              {['Government Licensed','NAFEA Member','Japan Certified','CTEVT Training'].map(t=>(
                <span key={t} style={{background:'var(--light)',color:'var(--navy)',fontSize:'0.78rem',fontWeight:600,padding:'6px 14px',borderRadius:100}}>{t}</span>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {highlights.map(h=>{
                const Icon = iconMap[h.icon]
                return (
                  <div key={h.title} style={{background:'var(--pale)',borderRadius:12,padding:18,borderLeft:'3px solid var(--blue)'}}>
                    <div style={{marginBottom:6,color:'var(--blue)'}}>{Icon && <Icon size={20}/>}</div>
                    <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.85rem',marginBottom:4}}>{h.title}</div>
                    <div style={{fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.5}}>{h.text}</div>
                  </div>
                )
              })}
            </div>
            <div style={{marginTop:28}}>
              <Link href="/about" className="btn btn-primary">Read Full Story <i className="fas fa-arrow-right"/></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
