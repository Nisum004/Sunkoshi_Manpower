'use client'
import Link from 'next/link'
import { company, contact, social } from '@/data/company'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div style={{background:'var(--navy)',padding:'64px 0 40px'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40,marginBottom:48}}>
            <div>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',fontWeight:700,color:'var(--white)',marginBottom:12}}>Sunkoshi Manpower Services Pvt. Ltd</div>
              <p style={{fontSize:'0.88rem',color:'rgba(255,255,255,0.55)',lineHeight:1.8,maxWidth:280}}>
                Nepal's trusted recruitment agency since {company.established}. Connecting skilled Nepali workers with world-class employers globally.
              </p>
              <div style={{display:'flex',gap:10,marginTop:20}}>
                {[
                  { icon:'facebook-f', href: social.facebook || '#' },
                  { icon:'whatsapp',   href: `https://wa.me/${social.whatsapp}` },
                  { icon:'envelope',   href: `mailto:${contact.hq.emails[0]}` },
                ].map(({icon,href})=>(
                  <a key={icon} href={href} target={icon!=='envelope'?'_blank':undefined} rel="noopener noreferrer"
                    style={{width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.5)',fontSize:'0.9rem',transition:'all 0.3s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='var(--blue)';e.currentTarget.style.color='white'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.5)'}}>
                    <i className={`fa${icon==='envelope'?'s':'b'} fa-${icon}`}/>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--accent)',fontWeight:600,marginBottom:16}}>Quick Links</div>
              {[['Home','/'],['About','/about'],['Job Vacancies','/jobs'],['Contact','/contact']].map(([l,h])=>(
                <Link key={h} href={h} style={{display:'block',fontSize:'0.85rem',color:'rgba(255,255,255,0.55)',marginBottom:10,transition:'color 0.3s',textDecoration:'none'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                  {l}
                </Link>
              ))}
            </div>
            <div>
              <div style={{fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--accent)',fontWeight:600,marginBottom:16}}>Resources</div>
              {[['For Employers','/resources/employers'],['For Job Seekers','/resources/job-seekers'],['Categories','/#categories'],['Our Process','/#process']].map(([l,h])=>(
                <Link key={h} href={h} style={{display:'block',fontSize:'0.85rem',color:'rgba(255,255,255,0.55)',marginBottom:10,transition:'color 0.3s',textDecoration:'none'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                  {l}
                </Link>
              ))}
            </div>
            <div>
              <div style={{fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--accent)',fontWeight:600,marginBottom:16}}>Contact</div>
              <p style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.55)',lineHeight:1.8}}>Dhumbharai, Kathmandu</p>
              <a href={`tel:${contact.hq.phones[0]}`} style={{display:'block',fontSize:'0.82rem',color:'rgba(255,255,255,0.55)',marginTop:6,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                {contact.hq.phones[0]}
              </a>
              <a href={`mailto:${contact.hq.emails[0]}`} style={{display:'block',fontSize:'0.82rem',color:'rgba(255,255,255,0.55)',marginTop:4,textDecoration:'none',transition:'color 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                {contact.hq.emails[0]}
              </a>
            </div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:24,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <p style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.3)'}}>© {year} {company.name} · License No. {company.license} · All rights reserved.</p>
            <p style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.3)'}}>Member of {company.member}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
