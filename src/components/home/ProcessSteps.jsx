'use client'
import { process } from '@/data/company'

export default function ProcessSteps() {
  return (
    <section id="process" style={{padding:'100px 0',background:'var(--white)'}}>
      <div className="container">
        <div style={{textAlign:'center',marginBottom:64}}>
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Our Recruitment <span>Process</span></h2>
          <p className="section-sub" style={{margin:'0 auto'}}>A transparent, step-by-step journey from application to deployment.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',position:'relative'}} className="process-grid">
          <div style={{position:'absolute',top:64,left:'12.5%',right:'12.5%',borderTop:'2.5px dashed var(--border)',zIndex:0}} className="dashed-line"/>
          {process.map(s=>(
            <div key={s.step} style={{textAlign:'center',padding:'0 16px'}}>
              <div style={{width:128,height:128,borderRadius:'50%',margin:'0 auto 20px',overflow:'hidden',border:'4px solid var(--white)',boxShadow:'0 8px 32px rgba(43,54,117,0.18)',position:'relative',zIndex:1,transition:'transform 0.3s',cursor:'default'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <img src={s.img} alt={s.title} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>
                <div style={{position:'absolute',top:-8,right:-8,width:34,height:34,background:'var(--navy)',color:'var(--white)',borderRadius:'50%',fontSize:'0.78rem',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',border:'2.5px solid var(--white)',zIndex:2}}>{s.step}</div>
              </div>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)',marginBottom:8}}>{s.title}</div>
              <p style={{fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
