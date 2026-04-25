'use client'
import Link from 'next/link'

const badgeStyle = {
  Skilled:       { bg:'#DBEAFE', color:'#1D4ED8' },
  'Semi-Skilled':{ bg:'#FEF3C7', color:'#92400E' },
  Unskilled:     { bg:'#D1FAE5', color:'#065F46' },
  Trainee:       { bg:'#EDE9FE', color:'#5B21B6' },
}

export default function JobCard({ job }) {
  const badge = badgeStyle[job.category] || badgeStyle.Unskilled
  const daysLeft = Math.ceil((new Date(job.deadline) - new Date()) / 86400000)
  const urgent = daysLeft <= 7

  return (
    <div style={{background:'var(--white)',borderRadius:14,padding:28,border:'1px solid var(--border)',transition:'all 0.35s',position:'relative',overflow:'hidden'}}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--navy),var(--sky))'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
        <span className={`fi fi-${job.flag}`} style={{width:36,height:27,display:'inline-block',backgroundSize:'cover',borderRadius:4}}/>
        <span style={{fontSize:'0.72rem',fontWeight:700,padding:'4px 12px',borderRadius:100,background:badge.bg,color:badge.color}}>{job.category}</span>
      </div>
      <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.25rem',fontWeight:700,color:'var(--navy)',marginBottom:6}}>{job.title}</h3>
      <div style={{fontSize:'0.82rem',color:'var(--muted)',marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
        <i className="fas fa-map-marker-alt" style={{color:'var(--blue)',fontSize:'0.75rem'}}/>{job.country} · {job.vacancies} vacancies
      </div>
      <div style={{marginBottom:18}}>
        <div style={{display:'flex',gap:8,marginBottom:8,fontSize:'0.83rem'}}>
          <span style={{color:'var(--muted)',minWidth:72,fontSize:'0.78rem'}}>Salary</span>
          <span style={{color:'var(--dark)',fontWeight:500}}>{job.salary}</span>
        </div>
        <div style={{display:'flex',gap:8,fontSize:'0.83rem'}}>
          <span style={{color:'var(--muted)',minWidth:72,fontSize:'0.78rem'}}>Benefits</span>
          <span style={{color:'var(--dark)'}}>{job.benefits}</span>
        </div>
      </div>
      <div style={{fontSize:'0.75rem',color:urgent?'#DC2626':'var(--muted)',marginBottom:16,fontWeight:urgent?600:400}}>
        <i className="fas fa-clock" style={{marginRight:4}}/>
        Apply by: {new Date(job.deadline).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
        {urgent&&' — Closing soon!'}
      </div>
      <div style={{display:'flex',gap:10}}>
        <Link href={`/jobs/${job.id}`} style={{flex:1,padding:'10px',borderRadius:8,border:'1.5px solid var(--navy)',color:'var(--navy)',textAlign:'center',fontSize:'0.83rem',fontWeight:600,textDecoration:'none',transition:'all 0.3s'}}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--navy)';e.currentTarget.style.color='white'}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--navy)'}}>
          View Details
        </Link>
        <Link href={`/resources/job-seekers?job=${job.id}`} style={{flex:1,padding:'10px',borderRadius:8,background:'var(--navy)',color:'var(--white)',textAlign:'center',fontSize:'0.83rem',fontWeight:600,textDecoration:'none',transition:'background 0.3s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--blue)'}
          onMouseLeave={e=>e.currentTarget.style.background='var(--navy)'}>
          Apply Now
        </Link>
      </div>
    </div>
  )
}
