"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Lightformer } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function LiquidBlob() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Subtle rotation
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.25;
    });

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} scale={2.5}>
                <icosahedronGeometry args={[1, 15]} />
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    thickness={0.5}
                    roughness={0}
                    anisotropy={0.3}
                    chromaticAberration={0.1}
                    anisotropicBlur={0.2}
                    distortion={0.8}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    resolution={1024}
                    color={isDark ? "#a78bfa" : "#67e8f9"}
                    background={new THREE.Color(isDark ? "#020617" : "#f0f9ff")}
                />
            </mesh>
        </Float>
    );
}

export function HeroOrb() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none' // Allow clicking through
        }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
                <color attach="background" args={['transparent']} />

                <Environment preset={isDark ? "night" : "city"}>
                    {/* Neon Lights for that Cyberpunk Liquid feel */}
                    <Lightformer intensity={4} color="#22d3ee" rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={2} color="#8b5cf6" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                    <Lightformer intensity={2} color="#34d399" rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                    <Lightformer intensity={5} color="#fff" position={[0, 0, -10]} scale={[10, 10, 1]} />
                </Environment>

                <LiquidBlob />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#22d3ee" />
            </Canvas>
        </div>
    );
}
