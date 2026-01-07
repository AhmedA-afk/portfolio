"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Terminal as TerminalIcon } from "lucide-react";
import { useState } from "react";
import { Terminal } from "./terminal";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/docs", label: "Docs" },
    { href: "/resume", label: "Resume" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    borderRadius: "24px",
                    // Apple-style glassmorphism
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.12),
                        0 2px 8px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `,
                    maxWidth: "90vw",
                    width: "fit-content",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                {/* Navigation Links */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    position: "relative",
                                    padding: "10px 18px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    borderRadius: "16px",
                                    textDecoration: "none",
                                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                    color: isActive ? "var(--foreground)" : "var(--text-secondary)",
                                    background: isActive
                                        ? "rgba(255, 255, 255, 0.15)"
                                        : "transparent",
                                    boxShadow: isActive
                                        ? "inset 0 0 12px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.1)"
                                        : "none",
                                    border: isActive
                                        ? "1px solid rgba(255, 255, 255, 0.1)"
                                        : "1px solid transparent",
                                    letterSpacing: "0.01em"
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: "1px",
                        height: "24px",
                        background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
                        margin: "0 4px"
                    }}
                />

                {/* Action Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Terminal Toggle */}
                    <button
                        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            border: isTerminalOpen
                                ? "1px solid rgba(21, 200, 96, 0.4)"
                                : "1px solid rgba(255, 255, 255, 0.1)",
                            background: isTerminalOpen
                                ? "rgba(21, 200, 96, 0.15)"
                                : "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(10px)",
                            color: isTerminalOpen ? "#15c860" : "var(--text-secondary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: isTerminalOpen
                                ? "0 0 20px rgba(21, 200, 96, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                                : "inset 0 1px 0 rgba(255,255,255,0.1)"
                        }}
                        aria-label="Toggle Terminal"
                    >
                        <TerminalIcon size={18} />
                    </button>

                    {/* Theme Toggle */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        </>
    );
}
