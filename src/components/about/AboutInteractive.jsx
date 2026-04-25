'use client'
import { highlights, md } from '@/data/company'
import { Landmark, MapPin, GraduationCap, Trophy } from 'lucide-react'

const iconMap = { Landmark, MapPin, GraduationCap, Trophy }

export function HighlightsGrid() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}} className="highlights-grid">
      {highlights.map(h=>{
        const Icon = iconMap[h.icon]
        return (
          <div key={h.title} style={{background:'var(--white)',borderRadius:14,padding:28,textAlign:'center',border:'1px solid var(--border)',transition:'all 0.3s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
            <div style={{marginBottom:16,display:'flex',justifyContent:'center',color:'var(--blue)'}}>
              {Icon && <Icon size={36}/>}
            </div>
            <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)',marginBottom:10}}>{h.title}</h3>
            <p style={{fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.6}}>{h.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export function MDPhoto() {
  return (
    <img src={md.photo} alt={md.name} style={{width:140,height:170,objectFit:'cover',objectPosition:'top',borderRadius:12,boxShadow:'var(--shadow)',margin:'0 auto 20px'}}
      onError={e=>{e.target.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop'}}/>
  )
}
