"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="snap-section bg-black text-white">
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1769528478254.png"
          alt="Gold Event Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-gold-light font-medium tracking-[0.3em] uppercase text-sm mb-4">
            RAIT ACM Presents
          </h2>
          <h1 className="text-[15vw] md:text-[12vw] font-bold leading-none gold-text-3d mb-8 tracking-tighter">
            GOLD
          </h1>
          <p className="max-w-2xl text-offwhite/60 text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Where India's brightest ACM chapters meet, collaborate, and define the future of technology.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-24 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gold-dark/50" />
        </motion.div>
      </div>
    </section>
  );
}
