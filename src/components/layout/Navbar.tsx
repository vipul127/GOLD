"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about-us" },
  { name: "Event", id: "about-event" },
  { name: "Prizes", id: "prize-pool" },
  { name: "Timeline", id: "timeline" },
  { name: "Faculty", id: "faculty" },
  { name: "Team", id: "team" },
  { name: "Sponsors", id: "sponsors" },
  { name: "Chapters", id: "chapters" },
  { name: "Register", id: "register" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  const container = document.querySelector(".snap-container") as HTMLElement | null;
  if (el && container) {
    // getBoundingClientRect gives position relative to viewport.
    // Adjust by current scrollTop to get the absolute offset within the container.
    const elTop = el.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    container.scrollTop += elTop - containerTop;
    // Instant assignment so scroll-snap doesn't intercept at intermediate snap points.
  } else if (el) {
    el.scrollIntoView({ block: "start" });
  }
};

export default function Navbar() {
  const [isHeroExited, setIsHeroExited] = useState(false);

  useEffect(() => {
    const snapContainer = document.querySelector(".snap-container");
    const target = snapContainer ?? window;

    const handleScroll = () => {
      const scrollTop =
        snapContainer instanceof HTMLElement
          ? snapContainer.scrollTop
          : window.scrollY;
      setIsHeroExited(scrollTop > window.innerHeight * 0.5);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {!isHeroExited ? (
          <motion.nav
            key="navbar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="glass-capsule pointer-events-auto flex items-center gap-8 px-8 py-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                className="text-gold-medium font-medium tracking-widest uppercase text-xs hover:text-gold-light transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </motion.nav>
        ) : (
          <motion.button
            key="arrow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => scrollTo("home")}
            className="glass-capsule pointer-events-auto p-4 text-gold-medium hover:text-gold-light transition-all active:scale-95"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
