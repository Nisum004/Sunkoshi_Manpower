const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Contact Us | Sunkoshi Manpower Kathmandu',
  description: 'Contact Sunkoshi Manpower at our Kathmandu head office (Maitidevi). Phone: +977-1-4522108, Email: info@sunkoshimanpower.com. Nepal branch offices and Japan office also available.',
  keywords: ['sunkoshi manpower contact', 'manpower agency kathmandu contact', 'nepal recruitment agency phone', 'sunkoshi manpower address'],
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: 'Contact Sunkoshi Manpower – Kathmandu Nepal',
    description: 'Reach us at Maitidevi, Kathmandu. Phone: +977-1-4522108, Email: info@sunkoshimanpower.com.',
    url: `${BASE}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Sunkoshi Manpower',
    description: 'Maitidevi, Kathmandu. Phone: +977-1-4522108 | info@sunkoshimanpower.com.',
  },
}

export default function ContactLayout({ children }) { return children }
