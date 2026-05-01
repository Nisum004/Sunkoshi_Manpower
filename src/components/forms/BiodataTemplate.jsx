'use client'
import { forwardRef } from 'react'

function parseDob(dob) {
  if (!dob) return null
  const parts = dob.split('/')
  if (parts.length === 3) return new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`)
  return new Date(dob)
}

function calcAge(dob) {
  const d = parseDob(dob)
  if (!d || isNaN(d.getTime())) return ''
  const age = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
  return age > 0 ? age + ' yrs' : ''
}

function Checkbox({ checked }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 12, height: 12, border: '1px solid #000', background: '#fff',
      marginRight: 4, verticalAlign: 'middle', flexShrink: 0,
      fontSize: 10, color: '#000', fontWeight: 900, lineHeight: 1,
    }}>
      {checked ? '✓' : ''}
    </span>
  )
}

function langCheck(val, level) {
  return ({ 'Excellent': 'excc', 'Good': 'good', 'Basic': 'stats' })[val] === level
}

const cell  = { padding: '5px 8px', border: '1px solid #000', fontSize: 11, color: '#000', background: '#fff', height: 28, verticalAlign: 'middle' }
const hcell = { ...cell, fontWeight: 700, textAlign: 'center', height: 'auto', padding: '6px 4px', background: '#fff' }

const BiodataTemplate = forwardRef(function BiodataTemplate({ data = {} }, ref) {

  const edMap = {
    'Primary School':             'primary',
    'Secondary School (SLC/SEE)': 'secondary',
    '+2 / Higher Secondary':      'higher',
    "Bachelor's Degree":          'bachelor',
    "Master's Degree":            'master',
    'Trade / Skill Certificate':  'others',
    'Other':                      'others',
  }
  const edLevel = edMap[data.education] || ''

  const languages = Array.isArray(data.languages) && data.languages.length > 0
    ? data.languages
    : [{ name: 'English', speaking: '', reading: '', writing: '' }]
  const langRows = [...languages]
  while (langRows.length < 4) langRows.push({ name: '', speaking: '', reading: '', writing: '' })

  const today = new Date().toLocaleDateString('en-GB')

  return (
    <div ref={ref} style={{
      width: 794, minHeight: 1123, background: '#fff',
      fontFamily: 'Arial, Helvetica, sans-serif',
      padding: '32px 44px 36px', boxSizing: 'border-box',
      color: '#000', fontSize: 12,
    }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '2px solid #000' }}>
        <img src="/images/logo.png" alt="logo"
          style={{ width: 72, height: 72, objectFit: 'contain', display: 'block', margin: '0 auto 6px' }}
          onError={e => { e.target.style.display = 'none' }}/>
        <div style={{ fontFamily: 'Arial Black, Arial', fontSize: 19, fontWeight: 900,
          color: '#000', letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1.2 }}>
          Sunkoshi Manpower Service (P.) Ltd.
        </div>
        <div style={{ fontSize: 11, color: '#000', fontStyle: 'italic', marginTop: 4 }}>
          License No. 69/052/53 &nbsp;·&nbsp; Issued by Department of Foreign Employment, Nepal
        </div>
      </div>

      {/* REF + PHOTO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ fontSize: 11 }}>
          <div style={{ marginBottom: 7 }}>
            <b>Ref. No.:</b>&nbsp;
            <span style={{ display: 'inline-block', width: 140, borderBottom: '1px solid #000' }}>&nbsp;</span>
          </div>
          <div style={{ marginBottom: 7 }}>
            <b>Applied for:</b>&nbsp;
            <span style={{ display: 'inline-block', width: 200, borderBottom: '1px solid #000' }}>&nbsp;</span>
          </div>
          <div>
            <b>Position:</b>&nbsp;
            <span>{data.job_title || data.applying_for_job || ''}</span>
          </div>
        </div>
        <div style={{
          width: 88, height: 108, border: '1.5px solid #000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: '#555', textAlign: 'center', flexShrink: 0,
        }}>
          Photo
        </div>
      </div>

      {/* PERSONAL DATA */}
      <SectionBar>Personal Data</SectionBar>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6 }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width: '58%' }}><b>Name:</b> {data.full_name || ''}</td>
            <td style={cell}><b>Passport No.:</b> {data.passport_no || ''}</td>
          </tr>
          <tr>
            <td style={cell}><b>Religion:</b> {data.religion || ''}</td>
            <td style={cell}><b>D.O.B.:</b> {data.dob || ''}</td>
          </tr>
          <tr>
            <td style={cell}><b>Nationality:</b> {data.nationality || ''}</td>
            <td style={cell}><b>Age:</b> {calcAge(data.dob)}</td>
          </tr>
          <tr>
            <td style={cell}>
              <b>Sex:</b>&nbsp;
              <Checkbox checked={data.gender === 'Male'}/> Male&nbsp;&nbsp;
              <Checkbox checked={data.gender === 'Female'}/> Female
            </td>
            <td style={cell}>
              <b>Passport Validity:</b> {data.passport_validity || ''}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}>
              <b>Marital Status:</b>&nbsp;
              <Checkbox checked={data.marital_status === 'Single'}/> Single&nbsp;&nbsp;
              <Checkbox checked={data.marital_status === 'Married'}/> Married
            </td>
          </tr>
          <tr>
            <td style={cell}>
              <b>Height:</b> {data.height_cm ? data.height_cm + ' cm' : ''}&nbsp;&nbsp;&nbsp;
              <b>Weight:</b> {data.weight_kg ? data.weight_kg + ' kg' : ''}
            </td>
            <td style={cell}><b>Tel:</b> {data.phone || ''}</td>
          </tr>
          <tr>
            <td colSpan={2} style={cell}><b>Address:</b> {data.district || ''}</td>
          </tr>
        </tbody>
      </table>

      {/* EDUCATION */}
      <SectionBar>Education</SectionBar>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6 }}>
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
              <td key={k} style={{ ...cell, textAlign: 'center', fontSize: 10.5, height: 'auto', padding: '7px 4px' }}>
                <Checkbox checked={edLevel === k}/> {label}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* LANGUAGES */}
      <SectionBar>Languages</SectionBar>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width: '16%' }} rowSpan={2}>Language</th>
            <th style={hcell} colSpan={3}>Speaking</th>
            <th style={hcell} colSpan={3}>Reading</th>
            <th style={hcell} colSpan={3}>Writing</th>
          </tr>
          <tr>
            {['Excl.','Good','Basic','Excl.','Good','Basic','Excl.','Good','Basic'].map((h, i) => (
              <th key={i} style={{ ...hcell, fontSize: 9.5, fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {langRows.map((lang, li) => (
            <tr key={li}>
              <td style={{ ...cell, fontWeight: 600 }}>{lang.name || ' '}</td>
              {['excc','good','stats'].map(l => (
                <td key={'sp'+l} style={{ ...cell, textAlign: 'center' }}>
                  {langCheck(lang.speaking, l) ? '✓' : ' '}
                </td>
              ))}
              {['excc','good','stats'].map(l => (
                <td key={'rd'+l} style={{ ...cell, textAlign: 'center' }}>
                  {langCheck(lang.reading, l) ? '✓' : ' '}
                </td>
              ))}
              {['excc','good','stats'].map(l => (
                <td key={'wr'+l} style={{ ...cell, textAlign: 'center' }}>
                  {langCheck(lang.writing, l) ? '✓' : ' '}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* WORKING EXPERIENCE */}
      <SectionBar>Working Experience</SectionBar>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6 }}>
        <thead>
          <tr>
            <th style={{ ...hcell, width: '24%' }}>Year (From – To)</th>
            <th style={hcell}>Occupation / Job Description</th>
            <th style={hcell}>Name of Company &amp; Country</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(n => (
            <tr key={n}>
              <td style={cell}>{data[`exp${n}_period`] || ' '}</td>
              <td style={cell}>{data[`exp${n}_occupation`] || ' '}</td>
              <td style={cell}>{data[`exp${n}_company`] || ' '}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DECLARATION */}
      <div style={{ border: '1px solid #000', padding: '9px 12px', marginBottom: 0, fontSize: 11, lineHeight: 1.6, color: '#000' }}>
        I hereby declare that the above statements given are true and correct to the best of my knowledge.
      </div>

      {/* DATE / SIGNATURE */}
      <table style={{ width: '100%', borderCollapse: 'collapse', borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width: '50%', borderTop: 'none' }}><b>Date:</b> {today}</td>
            <td style={{ ...cell, borderTop: 'none' }}>
              <b>Signature:</b>
              <span style={{ display: 'inline-block', width: 160 }}>&nbsp;</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* FOOTER */}
      <div style={{ marginTop: 10, textAlign: 'center', fontSize: 9, color: '#555', paddingTop: 6, borderTop: '1px solid #ccc' }}>
        Sunkoshi Manpower Service (P.) Ltd. &nbsp;·&nbsp; Kathmandu, Nepal &nbsp;·&nbsp; Tel: +977-1-4522108 / 4519193 &nbsp;·&nbsp; www.sunkoshimanpower.com
      </div>

    </div>
  )
})

function SectionBar({ children }) {
  return (
    <div style={{
      textAlign: 'center', fontWeight: 900, fontSize: 12, color: '#000',
      letterSpacing: '0.15em', textTransform: 'uppercase',
      margin: '8px 0 0', padding: '4px 0',
      borderTop: '1.5px solid #000', borderBottom: '1.5px solid #000',
    }}>
      {children}
    </div>
  )
}

export default BiodataTemplate
