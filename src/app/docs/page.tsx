export default function Documentation() {
    return (
        <div style={{ display: "flex", minHeight: "80vh" }}>
            {/* Sidebar */}
            <aside className="glass-panel" style={{
                width: "250px",
                borderRight: "1px solid var(--glass-border)",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                position: "fixed",
                height: "calc(100vh - 80px)",
                borderRadius: 0,
                borderTop: 0,
                borderBottom: 0,
                borderLeft: 0,
                background: "var(--glass-bg)"
            }}>
                <div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Getting Started</h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                        <li style={{ color: "var(--foreground)", fontWeight: 500, cursor: "pointer" }}>Introduction</li>
                        <li style={{ cursor: "pointer" }}>Installation</li>
                        <li style={{ cursor: "pointer" }}>Configuration</li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>API Reference</h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                        <li style={{ cursor: "pointer" }}>Authentication</li>
                        <li style={{ cursor: "pointer" }}>Endpoints</li>
                        <li style={{ cursor: "pointer" }}>Rate Limits</li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ marginLeft: "250px", padding: "3rem", width: "100%", maxWidth: "900px" }}>
                <h1 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Introduction</h1>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                    Welcome to the documentation for my open-source tools and libraries. Here you will find comprehensive guides and API references to help you integrate these solutions into your own projects.
                </p>

                <div className="glass-card" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Quick Start</h2>
                    <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>Install the core package using npm:</p>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        npm install @ahmedansari/core
                    </div>
                </div>

                <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1.5rem" }}>Philosophy</h2>
                <p style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
                    Our tools are built with a "Privacy First" approach, ensuring that local inference helps maintain data sovereignty while delivering state-of-the-art performance.
                </p>
            </div>
        </div>
    );
}
