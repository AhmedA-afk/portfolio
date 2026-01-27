"use client";

import { Github, Mail, Linkedin, Link as LinkIcon } from "lucide-react";

export function Footer() {
    return (
        <footer style={{
            width: "100%",
            padding: "3rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            color: "var(--text-muted)",
            borderTop: "1px solid var(--glass-border)",
            marginTop: "auto",
            background: "var(--glass-bg)",
            backdropFilter: "blur(10px)"
        }}>
            <div style={{ display: "flex", gap: "2rem" }}>
                <a
                    href="https://github.com/AhmedA-afk"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{ color: "var(--text-secondary)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--foreground)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                    <Github size={22} />
                </a>
                <a
                    href="https://linkedin.com/in/ahmed-1-ansari"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ color: "var(--text-secondary)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#0077b5"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                    <Linkedin size={22} />
                </a>
                <a
                    href="mailto:ahmedraza1ansari@gmail.com"
                    aria-label="Email"
                    style={{ color: "var(--text-secondary)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#ea4335"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                    <Mail size={22} />
                </a>
                <a
                    href="https://linktr.ee/ahmed1ansari"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linktree"
                    style={{ color: "var(--text-secondary)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#43e660"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                    <LinkIcon size={22} />
                </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <p style={{ fontSize: "0.9rem" }}>© 2026 Ahmed Ansari. All rights reserved.</p>
            </div>
        </footer>
    );
}
