"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Event", href: "#event" },
  { name: "Faculty", href: "#faculty" },
  { name: "Meeting", href: "#meeting" },
];

export default function Navbar() {
  const [isHeroExited, setIsHeroExited] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.5) {
        setIsHeroExited(true);
      } else {
        setIsHeroExited(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <a
                key={item.name}
                href={item.href}
                className="text-gold-medium font-medium tracking-widest uppercase text-xs hover:text-gold-light transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.nav>
        ) : (
          <motion.button
            key="arrow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="glass-capsule pointer-events-auto p-4 text-gold-medium hover:text-gold-light transition-all active:scale-95"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
