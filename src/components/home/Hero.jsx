'use client'
import Link from 'next/link'
import { company } from '@/data/company'

const destinations = [
  {iso:'sa', c:'Saudi Arabia',  j:'Construction · Hospitality'},
  {iso:'ae', c:'UAE / Dubai',   j:'Facilities · Security'},
  {iso:'qa', c:'Qatar',         j:'Engineering · Catering'},
  {iso:'my', c:'Malaysia',      j:'Manufacturing · Retail'},
  {iso:'jp', c:'Japan',         j:'Technical · Factory'},
  {iso:'kr', c:'South Korea',   j:'Industrial · Trainee'},
]

export default function Hero() {
  return (
    <section style={{minHeight:'100vh',background:'linear-gradient(160deg,#1a2240 0%,#2B3675 45%,#3D5AA9 100%)',display:'flex',alignItems:'center',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 2px 2px,rgba(255,255,255,0.05) 1px,transparent 0)',backgroundSize:'32px 32px'}}/>
      <div style={{position:'absolute',right:-80,top:-80,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(94,143,212,0.2) 0%,transparent 70%)'}}/>
      <div style={{position:'absolute',left:-120,bottom:-120,width:480,height:480,borderRadius:'50%',background:'radial-gradient(circle,rgba(200,168,75,0.12) 0%,transparent 70%)'}}/>
      <div className="container" style={{position:'relative',zIndex:2,paddingTop:140,paddingBottom:80}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center'}} className="hero-grid">
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:100,padding:'6px 16px',marginBottom:24,fontSize:'0.78rem',color:'rgba(255,255,255,0.85)',fontWeight:500}}>
              <span style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',animation:'pulse 2s infinite',display:'block'}}/>
              Nepal's Trusted Manpower Recruitment Agency
            </div>
            <h1 style={{fontFamily:'var(--ff-head)',fontSize:'clamp(2.4rem,5vw,4rem)',fontWeight:700,lineHeight:1.1,color:'var(--white)',marginBottom:24}}>
              Your Career<br/>Abroad Starts<br/><em style={{fontStyle:'normal',color:'var(--accent)'}}>{company.tagline}</em>
            </h1>
            <p style={{fontSize:'1.05rem',color:'rgba(255,255,255,0.75)',lineHeight:1.8,marginBottom:36,maxWidth:480}}>{company.description}</p>
            <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:48}}>
              <Link href="/resources/job-seekers" className="btn btn-accent"><i className="fas fa-paper-plane"/>Send Your CV</Link>
              <Link href="/jobs" className="btn btn-outline-white"><i className="fas fa-briefcase"/>View Jobs</Link>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:16,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.12)',flexWrap:'wrap'}}>
              {[{n:'10,000+',l:'Workers Placed'},{n:'30',l:'Years Experience'},{n:'117+',l:'Global Clients'},{n:'3',l:'Country Offices'}].map((t,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:16}}>
                  {i>0&&<div style={{width:1,height:40,background:'rgba(255,255,255,0.2)'}}/>}
                  <div style={{textAlign:'center'}}>
                    <div style={{fontFamily:'var(--ff-head)',fontSize:'1.8rem',fontWeight:700,color:'var(--accent)',lineHeight:1}}>{t.n}</div>
                    <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.1em',marginTop:2}}>{t.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card-wrap">
            <div style={{background:'rgba(255,255,255,0.07)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:20,padding:32}}>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.4rem',fontWeight:600,color:'var(--white)',marginBottom:20}}>Where We Place Workers</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {destinations.map(d=>(
                  <div key={d.c} style={{background:'rgba(255,255,255,0.08)',borderRadius:10,padding:'12px 14px',display:'flex',alignItems:'center',gap:10,transition:'background 0.3s',cursor:'default'}}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.14)'}
                    onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
                    <span className={`fi fi-${d.iso}`} style={{width:28,height:21,display:'inline-block',backgroundSize:'cover',borderRadius:3,flexShrink:0}}/>
                    <div>
                      <div style={{fontWeight:600,fontSize:'0.85rem',color:'var(--white)'}}>{d.c}</div>
                      <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.55)'}}>{d.j}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,color:'rgba(255,255,255,0.45)',fontSize:'0.7rem',letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',zIndex:2}}
        onClick={()=>document.getElementById('stats')?.scrollIntoView({behavior:'smooth'})}>
        <span>Scroll</span>
        <div style={{width:1,height:40,background:'linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)',animation:'scrollLine 2s ease-in-out infinite'}}/>
      </div>
    </section>
  )
}
