"use client";

import { motion } from "framer-motion";

export default function Sponsors({ id }: { id?: string }) {
    return (
        <section id={id} className="snap-section bg-black text-offwhite relative overflow-hidden">
            {/* Pure black background */}

            {/* Main Content - Centered text */}
            <div className="w-full h-full px-20 relative z-10 flex flex-col items-center justify-center">

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-9xl font-black uppercase tracking-tighter leading-none font-antonio mb-8"
                >
                    OUR SPONSORS
                </motion.h2>

                {/* Preparing Soon Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-offwhite/40 text-2xl font-medium tracking-wide text-center"
                >
                    Revealing Soon
                </motion.p>
            </div>
        </section>
    );
}
