const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Apply for Overseas Jobs | Job Seeker Registration',
  description: 'Register with Sunkoshi Manpower to apply for overseas jobs in Gulf countries, Malaysia, and Japan. Fill your profile and our team will contact you within 48 hours.',
  keywords: ['apply overseas job nepal', 'job seeker registration nepal', 'foreign employment application', 'work abroad nepal apply', 'gulf job application kathmandu'],
  alternates: { canonical: `${BASE}/resources/job-seekers` },
  openGraph: {
    title: 'Apply for Overseas Jobs – Sunkoshi Manpower Nepal',
    description: 'Register and apply for jobs in Saudi Arabia, UAE, Qatar, Malaysia, Japan. Government-licensed agency.',
    url: `${BASE}/resources/job-seekers`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Apply for Overseas Jobs – Sunkoshi Manpower',
    description: 'Register to apply for overseas jobs in Gulf, Malaysia and Japan through Sunkoshi Manpower.',
  },
}

export default function JobSeekersLayout({ children }) { return children }
