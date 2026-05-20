const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Current Job Vacancies | Overseas Jobs from Nepal',
  description: 'Browse overseas job vacancies in Saudi Arabia, Qatar, UAE, Malaysia and Japan — electricians, masons, factory workers and more. Government-licensed Nepal recruitment agency since 1995.',
  keywords: ['jobs abroad nepal', 'overseas jobs nepal', 'gulf jobs nepal 2025', 'malaysia jobs nepal', 'japan jobs nepal', 'foreign employment nepal', 'manpower recruitment nepal', 'electrician jobs abroad'],
  alternates: { canonical: `${BASE}/jobs` },
  openGraph: {
    title: 'Current Overseas Job Vacancies – Sunkoshi Manpower Nepal',
    description: 'Browse open positions in Saudi Arabia, Qatar, UAE, Malaysia and Japan. Sunkoshi Manpower — licensed since 1995.',
    url: `${BASE}/jobs`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Overseas Job Vacancies – Sunkoshi Manpower Nepal',
    description: 'Electricians, masons, factory workers and more — Saudi Arabia, Qatar, UAE, Malaysia, Japan.',
  },
}

export default function JobsLayout({ children }) { return children }
