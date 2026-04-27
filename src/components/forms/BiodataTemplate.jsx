'use client'
import { forwardRef } from 'react'

const BLUE  = '#1a3a8c'
const LBLUE = '#dce6f5'

function calcAge(dob) {
  if (!dob) return ''
  const diff = Date.now() - new Date(dob).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) + ' yrs'
}

function Checkbox({ checked }) {
  return (
    <span style={{ display:'inline-block', width:13, height:13, border:`1.5px solid ${BLUE}`,
      borderRadius:2, marginRight:4, verticalAlign:'middle', position:'relative', flexShrink:0 }}>
      {checked && <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
        justifyContent:'center', fontSize:10, color:BLUE, fontWeight:900, lineHeight:1 }}>✓</span>}
    </span>
  )
}

function langCheck(val, level) {
  const map = { 'Excellent':'excc', 'Good':'good', 'Basic':'stats' }
  return map[val] === level
}

const BiodataTemplate = forwardRef(function BiodataTemplate({ data = {} }, ref) {
  const edMap = {
    'Primary School': 'primary',
    'Secondary School (SLC/SEE)': 'secondary',
    '+2 / Higher Secondary': 'higher',
  }
  const edLevel = edMap[data.education] || (data.education ? 'others' : '')

  const cell = { padding:'4px 8px', border:`1px solid ${BLUE}`, fontSize:11, color:'#111' }
  const hcell = { ...cell, background:BLUE, color:'#fff', fontWeight:700, textAlign:'center' }
  const langs = ['English','Hindi','Malay','Arabic']

  return (
    <div ref={ref} style={{
      width: 794, minHeight: 1123, background:'#fff', fontFamily:'Arial, sans-serif',
      padding:'36px 48px 40px', boxSizing:'border-box', color:'#111', fontSize:12,
    }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign:'center', borderBottom:`2px solid ${BLUE}`, paddingBottom:14, marginBottom:14 }}>
        <img src="/images/logo.png" alt="logo"
          style={{ width:70, height:70, objectFit:'contain', marginBottom:6 }}
          onError={e=>{e.target.style.display='none'}}/>
        <div style={{ fontFamily:'Arial Black, Arial, sans-serif', fontSize:22, fontWeight:900,
          color:BLUE, letterSpacing:'0.04em', textTransform:'uppercase', lineHeight:1.2 }}>
          Sunkoshi Manpower Service (P.) Ltd.
        </div>
        <div style={{ fontSize:12, color:BLUE, fontStyle:'italic', marginTop:4 }}>
          License No. 69/052/53 Issued by Department of Foreign Employment
        </div>
      </div>

      {/* ── REF + PHOTO ── */}
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
        <div>
          <div style={{ marginBottom:10 }}>
            <span style={{ color:BLUE, fontWeight:700 }}>Ref. No. </span>
            <span style={{ display:'inline-block', width:160, borderBottom:`1px solid ${BLUE}` }}>&nbsp;</span>
          </div>
          <div style={{ marginTop:8 }}>
            <div style={{ color:BLUE, fontWeight:700, marginBottom:2 }}>Applied for:</div>
            <div style={{ color:BLUE, fontWeight:700 }}>
              Position: <span style={{ color:'#111', fontWeight:400 }}>{data.job_title || data.applying_for_job || '…………………………………'}</span>
            </div>
          </div>
        </div>
        <div style={{ width:90, height:110, border:`1.5px solid ${BLUE}`, borderRadius:3,
          display:'flex', alignItems:'center', justifyContent:'center', color:BLUE,
          fontSize:10, textAlign:'center', color:'#aaa' }}>
          Photo
        </div>
      </div>

      {/* ── PERSONAL DATA ── */}
      <SectionTitle>Personal Data</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width:'60%' }}>
              <b style={{color:BLUE}}>Name:</b> {data.full_name || ''}
            </td>
            <td style={cell}>
              <b style={{color:BLUE}}>Passport No.:</b> {data.passport_no || ''}
            </td>
          </tr>
          <tr>
            <td style={cell}><b style={{color:BLUE}}>Religion:</b> {data.religion || ''}</td>
            <td style={cell}><b style={{color:BLUE}}>D.O.B.:</b> {data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : ''}</td>
          </tr>
          <tr>
            <td style={cell}><b style={{color:BLUE}}>Nationality:</b> {data.nationality || ''}</td>
            <td style={cell}><b style={{color:BLUE}}>Age:</b> {calcAge(data.dob)}</td>
          </tr>
          <tr>
            <td style={cell}>
              <b style={{color:BLUE}}>Sex:</b>&nbsp;&nbsp;
              <Checkbox checked={data.gender==='Male'}/> Male &nbsp;&nbsp;
              <Checkbox checked={data.gender==='Female'}/> Female
            </td>
            <td style={cell}>
              <b style={{color:BLUE}}>Validity of Passport:</b>{' '}
              {data.passport_validity ? new Date(data.passport_validity).toLocaleDateString('en-GB') : ''}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}>
              <b style={{color:BLUE}}>Marital Status:</b>&nbsp;&nbsp;
              <Checkbox checked={data.marital_status==='Single'}/> Single &nbsp;&nbsp;
              <Checkbox checked={data.marital_status==='Married'}/> Married
            </td>
          </tr>
          <tr>
            <td style={{ ...cell, width:'33%' }}><b style={{color:BLUE}}>Height:</b> {data.height_cm ? data.height_cm+' cm' : ''}</td>
            <td style={cell}>
              <b style={{color:BLUE}}>Weight:</b> {data.weight_kg ? data.weight_kg+' kg' : ''} &nbsp;&nbsp;&nbsp;
              <b style={{color:BLUE}}>Tel:</b> {data.phone || ''}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}><b style={{color:BLUE}}>Address:</b> {data.district || ''}</td>
          </tr>
        </tbody>
      </table>

      {/* ── EDUCATION ── */}
      <SectionTitle>Education</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <tbody>
          <tr>
            <td style={{ ...cell, textAlign:'center' }}>
              <Checkbox checked={edLevel==='primary'}/> Primary School
            </td>
            <td style={{ ...cell, textAlign:'center' }}>
              <Checkbox checked={edLevel==='secondary'}/> Secondary School
            </td>
            <td style={{ ...cell, textAlign:'center' }}>
              <Checkbox checked={edLevel==='higher'}/> Higher Secondary
            </td>
            <td style={{ ...cell, textAlign:'center' }}>
              <Checkbox checked={edLevel==='others'}/> Others
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── LANGUAGES ── */}
      <SectionTitle>Languages</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width:'16%' }} rowSpan={2}>NAME</th>
            <th style={{ ...hcell }} colSpan={3}>SPEAKING</th>
            <th style={{ ...hcell }} colSpan={3}>READING</th>
            <th style={{ ...hcell }} colSpan={3}>WRITING</th>
          </tr>
          <tr>
            {['Excc.','Good','Stats','Excc.','Good','Stats','Excc.','Good','Stats'].map((h,i)=>(
              <th key={i} style={{ ...hcell, fontSize:10, fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {langs.map((lang, li) => {
            const key = lang.toLowerCase()
            const sp = data[`lang_${key}_speaking`]
            const rd = data[`lang_${key}_reading`]
            const wr = data[`lang_${key}_writing`]
            const bg = li%2===0 ? '#fff' : LBLUE
            return (
              <tr key={lang}>
                <td style={{ ...cell, fontWeight:600, color:BLUE, background:bg }}>{lang}</td>
                {[sp,sp,sp].map((v,i)=>(
                  <td key={'sp'+i} style={{ ...cell, textAlign:'center', background:bg }}>
                    {langCheck(v, ['excc','good','stats'][i]) ? '✓' : ''}
                  </td>
                ))}
                {[rd,rd,rd].map((v,i)=>(
                  <td key={'rd'+i} style={{ ...cell, textAlign:'center', background:bg }}>
                    {langCheck(v, ['excc','good','stats'][i]) ? '✓' : ''}
                  </td>
                ))}
                {[wr,wr,wr].map((v,i)=>(
                  <td key={'wr'+i} style={{ ...cell, textAlign:'center', background:bg }}>
                    {langCheck(v, ['excc','good','stats'][i]) ? '✓' : ''}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* ── WORKING EXPERIENCE ── */}
      <SectionTitle>Working Experience</SectionTitle>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:10 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width:'28%' }}>Year</th>
            <th style={hcell}>Occupation / Job Description</th>
            <th style={hcell}>Name of Company</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3].map((n,i) => (
            <tr key={n}>
              <td style={{ ...cell, background: i%2===0?'#fff':LBLUE, minHeight:26 }}>
                {data[`exp${n}_period`] || ''}
              </td>
              <td style={{ ...cell, background: i%2===0?'#fff':LBLUE }}>
                {data[`exp${n}_occupation`] || ''}
              </td>
              <td style={{ ...cell, background: i%2===0?'#fff':LBLUE }}>
                {data[`exp${n}_company`] || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── DECLARATION ── */}
      <div style={{ border:`1px solid ${BLUE}`, padding:'10px 12px', marginBottom:10, fontSize:11, lineHeight:1.5 }}>
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
    <div style={{ textAlign:'center', fontWeight:700, fontSize:13, color:BLUE,
      letterSpacing:'0.1em', textTransform:'uppercase', margin:'10px 0 6px',
      padding:'4px 0', borderTop:`1px solid ${BLUE}`, borderBottom:`1px solid ${BLUE}` }}>
      {children}
    </div>
  )
}

export default BiodataTemplate
