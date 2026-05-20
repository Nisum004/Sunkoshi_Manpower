import { company, md } from '@/data/company'
import Link from 'next/link'
import { HighlightsGrid, MDPhoto } from '@/components/about/AboutInteractive'
import CertificatesGallery from '@/components/about/CertificatesGallery'

const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'About Us | Sunkoshi Manpower – 30 Years of Trusted Recruitment',
  description: 'Sunkoshi Manpower Service (P.) Ltd. — government-licensed Nepal recruitment agency (No. 69/052/53) since 1995. 30+ years deploying skilled workers to Gulf, Malaysia and Japan.',
  keywords: ['about sunkoshi manpower', 'nepal manpower agency history', 'licensed recruitment agency nepal', 'DoFE licensed nepal', 'sunkoshi manpower kathmandu'],
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: 'About Sunkoshi Manpower – 30 Years of Trusted Recruitment',
    description: 'Licensed since 1995 (No. 69/052/53). 30+ years deploying skilled Nepali workers to Gulf, Malaysia and Japan.',
    url: `${BASE}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Sunkoshi Manpower – Nepal',
    description: 'Government-licensed since 1995. 30+ years, Gulf, Malaysia, Japan.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>About Us</span></div>
          <h1>About <em>Sunkoshi Manpower</em></h1>
          <p>30 years of trust, transparency, and transforming lives through international employment.</p>
        </div>
      </div>

      {/* Story */}
      <section style={{padding:'80px 0',background:'var(--white)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'center'}} className="about-grid">
            <div style={{position:'relative'}}>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop" alt="Our office" style={{width:'100%',borderRadius:16,aspectRatio:'4/3',objectFit:'cover',boxShadow:'var(--shadow)'}}/>
              <div style={{position:'absolute',bottom:-20,right:-20,background:'var(--navy)',borderRadius:12,padding:'18px 22px',textAlign:'center',boxShadow:'var(--shadow)'}}>
                <div style={{fontFamily:'var(--ff-head)',fontSize:'2.4rem',fontWeight:700,color:'var(--accent)',lineHeight:1}}>{company.established}</div>
                <div style={{fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.65)',marginTop:4}}>Founded</div>
              </div>
            </div>
            <div>
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">Valued as Gold,<br/><span>Clear as Water</span></h2>
              <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Named after the golden Sunkoshi River — a river flowing from the Himalayan range of Mount Everest — our company reflects its namesake: valued as gold, clear and transparent as water, and enduring as a river in flow.</p>
              <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Since {company.established}, Sunkoshi Manpower Service (P.) Ltd. has been dedicated to connecting skilled Nepali workers with reputable employers in the Gulf countries, Malaysia, and Japan. We are situated in the heart of Kathmandu — just 3.5 km from Tribhuvan International Airport — enabling fast and efficient processing.</p>
              <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>The company believes in mutual trust and benefits, focusing on transparent communication, quality candidate assessment, and timely deployment. Our sister institutions — <strong>Sunkoshi Training Centre</strong> and <strong>Koshi Tours & Travel</strong> — complete our end-to-end service offering.</p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {['Government Licensed','NAFEA Member','Japan Certified','CTEVT Affiliated'].map(t=><span key={t} style={{background:'var(--light)',color:'var(--navy)',fontSize:'0.78rem',fontWeight:600,padding:'6px 14px',borderRadius:100}}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section style={{padding:'80px 0',background:'var(--pale)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">What Sets Us <span>Apart</span></h2>
          </div>
          <HighlightsGrid />
        </div>
      </section>

      {/* Credentials */}
      <section style={{padding:'80px 0',background:'var(--white)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <span className="section-tag">Licenses & Certifications</span>
            <h2 className="section-title">Our <span>Credentials</span></h2>
            <p style={{color:'var(--muted)',maxWidth:560,margin:'0 auto',lineHeight:1.8}}>Fully licensed by the Department of Foreign Employment, Nepal. Every certificate below is an official government-issued document.</p>
          </div>
          <CertificatesGallery />
        </div>
      </section>

      {/* MD Message */}
      <section style={{padding:'80px 0',background:'var(--white)'}}>
        <div className="container" style={{maxWidth:800,textAlign:'center'}}>
          <MDPhoto />
          <div style={{fontFamily:'var(--ff-head)',fontSize:'3rem',color:'var(--light)',lineHeight:1,marginBottom:-20}}>"</div>
          <blockquote style={{fontFamily:'var(--ff-head)',fontSize:'1.3rem',color:'var(--navy)',lineHeight:1.65,fontStyle:'italic',marginBottom:24}}>
            {md.quote}
          </blockquote>
          <div style={{fontFamily:'var(--ff-head)',fontSize:'1.1rem',fontWeight:700,color:'var(--navy)'}}>{md.name}</div>
          <div style={{fontSize:'0.78rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',marginTop:4}}>{md.title}</div>
        </div>
      </section>
    </>
  )
}
