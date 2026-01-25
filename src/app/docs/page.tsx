import { Metadata } from 'next';
import DocsClient from './DocsClient';

export const metadata: Metadata = {
    title: "Documentation | Ahmed Ansari",
    description: "Documentation for Ahmed Ansari's portfolio, interactive features, and CLI terminal commands.",
    openGraph: {
        title: "Documentation | Ahmed Ansari",
        description: "Learn how to use the interactive CLI terminal and explore portfolio features.",
        url: "https://ahmedansari.me/docs",
    },
    alternates: {
        canonical: "https://ahmedansari.me/docs",
    },
};

export default function Documentation() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Ahmed Ansari Portfolio Documentation",
        "description": "Comprehensive documentation for Ahmed Ansari's interactive portfolio, covering CLI commands, AI tools, and architecture.",
        "author": {
            "@type": "Person",
            "name": "Ahmed Raza Ansari"
        },
        "datePublished": "2024-03-20",
        "dateModified": new Date().toISOString().split('T')[0],
        "image": "https://ahmedansari.me/og-image.png" // Placeholder or actual
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
