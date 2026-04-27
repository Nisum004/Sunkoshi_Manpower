'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { JobDetailSkeleton } from '@/components/ui/Skeleton'

const badgeStyle = {
  Skilled:{ bg:'#DBEAFE',color:'#1D4ED8' },
  'Semi-Skilled':{ bg:'#FEF3C7',color:'#92400E' },
  Unskilled:{ bg:'#D1FAE5',color:'#065F46' },
  Trainee:{ bg:'#EDE9FE',color:'#5B21B6' },
}

export default function JobDetailClient({ id: idProp }) {
  const params = useParams()
  const id = idProp || params?.id
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/jobs.php?id=${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(data => {
        if (!data.success || !data.job || !data.job.open) setNotFound(true)
        else setJob(data.job)
        setLoading(false)
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  if (loading) return <JobDetailSkeleton/>

  if (notFound || !job) return (
    <section style={{padding:'120px 0',textAlign:'center'}}>
      <h2 style={{fontFamily:'var(--ff-head)',color:'var(--navy)'}}>Job not found</h2>
      <p style={{color:'var(--muted)'}}>This vacancy may have been filled or removed.</p>
      <Link href="/jobs" className="btn" style={{marginTop:16}}>Browse All Jobs</Link>
    </section>
  )

  const badge = badgeStyle[job.category] || badgeStyle.Unskilled
  const requirements = Array.isArray(job.requirements) ? job.requirements : []

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span>/</span>
            <a href="/jobs">Jobs</a><span>/</span>
            <span>{job.title}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16,flexWrap:'wrap'}}>
            {job.flag && <span className={`fi fi-${job.flag}`} style={{width:48,height:36,display:'inline-block',backgroundSize:'cover',borderRadius:4}}/>}
            <span style={{fontSize:'0.78rem',fontWeight:700,padding:'5px 14px',borderRadius:100,background:badge.bg,color:badge.color}}>{job.category}</span>
          </div>
          <h1>{job.title} <em>in {job.country}</em></h1>
          <p>{job.vacancies > 0 ? `${job.vacancies} vacancies · ` : ''}{job.salary}</p>
        </div>
      </div>

      <section style={{padding:'72px 0',background:'var(--pale)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:40,alignItems:'start'}} className="detail-grid">
            <div>
              {job.description && (
                <div style={{background:'var(--white)',borderRadius:16,padding:36,border:'1px solid var(--border)',marginBottom:24}}>
                  <h2 style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:16}}>Job Description</h2>
                  <p style={{color:'var(--muted)',lineHeight:1.8}}>{job.description}</p>
                </div>
              )}
              {requirements.length > 0 && (
                <div style={{background:'var(--white)',borderRadius:16,padding:36,border:'1px solid var(--border)'}}>
                  <h2 style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',fontWeight:700,color:'var(--navy)',marginBottom:20}}>Requirements</h2>
                  {requirements.map((r,i) => (
                    <div key={i} style={{display:'flex',gap:12,marginBottom:12,alignItems:'flex-start'}}>
                      <div style={{width:22,height:22,borderRadius:'50%',background:'var(--light)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                        <i className="fas fa-check" style={{fontSize:'0.6rem',color:'var(--blue)'}}/>
                      </div>
                      <span style={{fontSize:'0.92rem',color:'var(--dark)',lineHeight:1.6}}>{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div style={{background:'var(--navy)',borderRadius:16,padding:28,marginBottom:16}}>
                <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.2rem',fontWeight:700,color:'var(--accent)',marginBottom:20}}>Job Summary</h3>
                {[
                  ['Country', job.country],
                  job.vacancies > 0 ? ['Vacancies', job.vacancies + ' positions'] : null,
                  job.salary ? ['Salary', job.salary] : null,
                  job.benefits ? ['Benefits', job.benefits] : null,
                  job.deadline ? ['Deadline', new Date(job.deadline).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})] : null,
                ].filter(Boolean).map(([l,v]) => (
                  <div key={l} style={{marginBottom:14,paddingBottom:14,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                    <div style={{fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',marginBottom:2}}>{l}</div>
                    <div style={{fontSize:'0.88rem',color:'rgba(255,255,255,0.85)',fontWeight:500}}>{v}</div>
                  </div>
                ))}
                <Link href={`/resources/job-seekers?job=${job.id}`} className="btn btn-accent" style={{width:'100%',justifyContent:'center',marginTop:8}}>
                  <i className="fas fa-paper-plane"/>Apply for This Job
                </Link>
              </div>
              <Link href="/jobs" style={{display:'flex',alignItems:'center',gap:8,color:'var(--blue)',fontSize:'0.85rem',fontWeight:600,textDecoration:'none'}}>
                <i className="fas fa-arrow-left"/>Back to All Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.detail-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
