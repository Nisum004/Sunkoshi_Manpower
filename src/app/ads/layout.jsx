const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Notices & Advertisements | Sunkoshi Manpower Nepal',
  description: 'Latest notices, advertisements, and announcements from Sunkoshi Manpower Service — job demands, important notices, and recruitment advertisements.',
  keywords: ['manpower advertisements nepal', 'recruitment notices nepal', 'sunkoshi manpower ads', 'job demand notice nepal'],
  alternates: { canonical: `${BASE}/ads` },
  openGraph: {
    title: 'Notices & Advertisements – Sunkoshi Manpower Nepal',
    description: 'Latest notices, job demands, and recruitment advertisements from Sunkoshi Manpower.',
    url: `${BASE}/ads`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Notices & Ads – Sunkoshi Manpower Nepal',
    description: 'Latest recruitment notices and advertisements from Sunkoshi Manpower.',
  },
}

export default function AdsLayout({ children }) { return children }
