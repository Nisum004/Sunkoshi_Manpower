'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'

const categoryColors = {
  Jobs:         { bg: '#DCFCE7', color: '#166534' },
  Announcement: { bg: '#DBEAFE', color: '#1E40AF' },
  Notice:       { bg: '#FEF3C7', color: '#92400E' },
  News:         { bg: '#F3E8FF', color: '#6B21A8' },
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop'

function renderContent(text) {
  if (!text) return null
  return text.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**')) {
      return <h3 key={i} style={{ fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)',margin:'28px 0 12px' }}>{block.replace(/\*\*/g,'')}</h3>
    }
    if (block.startsWith('- ')) {
      return <ul key={i} style={{ paddingLeft:20,marginBottom:16 }}>{block.split('\n').filter(l=>l.startsWith('- ')).map((l,j)=><li key={j} style={{ fontSize:'0.9rem',color:'var(--muted)',lineHeight:1.8,marginBottom:4 }}>{l.slice(2)}</li>)}</ul>
    }
    if (block.includes('|---')) return null
    if (block.startsWith('| ')) {
      const rows = block.split('\n').filter(r=>r.startsWith('| ')&&!r.includes('---'))
      return (
        <table key={i} style={{ width:'100%',borderCollapse:'collapse',marginBottom:20,fontSize:'0.88rem' }}>
          <tbody>{rows.map((row,ri)=>{
            const cells=row.split('|').filter(c=>c.trim())
            return <tr key={ri} style={{ background:ri===0?'var(--navy)':ri%2===0?'var(--pale)':'var(--white)' }}>
              {cells.map((cell,ci)=><td key={ci} style={{ padding:'10px 14px',border:'1px solid var(--border)',color:ri===0?'var(--white)':'var(--dark)',fontWeight:ri===0?700:400 }}>{cell.trim()}</td>)}
            </tr>
          })}</tbody>
        </table>
      )
    }
    const html = block.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    return <p key={i} style={{ fontSize:'0.92rem',color:'var(--muted)',lineHeight:1.85,marginBottom:16 }} dangerouslySetInnerHTML={{ __html:html }} />
  })
}

export default function NewsDetailClient({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params?.slug
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/news.php?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => {
        if (!data.success) { setNotFound(true); setLoading(false); return }
        setArticle(data.article)
        fetch('/api/news.php')
          .then(r => r.json())
          .then(all => setRelated((all.articles||[]).filter(a=>a.slug!==slug).slice(0,3)))
        setLoading(false)
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [slug])

  if (loading) return (
    <section style={{padding:'120px 0',textAlign:'center'}}>
      <i className="fas fa-spinner fa-spin" style={{fontSize:'2rem',color:'var(--muted)'}}/>
    </section>
  )

  if (notFound || !article) return (
    <section style={{padding:'120px 0',textAlign:'center'}}>
      <h2 style={{fontFamily:'var(--ff-head)',color:'var(--navy)'}}>Article not found</h2>
      <p style={{color:'var(--muted)'}}>This article may have been removed.</p>
      <Link href="/news" className="btn" style={{marginTop:16}}>Back to News</Link>
    </section>
  )

  const cat = categoryColors[article.category] || { bg:'#F1F5F9',color:'#475569' }
  const tags = Array.isArray(article.tags) ? article.tags : []

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="/news">News</a><span>/</span><span>{article.category}</span></div>
          <h1 style={{ fontSize:'clamp(1.6rem,3.5vw,2.6rem)',maxWidth:720 }}>{article.title}</h1>
        </div>
      </div>

      <section style={{ padding:'72px 0',background:'var(--pale)' }}>
        <div className="container article-grid" style={{ display:'grid',gridTemplateColumns:'1fr 320px',gap:48,alignItems:'start' }}>
          <article>
            <img src={article.image||DEFAULT_IMAGE} alt={article.title} style={{ width:'100%',height:360,objectFit:'cover',borderRadius:16,marginBottom:32,display:'block' }} />
            <div style={{ display:'flex',gap:12,alignItems:'center',marginBottom:24,flexWrap:'wrap' }}>
              <span style={{ fontSize:'0.75rem',fontWeight:700,padding:'4px 12px',borderRadius:100,background:cat.bg,color:cat.color }}>{article.category}</span>
              <span style={{ fontSize:'0.78rem',color:'var(--muted)',display:'flex',alignItems:'center',gap:4 }}><Calendar size={13}/> {new Date(article.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
              {tags.length>0 && (
                <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>{tags.map(t=><span key={t} style={{ fontSize:'0.7rem',background:'var(--white)',border:'1px solid var(--border)',borderRadius:6,padding:'2px 8px',color:'var(--muted)',display:'flex',alignItems:'center',gap:3 }}><Tag size={10}/>{t}</span>)}</div>
              )}
            </div>
            <div style={{ background:'var(--white)',borderRadius:16,padding:36,border:'1px solid var(--border)' }}>
              {renderContent(article.content)}
            </div>
            <Link href="/news" style={{ display:'inline-flex',alignItems:'center',gap:8,marginTop:28,fontSize:'0.85rem',fontWeight:600,color:'var(--blue)',textDecoration:'none' }}>
              <ArrowLeft size={15}/> Back to News
            </Link>
          </article>

          <aside>
            <div style={{ background:'var(--white)',borderRadius:16,padding:24,border:'1px solid var(--border)',marginBottom:24 }}>
              <h3 style={{ fontFamily:'var(--ff-head)',fontSize:'1rem',fontWeight:700,color:'var(--navy)',marginBottom:16 }}>Quick Actions</h3>
              <Link href="/resources/job-seekers" className="btn btn-accent" style={{ display:'block',textAlign:'center',marginBottom:10 }}>Apply Now</Link>
              <Link href="/contact" className="btn" style={{ display:'block',textAlign:'center',background:'var(--pale)',color:'var(--navy)',border:'1px solid var(--border)' }}>Contact Us</Link>
            </div>
            {related.length>0 && (
              <div style={{ background:'var(--white)',borderRadius:16,padding:24,border:'1px solid var(--border)' }}>
                <h3 style={{ fontFamily:'var(--ff-head)',fontSize:'1rem',fontWeight:700,color:'var(--navy)',marginBottom:16 }}>More News</h3>
                {related.map(n=>(
                  <Link key={n.slug} href={`/news/${n.slug}`} style={{ display:'flex',gap:12,marginBottom:16,textDecoration:'none',paddingBottom:16,borderBottom:'1px solid var(--border)' }}>
                    <img src={n.image||DEFAULT_IMAGE} alt={n.title} style={{ width:64,height:48,objectFit:'cover',borderRadius:8,flexShrink:0 }} />
                    <div>
                      <div style={{ fontSize:'0.78rem',fontWeight:600,color:'var(--navy)',lineHeight:1.4 }}>{n.title}</div>
                      <div style={{ fontSize:'0.7rem',color:'var(--muted)',marginTop:4 }}>{new Date(n.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
      <style>{`@media(max-width:900px){.article-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
