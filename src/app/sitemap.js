import { news } from '@/data/news'
import { destinations } from '@/data/destinations'

const BASE = 'https://www.sunkoshimanpower.com'

export default function sitemap() {
  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/jobs`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/destinations`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/news`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/faq`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gallery`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/resources/employers`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/resources/job-seekers`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...destinations.map(d => ({
      url: `${BASE}/destinations/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...news.map(n => ({
      url: `${BASE}/news/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ]
}
