"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";

function Scene() {
    return (
        <>
            {/* Ambient & Point Lights for potential 3D objects */}
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />

            {/* Falling Gold "Digital Rain" Simulation (Using Sparkles for performance/guaranteed visibility) */}
            <Sparkles
                count={2000}
                scale={[20, 20, 10]}
                size={4}
                speed={2}
                opacity={0.8}
                color="#FFD700"
                position={[0, 0, -2]}
            />
        </>
    );
}

export default function PrizePool() {
    return (
        <section id="prize-pool" className="snap-section bg-black text-white relative h-screen w-full overflow-hidden flex items-center justify-center">

            {/* 3D Canvas Context (Background) */}
            <div className="absolute inset-0 z-0 bg-black">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    {/* Add a transparent/black fog to fade distant particles */}
                    <color attach="background" args={['black']} />
                    <fog attach="fog" args={['black', 5, 20]} />
                    <Scene />
                </Canvas>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none z-10 opacity-60" />

            {/* HTML Content Overlay (Guaranteed Visibility) */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[15vw] leading-none font-black font-antonio text-gold-fresh tracking-tighter drop-shadow-2xl"
                    style={{
                        textShadow: "0 0 40px rgba(255, 215, 0, 0.3)",
                        WebkitTextStroke: "2px black"
                    }}
                >
                    ₹30,000
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-white font-light tracking-[0.5em] text-sm md:text-xl mt-4 uppercase"
                >
                    Total Cash Prize Pool
                </motion.p>
            </div>

        </section>
    );
}
