import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blogs & Insights | Ahmed Ansari",
    description: "Read thoughts on AI, LLM quantization (GGUF), Agentic workflows, and the future of software engineering.",
    openGraph: {
        title: "Blogs & Insights | Ahmed Ansari",
        description: "Deep dives into AI/ML engineering, from local inference to production-grade agent systems.",
        url: "https://ahmedansari.me/blogs",
    },
    alternates: {
        canonical: "https://ahmedansari.me/blogs",
    },
};

const blogs = [
    {
        title: "Understanding LLM Quantization: GGUF & The Future of Local Inference",
        date: "October 15, 2025",
        readTime: "8 min read",
        excerpt: "Exploring how quantization techniques like GGUF recallibrate weights to run massive models on consumer hardware without significant accuracy loss.",
        slug: "llm-quantization-gguf"
    },
    {
        title: "Building Agentic Workflows with LangChain",
        date: "September 2, 2025",
        readTime: "12 min read",
        excerpt: "A deep dive into constructing autonomous agents that can reason, plan, and execute multi-step tasks using Chain-of-Thought prompting.",
        slug: "building-agentic-workflows"
    },
    {
        title: "RAG vs. Fine-Tuning: Making the Right Choice",
        date: "August 10, 2025",
        readTime: "6 min read",
        excerpt: "When should you inject context via RAG and when does it make sense to burn knowledge into weights? A practical guide for engineers.",
        slug: "rag-vs-finetuning"
    }
];

export default function Blogs() {
    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
            <header style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h1 className="gradient-text animate-fade-in" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>
                    Insights
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem" }}>
                    Thoughts on AI, Engineering, and the future of tech.
                </p>
            </header>

            <div style={{ display: "grid", gap: "2rem" }}>
                {blogs.map((blog, index) => (
                    <div key={index} className="glass-card animate-fade-in" style={{ padding: "2rem", cursor: "pointer", animationDelay: `${index * 0.1}s` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{blog.date}</span>
                            <span style={{ fontSize: "0.8rem", padding: "0.25rem 0.75rem", borderRadius: "99px", background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>{blog.readTime}</span>
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>{blog.title}</h2>
                        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                            {blog.excerpt}
                        </p>
                        <span style={{ color: "var(--foreground)", fontWeight: 500, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            Read Article <span>→</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
