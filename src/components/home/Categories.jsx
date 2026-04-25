'use client'
import { useState } from 'react'
import { categories } from '@/data/company'

export default function Categories() {
  const tabs = Object.keys(categories)
  const [active, setActive] = useState(tabs[0])
  return (
    <section id="categories" style={{padding:'100px 0',background:'var(--pale)'}}>
      <div className="container">
        <span className="section-tag">Manpower Categories</span>
        <h2 className="section-title">We Supply <span>All Categories</span></h2>
        <p className="section-sub" style={{marginBottom:36}}>From unskilled labour to specialized engineers — comprehensive talent database ready for timely deployment.</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:36}}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActive(tab)} style={{padding:'10px 24px',borderRadius:100,fontSize:'0.85rem',fontWeight:600,cursor:'pointer',transition:'all 0.3s',border:'1.5px solid',borderColor:active===tab?'var(--navy)':'var(--border)',background:active===tab?'var(--navy)':'var(--white)',color:active===tab?'var(--white)':'var(--muted)',fontFamily:'var(--ff-body)'}}>
              {tab}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
          {categories[active].map(item=>(
            <div key={item} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:8,padding:'11px 15px',fontSize:'0.85rem',fontWeight:500,display:'flex',alignItems:'center',gap:8,transition:'all 0.3s',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--navy)';e.currentTarget.style.color='var(--white)';e.currentTarget.style.transform='translateX(4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='var(--white)';e.currentTarget.style.color='var(--dark)';e.currentTarget.style.transform='none'}}>
              <span style={{width:6,height:6,background:'var(--sky)',borderRadius:'50%',flexShrink:0}}/>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
