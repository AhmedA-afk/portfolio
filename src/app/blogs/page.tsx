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
        title: "How can GenAI improve and reform the education sector (instead of ruining it)",
        date: "Medium Article",
        readTime: "5 min read",
        excerpt: "Exploring the transformative potential of Generative AI in education—shifting from fear of cheating to personalized learning, operational efficiency, and creative empowerment.",
        slug: "https://medium.com/@ahmedraza1ansari/how-can-genai-improve-and-reform-the-education-sector-instead-of-ruining-it-763cdadb5c20",
        external: true
    },
    {
        title: "Understanding LLM Quantization: GGUF & The Future of Local Inference",
        date: "Coming Soon",
        readTime: "TBD",
        excerpt: "Exploring how quantization techniques like GGUF recallibrate weights to run massive models on consumer hardware without significant accuracy loss.",
        slug: "#",
        external: false
    },
    {
        title: "Building Agentic Workflows with LangChain",
        date: "Coming Soon",
        readTime: "TBD",
        excerpt: "A deep dive into constructing autonomous agents that can reason, plan, and execute multi-step tasks using Chain-of-Thought prompting.",
        slug: "#",
        external: false
    }
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ahmedansari.me"
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs",
                "item": "https://ahmedansari.me/blogs"
            }]
        },
        {
            "@type": "ItemList",
            "itemListElement": blogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "BlogPosting",
                    "headline": blog.title,
                    "description": blog.excerpt,
                    "author": {
                        "@id": "https://ahmedansari.me/#person"
                    },
                    "url": blog.slug !== '#' ? blog.slug : undefined,
                    "datePublished": blog.date !== "Coming Soon" ? "2024-01-01" : undefined
                }
            }))
        }
    ]
};

export default function Blogs() {
    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
                    <a
                        key={index}
                        href={blog.slug}
                        target={blog.external ? "_blank" : undefined}
                        rel={blog.external ? "noopener noreferrer" : undefined}
                        className="glass-card animate-fade-in"
                        style={{
                            padding: "2rem",
                            cursor: blog.external ? "pointer" : "default",
                            display: "block",
                            textDecoration: "none",
                            animationDelay: `${index * 0.1}s`,
                            opacity: blog.slug === "#" ? 0.7 : 1
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{blog.date}</span>
                            <span style={{ fontSize: "0.8rem", padding: "0.25rem 0.75rem", borderRadius: "99px", background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>{blog.readTime}</span>
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem", color: "var(--foreground)" }}>{blog.title}</h2>
                        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                            {blog.excerpt}
                        </p>
                        {blog.external ? (
                            <span style={{ color: "var(--primary)", fontWeight: 500, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                Read on Medium <span>→</span>
                            </span>
                        ) : (
                            <span style={{ color: "var(--text-muted)", fontWeight: 500, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                Coming Soon
                            </span>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
