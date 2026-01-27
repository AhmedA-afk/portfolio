"use client";

import { Github, Mail, Linkedin } from "lucide-react";

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
                    <LinktreeIcon size={22} />
                </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <p style={{ fontSize: "0.9rem" }}>© 2026 Ahmed Ansari. All rights reserved.</p>
            </div>
        </footer>
    );
}

function LinktreeIcon({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 375 375"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M 209.460938 110.3125 L 259.660156 58.71875 L 288.796875 88.550781 L 236.140625 138.738281 L 310.210938 138.738281 L 310.210938 180.152344 L 235.789062 180.152344 L 288.796875 231.628906 L 259.660156 260.875 L 187.699219 188.578125 L 115.734375 260.875 L 86.601562 231.746094 L 139.605469 180.269531 L 65.1875 180.269531 L 65.1875 138.738281 L 139.253906 138.738281 L 86.601562 88.550781 L 115.734375 58.71875 L 165.933594 110.3125 L 165.933594 36.960938 L 209.460938 36.960938 Z M 165.933594 239.464844 L 209.460938 239.464844 L 209.460938 337.734375 L 165.933594 337.734375 Z M 165.933594 239.464844"
                fillRule="nonzero"
            />
        </svg>
    );
}
