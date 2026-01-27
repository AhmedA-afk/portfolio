"use client";

import styles from "./page.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroOrb = dynamic(() => import("@/components/hero-orb").then((mod) => mod.HeroOrb), {
  ssr: false,
  loading: () => <div style={{ height: "400px", width: "400px" }} />, // Placeholder to avoid layout shift
});

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroOrb />

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
