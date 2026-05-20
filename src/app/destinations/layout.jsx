const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Work Abroad Destinations | Sunkoshi Manpower Nepal',
  description: 'Explore countries where Sunkoshi Manpower deploys Nepali workers — Malaysia, Japan, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain. Salary ranges, job types, and requirements.',
  keywords: ['work abroad destinations nepal', 'nepali workers malaysia', 'nepali workers japan', 'gulf jobs from nepal', 'kuwait jobs nepal', 'bahrain jobs nepal', 'overseas destination nepal'],
  alternates: { canonical: `${BASE}/destinations` },
  openGraph: {
    title: 'Work Abroad Destinations – Sunkoshi Manpower Nepal',
    description: 'Malaysia, Japan, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain — salary, jobs and requirements for Nepali workers.',
    url: `${BASE}/destinations`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Work Abroad Destinations – Sunkoshi Manpower',
    description: 'Malaysia, Japan, Gulf countries and more — destination guides for Nepali workers.',
  },
}
export default function DestinationsLayout({ children }) { return children }
