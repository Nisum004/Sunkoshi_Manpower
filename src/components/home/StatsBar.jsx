'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { stats } from '@/data/company'

export default function StatsBar() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <section id="stats" ref={ref} style={{background:'var(--navy)',padding:'56px 0'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:`repeat(${stats.length},1fr)`}} className="stats-grid">
          {stats.map((s,i)=>(
            <div key={i} style={{textAlign:'center',padding:20,position:'relative'}}>
              {i<stats.length-1&&<div style={{position:'absolute',right:0,top:'20%',height:'60%',width:1,background:'rgba(255,255,255,0.15)'}}/>}
              <div style={{fontFamily:'var(--ff-head)',fontSize:'3.2rem',fontWeight:700,color:'var(--accent)',lineHeight:1}}>
                {inView?<CountUp end={s.number} duration={2} separator="," />:'0'}{s.suffix}
              </div>
              <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.12em',marginTop:8,fontWeight:500}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
