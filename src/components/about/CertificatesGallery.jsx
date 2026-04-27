'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

const certs = [
  { file: 'license.jpg',                   title: 'Foreign Employment License',           issuer: 'Dept. of Foreign Employment, Nepal',   key: 'No. 69/052/53' },
  { file: 'nafea.jpg',                      title: 'NAFEA Membership',                     issuer: 'Nepal Association of Foreign Employment Agencies', key: 'Member' },
  { file: 'japan-certificate.jpg',          title: 'Japan Sending Authority',              issuer: 'Government of Japan',                  key: 'Authorized Sender' },
  { file: 'company-register.jpg',           title: 'Certificate of Incorporation',         issuer: 'Office of Company Registrar, Nepal',   key: 'No. 3716/052/053' },
  { file: 'register-certificate.jpg',       title: 'Company Registration Certificate',     issuer: 'Government of Nepal',                  key: 'Registered' },
  { file: 'employer-registration.jpg',      title: 'SSF Employer Registration',            issuer: 'Social Security Fund, Nepal',          key: 'No. 330608O1100005065' },
  { file: 'pan-registration-certificate.jpg', title: 'PAN Registration',                  issuer: 'Inland Revenue Office, Tangal',        key: 'PAN: 500093461' },
  { file: 'authorization-certificate.jpg',  title: 'Authorization Certificate',            issuer: 'Government Authority',                 key: 'Authorized' },
  { file: 'izazat-certificate.jpg',         title: 'Izazat (Permission) Certificate',      issuer: 'Government of Nepal',                  key: 'Certified' },
  { file: 'bhadrapur-branch.jpg',           title: 'Bhadrapur Branch Office Permit',       issuer: 'Local Government, Jhapa',              key: 'Branch Registered' },
]

export default function CertificatesGallery() {
  const [active, setActive] = useState(null)

  return (
    <>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:18}} className="certs-grid">
        {certs.map((c, i) => (
          <button key={i} onClick={() => setActive(c)}
            style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:12,padding:0,cursor:'pointer',textAlign:'left',overflow:'hidden',transition:'all 0.25s',boxShadow:'none'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
            <div style={{height:130,overflow:'hidden',background:'#f8f9fb'}}>
              <img src={`/images/certificates/${c.file}`} alt={c.title}
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--navy)',lineHeight:1.3,marginBottom:4}}>{c.title}</div>
              <div style={{fontSize:'0.68rem',color:'var(--blue)',fontWeight:600}}>{c.key}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div onClick={() => setActive(null)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.82)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:24,cursor:'zoom-out'}}>
          <div onClick={e => e.stopPropagation()}
            style={{background:'var(--white)',borderRadius:16,overflow:'hidden',maxWidth:680,width:'100%',boxShadow:'0 32px 80px rgba(0,0,0,0.5)',cursor:'default'}}>
            <div style={{position:'relative'}}>
              <img src={`/images/certificates/${active.file}`} alt={active.title}
                style={{width:'100%',maxHeight:'70vh',objectFit:'contain',display:'block',background:'#f8f9fb'}}/>
              <button onClick={() => setActive(null)}
                style={{position:'absolute',top:12,right:12,background:'rgba(0,0,0,0.55)',border:'none',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
                <X size={18}/>
              </button>
            </div>
            <div style={{padding:'18px 22px',borderTop:'1px solid var(--border)'}}>
              <div style={{fontFamily:'var(--ff-head)',fontSize:'1rem',fontWeight:700,color:'var(--navy)',marginBottom:4}}>{active.title}</div>
              <div style={{fontSize:'0.8rem',color:'var(--muted)'}}>{active.issuer}</div>
              <div style={{fontSize:'0.78rem',color:'var(--blue)',fontWeight:600,marginTop:4}}>{active.key}</div>
            </div>
          </div>
        </div>
      )}

      <style>{`@media(max-width:1100px){.certs-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:600px){.certs-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </>
  )
}
