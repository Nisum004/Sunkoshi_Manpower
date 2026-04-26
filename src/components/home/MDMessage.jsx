'use client'
import { md } from '@/data/company'

export default function MDMessage() {
  return (
    <section id="message" style={{padding:'100px 0',background:'var(--white)'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:80,alignItems:'start'}} className="md-grid">
          <div style={{textAlign:'center'}}>
            <img src={md.photo} alt={md.name} style={{width:200,height:240,objectFit:'cover',objectPosition:'top',borderRadius:16,boxShadow:'var(--shadow)',margin:'0 auto 16px'}}
              onError={e=>{e.target.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop'}}/>
            <div style={{fontFamily:'var(--ff-head)',fontSize:'1.35rem',fontWeight:700,color:'var(--navy)'}}>{md.name}</div>
            <div style={{fontSize:'0.78rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',marginTop:4}}>{md.title}</div>
            <div style={{marginTop:12,fontFamily:'var(--ff-head)',fontSize:'1.1rem',color:'var(--blue)',fontStyle:'italic'}}>— Sunkoshi Manpower</div>
          </div>
          <div>
            <span className="section-tag">From Our MD</span>
            <h2 className="section-title" style={{marginBottom:28}}>A Message of <span>Trust & Commitment</span></h2>
            <blockquote style={{position:'relative',marginBottom:24}}>
              <span style={{position:'absolute',top:-20,left:0,fontFamily:'var(--ff-head)',fontSize:'7rem',color:'var(--light)',lineHeight:1,zIndex:0,pointerEvents:'none'}}>"</span>
              <p style={{position:'relative',zIndex:1,fontFamily:'var(--ff-head)',fontSize:'1.3rem',color:'var(--navy)',lineHeight:1.65,fontStyle:'italic'}}>"{md.quote}"</p>
            </blockquote>
            {md.body.map((p,i)=><p key={i} style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.85,marginBottom:14}}>{p}</p>)}
            <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:28}}>
              <a href={`mailto:${md.email}`} className="btn btn-primary" style={{fontSize:'0.85rem',padding:'12px 20px'}}><i className="fas fa-envelope"/>Contact MD</a>
              <a href={`tel:${md.phone}`} className="btn" style={{background:'var(--light)',color:'var(--navy)',fontSize:'0.85rem',padding:'12px 20px'}}><i className="fas fa-phone"/>{md.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
