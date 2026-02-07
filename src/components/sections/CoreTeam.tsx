"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  { name: "Aryan Shah", role: "Chairperson", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Isha Patel", role: "Vice-Chairperson", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "Rahul Verma", role: "Technical Head", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { name: "Sneha Rao", role: "Creative Head", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
];

export default function CoreTeam() {
  return (
    <section id="meeting" className="snap-section bg-black text-white">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gold-light font-cursive text-4xl mb-4 italic">The Visionaries</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2">You will be</h3>
          <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase gold-text-3d">MEETING</h3>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden bg-white/5"
            >
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-gold-medium font-bold text-lg md:text-xl leading-none mb-1">{member.name}</p>
                <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
