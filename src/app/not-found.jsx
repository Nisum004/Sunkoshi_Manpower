'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Redirect new admin-added job/news detail pages to their listing pages
    if (pathname?.startsWith('/jobs/')) {
      router.replace('/jobs')
    } else if (pathname?.startsWith('/news/')) {
      router.replace('/news')
    }
  }, [pathname, router])

  // Show briefly while redirect happens
  if (pathname?.startsWith('/jobs/') || pathname?.startsWith('/news/')) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--pale)',textAlign:'center',padding:24}}>
        <div>
          <i className="fas fa-spinner fa-spin" style={{fontSize:'2rem',color:'var(--muted)',marginBottom:16,display:'block'}}/>
          <p style={{color:'var(--muted)'}}>Redirecting…</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--pale)',textAlign:'center',padding:24}}>
      <div>
        <div style={{fontFamily:'var(--ff-head)',fontSize:'8rem',fontWeight:700,color:'var(--light)',lineHeight:1}}>404</div>
        <h1 style={{fontFamily:'var(--ff-head)',fontSize:'2rem',color:'var(--navy)',marginBottom:12}}>Page Not Found</h1>
        <p style={{color:'var(--muted)',marginBottom:28}}>The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn btn-primary"><i className="fas fa-home"/>Back to Home</Link>
      </div>
    </div>
  )
}
