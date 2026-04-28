'use client'
import { forwardRef } from 'react'

const BLUE = '#1a3a8c'

function calcAge(dob) {
  if (!dob) return ''
  return Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) + ' yrs'
}

function Checkbox({ checked }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
      width:13, height:13, border:`1.5px solid ${BLUE}`, borderRadius:2,
      marginRight:5, verticalAlign:'middle', flexShrink:0, fontSize:10,
      color: BLUE, fontWeight:900 }}>
      {checked ? '✓' : ''}
    </span>
  )
}

function langCheck(val, level) {
  return ({ 'Excellent':'excc', 'Good':'good', 'Basic':'stats' })[val] === level
}

const cell   = { padding:'5px 8px', border:`1px solid #555`, fontSize:11, color:'#111', background:'#fff' }
const hcell  = { ...cell, background: BLUE, color:'#fff', fontWeight:700, textAlign:'center' }

const BiodataTemplate = forwardRef(function BiodataTemplate({ data = {} }, ref) {

  const edMap = {
    'Primary School':              'primary',
    'Secondary School (SLC/SEE)':  'secondary',
    '+2 / Higher Secondary':       'higher',
    "Bachelor's Degree":           'bachelor',
    "Master's Degree":             'master',
    'Trade / Skill Certificate':   'others',
    'Other':                       'others',
  }
  const edLevel = edMap[data.education] || ''

  const languages = Array.isArray(data.languages) && data.languages.length > 0
    ? data.languages
    : [{ name:'English', speaking:'', reading:'', writing:'' }]
  const langRows = [...languages]
  while (langRows.length < 4) langRows.push({ name:'', speaking:'', reading:'', writing:'' })

  return (
    <div ref={ref} style={{
      width:794, minHeight:1123, background:'#fff', fontFamily:'Arial, sans-serif',
      padding:'36px 44px 40px', boxSizing:'border-box', color:'#111', fontSize:12,
    }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign:'center', borderBottom:`2px solid ${BLUE}`, paddingBottom:14, marginBottom:16 }}>
        <img src="/images/logo.png" alt="logo"
          style={{ width:68, height:68, objectFit:'contain', display:'block', margin:'0 auto 8px' }}
          onError={e => { e.target.style.display = 'none' }}/>
        <div style={{ fontFamily:'Arial Black, Arial', fontSize:21, fontWeight:900,
          color:BLUE, letterSpacing:'0.04em', textTransform:'uppercase', lineHeight:1.2 }}>
          Sunkoshi Manpower Service (P.) Ltd.
        </div>
        <div style={{ fontSize:12, color:BLUE, fontStyle:'italic', marginTop:5 }}>
          License No. 69/052/53 Issued by Department of Foreign Employment
        </div>
      </div>

      {/* ── REF + PHOTO ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <div style={{ marginBottom:8 }}>
            <span style={{ color:BLUE, fontWeight:700 }}>Ref. No.&nbsp;</span>
            <span style={{ display:'inline-block', width:160, borderBottom:`1px solid ${BLUE}` }}>&nbsp;</span>
          </div>
          <div style={{ color:BLUE, fontWeight:700, marginBottom:2 }}>Applied for:</div>
          <div style={{ color:BLUE, fontWeight:700 }}>
            Position:&nbsp;<span style={{ color:'#111', fontWeight:400 }}>
              {data.job_title || data.applying_for_job || '…………………………'}
            </span>
          </div>
        </div>
        <div style={{ width:88, height:108, border:`1.5px solid ${BLUE}`, borderRadius:2,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:10, color:'#aaa', textAlign:'center', flexShrink:0 }}>
          Photo
        </div>
      </div>

      {/* ── PERSONAL DATA ── */}
      <SectionTitle>Personal Data</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width:'58%' }}><b style={{color:BLUE}}>Name:</b> {data.full_name||''}</td>
            <td style={cell}><b style={{color:BLUE}}>Passport No.:</b> {data.passport_no||''}</td>
          </tr>
          <tr>
            <td style={cell}><b style={{color:BLUE}}>Religion:</b> {data.religion||''}</td>
            <td style={cell}><b style={{color:BLUE}}>D.O.B.:</b> {data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : ''}</td>
          </tr>
          <tr>
            <td style={cell}><b style={{color:BLUE}}>Nationality:</b> {data.nationality||''}</td>
            <td style={cell}><b style={{color:BLUE}}>Age:</b> {calcAge(data.dob)}</td>
          </tr>
          <tr>
            <td style={cell}>
              <b style={{color:BLUE}}>Sex:</b>&nbsp;
              <Checkbox checked={data.gender==='Male'}/> Male &nbsp;
              <Checkbox checked={data.gender==='Female'}/> Female
            </td>
            <td style={cell}>
              <b style={{color:BLUE}}>Validity of Passport:</b>{' '}
              {data.passport_validity ? new Date(data.passport_validity).toLocaleDateString('en-GB') : ''}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}>
              <b style={{color:BLUE}}>Marital Status:</b>&nbsp;
              <Checkbox checked={data.marital_status==='Single'}/> Single &nbsp;
              <Checkbox checked={data.marital_status==='Married'}/> Married
            </td>
          </tr>
          <tr>
            <td style={cell}>
              <b style={{color:BLUE}}>Height:</b> {data.height_cm ? data.height_cm+' cm' : ''}&nbsp;&nbsp;&nbsp;
              <b style={{color:BLUE}}>Weight:</b> {data.weight_kg ? data.weight_kg+' kg' : ''}
            </td>
            <td style={cell}><b style={{color:BLUE}}>Tel:</b> {data.phone||''}</td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}><b style={{color:BLUE}}>Address:</b> {data.district||''}</td>
          </tr>
        </tbody>
      </table>

      {/* ── EDUCATION ── */}
      <SectionTitle>Education</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <tbody>
          <tr>
            {[
              ['primary',   'Primary School'],
              ['secondary', 'Secondary School'],
              ['higher',    'Higher Secondary'],
              ['bachelor',  "Bachelor's"],
              ['master',    "Master's"],
              ['others',    'Others'],
            ].map(([k, label]) => (
              <td key={k} style={{ ...cell, textAlign:'center', fontSize:10.5 }}>
                <Checkbox checked={edLevel===k}/> {label}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* ── LANGUAGES ── */}
      <SectionTitle>Languages</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width:'16%' }} rowSpan={2}>NAME</th>
            <th style={hcell} colSpan={3}>SPEAKING</th>
            <th style={hcell} colSpan={3}>READING</th>
            <th style={hcell} colSpan={3}>WRITING</th>
          </tr>
          <tr>
            {['Excc.','Good','Stats','Excc.','Good','Stats','Excc.','Good','Stats'].map((h,i)=>(
              <th key={i} style={{ ...hcell, fontSize:9.5, fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {langRows.map((lang, li) => (
            <tr key={li}>
              <td style={{ ...cell, fontWeight:600, color:BLUE }}>{lang.name||''}</td>
              {['excc','good','stats'].map(l=>(
                <td key={'sp'+l} style={{ ...cell, textAlign:'center' }}>
                  {lang.speaking && langCheck(lang.speaking, l) ? '✓' : ''}
                </td>
              ))}
              {['excc','good','stats'].map(l=>(
                <td key={'rd'+l} style={{ ...cell, textAlign:'center' }}>
                  {lang.reading && langCheck(lang.reading, l) ? '✓' : ''}
                </td>
              ))}
              {['excc','good','stats'].map(l=>(
                <td key={'wr'+l} style={{ ...cell, textAlign:'center' }}>
                  {lang.writing && langCheck(lang.writing, l) ? '✓' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── WORKING EXPERIENCE ── */}
      <SectionTitle>Working Experience</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width:'26%' }}>Year</th>
            <th style={hcell}>Occupation / Job Description</th>
            <th style={hcell}>Name of Company</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3].map(n => (
            <tr key={n}>
              <td style={{ ...cell, minHeight:24 }}>{data[`exp${n}_period`]||''}</td>
              <td style={cell}>{data[`exp${n}_occupation`]||''}</td>
              <td style={cell}>{data[`exp${n}_company`]||''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── DECLARATION ── */}
      <div style={{ border:`1px solid #555`, padding:'9px 12px', marginBottom:10, fontSize:11, lineHeight:1.6 }}>
        I hereby declare that the above statements given are true and correct to the best of my knowledge.
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width:'50%' }}>
              <b style={{color:BLUE}}>Date:</b> {new Date().toLocaleDateString('en-GB')}
            </td>
            <td style={cell}>
              <b style={{color:BLUE}}>Signature:</b>
              <span style={{ display:'inline-block', width:160 }}>&nbsp;</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  )
})

function SectionTitle({ children }) {
  return (
    <div style={{ textAlign:'center', fontWeight:700, fontSize:12.5, color:BLUE,
      letterSpacing:'0.12em', textTransform:'uppercase', margin:'10px 0 5px',
      padding:'4px 0', borderTop:`1px solid ${BLUE}`, borderBottom:`1px solid ${BLUE}` }}>
      {children}
    </div>
  )
}

export default BiodataTemplate
