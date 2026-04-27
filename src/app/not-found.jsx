import Link from 'next/link'

export default function NotFound() {
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
