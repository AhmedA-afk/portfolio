import { ProjectCard } from "@/components/project-card";

const projects = [
    {
        title: "Internal MCP/Agno Platform (OneLayer)",
        description: "Multi-agent chat + solution implementation dashboard enabling querying across Motadata documentation and tickets. Features RAG-based embeddings, automated test case generation, and ticket resolution assistance. Used by Sales, Ops, and QA teams.",
        tags: ["Agno", "RAG", "Multi-Agent", "PGVector", "Internal Platform"],
    },
    {
        title: "Hardware & BOQ Calculator",
        description: "End-to-end system for Sales and Presales teams that replaced 2 days of manual work with 2 hours automated workflow. Full features: Auth, logs, documentation, data retention, access controls, and backup.",
        tags: ["Python", "Automation", "Enterprise", "Full-Stack"],
    },
    {
        title: "WhatsApp Ticket Automation",
        description: "Integrated with Motadata ServiceOps, live for 6+ months serving ~200 customers. Handles 10-20 tickets/day with Meta APIs, n8n workflows, CRON triggers, and conditional routing.",
        tags: ["n8n", "Meta APIs", "Automation", "Customer-Facing"],
    },
    {
        title: "Multi-Agent Blog Generation Pipeline",
        description: "Automated content generation system used by Marketing and Sales teams. Publishes 2-3 external blogs weekly including technical blogs, competitor analysis, and feature articles.",
        tags: ["Multi-Agent", "LLMs", "Content Automation", "Marketing"],
    },
    {
        title: "ByteWrite",
        description: "An AI-powered audio summarization application that converts varied audio inputs into concise, actionable text summaries using advanced LLM inference.",
        tags: ["TypeScript", "AI Audio", "LLMs", "Frontend"],
        github: "https://github.com/AhmedA-afk/ByteWrite"
    },
    {
        title: "ServiceOps AI Copilot",
        description: "Developed an NL2SQL and RAG-based chatbot for Motadata's ITSM portal, enabling natural language query execution and automated ticket resolution.",
        tags: ["LLMs", "Python", "RAG", "Text2SQL", "PostgreSQL"],
    },
    {
        title: "Local LLM Inference Lab",
        description: "R&D initiative to localize Mistral 7b models using GGUF quantization, Ollama, and Docker for secure, offline-capable inference pipelines.",
        tags: ["Mistral 7B", "GGUF", "Docker", "Ollama", "LMStudio"],
        github: "https://github.com/AhmedA-afk/Local-LLM-Inference-Lab"
    },
    {
        title: "GithubGen",
        description: "A developer tool to generate beautiful, structured READMEs for GitHub profiles, streamlining the documentation process for open-source contributors.",
        tags: ["JavaScript", "Open Source", "DevTools"],
        github: "https://github.com/AhmedA-afk/GithubGen"
    },
    {
        title: "CS50 Ninja",
        description: "An interactive browser-based game developed as a capstone for Harvard's CS50, demonstrating mastery of algorithmic logic and event-driven programming.",
        tags: ["JavaScript", "HTML5", "Game Dev", "CS50"],
        github: "https://github.com/AhmedA-afk/CS50-Ninja"
    }
];

export default function Projects() {
    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <header style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h1 className="gradient-text animate-fade-in" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>
                    Selected Works
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", maxWidth: "700px", margin: "0 auto" }}>
                    A collection of production systems, AI platforms, and open-source projects exploring Generative AI, LLMs, and Automation.
                </p>
            </header>

            {/* Production Systems Section */}
            <section style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#15c860" }} />
                    Production Systems @ Motadata
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
                    {projects.slice(0, 4).map((project, index) => (
                        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Source & Personal Section */}
            <section>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9b59b6" }} />
                    Open Source & Personal Projects
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
                    {projects.slice(4).map((project, index) => (
                        <div key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
