'use client'
import { useState, useEffect } from 'react'
import JobCard from '@/components/jobs/JobCard'
import { Search } from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ country: '', category: '' })

  useEffect(() => {
    fetch('/api/jobs.php?open=1')
      .then(r => r.json())
      .then(data => { setJobs(data.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j =>
    (!filter.country  || j.country  === filter.country) &&
    (!filter.category || j.category === filter.category)
  )

  const countries  = [...new Set(jobs.map(j => j.country))].filter(Boolean)
  const categories = [...new Set(jobs.map(j => j.category))].filter(Boolean)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Job Vacancies</span></div>
          <h1>Current <em>Job Vacancies</em></h1>
          <p>{loading ? 'Loading…' : `${jobs.length} open position${jobs.length !== 1 ? 's' : ''} available right now`}</p>
        </div>
      </div>

      <section style={{padding:'72px 0',background:'var(--pale)',minHeight:'60vh'}}>
        <div className="container">
          {/* Filters */}
          {!loading && jobs.length > 0 && (
            <div style={{display:'flex',gap:12,marginBottom:32,flexWrap:'wrap'}}>
              <select value={filter.country} onChange={e=>setFilter(f=>({...f,country:e.target.value}))}
                style={{padding:'10px 16px',borderRadius:8,border:'1.5px solid var(--border)',fontSize:'0.88rem',color:'var(--dark)',background:'var(--white)',cursor:'pointer'}}>
                <option value="">All Countries</option>
                {countries.map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={filter.category} onChange={e=>setFilter(f=>({...f,category:e.target.value}))}
                style={{padding:'10px 16px',borderRadius:8,border:'1.5px solid var(--border)',fontSize:'0.88rem',color:'var(--dark)',background:'var(--white)',cursor:'pointer'}}>
                <option value="">All Categories</option>
                {categories.map(c=><option key={c}>{c}</option>)}
              </select>
              {(filter.country||filter.category) && (
                <button onClick={()=>setFilter({country:'',category:''})}
                  style={{padding:'10px 16px',borderRadius:8,border:'1.5px solid var(--border)',fontSize:'0.88rem',color:'var(--muted)',background:'var(--white)',cursor:'pointer'}}>
                  Clear
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div style={{textAlign:'center',padding:'80px 24px',color:'var(--muted)'}}>
              <div style={{marginBottom:12}}><i className="fas fa-spinner fa-spin" style={{fontSize:'2rem'}}/></div>
              <p>Loading vacancies…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 24px',color:'var(--muted)'}}>
              <div style={{marginBottom:16,color:'var(--muted)'}}><Search size={48}/></div>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',color:'var(--navy)',marginBottom:8}}>
                {jobs.length === 0 ? 'No open vacancies right now' : 'No jobs match your filters'}
              </h3>
              <p>Try clearing filters or <a href="/resources/job-seekers" style={{color:'var(--blue)',fontWeight:600}}>register your CV</a> and we'll contact you.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:20}}>
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
