'use client'
import { useState } from 'react'
import { jobs } from '@/data/jobs'
import JobCard from '@/components/jobs/JobCard'
import JobFilters from '@/components/jobs/JobFilters'
import { Search } from 'lucide-react'

export default function JobsPage() {
  const active = jobs.filter(j => j.open)
  const [filter, setFilter] = useState({ country: '', category: '' })

  const filtered = active.filter(j =>
    (!filter.country  || j.country  === filter.country) &&
    (!filter.category || j.category === filter.category)
  )

  const countries  = [...new Set(active.map(j => j.country))]
  const categories = [...new Set(active.map(j => j.category))]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Job Vacancies</span></div>
          <h1>Current <em>Job Vacancies</em></h1>
          <p>{active.length} open position{active.length !== 1 ? 's' : ''} available right now</p>
        </div>
      </div>

      <section style={{padding:'72px 0',background:'var(--pale)',minHeight:'60vh'}}>
        <div className="container">
          <JobFilters countries={countries} categories={categories} filter={filter} setFilter={setFilter} />

          {filtered.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 24px',color:'var(--muted)'}}>
              <div style={{marginBottom:16,color:'var(--muted)'}}><Search size={48}/></div>
              <h3 style={{fontFamily:'var(--ff-head)',fontSize:'1.5rem',color:'var(--navy)',marginBottom:8}}>No jobs match your filters</h3>
              <p>Try clearing filters or <a href="/resources/job-seekers" style={{color:'var(--blue)',fontWeight:600}}>register your CV</a> and we'll contact you.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:20}} className="jobs-grid">
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
