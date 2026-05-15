import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/terms`,         lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`,       lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/disclaimer`,    lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookies`,       lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/personal-data`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]
}
