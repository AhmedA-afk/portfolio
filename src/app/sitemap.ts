import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ahmedansari.me'

    // Core pages on main domain
    const mainRoutes = [
        '',
        '/about',
        '/projects',
        '/resume',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Subdomain routes
    const subdomainRoutes = [
        { url: 'https://docs.ahmedansari.me', priority: 0.8 },
        { url: 'https://blog.ahmedansari.me', priority: 0.8 },
    ].map((route) => ({
        url: route.url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route.priority,
    }))

    return [...mainRoutes, ...subdomainRoutes]
}
