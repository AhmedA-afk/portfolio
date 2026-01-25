"use client";

import { useState } from "react";

type DocSection = "introduction" | "cli" | "llms" | "apis";

export default function DocsClient() {
    const [activeSection, setActiveSection] = useState<DocSection>("introduction");
    // No longer need separate mobile menu state, using tabs

    const sections: { id: DocSection; label: string }[] = [
        { id: "introduction", label: "Introduction" },
        { id: "cli", label: "CLI Terminal" },
        { id: "llms", label: "LLM Tools" },
        { id: "apis", label: "API Reference" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "80vh", position: "relative" }}>

            {/* Mobile Top Tabs Navigation */}
            <nav className="docs-mobile-nav">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "999px",
                            border: "none",
                            background: activeSection === section.id ? "var(--foreground)" : "rgba(255,255,255,0.05)",
                            color: activeSection === section.id ? "var(--background)" : "var(--text-secondary)",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            flexShrink: 0
                        }}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>

            <div className="docs-container">
                {/* Desktop Sidebar */}
                <aside className="docs-sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
                    <div>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</h3>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                            {sections.map(section => (
                                <li
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    style={{
                                        color: activeSection === section.id ? "var(--foreground)" : "inherit",
                                        fontWeight: activeSection === section.id ? 500 : 400,
                                        cursor: "pointer",
                                        padding: "0.5rem 0.75rem",
                                        borderRadius: "8px",
                                        background: activeSection === section.id ? "rgba(255,255,255,0.1)" : "transparent",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    {section.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="docs-content">
                    {activeSection === "introduction" && <IntroductionSection />}
                    {activeSection === "cli" && <CLISection />}
                    {activeSection === "llms" && <ComingSoonSection title="LLM Tools Documentation" />}
                    {activeSection === "apis" && <ComingSoonSection title="API Reference" />}
                </div>
            </div>
        </div>
    );
}

function IntroductionSection() {
    return (
        <>
            <h1 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                Introduction
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                Welcome to the documentation for <strong>ahmedansari.me</strong> — my personal portfolio and a showcase of interactive features built with modern web technologies.
            </p>

            <div className="glass-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
                    About This Portfolio
                </h2>
                <p style={{ marginBottom: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    This portfolio is built to demonstrate my skills as an <strong>Applied GenAI / AI Systems Engineer</strong>. Beyond being a static showcase, it includes interactive features that reflect my interest in developer experience and creative interfaces.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    The site is built with <strong>Next.js 16</strong>, <strong>React 19</strong>, and <strong>Three.js</strong> for 3D graphics. It features a glassmorphism design, dark/light theme support, and an interactive CLI terminal.
                </p>
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Tech Stack</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                <TechCard title="Next.js 16" description="React framework with App Router" />
                <TechCard title="React 19" description="Latest React with concurrent features" />
                <TechCard title="Three.js" description="3D graphics for the hero orb" />
                <TechCard title="Framer Motion" description="Fluid animations" />
                <TechCard title="TypeScript" description="Type-safe development" />
                <TechCard title="next-themes" description="Dark/light mode support" />
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Key Features</h2>
            <ul style={{ color: "var(--text-secondary)", lineHeight: 2, fontSize: "1rem", paddingLeft: "1.5rem" }}>
                <li><strong>3D Hero Orb</strong> — Interactive liquid blob using React Three Fiber with theme-aware colors</li>
                <li><strong>Interactive CLI Terminal</strong> — Navigate the site using terminal commands</li>
                <li><strong>Glassmorphism Design</strong> — Modern frosted glass aesthetic throughout</li>
                <li><strong>Dark/Light Mode</strong> — System-aware theme switching</li>
                <li><strong>Responsive Layout</strong> — Works on all screen sizes</li>
                <li><strong>Draggable Terminal</strong> — Move the CLI window anywhere on screen</li>
            </ul>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Quick Navigation</h2>
            <p style={{ lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Use the navigation bar at the top to explore different sections, or try the <strong>CLI Terminal</strong> (click the terminal icon in the navbar) for a unique way to navigate the site.
            </p>
            <div className="glass-card" style={{ padding: "1.5rem", background: "rgba(0,0,0,0.2)" }}>
                <code style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "var(--primary)" }}>
                    Tip: Press the terminal button in the navbar and type <strong>/help</strong> to see available commands!
                </code>
            </div>
        </>
    );
}

function CLISection() {
    return (
        <>
            <h1 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                CLI Terminal
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                The portfolio includes an interactive CLI terminal inspired by <strong>Zorin OS</strong>. Access it by clicking the terminal icon in the navigation bar.
            </p>

            <div className="glass-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
                    Getting Started
                </h2>
                <ol style={{ color: "var(--text-secondary)", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li>Click the <strong>terminal icon</strong> (<code style={{ background: "rgba(0,0,0,0.2)", padding: "1px 4px", borderRadius: "3px", fontFamily: "monospace" }}>&gt;_</code>) in the navigation bar</li>
                    <li>The terminal will open in the center of the screen</li>
                    <li>Type <code style={{ background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "4px" }}>/help</code> to see available commands</li>
                    <li>Drag the terminal window to reposition it</li>
                </ol>
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Available Commands</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CommandCard
                    command="/help"
                    description="Display all available commands and their descriptions"
                />
                <CommandCard
                    command="/about"
                    description="Quick bio — who I am and what I specialize in"
                />
                <CommandCard
                    command="/projects"
                    description="Link to view all projects"
                />
                <CommandCard
                    command="/socials"
                    description="Links to GitHub and LinkedIn profiles"
                />
                <CommandCard
                    command="/theme"
                    description="Toggle between dark and light mode"
                />
                <CommandCard
                    command="/clear"
                    description="Clear the terminal history"
                />
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Navigation Commands</h2>
            <p style={{ lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Use the <code style={{ background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "4px" }}>cd</code> command to navigate between pages, just like a real terminal:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CommandCard
                    command="cd home"
                    description="Navigate to the home page"
                    aliases={["cd /", "cd ~"]}
                />
                <CommandCard
                    command="cd about"
                    description="Navigate to the about page"
                />
                <CommandCard
                    command="cd projects"
                    description="Navigate to the projects page"
                />
                <CommandCard
                    command="cd blogs"
                    description="Navigate to the blogs page"
                />
                <CommandCard
                    command="cd docs"
                    description="Navigate to this documentation page"
                />
                <CommandCard
                    command="cd resume"
                    description="Navigate to the resume page"
                />
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>AI Assistant</h2>
            <div className="glass-card" style={{ padding: "2rem", marginBottom: "2rem", borderLeft: "4px solid #f0b429" }}>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
                    The terminal is powered by <strong>Google Gemini AI</strong>. Just type naturally to ask anything about Ahmed&apos;s work, experience, or projects!
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    The AI has full context about Ahmed&apos;s skills, experience at Motadata, projects, and technical expertise.
                </p>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>AI Examples</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <AIExampleCard query="What is your experience with LLMs?" />
                <AIExampleCard query="Tell me about your work at Motadata" />
                <AIExampleCard query="What projects have you built?" />
                <AIExampleCard query="What is RAG and have you used it?" />
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Explicit AI Command</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CommandCard
                    command="/ai [message]"
                    description="Explicitly send a message to the AI assistant"
                />
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Terminal Features</h2>
            <div className="glass-card" style={{ padding: "2rem" }}>
                <ul style={{ color: "var(--text-secondary)", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li><strong>AI-Powered</strong> — Natural language queries answered by Gemini AI</li>
                    <li><strong>Draggable Window</strong> — Click and drag the title bar to move the terminal</li>
                    <li><strong>Zorin OS Theme</strong> — Purple-tinted design inspired by Zorin OS</li>
                    <li><strong>macOS-style Controls</strong> — Red/yellow/green window buttons</li>
                    <li><strong>Conversation Memory</strong> — AI remembers context within the session</li>
                    <li><strong>Loading States</strong> — Visual feedback while AI is thinking</li>
                    <li><strong>Smooth Animations</strong> — Powered by Framer Motion</li>
                </ul>
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Example Session</h2>
            <div style={{ background: "rgba(26, 18, 37, 0.9)", padding: "1.5rem", borderRadius: "12px", fontFamily: "monospace", fontSize: "0.9rem", lineHeight: 1.8, border: "1px solid rgba(155, 89, 182, 0.3)" }}>
                <div style={{ color: "#a89bb0" }}>
                    <span style={{ color: "#15c860", fontWeight: 700 }}>zenith</span>
                    <span style={{ color: "#a89bb0" }}>@</span>
                    <span style={{ color: "#9b59b6", fontWeight: 600 }}>portfolio</span>
                    <span style={{ color: "#a89bb0" }}>:</span>
                    <span style={{ color: "#00d4aa" }}>~</span>
                    <span style={{ color: "#a89bb0" }}>$ </span>
                    <span style={{ color: "#e8e8e8" }}>/help</span>
                </div>
                <div style={{ color: "#15c860", marginTop: "0.5rem" }}>Available commands:</div>
                <div style={{ color: "#a89bb0", paddingLeft: "1rem" }}>
                    /help &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help message<br />
                    /about &nbsp;&nbsp;&nbsp;&nbsp;- About me<br />
                    /projects &nbsp;- List my projects<br />
                    /socials &nbsp;&nbsp;- Contact information<br />
                    /theme &nbsp;&nbsp;&nbsp;&nbsp;- Toggle light/dark mode<br />
                    /clear &nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal
                </div>
                <div style={{ color: "#f0b429", marginTop: "0.5rem" }}>AI Assistant:</div>
                <div style={{ color: "#a89bb0", paddingLeft: "1rem" }}>
                    Just type naturally to ask me anything!
                </div>
                <div style={{ color: "#a89bb0", marginTop: "1rem" }}>
                    <span style={{ color: "#15c860", fontWeight: 700 }}>ahmed</span>
                    <span style={{ color: "#a89bb0" }}>@</span>
                    <span style={{ color: "#9b59b6", fontWeight: 600 }}>portfolio</span>
                    <span style={{ color: "#a89bb0" }}>:</span>
                    <span style={{ color: "#00d4aa" }}>~</span>
                    <span style={{ color: "#a89bb0" }}>$ </span>
                    <span style={{ color: "#e8e8e8" }}>What is your experience with RAG?</span>
                </div>
                <div style={{ marginTop: "0.5rem", paddingLeft: "0.5rem" }}>
                    <span style={{ color: "#f0b429", fontWeight: 600, fontSize: "0.85rem" }}>AI</span>
                </div>
                <div style={{ color: "#e8e8e8", paddingLeft: "0.5rem", marginTop: "0.25rem" }}>
                    I&apos;ve worked extensively with RAG systems at Motadata. I built an internal MCP/Agno platform that uses RAG with Weaviate and PGVector to enable contextual querying across documentation, tickets, and databases...
                </div>
            </div>
        </>
    );
}

function ComingSoonSection({ title }: { title: string }) {
    return (
        <>
            <h1 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                {title}
            </h1>
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--text-muted)" }}>◈</div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)" }}>
                    Coming Soon
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
                    This section is currently under development. Check back soon for comprehensive documentation on {title.toLowerCase()}.
                </p>
            </div>
        </>
    );
}

function TechCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="glass-card" style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--foreground)" }}>{title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{description}</p>
        </div>
    );
}

function CommandCard({ command, description, aliases }: { command: string; description: string; aliases?: string[] }) {
    return (
        <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ minWidth: "140px" }}>
                <code style={{
                    background: "rgba(21, 200, 96, 0.15)",
                    color: "#15c860",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    fontWeight: 600
                }}>
                    {command}
                </code>
                {aliases && (
                    <div style={{ marginTop: "0.5rem" }}>
                        {aliases.map((alias, i) => (
                            <code key={i} style={{
                                background: "rgba(155, 89, 182, 0.15)",
                                color: "#9b59b6",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontFamily: "monospace",
                                fontSize: "0.75rem",
                                marginRight: "0.25rem"
                            }}>
                                {alias}
                            </code>
                        ))}
                    </div>
                )}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>{description}</p>
        </div>
    );
}

function AIExampleCard({ query }: { query: string }) {
    return (
        <div className="glass-card" style={{ padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <code style={{
                background: "rgba(240, 180, 41, 0.15)",
                color: "#f0b429",
                padding: "4px 10px",
                borderRadius: "6px",
                fontFamily: "monospace",
                fontSize: "0.85rem"
            }}>
                {query}
            </code>
        </div>
    );
}
