import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
    return (
        <div className="glass-card" style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                        {description}
                    </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontSize: "0.75rem",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "999px",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--text-secondary)"
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
