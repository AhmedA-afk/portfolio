import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Projects | Ahmed Ansari'
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
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
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

                {/* Main Text */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <div style={{
                        fontSize: 48,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                        fontWeight: 600,
                        marginBottom: 20,
                    }}>
                        Ahmed Ansari
                    </div>
                    <div style={{
                        backgroundImage: 'linear-gradient(90deg, #15c860, #f39c12)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 800,
                        fontSize: 120,
                        lineHeight: 1,
                    }}>
                        Selected
                    </div>
                    <div style={{
                        backgroundImage: 'linear-gradient(90deg, #15c860, #f39c12)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 800,
                        fontSize: 120,
                        lineHeight: 1,
                    }}>
                        Projects
                    </div>
                </div>
            </div>
        ),
        { ...size }
    )
}
