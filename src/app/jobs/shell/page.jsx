'use client'
import { useState, useEffect } from 'react'
import JobDetailClient from '@/components/jobs/JobDetailClient'

export default function JobShell() {
  const [id, setId] = useState(null)

  useEffect(() => {
    const parts = window.location.pathname.replace(/\/+$/, '').split('/')
    // URL is /jobs/ACTUAL-ID/ — shell is served for that path by .htaccess
    // parts: ['', 'jobs', 'ACTUAL-ID']
    const jobId = parts[parts.length - 1]
    setId(jobId === 'shell' ? null : jobId)
  }, [])

  if (!id) return (
    <section style={{padding:'120px 0',textAlign:'center'}}>
      <i className="fas fa-spinner fa-spin" style={{fontSize:'2rem',color:'var(--muted)'}}/>
    </section>
  )

  return <JobDetailClient id={id} />
}
