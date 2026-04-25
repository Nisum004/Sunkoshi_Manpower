const BASE = 'https://www.sunkoshimanpower.com'

export default function sitemap() {
  return [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/jobs`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/resources/employers`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/resources/job-seekers`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
