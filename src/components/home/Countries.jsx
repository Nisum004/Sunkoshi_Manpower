'use client'
import { countries } from '@/data/company'
import { Globe } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

function CountryFlag({ code, size = 40 }) {
  if (code === 'globe') return <Globe size={size} color="rgba(255,255,255,0.9)"/>
  return <span className={`fi fi-${code}`} style={{width:size*1.33,height:size,display:'inline-block',backgroundSize:'cover',borderRadius:3}}/>
}

export default function Countries() {
  return (
    <section id="countries" style={{padding:'100px 0',background:'var(--navy)'}}>
      <div className="container">
        <Reveal>
          <div style={{textAlign:'center',marginBottom:56}}>
            <span className="section-tag" style={{color:'var(--accent)'}}>Global Reach</span>
            <h2 className="section-title" style={{color:'var(--white)'}}>Where We <span style={{color:'var(--accent)'}}>Send Workers</span></h2>
            <p className="section-sub" style={{color:'rgba(255,255,255,0.6)',margin:'0 auto'}}>Established networks and licensed offices ensure smooth, legal, and safe placements.</p>
          </div>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}} className="countries-grid">
          {countries.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12}>
              <div style={{borderRadius:16,overflow:'hidden',position:'relative',aspectRatio:'4/3',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform='scale(1.07)'}
                onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform='none'}>
                <img src={c.img} alt={c.name} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s'}} loading="lazy"/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(18,25,60,0.9) 0%,rgba(18,25,60,0.3) 50%,transparent 100%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:24}}>
                  <div style={{marginBottom:6}}><CountryFlag code={c.flag} size={32}/></div>
                  <div style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',fontWeight:700,color:'var(--white)'}}>{c.name}</div>
                  <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.6)',marginTop:4}}>{c.detail}</div>
                  <div style={{display:'flex',gap:6,marginTop:10,flexWrap:'wrap'}}>
                    {c.sectors.map(s=><span key={s} style={{fontSize:'0.68rem',background:'rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.85)',padding:'3px 10px',borderRadius:100}}>{s}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
