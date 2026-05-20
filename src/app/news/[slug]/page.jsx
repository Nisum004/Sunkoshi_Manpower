import { news } from '@/data/news'
import NewsDetailClient from '@/components/news/NewsDetailClient'

const BASE = 'https://www.sunkoshimanpower.com'

export function generateStaticParams() {
  return news.map(n => ({ slug: n.slug }))
}

export function generateMetadata({ params }) {
  const article = news.find(n => n.slug === params.slug)
  if (!article) return { title: 'News Article' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${BASE}/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${BASE}/news/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      ...(article.image && { images: [{ url: article.image, width: 800, height: 450 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      ...(article.image && { images: [article.image] }),
    },
  }
}

export default function NewsDetailPage({ params }) {
  return <NewsDetailClient slug={params.slug} />
}
