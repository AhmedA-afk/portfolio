"use client";

import { ExternalLink, Clock, Calendar } from "lucide-react";

interface BlogCardProps {
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
    slug: string;
    external?: boolean;
    index?: number;
}

export function BlogCard({ title, date, readTime, excerpt, slug, external = false, index = 0 }: BlogCardProps) {
    const staggerDelay = index * 0.1;
    const isComingSoon = slug === "#" || date === "Coming Soon";

    const CardWrapper = isComingSoon ? "div" : "a";
    const cardProps = isComingSoon
        ? {}
        : {
            href: slug,
            target: external ? "_blank" : undefined,
            rel: external ? "noopener noreferrer" : undefined
        };

    return (
        <CardWrapper
            {...cardProps}
            className="blog-card glass-card"
            style={{
                display: "block",
                padding: "2rem",
                textDecoration: "none",
                color: "inherit",
                opacity: 0,
                animation: `fadeSlideIn 0.5s ease forwards`,
                animationDelay: `${staggerDelay}s`,
                cursor: isComingSoon ? "default" : "pointer",
                position: "relative",
            }}
        >
            {/* Coming Soon Badge */}
            {isComingSoon && (
                <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    background: "rgba(167, 139, 250, 0.2)",
                    border: "1px solid rgba(167, 139, 250, 0.4)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "var(--secondary)",
                }}>
                    Coming Soon
                </div>
            )}

            {/* External Link Icon */}
            {external && !isComingSoon && (
                <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    color: "var(--text-secondary)",
                }}>
                    <ExternalLink size={16} />
                </div>
            )}

            {/* Meta info */}
            <div style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "0.75rem",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
            }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Calendar size={14} />
                    {date}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock size={14} />
                    {readTime}
                </span>
            </div>

            {/* Title */}
            <h3 className="blog-title" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                lineHeight: 1.3,
                paddingRight: isComingSoon || external ? "2rem" : 0,
            }}>
                {title}
            </h3>

            {/* Excerpt */}
            <p style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
            }}>
                {excerpt}
            </p>

            {/* Read more indicator */}
            {!isComingSoon && (
                <div className="read-more" style={{
                    marginTop: "1rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                }}>
                    Read more
                    <span className="arrow" style={{ transition: "transform 0.2s ease" }}>→</span>
                </div>
            )}

            <style jsx>{`
                .blog-card {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                                box-shadow 0.3s ease,
                                border-color 0.3s ease;
                }
                
                .blog-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.25),
                                0 0 16px rgba(167, 139, 250, 0.1);
                    border-color: var(--secondary);
                }
                
                .blog-card:hover .blog-title {
                    color: var(--secondary);
                }
                
                .blog-card:hover .arrow {
                    transform: translateX(4px);
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
        </CardWrapper>
    );
}
