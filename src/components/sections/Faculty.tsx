"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Faculty() {
  return (
    <section id="faculty" className="snap-section bg-offwhite text-black">
      <div className="container mx-auto px-6 h-full relative overflow-hidden flex flex-col justify-start pt-32">
        <div className="relative z-20 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[10vw] font-bold leading-none tracking-tighter uppercase mb-4"
          >
            DR. LEENA <br />
            <span className="text-gold-medium">VOHRA</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col gap-2"
          >
            <p className="font-cursive text-3xl text-gold-dark italic">Faculty Sponsor</p>
            <p className="max-w-md text-black/60 text-lg leading-relaxed">
              Guiding the next generation of technical leaders with wisdom and vision.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute bottom-0 right-0 w-[60%] h-[80%] z-10"
        >
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
            alt="Faculty Member"
            fill
            className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
