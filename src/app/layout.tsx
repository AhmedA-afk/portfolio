import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Ahmed Ansari | AI/ML Engineer",
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
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ahmed Ansari | AI/ML Engineer",
    description: "Building autonomous AI agents and production-ready LLM systems.",
    url: "https://ahmedansari.me",
    siteName: "Ahmed Ansari Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ansari | AI/ML Engineer",
    description: "Building autonomous AI agents and production-ready LLM systems.",
    creator: "@zenith", // Update if you have a specific handle
  },
  alternates: {
    canonical: "https://ahmedansari.me",
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
  "@type": "Person",
  "name": "Ahmed Raza Ansari",
  "jobTitle": "AI/ML Engineer",
  "url": "https://ahmedansari.me",
  "sameAs": [
    "https://linkedin.com/in/ahmed-1-ansari",
    "https://github.com/AhmedA-afk"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Motadata (MindArray Systems Pvt. Ltd.)"
  },
  "knowsAbout": ["Artificial Intelligence", "Machine Learning", "LLMs", "Generative AI", "RAG", "Agentic Systems"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
            {children}
          </main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
