"use client";

import { motion } from "framer-motion";

export default function AboutEvent() {
  return (
    <section id="event" className="snap-section bg-black text-white">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gold-light font-cursive text-4xl mb-4 italic">The Experience</h2>
          <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase gold-text-3d">GOLD 2026</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            { title: "Meet", desc: "Connect with members from ACM chapters across India." },
            { title: "Collaborate", desc: "Share ideas and build high-impact projects together." },
            { title: "Activities", desc: "Engage in curated activities that inspire growth." }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-white/10 hover:border-gold-dark transition-colors flex flex-col items-center text-center"
            >
              <h4 className="text-3xl font-bold mb-4 uppercase tracking-tight">{item.title}</h4>
              <p className="text-white/60 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
