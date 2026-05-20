const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'News & Announcements | Sunkoshi Manpower',
  description: "Latest job openings, announcements, and updates from Sunkoshi Manpower Service — Nepal's trusted foreign employment agency since 1995.",
  keywords: ['manpower news nepal', 'overseas job news', 'nepal foreign employment updates', 'sunkoshi manpower news'],
  alternates: { canonical: `${BASE}/news` },
  openGraph: {
    title: 'News & Announcements – Sunkoshi Manpower Nepal',
    description: 'Latest job openings, announcements, and agency updates from Sunkoshi Manpower.',
    url: `${BASE}/news`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'News & Announcements – Sunkoshi Manpower',
    description: "Latest job openings and updates from Nepal's trusted recruitment agency.",
  },
}
export default function NewsLayout({ children }) { return children }
