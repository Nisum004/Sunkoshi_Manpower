'use client'
import { clients } from '@/data/company'

export default function ClientsTicker() {
  const doubled = [...clients, ...clients]
  return (
    <section style={{padding:'72px 0',background:'var(--pale)',overflow:'hidden'}}>
      <div className="container" style={{textAlign:'center',marginBottom:40}}>
        <span className="section-tag">Trusted By</span>
        <h2 className="section-title">Some of Our <span>Valued Clients</span></h2>
      </div>
      <div style={{position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,bottom:0,width:100,background:'linear-gradient(to right,var(--pale),transparent)',zIndex:2,pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:0,right:0,bottom:0,width:100,background:'linear-gradient(to left,var(--pale),transparent)',zIndex:2,pointerEvents:'none'}}/>
        <div style={{display:'flex',gap:24,animation:'ticker 120s linear infinite',width:'max-content'}}>
          {doubled.map((c,i)=>(
            <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:8,padding:'11px 22px',whiteSpace:'nowrap',fontSize:'0.82rem',fontWeight:600,color:'var(--navy)',display:'flex',alignItems:'center',gap:10,flexShrink:0,boxShadow:'0 2px 12px rgba(43,54,117,0.05)'}}>
              <span className={`fi fi-${c.flag}`} style={{width:20,height:15,display:'inline-block',backgroundSize:'cover',borderRadius:2,flexShrink:0}}/>
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
