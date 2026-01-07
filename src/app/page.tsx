import styles from "./page.module.css";
import Link from "next/link";
import { HeroOrb } from "@/components/hero-orb";

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
          Based in Ahmedabad, India • Associate AI/ML Engineer
        </div>
        <h1 className={`${styles.title} gradient-text animate-fade-in`}>
          Ahmed Raza Ansari
        </h1>
        <p className={styles.subtitle}>
          AI/ML Engineer specializing in <strong>Large Language Models</strong>, <strong>Generative AI</strong>, and <strong>Agentic Systems</strong>.<br />
          Building next-gen AI-enabled products and intelligent research solutions.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/projects" className="glass-button" style={{ padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', color: 'var(--foreground)' }}>
            View Work
          </Link>
          <Link href="/about" className="glass-button" style={{ padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', background: 'var(--foreground)', color: 'var(--background)' }}>
            About Me
          </Link>
        </div>
      </header>
    </div >
  );
}
