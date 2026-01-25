import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ahmed Ansari Portfolio',
        short_name: 'Ahmed Ansari',
        description: 'AI/ML Engineer Portfolio - Ahmed Ansari',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#020617',
        icons: [
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    }
}
