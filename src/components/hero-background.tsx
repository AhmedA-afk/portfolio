"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Subscribe function that does nothing (state never changes after mount)
const subscribe = () => () => { };
// Get snapshot returns true on client, false on server
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * A lightweight, CSS-only hero background with animated gradients and floating orbs.
 * Replaces the heavy Three.js HeroOrb for better performance.
 */
export function HeroBackground() {
    const { resolvedTheme } = useTheme();
    // Use useSyncExternalStore for hydration-safe mounted detection
    const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const isDark = mounted && resolvedTheme === 'dark';

    return (
        <div
            className="hero-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {/* Animated gradient mesh background */}
            <div
                className="gradient-mesh"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isDark
                        ? `
                            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
                            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34, 211, 238, 0.15), transparent),
                            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(167, 139, 250, 0.2), transparent),
                            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(52, 211, 153, 0.1), transparent)
                        `
                        : `
                            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.2), transparent),
                            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139, 92, 246, 0.15), transparent),
                            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(16, 185, 129, 0.15), transparent),
                            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37, 99, 235, 0.1), transparent)
                        `,
                }}
            />

            {/* Primary floating orb */}
            <div
                className="floating-orb primary-orb"
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'clamp(280px, 40vw, 500px)',
                    height: 'clamp(280px, 40vw, 500px)',
                    borderRadius: '50%',
                    background: isDark
                        ? `
                            radial-gradient(circle at 30% 30%, 
                                rgba(167, 139, 250, 0.4) 0%, 
                                rgba(34, 211, 238, 0.2) 40%, 
                                rgba(52, 211, 153, 0.1) 70%,
                                transparent 100%
                            )
                        `
                        : `
                            radial-gradient(circle at 30% 30%, 
                                rgba(103, 232, 249, 0.5) 0%, 
                                rgba(139, 92, 246, 0.25) 40%, 
                                rgba(16, 185, 129, 0.15) 70%,
                                transparent 100%
                            )
                        `,
                    filter: 'blur(40px)',
                    animation: 'floatOrb 8s ease-in-out infinite',
                }}
            />

            {/* Secondary accent orb - top right */}
            <div
                className="floating-orb accent-orb-1"
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: 'clamp(120px, 18vw, 220px)',
                    height: 'clamp(120px, 18vw, 220px)',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                    animation: 'floatOrb 6s ease-in-out infinite reverse',
                }}
            />

            {/* Tertiary accent orb - bottom left */}
            <div
                className="floating-orb accent-orb-2"
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    width: 'clamp(100px, 15vw, 180px)',
                    height: 'clamp(100px, 15vw, 180px)',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                    animation: 'floatOrb 7s ease-in-out infinite 1s',
                }}
            />

            {/* Fourth accent orb - bottom right */}
            <div
                className="floating-orb accent-orb-3"
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '20%',
                    width: 'clamp(80px, 12vw, 150px)',
                    height: 'clamp(80px, 12vw, 150px)',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                    animation: 'floatOrb 9s ease-in-out infinite 0.5s',
                }}
            />

            {/* Noise texture overlay for depth */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isDark ? 0.03 : 0.02,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle grid pattern */}
            <div
                style={{
                    position: 'absolute',
                    top: '-1px', // Offset to hide the first grid line
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: isDark
                        ? 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)'
                        : 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
                }}
            />

            <style jsx>{`
                @keyframes floatOrb {
                    0%, 100% {
                        transform: translateX(-50%) translateY(0) scale(1);
                    }
                    33% {
                        transform: translateX(-50%) translateY(-15px) scale(1.02);
                    }
                    66% {
                        transform: translateX(-50%) translateY(10px) scale(0.98);
                    }
                }
                
                .accent-orb-1 {
                    animation: floatAccent1 6s ease-in-out infinite !important;
                }
                
                .accent-orb-2 {
                    animation: floatAccent2 7s ease-in-out infinite !important;
                }
                
                .accent-orb-3 {
                    animation: floatAccent3 8s ease-in-out infinite !important;
                }
                
                @keyframes floatAccent1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-10px, 15px) scale(1.05); }
                }
                
                @keyframes floatAccent2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(15px, -10px) scale(1.03); }
                }
                
                @keyframes floatAccent3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-12px, -15px) scale(1.04); }
                }
            `}</style>
        </div>
    );
}
