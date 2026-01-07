import { ProjectCard } from "@/components/project-card";

const projects = [
    {
        title: "ByteWrite",
        description: "An AI-powered audio summarization application that converts varied audio inputs into concise, actionable text summaries using advanced LLM inference.",
        tags: ["TypeScript", "AI Audio", "Frontend"],
    },
    {
        title: "ServiceOps AI Copilot",
        description: "Developed an NL2SQL and RAG-based chatbot for Motadata's ITSM portal, enabling natural language query execution and automated ticket resolution.",
        tags: ["LLMs", "Python", "RAG", "PostgreSQL"],
    },
    {
        title: "Local LLM Inference Lab",
        description: "R&D initiative to localize Mistral 7b models using GGUF quantization, Ollama, and Docker for secure, offline-capable inference pipelines.",
        tags: ["Mistral 7B", "GGUF", "Docker", "Ollama"],
    },
    {
        title: "GithubGen",
        description: "A developer tool to generate beautiful, structured READMEs for GitHub profiles, streamlining the documentation process for open-source contributors.",
        tags: ["JavaScript", "Open Source", "DevTools"],
    },
    {
        title: "CS50 Ninja",
        description: "An interactive browser-based game developed as a capstone for Harvard's CS50, demonstrating mastery of algorithmic logic and event-driven programming.",
        tags: ["JavaScript", "HTML5", "Game Dev"],
    }
];

export default function Projects() {
    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <header style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h1 className="gradient-text animate-fade-in" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>
                    Selected Works
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
                    A collection of projects exploring Generative AI, LLMs, and System Design.
                </p>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
                {projects.map((project, index) => (
                    <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>
        </div>
    );
}
