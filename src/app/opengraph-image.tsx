import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Ahmed Ansari - AI/ML Engineer'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: '#020617',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Element */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ffffff 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                />

                {/* Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <div style={{
                        backgroundImage: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 800,
                        marginBottom: 40,
                    }}>
                        Ahmed Ansari
                    </div>
                    <div style={{
                        fontSize: 48,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                        fontWeight: 600,
                    }}>
                        AI/ML Engineer
                    </div>
                    <div style={{
                        display: 'flex',
                        marginTop: 40,
                        gap: 20,
                    }}>
                        <div style={{ padding: '10px 30px', background: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', borderRadius: 20, fontSize: 32 }}>GenAI</div>
                        <div style={{ padding: '10px 30px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', borderRadius: 20, fontSize: 32 }}>Agents</div>
                        <div style={{ padding: '10px 30px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: 20, fontSize: 32 }}>LLMs</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
