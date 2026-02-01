"use client";

import styles from "./page.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Lazy load HeroOrb with deferred initialization
const HeroOrb = dynamic(() => import("@/components/hero-orb").then((mod) => mod.HeroOrb), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  ),
});

// Wrapper to defer HeroOrb loading until after critical content paints
function DeferredHeroOrb() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Wait for main content to paint, then load the heavy 3D component
    // Using requestIdleCallback for better performance, with fallback to setTimeout
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShouldLoad(true), { timeout: 1000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldLoad) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          background: 'transparent'
        }}
      />
    );
  }

  return <HeroOrb />;
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.ahmedansari.me/#webpage",
    "url": "https://www.ahmedansari.me",
    "name": "Ahmed Ansari - AI/ML Engineer Portfolio",
    "description": "Portfolio of Ahmed Ansari, an AI/ML Engineer specializing in LLMs, Generative AI, and Agentic Systems.",
    "isPartOf": { "@id": "https://www.ahmedansari.me/#website" },
    "about": { "@id": "https://www.ahmedansari.me/#person" }
  };

  return (
    <div className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeferredHeroOrb />

      <header className={styles.hero} style={{ position: 'relative', zIndex: 10 }}>

        <div className="glass-panel"
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '999px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: 'var(--foreground)',
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}>
          Based in Ahmedabad, India • Applied GenAI / AI Systems Engineer
        </div>
        <h1 className={`${styles.title} gradient-text animate-fade-in`}>
          Ahmed Raza Ansari
        </h1>
        <p className={styles.subtitle}>
          AI/ML Engineer specializing in <strong>LLMs</strong>, <strong>Generative AI</strong>, and <strong>Agentic Systems</strong>.<br />
          I turn organizational pain points into scalable AI solutions.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/projects" className="glass-button" style={{ padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', color: 'var(--foreground)' }}>
            View Work
          </Link>
          <Link href="/about" className="glass-button" style={{ padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', background: 'var(--foreground)', color: 'var(--background)' }}>
            About Me
          </Link>
        </div>

        {/* Quick stats */}
        <div className="stats-container" style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: 'row'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>1.5+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Years Experience</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)' }}>5+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Production Systems</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)' }}>9</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Depts Enabled</div>
          </div>
        </div>
      </header>
    </div >
  );
}
