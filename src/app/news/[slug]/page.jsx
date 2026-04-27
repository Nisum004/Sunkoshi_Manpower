import { news } from '@/data/news'
import NewsDetailClient from '@/components/news/NewsDetailClient'

export function generateStaticParams() {
  return news.map(n => ({ slug: n.slug }))
}

export default function NewsDetailPage({ params }) {
  return <NewsDetailClient slug={params.slug} />
}
