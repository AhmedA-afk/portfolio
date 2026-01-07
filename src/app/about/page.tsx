// LinkedIn-style Timeline Item Component
function TimelineItem({
    title,
    subtitle,
    company,
    date,
    description,
    isLast = false,
    type = "work" // "work" or "education"
}: {
    title: string;
    subtitle?: string;
    company: string;
    date: string;
    description?: string;
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
                        B.Tech in CSE @ CSPIT - CHARUSAT | Diploma in IT @ Lukhdhirji Engineering College - Morbi | Preferred Languages - Python/C++ | Current Area of Focus : Machine Learning Model Development and Generative AI.
                    </p>
                    <p style={{ color: "var(--text-secondary)" }}>
                        I am a passionate AI/ML Engineer with a strong foundation in computer science and a deep interest in the latest advancements in artificial intelligence. My professional journey has been driven by a curiosity to solve complex problems through data-driven insights and innovative algorithms.
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
                        description="Focusing on next-generation AI-enabled products and enterprise solutions. Building intelligent systems for IT operations and service management."
                    />
                    <TimelineItem
                        type="work"
                        title="AI/ML Engineer Intern (R&D)"
                        subtitle="Internship"
                        company="Motadata • Ahmedabad, India"
                        date="Aug 2024 - May 2025"
                        description="Working as an AI-ML Engineer in R&D team of PMG Department. Focused on developing leading LLM Platform for interacting with DB and generating relevant answers in sub-seconds within the call initiation. The task involves in making the Motadata ServiceOps ITSM Portal AI enabled where clients can interact with the product through LLM based ChatBot."
                    />
                    <TimelineItem
                        type="work"
                        title="Data Science Intern (R&D)"
                        subtitle="Internship"
                        company="Trionic Technologies LLP • Remote"
                        date="May 2024 - Jun 2024"
                        description="Worked on localization of LLM model and repurpose it for specific use-case of question generation. Used HuggingFace model space to explore models and pretrained using Mistral 7b v0.3 Instruct model and hosted it GGUF counterpart using Ollama and LMStudio."
                    />
                    <TimelineItem
                        type="work"
                        title="Forage Virtual Intern"
                        subtitle="Virtual Experience"
                        company="Forage • Remote"
                        date="May 2023 - Jun 2023"
                        description="Completed 7 micro-internships on Forage from different companies and domains including VISA, AWS, Goldman Sachs, Quantium, Deloitte, British Airways and Accenture."
                        isLast={true}
                    />
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
                    <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#15c860" }} />
                                Languages
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>Python</li>
                                <li>C++</li>
                                <li>JavaScript / TypeScript</li>
                                <li>HTML5 / CSS3</li>
                                <li>Shell Script</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#9b59b6" }} />
                                ML & Data Science
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>TensorFlow / PyTorch</li>
                                <li>Keras / Scikit-learn</li>
                                <li>Pandas / NumPy</li>
                                <li>Matplotlib / SciPy</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d4aa" }} />
                                Tools & Cloud
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>Docker / Kubernetes</li>
                                <li>AWS / Google Cloud / Azure</li>
                                <li>Git / Postman</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f39c12" }} />
                                Frameworks
                            </h3>
                            <ul style={{ color: "var(--text-secondary)", lineHeight: "2", listStyle: "none", fontSize: "0.95rem" }}>
                                <li>React / Next.js</li>
                                <li>Node.js / Django / Flask</li>
                                <li>PostgreSQL / MongoDB</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
