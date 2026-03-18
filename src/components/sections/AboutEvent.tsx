"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const events = [
  {
    id: "speaker",
    num: "01",
    title: "Speaker Session",
    panel: {
      tagline: "INSIGHT. 30 MINUTES. UNFILTERED.",
      body: "Industry leaders from ACM chapters across India take the stage — 30 minutes of hard-won knowledge on tech, leadership, and building things that last.",
    },
    image: "https://res.cloudinary.com/dft3midee/image/upload/v1771494729/speaker_zayl8t.png"
  },
  {
    id: "reverse",
    num: "02",
    title: "Reverse Coding",
    panel: {
      tagline: "A SCREENSHOT. NO SOURCE. JUST CODE.",
      body: "You see a finished website. No HTML. No CSS. No hints. Rebuild it pixel by pixel from what you can see. The closest reconstruction wins.",
    },
    image: "https://res.cloudinary.com/dft3midee/image/upload/v1771494729/rev_zvwziz.png"
  },
];


export default function AboutEvent() {
  return (
    <section id="about-event"
      className="snap-section bg-black text-white relative overflow-hidden h-screen flex flex-col"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70 z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov" type="video/mp4" />
        </video>
      </div>

      {/* Subtle ghost watermark — contained, bottom-right */}
      <div className="absolute bottom-0 right-0 z-0 select-none pointer-events-none overflow-hidden w-[35vw] h-[35vw]">
        <span className="absolute bottom-[-10%] right-[-5%] text-[18vw] font-black font-antonio leading-none text-white/[0.03]">
          GOLD
        </span>
      </div>

      {/* ── TOP BAR ─────────────────────────────────── */}
      <div className="relative z-20 w-full flex items-start justify-between px-5 -mt-10 md:px-10">

        {/* Far Left: ABOUT GOLD + subtitle */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start"
        >
          <h2 className="text-[6vw] font-black font-antonio py-1.5 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold-medium to-gold-fresh">
            ABOUT GOLD
          </h2>
          <p className="text-[13px] font-medium tracking-[0.4em] text-white/40 mt-1.5 mb-10 uppercase">
            A convergence of outstanding leaders
          </p>
        </motion.div>

        {/* Far Right: Cryptic paragraph */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[13px] leading-relaxed text-white/25 max-w-[220px] text-right font-light italic self-start"
        >
          "Not every room is entered through its door. Some are entered through the work you leave behind."
        </motion.p>

      </div>

      {/* ── EVENT COLUMNS ─────────────────────────────── */}
      <div className="relative z-20 h-[70vh] flex flex-row border-t border-white/10">

        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`group relative flex-1 flex flex-col justify-between p-10 md:p-14 overflow-hidden cursor-default hover:bg-white/[0.02] transition-colors duration-500 ${i === 0 ? "border-r border-white/10" : ""}`}
          >
            {/* Large ghost number — top of column */}
            <span className="text-[18vw] font-black font-antonio text-white/[0.04] leading-none select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-500 absolute -top-4 -left-2">
              {ev.num}
            </span>

            {/* Top — small index label */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-[10px] font-bold font-antonio tracking-[0.5em] text-white/20 uppercase">
                {ev.num}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>



            {/* Bottom — title + tagline */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-center">
                <Image
                  src={ev.image}
                  alt={ev.title}
                  width={300}
                  height={300}
                  className="w-[20vw] h-auto object-contain"
                />
              </div>
              <p className="text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">
                {ev.panel.tagline}
              </p>
              <h3 className="text-[4.5vw] font-black font-antonio uppercase tracking-tighter text-white leading-[0.9] whitespace-nowrap group-hover:opacity-70 transition-opacity duration-300">
                {ev.title}
              </h3>
              <p className="text-sm font-light text-white/35 leading-relaxed max-w-sm group-hover:text-white/55 transition-colors duration-300">
                {ev.panel.body}
              </p>
            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
}
