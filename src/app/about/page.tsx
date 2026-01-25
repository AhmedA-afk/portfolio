// LinkedIn-style Timeline Item Component
function TimelineItem({
    title,
    subtitle,
    company,
    date,
    description,
    bullets,
    isLast = false,
    type = "work" // "work" or "education"
}: {
    title: string;
    subtitle?: string;
    company: string;
    date: string;
    description?: string;
    bullets?: string[];
    isLast?: boolean;
    type?: "work" | "education";
}) {
    const dotColor = type === "work" ? "#15c860" : "#9b59b6"; // Green for work, Purple for education

    return (
        <div style={{ display: "flex", gap: "20px", position: "relative" }}>
            {/* Timeline Line & Dot */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "6px"
            }}>
                {/* Dot */}
                <div style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: dotColor,
                    border: "3px solid var(--background)",
                    boxShadow: `0 0 0 2px ${dotColor}40, 0 2px 8px ${dotColor}40`,
                    flexShrink: 0,
                    zIndex: 2
                }} />

                {/* Connecting Line */}
                {!isLast && (
                    <div style={{
                        width: "2px",
                        flex: 1,
                        background: `linear-gradient(180deg, ${dotColor}, ${dotColor}40)`,
                        marginTop: "8px",
                        borderRadius: "1px"
                    }} />
                )}
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                paddingBottom: isLast ? "0" : "32px",
            }}>
                {/* Header */}
                <div style={{ marginBottom: "8px" }}>
                    <h3 style={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        marginBottom: "4px",
                        lineHeight: 1.3
                    }}>
                        {title}
                    </h3>
                    {subtitle && (
                        <div style={{
                            fontSize: "0.95rem",
                            color: "var(--text-primary)",
                            fontWeight: 500
                        }}>
                            {subtitle}
                        </div>
                    )}
                    <div style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        marginTop: "2px"
                    }}>
                        {company}
                    </div>
                    <div style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        marginTop: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        <span style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: dotColor,
                            opacity: 0.6
                        }} />
                        {date}
                    </div>
                </div>

                {/* Description */}
                {description && (
                    <p style={{
                        fontSize: "0.95rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        marginTop: "12px"
                    }}>
                        {description}
                    </p>
                )}

                {/* Bullet Points */}
                {bullets && bullets.length > 0 && (
                    <ul style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.8,
                        marginTop: "12px",
                        paddingLeft: "20px"
                    }}>
                        {bullets.map((bullet, index) => (
                            <li key={index} style={{ marginBottom: "6px" }}>{bullet}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function About() {
    return (
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>

            {/* Bio Section */}
            <section style={{ marginBottom: "5rem", textAlign: "center" }}>
                <h1 className="gradient-text animate-fade-in" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "2rem" }}>
                    About Me
                </h1>
                <div className="glass-panel" style={{ padding: "2.5rem", borderRadius: "24px", textAlign: "left", lineHeight: "1.8", fontSize: "1.1rem" }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong>Applied GenAI / AI Systems Engineer</strong> with 1.5+ years of experience building and deploying LLM-powered systems, automation platforms, and internal AI tools in production environments.
                    </p>
                    <p style={{ marginBottom: "1.5rem", color: "var(--text-secondary)" }}>
                        B.Tech in CSE @ CSPIT - CHARUSAT | Diploma in IT @ Lukhdhirji Engineering College - Morbi | Strong focus on <strong>GenAI, RAG systems, multi-agent architectures, and AI enablement</strong> across business functions.
                    </p>
                    <p style={{ color: "var(--text-secondary)" }}>
                        I don&apos;t just build cool demos — I translate real organizational pain points into scalable AI solutions. My work spans LLM platforms, automation workflows, and cross-functional AI transformation initiatives.
                    </p>
                </div>
            </section>

            {/* Experience Section - LinkedIn Timeline Style */}
            <section style={{ marginBottom: "5rem" }}>
                <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
                    Experience
                </h2>
                <div className="glass-panel" style={{ padding: "2rem 2rem 2rem 1.5rem", borderRadius: "20px" }}>
                    <TimelineItem
                        type="work"
                        title="Associate AI/ML Engineer"
                        subtitle="Full-time"
                        company="Motadata (MindArray Systems Pvt. Ltd.) • Ahmedabad, India"
                        date="Jun 2025 - Present"
                        bullets={[
                            "Designed and deployed LLM-powered internal platforms using RAG (Weaviate, PGVector) for Sales, Operations, and QA teams.",
                            "Built an internal MCP-based multi-agent AI platform (on Agno) supporting document Q&A, ticket resolution, and automated test-case generation.",
                            "Developed single-agent, multi-agent, and hierarchical agent systems with orchestration, access control, and logging.",
                            "Built an end-to-end Hardware & BOQ system reducing 2 days of manual work to 2 hours for Sales/Presales teams.",
                            "Implemented WhatsApp ticket automation serving ~200 customers with 10–20 tickets/day using Meta APIs and n8n."
                        ]}
                    />
                    <TimelineItem
                        type="work"
                        title="R&D AI Engineer (Intern → Full-Time)"
                        subtitle="Internship"
                        company="Motadata • Ahmedabad, India"
                        date="Aug 2024 - May 2025"
                        bullets={[
                            "Conducted deep research on Text2SQL systems (schema grounding, query planning, execution strategies).",
                            "Evaluated automation frameworks (n8n, Dify, Zapier-class) for enterprise AI workflow suitability.",
                            "Built multi-agent automated blog generation pipeline publishing 2-3 external blogs/week.",
                            "Led architectural analysis of MoveWorks (closed-source) to inform internal product strategy."
                        ]}
                    />
                    <TimelineItem
                        type="work"
                        title="Data Science Intern (R&D)"
                        subtitle="Internship"
                        company="Trionic Technologies LLP • Remote"
                        date="May 2024 - Jun 2024"
                        description="Worked on LLM localization using Mistral 7b v0.3 Instruct model, hosted via Ollama/LMStudio with Docker containerization for cross-platform deployment."
                    />
                    <TimelineItem
                        type="work"
                        title="Forage Virtual Intern"
                        subtitle="7 Micro-Internships"
                        company="VISA, AWS, Goldman Sachs, Quantium, Deloitte, British Airways, Accenture"
                        date="May 2023 - Jun 2023"
                        description="Completed internships across API Development, Solutions Architecture, Cyber Security, Data Analysis, and Software Development Infrastructure."
                        isLast={true}
                    />
                </div>
            </section>

            {/* AI Transformation Section */}
            <section style={{ marginBottom: "5rem" }}>
                <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
                    AI Transformation & Enablement
                </h2>
                <div className="glass-panel" style={{ padding: "2rem", borderRadius: "20px" }}>
                    <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                        Worked directly under <strong>CEO, COO, AIOps Manager, and ServiceOps Manager</strong> to drive organization-wide AI transformation initiatives.
                    </p>
                    <ul style={{ color: "var(--text-secondary)", lineHeight: 2, fontSize: "0.95rem", paddingLeft: "20px" }}>
                        <li>Conducted 1:1 discovery sessions with 9 departments to identify pain points and automation opportunities</li>
                        <li>Designed and delivered cross-department AI enablement sessions focused on practical, outcome-driven usage</li>
                        <li>Created and distributed AI enablement packages (guides, tools, workflows) for different business functions</li>
                        <li>Established monthly internal AI newsletters highlighting relevant tools, frameworks, and use cases</li>
                        <li>Personally built complex AI systems where requirements exceeded self-serve capabilities</li>
                    </ul>
                </div>
            </section>

            {/* Education Section - LinkedIn Timeline Style */}
            <section style={{ marginBottom: "5rem" }}>
                <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
                    Education
                </h2>
                <div className="glass-panel" style={{ padding: "2rem 2rem 2rem 1.5rem", borderRadius: "20px" }}>
                    <TimelineItem
                        type="education"
                        title="Bachelor of Technology"
                        subtitle="Computer Science & Engineering"
                        company="CSPIT - CHARUSAT"
                        date="2022 - 2025"
                        description="Focused on advanced computing, machine learning, and software engineering fundamentals."
                    />
                    <TimelineItem
                        type="education"
                        title="Diploma of Engineering"
                        subtitle="Information Technology"
                        company="Lukhdhirji Engineering College - Morbi"
                        date="2019 - 2022"
                        description="Foundation in programming, database systems, and web technologies."
                        isLast={true}
                    />
                </div>
            </section>

            {/* Skills Section */}
            <section>
                <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>Tech Stack</h2>
                <div className="glass-panel" style={{ padding: "2rem", borderRadius: "20px" }}>
                    <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#15c860" }} />
                                GenAI / LLMs
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>RAG Systems & Text2SQL</li>
                                <li>Multi-Agent Architectures</li>
                                <li>LangChain / LlamaIndex</li>
                                <li>Prompt Engineering</li>
                                <li>Agent Orchestration</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#9b59b6" }} />
                                ML & Data Science
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>TensorFlow / PyTorch</li>
                                <li>Vector Databases</li>
                                <li>Embeddings & Evaluation</li>
                                <li>Model Development</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d4aa" }} />
                                Automation & Infra
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>n8n / Dify / MCP Frameworks</li>
                                <li>Docker / Kubernetes</li>
                                <li>Weaviate / PGVector</li>
                                <li>PostgreSQL / MongoDB</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f39c12" }} />
                                Languages & Cloud
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>Python / C++</li>
                                <li>JavaScript / TypeScript</li>
                                <li>AWS / GCP / Azure</li>
                                <li>Git / Postman</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
