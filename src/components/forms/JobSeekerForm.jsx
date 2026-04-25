'use client'
import { useState } from 'react'
import { formOptions, contact } from '@/data/company'
import { CheckCircle, Plane, MapPin } from 'lucide-react'

const STEPS = ['Personal Details', 'Passport & Education', 'Work Experience', 'Job Preference']

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-navy">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  )
}

const inp = "w-full px-4 py-3 border border-border rounded-lg text-sm bg-pale focus:bg-white focus:border-cobalt outline-none transition-colors"

export default function JobSeekerForm({ defaultJob = '' }) {
  const [step,    setStep]    = useState(0)
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [data,    setData]    = useState({
    firstName: '', lastName: '', dob: '', gender: '', phone: '', email: '', address: '',
    passportNo: '', passportExpiry: '', nationality: 'Nepali',
    education: '', institution: '', passYear: '',
    trade: '', experience: '', currentEmployer: '', languages: '',
    preferredCountry: '', preferredCategory: '', availability: '', message: '',
    appliedJobTitle: defaultJob,
  })

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`https://formsubmit.co/ajax/${contact.formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'New Job Seeker Registration — Sunkoshi Manpower' }),
      })
      setDone(true)
    } catch { setDone(true) }
    setLoading(false)
  }

  if (done) return (
    <div className="text-center py-20">
      <div className="flex justify-center mb-5 text-green-600"><CheckCircle size={56}/></div>
      <h3 className="font-head text-3xl font-bold text-navy mb-3">Registration Submitted!</h3>
      <p className="text-muted max-w-sm mx-auto">Our recruitment team will review your details and contact you within 1–2 working days.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex flex-col items-center gap-1.5 flex-1 ${i <= step ? '' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i < step ? 'bg-navy border-navy text-white' : i === step ? 'bg-cobalt border-cobalt text-white' : 'bg-white border-border text-muted'
              }`}>
                {i < step ? <CheckCircle size={14}/> : i + 1}
              </div>
              <span className="text-[0.6rem] text-center hidden md:block text-muted font-medium">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 transition-all ${i < step ? 'bg-navy' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0 — Personal */}
      {step === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="First Name" required><input className={inp} value={data.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Ram" required /></Field>
          <Field label="Last Name" required><input className={inp} value={data.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Sharma" required /></Field>
          <Field label="Date of Birth" required><input type="date" className={inp} value={data.dob} onChange={e => set('dob', e.target.value)} required /></Field>
          <Field label="Gender" required>
            <select className={inp} value={data.gender} onChange={e => set('gender', e.target.value)} required>
              <option value="">Select...</option>
              {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Phone / Mobile" required><input type="tel" className={inp} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+977 98XXXXXXXX" required /></Field>
          <Field label="Email Address"><input type="email" className={inp} value={data.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></Field>
          <Field label="Permanent Address" required>
            <input className={inp} value={data.address} onChange={e => set('address', e.target.value)} placeholder="District, Province, Nepal" required />
          </Field>
          <Field label="Nationality"><input className={inp} value={data.nationality} onChange={e => set('nationality', e.target.value)} /></Field>
        </div>
      )}

      {/* Step 1 — Passport & Education */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Passport Number" required><input className={inp} value={data.passportNo} onChange={e => set('passportNo', e.target.value)} placeholder="PA1234567" required /></Field>
          <Field label="Passport Expiry Date" required><input type="date" className={inp} value={data.passportExpiry} onChange={e => set('passportExpiry', e.target.value)} required /></Field>
          <Field label="Highest Education" required>
            <select className={inp} value={data.education} onChange={e => set('education', e.target.value)} required>
              <option value="">Select...</option>
              {formOptions.education.map(e => <option key={e}>{e}</option>)}
            </select>
          </Field>
          <Field label="Institution / School Name"><input className={inp} value={data.institution} onChange={e => set('institution', e.target.value)} placeholder="School / College name" /></Field>
          <Field label="Passing Year"><input className={inp} value={data.passYear} onChange={e => set('passYear', e.target.value)} placeholder="e.g. 2018" /></Field>
          <Field label="Languages Known"><input className={inp} value={data.languages} onChange={e => set('languages', e.target.value)} placeholder="Nepali, Hindi, English..." /></Field>
        </div>
      )}

      {/* Step 2 — Work Experience */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Trade / Skill" required>
            <select className={inp} value={data.trade} onChange={e => set('trade', e.target.value)} required>
              <option value="">Select trade...</option>
              {formOptions.trades.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Years of Experience" required>
            <select className={inp} value={data.experience} onChange={e => set('experience', e.target.value)} required>
              <option value="">Select...</option>
              {formOptions.experience.map(ex => <option key={ex}>{ex}</option>)}
            </select>
          </Field>
          <Field label="Current / Last Employer">
            <input className={inp} value={data.currentEmployer} onChange={e => set('currentEmployer', e.target.value)} placeholder="Company name or N/A" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Describe Your Experience">
              <textarea className={inp + ' resize-none'} rows={4} value={data.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Briefly describe your work history, certifications, and skills..." />
            </Field>
          </div>
        </div>
      )}

      {/* Step 3 — Preference */}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {defaultJob && (
            <div className="md:col-span-2 bg-light border border-border rounded-xl p-4 text-sm text-navy font-medium">
              <MapPin size={14} style={{display:'inline',verticalAlign:'middle',marginRight:6}}/> Applying for: <strong>{defaultJob}</strong>
            </div>
          )}
          <Field label="Preferred Country" required>
            <select className={inp} value={data.preferredCountry} onChange={e => set('preferredCountry', e.target.value)} required>
              <option value="">Select country...</option>
              {formOptions.countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Job Category" required>
            <select className={inp} value={data.preferredCategory} onChange={e => set('preferredCategory', e.target.value)} required>
              <option value="">Select category...</option>
              {formOptions.categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Available to Join">
            <select className={inp} value={data.availability} onChange={e => set('availability', e.target.value)}>
              <option value="">Select...</option>
              {['Immediately', 'Within 1 Month', 'Within 3 Months', 'After 3 Months'].map(a => <option key={a}>{a}</option>)}
            </select>
          </Field>
          {/* Declaration */}
          <div className="md:col-span-2 bg-pale border border-border rounded-xl p-5 text-xs text-muted leading-relaxed">
            <strong className="text-navy">Declaration:</strong> I hereby declare that all information provided is true and correct to the best of my knowledge. I authorize Sunkoshi Manpower Service (P.) Ltd. to use this information for recruitment purposes.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        {step > 0
          ? <button type="button" onClick={() => setStep(s => s - 1)}
              className="px-6 py-3 border border-border text-muted text-sm font-semibold rounded-lg hover:border-navy hover:text-navy transition-colors">
              ← Back
            </button>
          : <div />
        }
        {step < STEPS.length - 1
          ? <button type="button" onClick={() => setStep(s => s + 1)}
              className="px-8 py-3 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-cobalt transition-colors">
              Next →
            </button>
          : <button type="submit" disabled={loading}
              className="px-8 py-3 bg-accent text-navy font-bold text-sm rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-60">
              {loading ? 'Submitting...' : <><Plane size={14}/> Submit Registration</>}
            </button>
        }
      </div>
    </form>
  )
}
