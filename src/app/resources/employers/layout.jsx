const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Hire Nepali Workers | Employer Services',
  description: 'Post your manpower requirement to Sunkoshi Manpower. We supply pre-screened skilled, semi-skilled, and unskilled Nepali workers for Gulf, Malaysia, and Japan projects.',
  keywords: ['hire nepali workers', 'nepali manpower recruitment', 'manpower supply nepal', 'recruit workers from nepal', 'nepali labor for gulf', 'employer manpower nepal'],
  alternates: { canonical: `${BASE}/resources/employers` },
  openGraph: {
    title: 'Hire Nepali Workers – Sunkoshi Manpower Employer Services',
    description: 'Submit your requirement. We supply pre-screened workers for Gulf, Malaysia and Japan — licensed since 1995.',
    url: `${BASE}/resources/employers`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hire Nepali Workers – Sunkoshi Manpower',
    description: 'Pre-screened skilled and semi-skilled Nepali workers for Gulf, Malaysia and Japan.',
  },
}

export default function EmployersLayout({ children }) { return children }
