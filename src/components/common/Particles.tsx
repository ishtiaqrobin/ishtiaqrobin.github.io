"use client";

import React, { useRef } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Three.js fluid 3D blob
export const FluidBlob = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh ref={meshRef} scale={2}>
                <icosahedronGeometry args={[1, 64]} />
                <MeshDistortMaterial
                    color="#6366f1"
                    emissive="#4f46e5"
                    emissiveIntensity={0.5}
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

// 3D Particles for background ambiance
export const SceneBackground = () => {
    const { size } = useThree();
    const isMobile = size.width < 768;

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight
                position={[-10, -10, -5]}
                intensity={0.5}
                color="#a855f7"
            />
            <Stars
                radius={100}
                depth={50}
                count={3000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <group
                position={isMobile ? [0, -1, -10] : [3.3, 0.1, -5]}
                scale={isMobile ? 0.8 : 1.15}
            >
                <FluidBlob />
            </group>
        </>
    );
};