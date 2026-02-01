"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// GPU capability detection
type PerformanceTier = "high" | "medium" | "low";

function detectPerformanceTier(): PerformanceTier {
    if (typeof window === "undefined") return "medium";



    // 1. Hardware Constraints (Memory & Cores)
    const nav = navigator as Navigator & { deviceMemory?: number };
    const deviceMemory = nav.deviceMemory;
    const cores = navigator.hardwareConcurrency || 4;

    // Strict low-end usage for very weak devices
    if ((deviceMemory && deviceMemory < 4) || cores < 4) {
        return "low";
    }

    // 2. GPU Detection via WebGL
    let renderer = "";
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
            }
        }
    } catch (e) {
        // GPU detection failed
    }

    // 3. GPU Pattern Matching
    if (renderer) {
        // Explicit Low-End Blocklist
        const lowEndPatterns = [
            // Integrated / Legacy
            "intel hd graphics", "intel uhd graphics", "intel(r) hd graphics", "intel(r) uhd graphics",
            "iris graphics", "intel gma",
            // Mobile - Low/Mid
            "mali-4", "mali-t", "mali-g3", "mali-g5", "mali-g6", // G3x, G5x, G6x usually mid/low
            "adreno 3", "adreno 4", "adreno 5", "adreno 61", "adreno 62", "adreno 63", // 610-630 are aging
            "powervr", "vivante", "videocore", "llvmpipe", "swiftshader", "software", "microsoft basic render"
        ];

        if (lowEndPatterns.some(p => renderer.includes(p))) {
            return "low";
        }

        // Explicit High-End Allowlist
        const highEndPatterns = [
            // NVIDIA
            "rtx 5", "rtx 4", "rtx 3", "rtx 2", // RTX 20, 30, 40, 50 series
            "titan", "quadro rtx", "a100", "a6000", "a4000",
            "geforce gtx 107", "geforce gtx 108", "geforce gtx 166", "geforce gtx 980", // High-end GTX
            // AMD
            "radeon rx 8", "radeon rx 7", "radeon rx 6", // RX 6000/7000/8000
            "radeon rx 57", "radeon rx 56", "radeon vii", "radeon vega 64", "radeon vega 56",
            // Intel
            "arc a7", "arc a5", "arc b5", // Intel Arc High/Mid range
            // Apple Silicon (M1/M2/M3/M4 + Pro/Max/Ultra)
            "apple m1 pro", "apple m1 max", "apple m1 ultra",
            "apple m2", "apple m3", "apple m4",
            // Mobile Flagships
            "adreno 8", "adreno 7", "adreno 66", "adreno 65", "adreno 64", // 8xx, 7xx, 660, 650, 640
            "mali-g710", "mali-g715", "mali-g720", "mali-g725", // Immortalis/High-end Mali
            "immortalis", "xclipse 9" // Samsung RDNA
        ];

        // Standard High End Check
        if (highEndPatterns.some(p => renderer.includes(p))) {
            // Even with a good GPU, if screen is massive (4K+) and DPR is high, limit to medium to prevent overheating
            const pixelCount = window.innerWidth * window.innerHeight * (window.devicePixelRatio || 1);
            if (pixelCount > 4000000 && isMobileDevice()) {
                return "medium";
            }
            return "high";
        }

        // Broad "Apple" check - usually decent, but M1 basic might struggle with extreme settings on high DPR
        if (renderer.includes("apple") && !renderer.includes("gpu")) {
            // Likely M-series or strong A-series
            return "high";
        }

        // Integrated but decent (Iris Xe, etc.) -> Medium
        if (renderer.includes("iris") || renderer.includes("amd radeon graphics")) {
            return "medium";
        }
    }

    // 4. Fallback Heuristics checks
    const isMobile = isMobileDevice();
    const dpr = window.devicePixelRatio || 1;

    // High DPR mobile devices without specific GPU match -> Medium or Low
    if (isMobile) {
        if (dpr > 2.5) return "medium"; // High pixel density needs scaling
        if (deviceMemory && deviceMemory >= 6) return "medium";
        return "medium"; // Default mobile to medium (safer than high)
    }

    // Desktop default
    return "medium";
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// High quality orb with MeshTransmissionMaterial
function HighQualityBlob({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || reduceMotion) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.15;
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float
            speed={reduceMotion ? 0 : 1.5}
            rotationIntensity={reduceMotion ? 0 : 1}
            floatIntensity={reduceMotion ? 0 : 1.5}
        >
            <mesh ref={meshRef} scale={2.2}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshTransmissionMaterial
                    backside
                    samples={6}
                    thickness={0.4}
                    roughness={0.02}
                    anisotropy={0.2}
                    chromaticAberration={0.06}
                    anisotropicBlur={0.1}
                    distortion={0.5}
                    distortionScale={0.35}
                    temporalDistortion={0.1}
                    iridescence={0.9}
                    iridescenceIOR={1.2}
                    iridescenceThicknessRange={[0, 1400]}
                    resolution={768}
                    color={isDark ? "#a78bfa" : "#67e8f9"}
                    background={new THREE.Color(isDark ? "#020617" : "#f0f9ff")}
                />
            </mesh>
        </Float>
    );
}

