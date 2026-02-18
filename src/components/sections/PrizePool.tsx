"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, MeshTransmissionMaterial, ContactShadows, useEnvironment, useAnimations } from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody, CuboidCollider } from "@react-three/rapier";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

// --- CONFIGURATION ---
const PIGGY_BANK_SCALE: [number, number, number] = [0.18, 0.18, 0.18];
const PIGGY_BANK_POSITION: [number, number, number] = [0, 3, 0];
const CAMERA_POSITION: [number, number, number] = [24, -4, 24]; // Zoomed In

// --- CAMERA RIG COMPONENT ---
function CameraRig() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(...CAMERA_POSITION);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return null;
}

// --- PIGGY BANK COMPONENT (Visual - Animation) ---
function PiggyBank() {
    const { scene } = useGLTF("/piggy/glass.glb");
    const groupRef = useRef<THREE.Group>(null);
    const time = useRef(0);

    // Find the main mesh for geometry reuse if complex mesh logic is needed, 
    // but applying material to primitive works too if scene structure is simple.
    // Actually, sticking to the mesh extraction logic ensures we target the right geometry.
    const pigMesh = useMemo<THREE.Mesh | null>(() => {
        let mesh: THREE.Mesh | null = null;
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && !mesh) mesh = child as THREE.Mesh;
        });
        return mesh;
    }, [scene]);

    // Animate Entrance (No Physics Engine Needed)
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        time.current += delta;

        const targetY = PIGGY_BANK_POSITION[1]; // 2.5
        const startY = 10;
        let currentY = targetY;

        // Entrance: Drop from 10 to 2.5 over 2.5 seconds
        if (time.current < 2.5) {
            const t = Math.min(time.current / 2.5, 1);
            const ease = 1 - Math.pow(1 - t, 3); // Cubic ease out
            currentY = startY - (startY - targetY) * ease;
        } else {
            currentY = targetY;
        }

        groupRef.current.position.set(PIGGY_BANK_POSITION[0], currentY, PIGGY_BANK_POSITION[2]);
    });

    if (!pigMesh) return null;

    return (
        <group ref={groupRef} position={[0, 10, 0]}>
            <mesh
                geometry={pigMesh.geometry}
                scale={PIGGY_BANK_SCALE}
                rotation={pigMesh.rotation}
                position={pigMesh.position}
            >
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={0.9}
                    thickness={0.2}
                    chromaticAberration={0}
                    anisotropy={0}
                    distortion={0}
                    distortionScale={0}
                    temporalDistortion={0.0}
                    iridescence={0}
                    iridescenceIOR={0.5}
                    iridescenceThicknessRange={[0, 0]}
                    clearcoat={0}
                    attenuationDistance={0.5}
                    attenuationColor="#FFC000"
                    color="#FFD700"
                    roughness={0}
                    ior={1.4}
                    transmission={1}
                    resolution={640}
                    samples={2}
                    envMapIntensity={0}
                />
            </mesh>
        </group>
    );
}

