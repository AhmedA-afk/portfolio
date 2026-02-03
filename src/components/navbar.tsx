"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Terminal as TerminalIcon } from "lucide-react";
import { useState, useMemo, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// Lazy load Terminal to reduce initial bundle size (Terminal + framer-motion)
const Terminal = dynamic(() => import("./terminal").then((mod) => mod.Terminal), {
    ssr: false,
    loading: () => null,
});

// Domain configuration
const MAIN_DOMAIN = "ahmedansari.me";
const SUBDOMAINS = {
    blog: "blog.ahmedansari.me",
    docs: "docs.ahmedansari.me",
};

// Base navigation links (internal paths)
const baseLinks = [
    { path: "/", label: "Home", subdomain: null },
    { path: "/about", label: "About", subdomain: null },
    { path: "/projects", label: "Projects", subdomain: null },
    { path: "/blogs", label: "Blog", subdomain: "blog" as const },
    { path: "/docs", label: "Docs", subdomain: "docs" as const },
    { path: "/resume", label: "Resume", subdomain: null },
];

export function Navbar() {
    const pathname = usePathname();
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    // Detect current domain using useSyncExternalStore (hydration-safe)
    const domainInfo = useSyncExternalStore(
        // Subscribe function (no-op since hostname doesn't change)
        () => () => {},
        // getSnapshot for client
        () => {
            const hostname = window.location.hostname;
            if (hostname.includes(MAIN_DOMAIN)) {
                if (hostname.startsWith("blog.")) {
                    return { isProduction: true, subdomain: "blog" as const };
                } else if (hostname.startsWith("docs.")) {
                    return { isProduction: true, subdomain: "docs" as const };
                } else {
                    return { isProduction: true, subdomain: null };
                }
            }
            return { isProduction: false, subdomain: null };
        },
        // getServerSnapshot (SSR fallback)
        () => ({ isProduction: false, subdomain: null })
    );

    const { isProduction, subdomain: currentSubdomain } = domainInfo;

    // Generate navigation links with correct URLs based on current domain
    const links = useMemo(() => {
        return baseLinks.map((link) => {
            let href: string;
            let isExternal = false;

            if (!isProduction) {
                // Local development - use internal paths
                href = link.path;
            } else if (link.subdomain) {
                // This link should go to a subdomain (Blog or Docs)
                if (currentSubdomain === link.subdomain) {
                    // We're already on this subdomain, use root path
                    href = "/";
                } else {
                    // Navigate to the subdomain
                    href = `https://${SUBDOMAINS[link.subdomain]}`;
                    isExternal = true;
                }
            } else {
                // This link should go to main domain
                if (currentSubdomain === null) {
                    // We're on main domain, use internal path
                    href = link.path;
                } else {
                    // We're on a subdomain, navigate back to main domain
                    href = `https://www.${MAIN_DOMAIN}${link.path}`;
                    isExternal = true;
                }
            }

            return {
                href,
                label: link.label,
                isExternal,
                originalPath: link.path,
                subdomain: link.subdomain,
            };
        });
    }, [isProduction, currentSubdomain]);

    // Determine if a link is "active"
    const isLinkActive = (link: typeof links[0]) => {
        if (currentSubdomain === "blog" && link.subdomain === "blog") return true;
        if (currentSubdomain === "docs" && link.subdomain === "docs") return true;
        if (currentSubdomain === null && pathname === link.originalPath) return true;
        return false;
    };

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
                        const isActive = isLinkActive(link);

                        // Use <a> for external links, <Link> for internal
                        if (link.isExternal) {
                            return (
                                <a
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
                                        textDecoration: "none",
                                    }}
                                >
                                    {link.label}
                                </a>
                            );
                        }

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
                        {links.map((link, index) => {
                            const isActive = isLinkActive(link);

                            if (link.isExternal) {
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{
                                            fontSize: "1.75rem",
                                            fontWeight: 700,
                                            padding: "0.5rem",
                                            color: isActive ? "var(--primary)" : "var(--foreground)",
                                            textDecoration: "none",
                                            opacity: isMobileMenuOpen ? 1 : 0,
                                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                                            transition: `opacity 0.4s ease, transform 0.4s ease`,
                                            transitionDelay: `${index * 0.1 + 0.2}s`
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontSize: "1.75rem",
                                        fontWeight: 700,
                                        padding: "0.5rem",
                                        color: isActive ? "var(--primary)" : "var(--foreground)",
                                        textDecoration: "none",
                                        opacity: isMobileMenuOpen ? 1 : 0,
                                        transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                                        transition: `opacity 0.4s ease, transform 0.4s ease`,
                                        transitionDelay: `${index * 0.1 + 0.2}s`
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
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

