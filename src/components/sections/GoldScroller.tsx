"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface GoldScrollerProps {
  isBackground?: boolean;
  id?: string;
}

export default function GoldScroller({ isBackground = false, id }: GoldScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const scroller = document.querySelector(".snap-container");
    if (!scroller) return;

    const lanes = containerRef.current.querySelectorAll(".gold-lane");

    lanes.forEach((lane, i) => {
      // Different speeds for each lane (0.2 to 1.2)
      const speed = 1.2 + (i * 1.2);
      const direction = i % 2 === 0 ? 1 : -1;

      gsap.to(lane, {
        y: 300 * speed * direction,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: isBackground ? "top top" : "top bottom",
          end: isBackground ? "bottom top" : "bottom top",
          scrub: 1.5,
          scroller: scroller,
        }
      });
    });
  }, { scope: containerRef, dependencies: [isBackground] });


  return (
    <section
      id={id}
      className={`${isBackground ? "absolute inset-0 z-0 opacity-20" : "snap-section bg-offwhite min-h-screen flex items-center justify-center"} overflow-hidden relative`}
    >
      <div
        ref={containerRef}
        className={`flex justify-between w-full h-[140vh] px-10 items-center opacity-10 pointer-events-none ${isBackground ? "scale-110" : ""}`}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="gold-lane flex flex-col items-center justify-center space-y-12"
          >
            {/* Repeated "GOLD" for a long column */}
            {[...Array(4)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {["G", "O", "L", "D"].map((char, j) => (
                  <span
                    key={`${groupIdx}-${j}`}
                    className={`${isBackground ? "text-[22vw]" : "text-[20vw]"} font-antonio font-bold leading-[0.95] text-black select-none tracking-tighter`}
                  >
                    {char}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {!isBackground && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">

          <div className="relative flex flex-col items-center text-center">

            {/* GATHERING */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-[12vw] md:text-[8vw] font-black font-antonio tracking-tighter text-black leading-none drop-shadow-sm"
              >
                GATHERING
              </motion.h2>
            </div>

            {/* OF OUTSTANDING */}
            <div className="flex items-center justify-center gap-4 py-2 w-full relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -z-10"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-offwhite px-4 text-xs md:text-xl font-serif italic text-black/60 relative z-10"
              >
                of
              </motion.span>
              <motion.h3
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-offwhite px-2 text-2xl md:text-5xl font-bold font-antonio tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-fresh uppercase whitespace-nowrap drop-shadow-sm"
              >
                OUTSTANDING
              </motion.h3>
            </div>

            {/* LEADERS */}
            <div className="overflow-hidden py-1 relative">
              {/* Shadow Text for 3D effect */}
              <motion.h2
                className="absolute top-1 left-1 text-[16vw] md:text-[12vw] font-black font-antonio tracking-tighter text-black/5 leading-none select-none z-0"
              >
                LEADERS
              </motion.h2>

              <motion.h2
                initial={{ y: 100, rotateX: 20 }}
                whileInView={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative z-10 text-[16vw] md:text-[12vw] font-black font-antonio tracking-tighter text-black leading-none select-none mix-blend-multiply"
              >
                LEADERS
              </motion.h2>
            </div>

            {/* IN VARIOUS DOMAINS */}
            <div className="overflow-hidden mt-8 md:mt-12 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-t border-b border-black/10 py-3 md:py-4 px-8 md:px-16"
              >
                <p className="text-xs md:text-lg font-serif italic text-black/60 tracking-widest uppercase">
                  in various domains
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