// --- BAKED SCENE (PIG + BARS) ---
function BakedScene() {
    // Load the manually baked file (contains Pig + 151 Bars)
    const { nodes, animations } = useGLTF("/piggy/bake1.glb");
    const group = useRef<THREE.Group>(null);
    const { actions } = useAnimations(animations, group);

    // Play Animations
    useEffect(() => {
        // PLAY IMMEDIATELY (0.5s delay)
        const timer = setTimeout(() => {
            Object.values(actions).forEach((action) => {
                if (action) {
                    action.reset().play();
                    action.setLoop(THREE.LoopOnce, 1);
                    action.clampWhenFinished = true;
                }
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [actions]);

    // Use gold material for bars
    const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#FFD700",
        metalness: 1,
        roughness: 0.1,
        envMapIntensity: 2,
        emissive: "#FFD700",
        emissiveIntensity: 0.2
    }), []);

    return (
        <group ref={group} dispose={null}>
            {Object.values(nodes).map((node: any) => {
                if (!node.isMesh) return null;

                // Identify parts by name
                const isPig = node.name.toLowerCase().includes("pig") || node.name.toLowerCase().includes("cylinder");
                const isFunnel = node.name.toLowerCase().includes("funnel");

                if (isFunnel) return null; // Hide funnel

                if (isPig) {
                    // Render Pig with High Quality Glass Material
                    return (
                        <mesh
                            key={node.uuid}
                            name={node.name}
                            geometry={node.geometry}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                            castShadow
                            receiveShadow
                        >
                            <MeshTransmissionMaterial
                                backside
                                backsideThickness={0}
                                thickness={0.005}
                                chromaticAberration={0.02}
                                anisotropy={0}
                                distortion={0}
                                distortionScale={0}
                                temporalDistortion={0.0}
                                iridescence={0}
                                iridescenceIOR={1}
                                iridescenceThicknessRange={[0, 0]}
                                clearcoat={0}
                                attenuationDistance={0.5}
                                attenuationColor="#ead628ff"
                                color="#eccf27ff"
                                roughness={0.05}
                                ior={1.2}
                                transmission={1}
                                resolution={512}
                                samples={4}
                                envMapIntensity={2}
                            />
                        </mesh>
                    );
                }

                // Render Gold Bars
                return (
                    <mesh
                        key={node.uuid}
                        name={node.name}
                        geometry={node.geometry}
                        material={goldMaterial}
                        position={node.position}
                        rotation={node.rotation}
                        scale={node.scale}
                        castShadow
                        receiveShadow
                    />
                );
            })}
        </group>
    );
}

// --- SCENE COMPONENT ---
function Scene({ isInView }: { isInView: boolean }) {
    return (
        <>
            <CameraRig />
            <Environment files="/ferndale_studio_01_4k.exr" />

            {/* Lights */}
            <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
            <pointLight position={[-10, 10, -10]} intensity={1.5} color="#FFD700" />

            {/* Top Down Spotlights */}
            <spotLight position={[0, 40, 0]} angle={0.3} penumbra={1} intensity={60} color="#FFD700" castShadow distance={100} decay={2} />
            <spotLight position={[5, 40, 5]} angle={0.4} penumbra={0.5} intensity={30} color="#FFD700" distance={100} decay={2} />
            <spotLight position={[-5, 40, -5]} angle={0.4} penumbra={0.5} intensity={30} color="#FFD700" distance={100} decay={2} />

            {/* NEW: Dedicated Pig Highlight (Top Rim) */}
            <spotLight
                position={[0, 10, 0]}
                angle={0.4}
                penumbra={0.5}
                intensity={100}
                color="#FFFFFF"
                distance={30}
                decay={2}
            />

            {/* NEW: Back Rim Light (Silhouette) */}
            <spotLight
                position={[0, 5, -10]}
                angle={0.6}
                penumbra={1}
                intensity={80}
                color="#404040"
                distance={30}
                decay={2}
            />

            {/* Interior Light */}
            <pointLight
                position={[PIGGY_BANK_POSITION[0], PIGGY_BANK_POSITION[1] + 2, PIGGY_BANK_POSITION[2]]}
                intensity={20}
                distance={15}
                decay={2}
                color="#FFD700"
            />

            {/* Bottom Uplights */}
            <pointLight position={[-5, 0, 5]} intensity={5} distance={10} decay={2} color="#FFD700" />
            <pointLight position={[5, 0, 5]} intensity={5} distance={10} decay={2} color="#FFD700" />
            <pointLight position={[0, 0, -5]} intensity={5} distance={10} decay={2} color="#FFD700" />

            {/* RENDER LOGIC:
                Everything is now in BakedScene (Pig + Bars)
            */}
            {isInView && <BakedScene />}

            <ContactShadows position={[0, -10, 0]} opacity={0.4} scale={40} blur={2.5} far={10} />
        </>
    );
}

// Preload assets
useGLTF.preload("/piggy/glass.glb");
useGLTF.preload("/piggy/bake1.glb");

export default function PrizePool() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.1, once: true });

    return (
        <section
            id="prize-pool"
            ref={sectionRef}
            className="snap-section bg-black text-white relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
            <div className="absolute inset-0 z-0">
                {isInView && (
                    <Canvas shadows camera={{ position: CAMERA_POSITION, fov: 20 }} dpr={[1, 1.5]}>
                        <Scene isInView={isInView} />
                        <color attach="background" args={['#050505']} />
                        <fog attach="fog" args={['#050505', 100, 400]} />
                    </Canvas>
                )}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none z-10 opacity-30" />
            <div className="absolute bottom-10 left-5 text-left z-20 pointer-events-none">
                <div className="text-white/80 text-2xl tracking-widest uppercase font-light">
                    Total Cash Prize Pool
                </div>
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[12vw] leading-none font-black font-antonio text-gold-fresh tracking-tighter drop-shadow-2xl"
                    style={{
                        textShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
                    }}
                >
                    Rs 30,000
                </motion.h2>
            </div>
        </section>
    );
}
