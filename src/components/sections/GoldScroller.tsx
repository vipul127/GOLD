"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GoldScrollerProps {
  isBackground?: boolean;
}

export default function GoldScroller({ isBackground = false }: GoldScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const scroller = document.querySelector(".snap-container");
    if (!scroller) return;

    const lanes = containerRef.current.querySelectorAll(".gold-lane");

    lanes.forEach((lane, i) => {
      // Different speeds for each lane (0.2 to 1.2)
      const speed = 0.2 + (i * 0.2);
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
      className={`${isBackground ? "absolute inset-0 z-0 opacity-20" : "snap-section bg-offwhite min-h-screen flex items-center justify-center"} overflow-hidden relative`}
    >
      <div
        ref={containerRef}
        className={`flex justify-between w-full h-[140vh] px-10 items-center ${isBackground ? "scale-110" : ""}`}
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
                    className={`${isBackground ? "text-[22vw]" : "text-[20vw]"} font-antonio font-bold leading-[0.95] text-gold-fresh select-none tracking-tighter`}
                    style={{
                      opacity: isBackground ? 0.05 : 0.1, // Reduced for subtle background
                      textShadow: !isBackground ? "0 5px 15px rgba(197,160,54,0.1)" : "none"
                    }}
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
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="text-[35vw] font-black tracking-tighter uppercase font-antonio text-gold-fresh drop-shadow-2xl">GOLD</span>
        </div>
      )}
    </section>
  );
}
