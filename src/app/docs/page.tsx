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
    return <DocsClient />;
}
