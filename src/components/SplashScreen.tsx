"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(finishLoading, 800);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 1;
        return next > 100 ? 100 : next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col justify-end p-12 md:p-24"
    >
      <div className="flex items-baseline gap-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-offwhite text-[10vw] md:text-[15vw] font-bold leading-none tracking-tighter uppercase font-antonio"
        >
          loading
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-offwhite text-[10vw] md:text-[15vw] font-bold leading-none tracking-tighter font-antonio"
        >
          {progress}
        </motion.span>
      </div>
    </motion.div>
  );
}
