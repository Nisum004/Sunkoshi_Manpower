'use client'
import { services } from '@/data/company'
import { Search, ClipboardList, GraduationCap, Plane, Handshake, Globe } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const iconMap = { Search, ClipboardList, GraduationCap, Plane, Handshake, Globe }

export default function Services() {
  return (
    <section id="services" style={{padding:'100px 0',background:'var(--pale)'}}>
      <div className="container">
        <Reveal>
          <div style={{textAlign:'center',marginBottom:56}}>
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">End-to-End Recruitment <span>Solutions</span></h2>
            <p className="section-sub" style={{margin:'0 auto'}}>From sourcing to deployment, we manage every step of the international recruitment journey.</p>
          </div>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="services-grid">
          {services.map((s,i)=>{
            const Icon = iconMap[s.icon]
            return (
              <Reveal key={s.title} delay={i * 0.1}>
              <div style={{background:'var(--white)',borderRadius:16,padding:'32px 24px',border:'1px solid var(--border)',transition:'all 0.4s',position:'relative',overflow:'hidden',height:'100%'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--blue),var(--sky))',transform:'scaleX(0)',transformOrigin:'left',transition:'transform 0.4s'}} className="top-bar"/>
                <div style={{width:52,height:52,borderRadius:12,background:'var(--light)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18,color:'var(--blue)'}}>
                  {Icon && <Icon size={24}/>}
                </div>
                <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.25rem',fontWeight:700,color:'var(--navy)',marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:'0.86rem',color:'var(--muted)',lineHeight:1.7,marginBottom:16}}>{s.text}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {s.tags.map(t=><span key={t} style={{fontSize:'0.7rem',background:'var(--light)',color:'var(--blue)',padding:'3px 10px',borderRadius:100,fontWeight:600}}>{t}</span>)}
                </div>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
