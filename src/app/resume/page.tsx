import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resume | Ahmed Ansari",
    description: "View or download Ahmed Ansari's professional resume. AI/ML Engineer with experience in LLMs and Automation.",
    openGraph: {
        title: "Resume | Ahmed Ansari",
        description: "Professional resume of Ahmed Ansari - Applied GenAI / AI Systems Engineer.",
        url: "https://www.ahmedansari.me/resume",
    },
    alternates: {
        canonical: "https://www.ahmedansari.me/resume",
    },
};

export default function Resume() {
    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", width: "100%", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <h1 className="gradient-text animate-fade-in" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "2rem" }}>
                Resume
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "3rem", maxWidth: "600px" }}>
                View my professional journey, skills, and qualifications in detail.
            </p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                    href="https://tr.ee/sGLfV-FUt1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button"
                    style={{
                        padding: "1rem 3rem",
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background: "var(--foreground)",
                        color: "var(--background)"
                    }}
                >
                    View Resume
                </a>

                {/* Placeholder for local download if file is added later */}
                {/*
        <a 
          href="/resume.pdf" 
          download
          className="glass-button"
          style={{ 
            padding: "1rem 3rem", 
            borderRadius: "12px", 
            fontSize: "1.1rem", 
            fontWeight: 600
          }}
        >
          Download PDF
        </a>
        */}
            </div>
        </div>
    );
}
