"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section id="about" className="snap-section bg-offwhite text-black">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-gold-medium font-cursive text-4xl mb-6 italic">Our Legacy</h2>
          <h3 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase">
            RAIT <span className="text-gold-dark">ACM</span>
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <p className="text-xl leading-relaxed font-light">
            As one of the most prominent ACM chapters in India, RAIT ACM is dedicated to fostering a community of technical excellence and innovation.
          </p>
          <p className="text-lg text-black/60 leading-relaxed">
            Our mission is to empower students through collaboration, knowledge sharing, and high-impact events that bridge the gap between academia and industry.
          </p>
          <div className="w-24 h-px bg-gold-medium mt-4" />
        </motion.div>
      </div>
    </section>
  );
}
