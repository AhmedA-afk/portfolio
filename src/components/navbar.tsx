"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Terminal as TerminalIcon } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy load Terminal to reduce initial bundle size (Terminal + framer-motion)
const Terminal = dynamic(() => import("./terminal").then((mod) => mod.Terminal), {
    ssr: false,
    loading: () => null,
});

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blog" },
    { href: "/docs", label: "Docs" },
    { href: "/resume", label: "Resume" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

return (
    <>
        <nav
            className="navbar-fixed"
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
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
        >
            {/* Mobile Hamburger Button */}
            <button
                className="nav-hamburger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--foreground)",
                    padding: "8px",
                    cursor: "pointer",
                    zIndex: 1002
                }}
                aria-label="Toggle Menu"
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "24px"
                }}>
                    <span style={{ width: "100%", height: "2px", background: "currentColor", borderRadius: "2px", transition: "0.3s", transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
                    <span style={{ width: "100%", height: "2px", background: "currentColor", borderRadius: "2px", transition: "0.3s", opacity: isMobileMenuOpen ? 0 : 1 }}></span>
                    <span style={{ width: "100%", height: "2px", background: "currentColor", borderRadius: "2px", transition: "0.3s", transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></span>
                </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="nav-links-container desktop-only" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="nav-link"
                            style={{
                                padding: "10px 18px",
                                fontSize: "14px",
                                fontWeight: 500,
                                borderRadius: "16px",
                                color: isActive ? "var(--foreground)" : "var(--text-secondary)",
                                background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
                                border: isActive ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
                            }}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Full Screen Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "300px", textAlign: "center" }}>
                    {links.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                padding: "0.5rem",
                                color: pathname === link.href ? "var(--primary)" : "var(--foreground)",
                                textDecoration: "none",
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                                transition: `opacity 0.4s ease, transform 0.4s ease`,
                                transitionDelay: `${index * 0.1 + 0.2}s` // Staggered delay
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Desktop Divider */}
            <div
                className="desktop-divider"
                style={{
                    width: "1px", height: "24px", background: "rgba(255,255,255,0.2)", margin: "0 4px"
                }}
            />

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", zIndex: 1002 }}>
                <button
                    onClick={() => {
                        if (!hasOpened) setHasOpened(true);
                        setIsTerminalOpen(!isTerminalOpen);
                    }}
                    className="glass-button"
                    aria-label="Toggle Terminal"
                    style={{
                        width: "40px", height: "40px", borderRadius: "12px",
                        padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        border: isTerminalOpen ? "1px solid rgba(21, 200, 96, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
                        color: isTerminalOpen ? "#15c860" : "var(--text-secondary)"
                    }}
                >
                    <TerminalIcon size={18} />
                </button>
                <ThemeToggle />
            </div>
        </nav>
        {hasOpened && <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />}
    </>
);
}

