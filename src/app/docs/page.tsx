import { Metadata } from 'next';
import DocsClient from './DocsClient';

export const metadata: Metadata = {
    title: "Documentation | Ahmed Ansari",
    description: "Documentation for Ahmed Ansari's portfolio, interactive features, and CLI terminal commands.",
    openGraph: {
        title: "Documentation | Ahmed Ansari",
        description: "Learn how to use the interactive CLI terminal and explore portfolio features.",
        url: "https://docs.ahmedansari.me",
    },
    alternates: {
        canonical: "https://docs.ahmedansari.me",
    },
};

export default function Documentation() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.ahmedansari.me"
                }, {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Docs",
                    "item": "https://docs.ahmedansari.me"
                }]
            },
            {
                "@type": "TechArticle",
                "headline": "Ahmed Ansari Portfolio Documentation",
                "description": "Comprehensive documentation for Ahmed Ansari's interactive portfolio, covering CLI commands, AI tools, and architecture.",
                "url": "https://docs.ahmedansari.me",
                "author": {
                    "@id": "https://www.ahmedansari.me/#person"
                },
                "datePublished": "2024-03-20",
                "dateModified": new Date().toISOString().split('T')[0],
                "image": "https://www.ahmedansari.me/favicon-96x96.png"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DocsClient />
        </>
    );
}

