import './globals.css'
import 'flag-icons/css/flag-icons.min.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Sunkoshi Manpower Service (P.) Ltd. – Nepal Recruitment Agency Since 1995',
    template: '%s – Sunkoshi Manpower',
  },
  description: 'Government-licensed Nepal manpower agency (No. 69/052/53) with 30+ years recruiting skilled workers to Gulf countries, Malaysia, and Japan. NAFEA member.',
  keywords: ['manpower nepal', 'nepal recruitment agency', 'gulf jobs nepal', 'japan jobs nepal', 'malaysia jobs nepal', 'foreign employment nepal', 'Sunkoshi Manpower', 'Kathmandu recruitment'],
  authors: [{ name: 'Sunkoshi Manpower Service (P.) Ltd.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: 'Sunkoshi Manpower Service',
    title: 'Sunkoshi Manpower Service – Nepal\'s Trusted Recruitment Agency',
    description: '30+ years recruiting skilled Nepali workers to Gulf, Malaysia & Japan. License No. 69/052/53.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunkoshi Manpower Service – Nepal Recruitment Agency',
    description: '30+ years recruiting skilled Nepali workers to Gulf, Malaysia & Japan.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: { canonical: BASE },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'Sunkoshi Manpower Service (P.) Ltd.',
  url: BASE,
  logo: `${BASE}/images/logo.png`,
  telephone: '+977-1-4522108',
  email: 'info@sunkoshimanpower.com',
  foundingDate: '1995',
  description: 'Government-licensed Nepal manpower recruitment agency deploying skilled workers to Gulf countries, Malaysia, and Japan since 1995.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Maitidevi',
    addressLocality: 'Kathmandu',
    postalCode: '44600',
    addressCountry: 'NP',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 27.7098, longitude: 85.3240 },
  areaServed: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Malaysia', 'Japan'],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Manpower Categories', itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skilled Manpower Recruitment' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Semi-Skilled Manpower Recruitment' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Unskilled Manpower Recruitment' } },
  ]},
  sameAs: [`${BASE}`],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}