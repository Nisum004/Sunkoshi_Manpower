'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, HardHat } from 'lucide-react'

const navLinks = [
  { label: 'Home',      href: '/'          },
  { label: 'About',     href: '/about'      },
  { label: 'Jobs',      href: '/jobs'       },
  { label: 'Countries', href: '/#countries' },
  {
    label: 'Resources',
    dropdown: [
      { label: 'For Employers',   href: '/resources/employers',   Icon: Building2, desc: 'Post requirements & hire Nepali workers' },
      { label: 'For Job Seekers', href: '/resources/job-seekers', Icon: HardHat,   desc: 'Register your CV & apply for jobs abroad' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const light = !scrolled && isHome

  return (
    <>
      <nav style={{
        position:'fixed', top:0, width:'100%', zIndex:1000,
        background: light ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: light ? 'none' : 'blur(12px)',
        boxShadow: light ? 'none' : '0 4px 32px rgba(43,54,117,0.10)',
        padding: scrolled ? '10px 0' : '18px 0',
        transition: 'all 0.4s',
      }}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
            <div style={{width:44,height:44,borderRadius:10,background:'var(--white)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--ff-head)',fontWeight:700,fontSize:'1.3rem',color:'var(--navy)',boxShadow:'0 2px 12px rgba(43,54,117,0.15)'}}>S</div>
            <div>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:light?'var(--white)':'var(--navy)',transition:'color 0.4s'}}>Sunkoshi Manpower</div>
              <div style={{fontSize:'0.65rem',color:light?'rgba(255,255,255,0.6)':'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',transition:'color 0.4s'}}>Est. 1995 · License 69/052/53</div>
            </div>
          </Link>

          <ul style={{display:'flex',alignItems:'center',gap:28,listStyle:'none'}} className="desk-nav">
            {navLinks.map(link => (
              <li key={link.label} style={{position:'relative'}}
                onMouseEnter={()=>link.dropdown&&setDropOpen(true)}
                onMouseLeave={()=>link.dropdown&&setDropOpen(false)}>
                {link.dropdown ? (<>
                  <button style={{background:'none',border:'none',cursor:'pointer',fontFamily:'var(--ff-body)',fontSize:'0.88rem',fontWeight:500,color:light?'rgba(255,255,255,0.9)':'var(--navy)',display:'flex',alignItems:'center',gap:4,padding:'4px 0'}}>
                    {link.label} <i className="fas fa-chevron-down" style={{fontSize:'0.6rem',transition:'transform 0.3s',transform:dropOpen?'rotate(180deg)':'none'}}/>
                  </button>
                  <div style={{position:'absolute',top:'calc(100% + 14px)',left:'50%',minWidth:270,background:'var(--white)',borderRadius:12,boxShadow:'0 20px 60px rgba(43,54,117,0.18)',border:'1px solid var(--border)',padding:8,opacity:dropOpen?1:0,visibility:dropOpen?'visible':'hidden',transform:dropOpen?'translateX(-50%) translateY(0)':'translateX(-50%) translateY(-8px)',transition:'all 0.25s',pointerEvents:dropOpen?'auto':'none'}}>
                    <div style={{position:'absolute',top:-6,left:'50%',transform:'translateX(-50%)',width:12,height:12,background:'var(--white)',border:'1px solid var(--border)',borderBottom:'none',borderRight:'none',rotate:'45deg'}}/>
                    {link.dropdown.map(d=>(
                      <Link key={d.href} href={d.href} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 14px',borderRadius:8,textDecoration:'none',transition:'background 0.2s'}}
                        onMouseEnter={e=>e.currentTarget.style.background='var(--pale)'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <span style={{color:'var(--blue)',flexShrink:0,marginTop:2}}><d.Icon size={20}/></span>
                        <div>
                          <div style={{fontSize:'0.88rem',fontWeight:600,color:'var(--navy)'}}>{d.label}</div>
                          <div style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:2}}>{d.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>) : (
                  <Link href={link.href} style={{fontSize:'0.88rem',fontWeight:500,color:light?'rgba(255,255,255,0.9)':'var(--navy)',padding:'4px 0',borderBottom:pathname===link.href?'2px solid var(--accent)':'2px solid transparent',transition:'all 0.3s',textDecoration:'none'}}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li><Link href="/resources/job-seekers" className="btn btn-accent" style={{padding:'10px 20px',fontSize:'0.85rem'}}>Apply Now</Link></li>
          </ul>

          <button onClick={()=>setMenuOpen(!menuOpen)} className="hamburger" aria-label="Menu"
            style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:4,flexDirection:'column',gap:5}}>
            {[0,1,2].map(i=>(
              <span key={i} style={{display:'block',width:26,height:2,borderRadius:2,background:light?'var(--white)':'var(--navy)',transition:'all 0.3s',
                transform:menuOpen&&i===0?'rotate(45deg) translate(5px,5px)':menuOpen&&i===1?'scaleX(0)':menuOpen&&i===2?'rotate(-45deg) translate(5px,-5px)':'none'}}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{position:'fixed',inset:0,zIndex:999,background:'var(--navy)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:6,opacity:menuOpen?1:0,visibility:menuOpen?'visible':'hidden',transition:'all 0.35s'}}>
        {navLinks.map(link=>link.dropdown?(
          <div key={link.label} style={{textAlign:'center',marginBottom:8}}>
            <div style={{fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'rgba(255,255,255,0.35)',marginBottom:6}}>Resources</div>
            {link.dropdown.map(d=>(
              <Link key={d.href} href={d.href} onClick={()=>setMenuOpen(false)} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:'1.15rem',fontFamily:'var(--ff-head)',fontWeight:600,color:'rgba(255,255,255,0.85)',padding:'8px 0',textDecoration:'none'}}>
                <d.Icon size={20}/> {d.label}
              </Link>
            ))}
          </div>
        ):(
          <Link key={link.label} href={link.href} onClick={()=>setMenuOpen(false)} style={{fontSize:'1.5rem',fontFamily:'var(--ff-head)',fontWeight:700,color:'rgba(255,255,255,0.88)',padding:'6px 0',textDecoration:'none'}}>
            {link.label}
          </Link>
        ))}
        <Link href="/resources/job-seekers" onClick={()=>setMenuOpen(false)} className="btn btn-accent" style={{marginTop:16}}>Apply Now</Link>
      </div>

      <style jsx global>{`
        @media(max-width:900px){.desk-nav{display:none!important}.hamburger{display:flex!important}}
      `}</style>
    </>
  )
}
