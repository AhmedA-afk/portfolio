import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ahmedansari.me'

    // Core pages
    const routes = [
        '',
        '/about',
        '/projects',
        '/docs',
        '/resume',
        '/blogs'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date('2025-01-27'),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}
