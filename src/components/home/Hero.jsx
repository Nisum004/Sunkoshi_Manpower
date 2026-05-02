'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { company } from '@/data/company'

const SLIDES = [
  { src: '/images/countries/dubai.jpg'        },
  { src: '/images/countries/saudi-arabia.jpg' },
  { src: '/images/countries/malaysia.jpg'     },
  { src: '/images/countries/japan.jpg'        },
  { src: '/images/countries/qatar.jpg'        },
  { src: '/images/countries/korea.jpg'        },
  { src: '/images/countries/dubai-2.jpg'      },
  { src: '/images/countries/japan-2.jpg'      },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      const next = (currentRef.current + 1) % SLIDES.length
      currentRef.current = next
      setCurrent(next)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  function goTo(i) { currentRef.current = i; setCurrent(i) }

  return (
    <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>

      {/* ── BACKGROUND SLIDES ── */}
      {SLIDES.map((slide, i) => (
        <div key={i} style={{
          position:'absolute', inset:0, zIndex:1,
          opacity: i === current ? 1 : 0,
          transition:'opacity 1.8s ease-in-out',
        }}>
          <img src={slide.src} alt={slide.country} style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
            animation:'kenBurns 18s ease-in-out infinite',
            animationDelay:`${i * -2.25}s`,
          }}/>
        </div>
      ))}

      {/* ── OVERLAYS ── */}
      {/* Dark gradient — strong on left for text readability, fades to right */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:'linear-gradient(105deg, rgba(12,18,40,0.93) 0%, rgba(26,34,64,0.82) 40%, rgba(26,34,64,0.5) 68%, rgba(26,34,64,0.18) 100%)',
      }}/>
      {/* Subtle grid dots */}
      <div style={{
        position:'absolute', inset:0, zIndex:3,
        backgroundImage:'radial-gradient(circle at 2px 2px,rgba(255,255,255,0.04) 1px,transparent 0)',
        backgroundSize:'32px 32px',
      }}/>
      {/* Bottom vignette */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:160, zIndex:3,
        background:'linear-gradient(to top, rgba(12,18,40,0.65), transparent)',
      }}/>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{ position:'relative', zIndex:4, paddingTop:150, paddingBottom:110 }}>
        <div style={{ maxWidth:600 }}>

          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)',
            borderRadius:100, padding:'6px 16px', marginBottom:24,
            fontSize:'0.78rem', color:'rgba(255,255,255,0.88)', fontWeight:500,
            animation:'fadeUp 0.7s both 0.1s',
          }}>
            <span style={{ width:7, height:7, background:'#4ade80', borderRadius:'50%', animation:'pulse 2s infinite', display:'block' }}/>
            Nepal's Trusted Manpower Recruitment Agency
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily:'var(--ff-head)', fontSize:'clamp(2.6rem,5.5vw,4.6rem)',
            fontWeight:700, lineHeight:1.08, color:'var(--white)', marginBottom:22,
            animation:'fadeUp 0.9s both 0.3s',
          }}>
            Your Career<br/>Abroad Starts<br/>
            <em style={{ fontStyle:'normal', color:'var(--accent)' }}>{company.tagline}</em>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize:'1.08rem', color:'rgba(255,255,255,0.76)', lineHeight:1.8,
            marginBottom:36, maxWidth:500,
            animation:'fadeUp 0.7s both 0.52s',
          }}>
            {company.description}
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', animation:'fadeUp 0.7s both 0.72s' }}>
            <a href="mailto:info@sunkoshimanpower.com" className="btn btn-accent">
              <i className="fas fa-envelope"/>Email Us
            </a>
            <Link href="/jobs" className="btn btn-outline-white">
              <i className="fas fa-briefcase"/>View Jobs
            </Link>
          </div>

          {/* Slide dots */}
          <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:44, animation:'fadeUp 0.7s both 0.9s' }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}
                style={{
                  width: i === current ? 28 : 8, height:8, borderRadius:100,
                  border:'none', cursor:'pointer', padding:0,
                  background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.32)',
                  transition:'all 0.35s',
                }}/>
            ))}
          </div>
        </div>
      </div>

{/* ── SCROLL INDICATOR ── */}
      <div style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        color:'rgba(255,255,255,0.42)', fontSize:'0.68rem', letterSpacing:'0.1em',
        textTransform:'uppercase', cursor:'pointer', zIndex:5,
      }}
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior:'smooth' })}
      >
        <span>Scroll</span>
        <div style={{
          width:1, height:36,
          background:'linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)',
          animation:'scrollLine 2s ease-in-out infinite',
        }}/>
      </div>
    </section>
  )
}
