import { faqs } from '@/data/faq'

const BASE = 'https://www.sunkoshimanpower.com'

export const metadata = {
  title: 'Frequently Asked Questions | Working Abroad from Nepal',
  description: 'Answers to common questions about working abroad through Sunkoshi Manpower — process, fees, documents, salary, and worker rights.',
  keywords: ['nepal foreign employment faq', 'work abroad nepal questions', 'gulf jobs faq nepal', 'manpower agency questions nepal'],
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: 'Frequently Asked Questions – Sunkoshi Manpower Nepal',
    description: 'Everything you need to know before going abroad — fees, documents, process, salary, and rights.',
    url: `${BASE}/faq`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ – Sunkoshi Manpower Nepal',
    description: 'Answers about working abroad through Sunkoshi Manpower — fees, documents, salary.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
}

export default function FaqLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
