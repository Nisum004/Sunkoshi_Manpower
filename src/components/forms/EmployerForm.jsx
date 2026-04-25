'use client'
import { useState } from 'react'
import { contact, formOptions } from '@/data/company'
import { Handshake, Building2, User, ClipboardList, Home, Bus, UtensilsCrossed, DollarSign } from 'lucide-react'

const inp = "w-full px-4 py-3 border border-border rounded-lg text-sm bg-pale focus:bg-white focus:border-cobalt outline-none transition-colors"

function Field({ label, required, children, full }) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? 'md:col-span-2' : ''}`}>
      <label className="text-xs font-semibold text-navy">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  )
}

export default function EmployerForm() {
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [data,    setData]    = useState({
    companyName: '', country: '', industry: '', website: '',
    contactPerson: '', designation: '', phone: '', email: '',
    position: '', category: '', vacancies: '', salary: '', contract: '',
    accommodation: '', transport: '', food: '', overtime: '',
    startDate: '', interviewMode: '', message: '',
  })

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`https://formsubmit.co/ajax/${contact.formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'New Employer Requirement — Sunkoshi Manpower' }),
      })
      setDone(true)
    } catch { setDone(true) }
    setLoading(false)
  }

  if (done) return (
    <div className="text-center py-20">
      <div className="flex justify-center mb-5 text-navy"><Handshake size={56}/></div>
      <h3 className="font-head text-3xl font-bold text-navy mb-3">Requirement Received!</h3>
      <p className="text-muted max-w-sm mx-auto">Our team will contact you within 24 hours to discuss your manpower requirements in detail.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

      {/* Company Info */}
      <div className="mb-8">
        <h3 className="font-head text-xl font-bold text-navy mb-5 pb-3 border-b border-border flex items-center gap-2"><Building2 size={18}/> Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Company Name" required full>
            <input className={inp} value={data.companyName} onChange={e => set('companyName', e.target.value)} placeholder="Your company name" required />
          </Field>
          <Field label="Country / Location" required>
            <select className={inp} value={data.country} onChange={e => set('country', e.target.value)} required>
              <option value="">Select country...</option>
              {formOptions.countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Industry / Sector">
            <select className={inp} value={data.industry} onChange={e => set('industry', e.target.value)}>
              <option value="">Select...</option>
              {['Construction', 'Oil & Gas', 'Hospitality', 'Healthcare', 'Manufacturing', 'Security', 'Retail / Hypermarket', 'Catering', 'IT', 'Agriculture', 'Other'].map(i => <option key={i}>{i}</option>)}
            </select>
          </Field>
          <Field label="Company Website"><input className={inp} value={data.website} onChange={e => set('website', e.target.value)} placeholder="www.yourcompany.com" /></Field>
        </div>
      </div>

      {/* Contact Person */}
      <div className="mb-8">
        <h3 className="font-head text-xl font-bold text-navy mb-5 pb-3 border-b border-border flex items-center gap-2"><User size={18}/> Contact Person</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Contact Person Name" required>
            <input className={inp} value={data.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder="Full name" required />
          </Field>
          <Field label="Designation / Title">
            <input className={inp} value={data.designation} onChange={e => set('designation', e.target.value)} placeholder="HR Manager, Director, etc." />
          </Field>
          <Field label="Phone / WhatsApp" required>
            <input type="tel" className={inp} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+966 XXXXXXXXX" required />
          </Field>
          <Field label="Email Address" required>
            <input type="email" className={inp} value={data.email} onChange={e => set('email', e.target.value)} placeholder="hr@company.com" required />
          </Field>
        </div>
      </div>

      {/* Job Requirement */}
      <div className="mb-8">
        <h3 className="font-head text-xl font-bold text-navy mb-5 pb-3 border-b border-border flex items-center gap-2"><ClipboardList size={18}/> Job Requirement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Position / Job Title" required>
            <input className={inp} value={data.position} onChange={e => set('position', e.target.value)} placeholder="e.g. Electrician, Mason, Driver" required />
          </Field>
          <Field label="Category">
            <select className={inp} value={data.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select...</option>
              {['Skilled', 'Semi-Skilled', 'Unskilled', 'Technical Trainee'].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Number of Vacancies" required>
            <input type="number" min="1" className={inp} value={data.vacancies} onChange={e => set('vacancies', e.target.value)} placeholder="e.g. 20" required />
          </Field>
          <Field label="Salary Offered">
            <input className={inp} value={data.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. SAR 1,200 / month" />
          </Field>
          <Field label="Contract Duration">
            <select className={inp} value={data.contract} onChange={e => set('contract', e.target.value)}>
              <option value="">Select...</option>
              {['6 Months', '1 Year', '2 Years', '3 Years', 'Open / Renewable'].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Interview Mode">
            <select className={inp} value={data.interviewMode} onChange={e => set('interviewMode', e.target.value)}>
              <option value="">Select...</option>
              {['In-person in Nepal', 'Video Call (Zoom/Teams)', 'Sunkoshi conducts on our behalf', 'Telephonic'].map(m => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Expected Start Date">
            <input type="date" className={inp} value={data.startDate} onChange={e => set('startDate', e.target.value)} />
          </Field>
        </div>

        {/* Benefits checkboxes */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-navy mb-3">Benefits Provided:</p>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'accommodation', Icon: Home,              label: 'Accommodation' },
              { key: 'transport',     Icon: Bus,               label: 'Transport'     },
              { key: 'food',          Icon: UtensilsCrossed,   label: 'Food'          },
              { key: 'overtime',      Icon: DollarSign,        label: 'Overtime Pay'  },
            ].map(({ key, Icon, label }) => (
              <label key={key} className="flex items-center gap-2 bg-pale border border-border px-4 py-2 rounded-lg cursor-pointer hover:border-cobalt transition-colors text-sm">
                <input type="checkbox" checked={data[key] === 'Yes'} onChange={e => set(key, e.target.checked ? 'Yes' : 'No')} className="accent-navy" />
                <Icon size={14}/> {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mb-8">
        <Field label="Additional Requirements / Notes" full>
          <textarea className={inp + ' resize-none'} rows={4} value={data.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Specific skills, qualifications, any other requirements..." />
        </Field>
      </div>

      <div className="bg-light border border-border rounded-xl p-5 text-xs text-muted leading-relaxed mb-6">
        <strong className="text-navy">Note:</strong> After receiving your requirement, Sunkoshi Manpower will contact you to discuss document requirements (Demand Letter, Power of Attorney, etc.) as per Nepal's Foreign Employment Act.
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-4 bg-navy text-white font-bold rounded-xl hover:bg-cobalt transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2">
        {loading ? 'Submitting...' : <><Handshake size={16}/> Submit Requirement</>}
      </button>
    </form>
  )
}
