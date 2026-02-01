import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ahmedansari.me"),
  title: "Ahmed Ansari : Portfolio - AI/ML Engineer",
  description: "Portfolio of Ahmed Ansari - AI/ML Engineer specializing in LLMs, Generative AI, and Agentic Systems.",
  keywords: ["Ahmed Ansari", "AI Engineer", "AI/ML Engineer", "GenAI", "LLM Engineer", "Machine Learning", "Ahmedabad", "Portfolio", "Motadata", "RAG Systems"],
  authors: [{ name: "Ahmed Raza Ansari" }],
  creator: "Ahmed Raza Ansari",
  publisher: "Ahmed Raza Ansari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Ahmed Ansari : Portfolio - AI/ML Engineer",
    description: "Building autonomous AI agents and production-ready LLM systems.",
    url: "https://www.ahmedansari.me",
    siteName: "Ahmed Ansari Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ansari : Portfolio - AI/ML Engineer",
    description: "Building autonomous AI agents and production-ready LLM systems.",
    creator: "@AhmedA-afk",
  },
  alternates: {
    canonical: "https://www.ahmedansari.me",
    languages: {
      'en-US': 'https://www.ahmedansari.me',
      'x-default': 'https://www.ahmedansari.me',
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ahmed Ansari",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.ahmedansari.me/#website",
      "url": "https://www.ahmedansari.me",
      "name": "Ahmed Ansari Portfolio",
      "publisher": {
        "@id": "https://www.ahmedansari.me/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.ahmedansari.me/#person",
      "name": "Ahmed Raza Ansari",
      "jobTitle": "AI/ML Engineer",
      "url": "https://www.ahmedansari.me",
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.ahmedansari.me/#logo",
        "url": "https://www.ahmedansari.me/favicon-96x96.png",
        "caption": "Ahmed Ansari"
      },
      "sameAs": [
        "https://linkedin.com/in/ahmed-1-ansari",
        "https://github.com/AhmedA-afk",
        "https://linktr.ee/ahmed1ansari"
      ],
      "worksFor": {
        "@type": "Organization",
        "@id": "https://www.ahmedansari.me/#organization",
        "name": "Motadata (MindArray Systems Pvt. Ltd.)",
        "url": "https://www.motadata.com"
      },
      "knowsAbout": ["Artificial Intelligence", "Machine Learning", "LLMs", "Generative AI", "RAG", "Agentic Systems"]
    }
  ]
};

import { Inter } from "next/font/google";
import { BackToTop } from "@/components/back-to-top";
import { ReadingProgress } from "@/components/reading-progress";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevent render blocking
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics/API endpoints if any */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
        >
          <Navbar />
          <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
            {children}
          </main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <ScrollToTop />
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

