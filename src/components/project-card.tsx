"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    index?: number; // For staggered animation
}

export function ProjectCard({ title, description, tags, link, github, index = 0 }: ProjectCardProps) {
    const staggerDelay = index * 0.1; // 100ms stagger between cards

    return (
        <article
            className="project-card glass-card"
            style={{
                padding: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                opacity: 0,
                animation: `fadeSlideIn 0.5s ease forwards`,
                animationDelay: `${staggerDelay}s`,
            }}
        >
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, flex: 1 }}>{title}</h3>
                        {/* GitHub and external links */}
                        <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${title} on GitHub`}
                                    className="project-link-icon"
                                    style={{
                                        padding: "0.5rem",
                                        borderRadius: "8px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid var(--glass-border)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--text-secondary)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Github size={18} />
                                </a>
                            )}
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${title} live`}
                                    className="project-link-icon"
                                    style={{
                                        padding: "0.5rem",
                                        borderRadius: "8px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid var(--glass-border)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--text-secondary)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>
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

            <style jsx>{`
                .project-card {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                                box-shadow 0.3s ease,
                                border-color 0.3s ease;
                }
                
                .project-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3),
                                0 0 20px rgba(34, 211, 238, 0.15);
                    border-color: var(--primary);
                }
                
                .project-link-icon:hover {
                    background: rgba(34, 211, 238, 0.15) !important;
                    border-color: var(--primary) !important;
                    color: var(--primary) !important;
                    transform: translateY(-2px);
                }
                
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </article>
    );
}

