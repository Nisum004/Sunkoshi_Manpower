'use client'
import { useState, useEffect } from 'react'
import NewsDetailClient from '@/components/news/NewsDetailClient'

export default function NewsShell() {
  const [slug, setSlug] = useState(null)

  useEffect(() => {
    const parts = window.location.pathname.replace(/\/+$/, '').split('/')
    // URL is /news/ACTUAL-SLUG/ — shell is served for that path by .htaccess
    // parts: ['', 'news', 'ACTUAL-SLUG']
    const newsSlug = parts[parts.length - 1]
    setSlug(newsSlug === 'shell' ? null : newsSlug)
  }, [])

  if (!slug) return (
    <section style={{padding:'120px 0',textAlign:'center'}}>
      <i className="fas fa-spinner fa-spin" style={{fontSize:'2rem',color:'var(--muted)'}}/>
    </section>
  )

  return <NewsDetailClient slug={slug} />
}
