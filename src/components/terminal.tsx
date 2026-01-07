"use client";

import { useState, useEffect, useRef } from "react";
import { Minus, Square, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface CommandHistory {
    command: string;
    output: React.ReactNode;
}

// Zorin OS color palette
const ZORIN = {
    bgDark: "#2b1f38",        // Deep purple background
    bgHeader: "#3d2952",      // Lighter purple header
    bgContent: "#1a1225",     // Darker purple content area
    green: "#15c860",         // Zorin green
    purple: "#9b59b6",        // Accent purple
    cyan: "#00d4aa",          // Cyan accent
    text: "#e8e8e8",          // Light text
    textMuted: "#a89bb0",     // Muted purple-tinted text
    error: "#ff6b6b",         // Error red
    border: "rgba(155, 89, 182, 0.3)", // Purple border
};

export function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([
        { command: "init", output: "Welcome to Portfolio CLI v1.0.0. Type '/help' for commands." },
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    // Valid pages for navigation
    const validPages = ["home", "about", "projects", "blogs", "docs", "resume"];

    useEffect(() => {
        if (typeof document !== "undefined") {
            setPortalContainer(document.body);
            setMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [history, isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = "";

        // Handle 'cd' navigation command
        if (trimmedCmd.startsWith("cd ")) {
            const page = trimmedCmd.slice(3).trim();
            if (page === "home" || page === "/" || page === "~") {
                output = <span style={{ color: ZORIN.green }}>→ Navigating to Home...</span>;
                setHistory((prev) => [...prev, { command: cmd, output }]);
                router.push("/");
                return;
            } else if (validPages.includes(page)) {
                output = <span style={{ color: ZORIN.green }}>→ Navigating to /{page}...</span>;
                setHistory((prev) => [...prev, { command: cmd, output }]);
                router.push(`/${page}`);
                return;
            } else {
                output = <span style={{ color: ZORIN.error }}>cd: no such directory: {page}</span>;
                setHistory((prev) => [...prev, { command: cmd, output }]);
                return;
            }
        }

        switch (trimmedCmd) {
            case "help":
            case "/help":
                output = (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ color: ZORIN.green }}>Available commands:</span>
                        <span style={{ color: ZORIN.textMuted }}>  /help      - Show this help message</span>
                        <span style={{ color: ZORIN.textMuted }}>  /about     - About me</span>
                        <span style={{ color: ZORIN.textMuted }}>  /projects  - List my projects</span>
                        <span style={{ color: ZORIN.textMuted }}>  /socials   - Contact information</span>
                        <span style={{ color: ZORIN.textMuted }}>  /theme     - Toggle light/dark mode</span>
                        <span style={{ color: ZORIN.textMuted }}>  /clear     - Clear terminal</span>
                        <span style={{ color: ZORIN.cyan, marginTop: "8px" }}>Navigation:</span>
                        <span style={{ color: ZORIN.textMuted }}>  cd [page]  - Navigate to page (home, about, projects, blogs, docs, resume)</span>
                    </div>
                );
                break;
            case "about":
            case "/about":
                output = (
                    <span style={{ color: ZORIN.text }}>
                        I&apos;m Ahmed Raza Ansari, an Associate AI/ML Engineer based in Ahmedabad, India.
                        I specialize in <span style={{ color: ZORIN.cyan }}>LLMs</span>, <span style={{ color: ZORIN.purple }}>Generative AI</span>, and <span style={{ color: ZORIN.green }}>Agentic Systems</span>.
                    </span>
                );
                break;
            case "projects":
            case "/projects":
                output = (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ color: ZORIN.green }}>Recent Projects:</span>
                        <span style={{ color: ZORIN.textMuted }}>• <a href="/projects" style={{ color: ZORIN.cyan, textDecoration: "underline" }}>View all on Projects Page</a></span>
                    </div>
                );
                break;
            case "socials":
            case "/socials":
                output = (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ color: ZORIN.textMuted }}>• GitHub: <a href="https://github.com/zenith" target="_blank" style={{ color: ZORIN.cyan, textDecoration: "underline" }}>@zenith</a></span>
                        <span style={{ color: ZORIN.textMuted }}>• LinkedIn: <a href="https://linkedin.com/in/zenith" target="_blank" style={{ color: ZORIN.cyan, textDecoration: "underline" }}>Ahmed Raza Ansari</a></span>
                    </div>
                );
                break;
            case "theme":
            case "/theme":
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                output = <span style={{ color: ZORIN.green }}>✓ Switched to {newTheme} mode.</span>;
                break;
            case "clear":
            case "/clear":
                setHistory([]);
                return;
            case "":
                output = "";
                break;
            default:
                output = <span style={{ color: ZORIN.error }}>Command not found: {trimmedCmd}. Type &apos;/help&apos; for available commands.</span>;
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput("");
    };

    if (!mounted || !portalContainer) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    drag
                    dragMomentum={false}
                    dragElastic={0}
                    initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        width: "580px",
                        height: "400px",
                        maxWidth: "90vw",
                        maxHeight: "80vh",
                        zIndex: 99999,
                        borderRadius: "12px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        fontSize: "13px",
                        background: `linear-gradient(180deg, ${ZORIN.bgHeader} 0%, ${ZORIN.bgDark} 100%)`,
                        color: ZORIN.text,
                        boxShadow: `0 30px 100px rgba(0, 0, 0, 0.6), 
                                    0 0 0 1px ${ZORIN.border},
                                    0 0 40px rgba(155, 89, 182, 0.15),
                                    inset 0 1px 0 rgba(255,255,255,0.05)`,
                        border: `1px solid ${ZORIN.border}`,
                        pointerEvents: "auto"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header / Title Bar */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 16px",
                            height: "42px",
                            background: ZORIN.bgHeader,
                            borderBottom: `1px solid ${ZORIN.border}`,
                            cursor: "grab",
                            userSelect: "none"
                        }}
                    >
                        {/* Left: Window Controls (macOS style) */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <button
                                onClick={onClose}
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    background: "#ff5f57",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s"
                                }}
                                title="Close"
                            >
                                <X size={8} color="#8a0000" style={{ opacity: 0 }} />
                            </button>
                            <button
                                onClick={onClose}
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    background: "#febc2e",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                title="Minimize"
                            />
                            <button
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    background: "#28c840",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                title="Maximize"
                            />
                        </div>

                        {/* Center: Title */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: ZORIN.textMuted,
                            letterSpacing: "0.5px"
                        }}>
                            <span style={{ color: ZORIN.green }}>●</span>
                            <span>ahmedraza@portfolio</span>
                            <span style={{ color: ZORIN.purple }}>:</span>
                            <span style={{ color: ZORIN.cyan }}>~</span>
                        </div>

                        {/* Right: Spacer for balance */}
                        <div style={{ width: "60px" }} />
                    </div>

                    {/* Content Area */}
                    <div
                        style={{
                            flex: 1,
                            padding: "16px",
                            background: ZORIN.bgContent,
                            overflowY: "auto",
                            cursor: "text"
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {history.map((entry, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                                    {entry.command && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                                            <span style={{ color: ZORIN.green, fontWeight: 700 }}>zenith</span>
                                            <span style={{ color: ZORIN.textMuted }}>@</span>
                                            <span style={{ color: ZORIN.purple, fontWeight: 600 }}>portfolio</span>
                                            <span style={{ color: ZORIN.textMuted }}>:</span>
                                            <span style={{ color: ZORIN.cyan }}>~</span>
                                            <span style={{ color: ZORIN.textMuted }}>$</span>
                                            <span style={{ color: ZORIN.text, marginLeft: "4px" }}>{entry.command}</span>
                                        </div>
                                    )}
                                    <div style={{
                                        color: ZORIN.text,
                                        paddingLeft: "8px",
                                        lineHeight: 1.6,
                                        whiteSpace: "pre-wrap"
                                    }}>
                                        {entry.output}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Line */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                            <span style={{ color: ZORIN.green, fontWeight: 700 }}>zenith</span>
                            <span style={{ color: ZORIN.textMuted }}>@</span>
                            <span style={{ color: ZORIN.purple, fontWeight: 600 }}>portfolio</span>
                            <span style={{ color: ZORIN.textMuted }}>:</span>
                            <span style={{ color: ZORIN.cyan }}>~</span>
                            <span style={{ color: ZORIN.textMuted }}>$</span>
                            <form onSubmit={handleSubmit} style={{ flex: 1, marginLeft: "4px" }}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "none",
                                        outline: "none",
                                        color: ZORIN.text,
                                        fontFamily: "inherit",
                                        fontSize: "inherit",
                                        fontWeight: 500,
                                        caretColor: ZORIN.green
                                    }}
                                    autoFocus
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </form>
                        </div>
                        <div ref={bottomRef} />
                    </div>

                    {/* Bottom gradient line accent */}
                    <div style={{
                        height: "2px",
                        background: `linear-gradient(90deg, ${ZORIN.green}, ${ZORIN.purple}, ${ZORIN.cyan})`
                    }} />
                </motion.div>
            )}
        </AnimatePresence>,
        portalContainer
    );
}
