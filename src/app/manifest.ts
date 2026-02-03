import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const headersList = await headers()
    const host = headersList.get('host') || 'www.ahmedansari.me'

    // Determine which domain we're on
    let name = 'Ahmed Ansari Portfolio'
    let shortName = 'Ahmed Ansari'
    let description = 'AI/ML Engineer Portfolio - Ahmed Ansari'
    let startUrl = '/'
    let scope = '/'

    if (host.startsWith('docs.')) {
        name = 'Ahmed Ansari - Docs'
        shortName = 'Docs'
        description = 'Documentation for Ahmed Ansari Portfolio'
    } else if (host.startsWith('blog.')) {
        name = 'Ahmed Ansari - Blog'
        shortName = 'Blog'
        description = 'AI/ML Blog by Ahmed Ansari'
    }

    return {
        name,
        short_name: shortName,
        description,
        start_url: startUrl,
        scope,
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#020617',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    }
}