// Medium quality orb - reduced transmission settings
function MediumQualityBlob({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || reduceMotion) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.15;
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float
            speed={reduceMotion ? 0 : 1.5}
            rotationIntensity={reduceMotion ? 0 : 0.8}
            floatIntensity={reduceMotion ? 0 : 1}
        >
            <mesh ref={meshRef} scale={2.2}>
                <sphereGeometry args={[1, 48, 48]} />
                <MeshTransmissionMaterial
                    backside
                    samples={3}
                    thickness={0.3}
                    roughness={0.05}
                    chromaticAberration={0.03}
                    distortion={0.3}
                    distortionScale={0.2}
                    temporalDistortion={0.05}
                    iridescence={0.7}
                    iridescenceIOR={1.1}
                    iridescenceThicknessRange={[0, 1000]}
                    resolution={256}
                    color={isDark ? "#a78bfa" : "#67e8f9"}
                    background={new THREE.Color(isDark ? "#020617" : "#f0f9ff")}
                />
            </mesh>
        </Float>
    );
}

// Low quality orb - uses basic MeshStandardMaterial (no transmission/refraction overhead)
function LowQualityBlob({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || reduceMotion) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Float
            speed={reduceMotion ? 0 : 1}
            rotationIntensity={reduceMotion ? 0 : 0.5}
            floatIntensity={reduceMotion ? 0 : 0.8}
        >
            <mesh ref={meshRef} scale={2.2}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={isDark ? "#a78bfa" : "#67e8f9"}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.6}
                    envMapIntensity={1.5}
                />
            </mesh>
        </Float>
    );
}

// Adaptive blob that switches based on performance
function AdaptiveBlob({ tier, isDark, reduceMotion }: { tier: PerformanceTier; isDark: boolean; reduceMotion: boolean }) {
    switch (tier) {
        case "high":
            return <HighQualityBlob isDark={isDark} reduceMotion={reduceMotion} />;
        case "medium":
            return <MediumQualityBlob isDark={isDark} reduceMotion={reduceMotion} />;
        case "low":
            return <LowQualityBlob isDark={isDark} reduceMotion={reduceMotion} />;
    }
}

// FPS monitor to dynamically degrade quality if needed
function PerformanceMonitor({ onLowFPS }: { onLowFPS: () => void }) {
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const lowFPSCount = useRef(0);
    const hasTriggered = useRef(false);

    useFrame(() => {
        if (hasTriggered.current) return;

        frameCount.current++;
        const now = performance.now();
        const delta = now - lastTime.current;

        // Check every second
        if (delta >= 1000) {
            const fps = (frameCount.current * 1000) / delta;
            frameCount.current = 0;
            lastTime.current = now;

            // If FPS is consistently below 20, trigger degradation
            if (fps < 20) {
                lowFPSCount.current++;
                if (lowFPSCount.current >= 2) {
                    hasTriggered.current = true;
                    onLowFPS();
                }
            } else {
                lowFPSCount.current = 0;
            }
        }
    });

    return null;
}

// Fallback component while loading
function LoadingFallback() {
    return (
        <mesh scale={2.2}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#22d3ee" transparent opacity={0.3} />
        </mesh>
    );
}

export function HeroOrb() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [performanceTier, setPerformanceTier] = useState<PerformanceTier>("medium");
    const [forcedDegradation, setForcedDegradation] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mediaQuery.matches);

        // Detect performance tier on mount
        const tier = detectPerformanceTier();
        setPerformanceTier(tier);
        console.log(`[HeroOrb] Detected performance tier: ${tier}`);
    }, []);

    // Handle WebGL context loss
    useEffect(() => {
        const handleContextLost = () => {
            console.warn("WebGL context lost, switching to low quality...");
            setHasError(true);
            setPerformanceTier("low");
            setTimeout(() => setHasError(false), 1000);
        };

        window.addEventListener("webglcontextlost", handleContextLost);
        return () => window.removeEventListener("webglcontextlost", handleContextLost);
    }, []);

    // Handle runtime FPS degradation
    const handleLowFPS = () => {
        console.warn("[HeroOrb] Low FPS detected, degrading quality...");
        setForcedDegradation(true);
        setPerformanceTier((prev) => {
            if (prev === "high") return "medium";
            return "low";
        });
    };

    if (!mounted || hasError) {
        // Return placeholder with same dimensions to prevent CLS
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
            }} />
        );
    }

    const currentTheme = resolvedTheme || theme;
    const isDark = currentTheme === 'dark';

    // Get GL config based on tier
    const dpr: [number, number] = performanceTier === "high" ? [1, 2] : performanceTier === "medium" ? [1, 1.5] : [1, 1];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 35 }}
                dpr={dpr}
                gl={{
                    alpha: true,
                    antialias: performanceTier !== "low",
                    stencil: performanceTier === "high",
                    depth: true,
                    powerPreference: performanceTier === "low" ? "low-power" : "high-performance",
                    failIfMajorPerformanceCaveat: false
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                    if (performanceTier !== "low") {
                        gl.toneMapping = THREE.ACESFilmicToneMapping;
                        gl.toneMappingExposure = 1.2;
                    }
                }}
            >
                {/* FPS monitor for runtime quality adjustment */}
                {!forcedDegradation && performanceTier !== "low" && (
                    <PerformanceMonitor onLowFPS={handleLowFPS} />
                )}

                <Suspense fallback={<LoadingFallback />}>
                    <Environment preset={isDark ? "night" : "city"}>
                        <Lightformer intensity={3} color="#22d3ee" rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                        <Lightformer intensity={1.5} color="#8b5cf6" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                        <Lightformer intensity={1.5} color="#34d399" rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                        <Lightformer intensity={4} color="#fff" position={[0, 0, -10]} scale={[10, 10, 1]} />
                    </Environment>

                    <AdaptiveBlob tier={performanceTier} isDark={isDark} reduceMotion={reduceMotion} />
                </Suspense>

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1.5} color="#22d3ee" />
            </Canvas>
        </div>
    );
}
