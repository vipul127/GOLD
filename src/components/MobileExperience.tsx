"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import VideoText from "./ui/VideoText";

export default function MobileExperience() {
    return (
        <div className="min-h-screen w-full bg-offwhite text-black flex flex-col items-center justify-between p-8 overflow-hidden relative">
            {/* Top branding */}
            <div className="w-full flex flex-col items-center gap-4 mt-8 z-10">
                <span className="text-[8px] font-bold tracking-[0.8em] uppercase text-gold-dark/40">RAIT ACM PRESENTS</span>
                <div className="h-[1px] w-16 bg-gold-dark/20" />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 z-10 max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <VideoText
                        text="GOLD"
                        videoSrc="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov"
                        className="text-[20vw] h-[20vw]"
                    />

                    <h2 className="text-2xl font-black text-center uppercase tracking-tight">
                        A place where ideas meet
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 text-center"
                >
                    <p className="text-base text-black/60 leading-relaxed">
                        A collaborative ecosystem of ACM chapters across India, bringing together the brightest minds to innovate, collaborate, and shape the future of technology.
                    </p>

                    <div className="bg-black/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-gold-dark">Event Details</h3>
                        <div className="space-y-2 text-sm text-black/80">
                            <p><strong>When:</strong> Coming Soon</p>
                            <p><strong>Where:</strong> Mumbai, India</p>
                            <p><strong>Who:</strong> ACM Chapters Nationwide</p>
                        </div>
                    </div>

                    <div className="bg-gold-fresh/10 border-2 border-gold-fresh/20 rounded-2xl p-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-gold-dark/60 mb-2">Desktop Experience</p>
                        <p className="text-sm text-black/70">
                            For the full immersive experience with 3D animations and interactive elements, please visit from a desktop browser with a screen resolution of at least <strong>1280×720</strong>.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full flex flex-col items-center gap-6 z-10 mb-8"
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-black text-gold-fresh uppercase tracking-[0.4em]">Contact</p>
                    <a href="mailto:hello@acmgold.in" className="text-lg font-bold text-black">
                        hello@acmgold.in
                    </a>
                </div>

                <div className="flex gap-6">
                    <Linkedin className="w-6 h-6 text-black/40" />
                    <Instagram className="w-6 h-6 text-black/40" />
                    <Twitter className="w-6 h-6 text-black/40" />
                    <Mail className="w-6 h-6 text-black/40" />
                </div>

                <p className="text-[8px] font-black tracking-[0.4em] uppercase text-black/20 mt-4">
                    © 2026 RAIT ACM
                </p>
            </motion.div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold-fresh/5 via-transparent to-gold-fresh/10 pointer-events-none" />
        </div>
    );
}
