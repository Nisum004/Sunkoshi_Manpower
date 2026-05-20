const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Photo Gallery | Sunkoshi Manpower Nepal',
  description: 'Photos from Sunkoshi Manpower — worker sendoff events, training sessions, office, and milestone celebrations since 1995.',
  keywords: ['sunkoshi manpower gallery', 'nepal manpower agency photos', 'worker sendoff nepal'],
  alternates: { canonical: `${BASE}/gallery` },
  openGraph: {
    title: 'Photo Gallery – Sunkoshi Manpower Nepal',
    description: 'Worker sendoff events, training sessions, and celebrations from Nepal\'s trusted recruitment agency.',
    url: `${BASE}/gallery`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery – Sunkoshi Manpower Nepal',
    description: 'Worker sendoff events, training sessions and office photos.',
  },
}
export default function GalleryLayout({ children }) { return children }
