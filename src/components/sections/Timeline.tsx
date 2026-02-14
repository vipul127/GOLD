"use client";

import { motion } from "framer-motion";

const SCHEDULE = [
    { time: "08:00 AM", title: "Registration", desc: "Breakfast & Check-in" },
    { time: "10:00 AM", title: "Inauguration", desc: "Event Kick-off" },
    { time: "11:00 AM", title: "Speaker Talks", desc: "Industry Insights" },
    { time: "01:00 PM", title: "Lunch", desc: "Network & Recharge" },
    { time: "02:00 PM", title: "Reverse Coding", desc: "The Challenge Begins" },
    { time: "05:00 PM", title: "Valedictory", desc: "Awards Ceremony" },
];

export default function Timeline() {
    return (
        <section id="timeline" className="snap-section bg-offwhite text-black relative flex flex-col justify-center min-h-screen overflow-hidden">

            {/* Corner Title - Straight and Black */}
            <div className="absolute top-0 left-0 p-10 md:p-20 z-20 pointer-events-none">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-antonio text-black origin-top-left leading-none select-none">
                    TIMELINE
                </h2>
            </div>

            {/* Main Content */}
            <div className="w-full h-full flex items-center overflow-x-auto no-scrollbar px-10 md:px-40 py-20 snap-x snap-mandatory">
                <div className="flex gap-12 md:gap-24 min-w-max pt-20"> {/* Added top padding to clear title */}
                    {SCHEDULE.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="relative snap-center flex flex-col justify-end h-[50vh] min-w-[280px] md:min-w-[400px] border-l-2 border-black/20 pl-8 group hover:border-gold-fresh transition-colors duration-500"
                        >
                            {/* Time */}
                            <span className="text-4xl md:text-6xl font-black text-black/10 group-hover:text-black/40 transition-colors duration-500 absolute top-0 left-4 -translate-y-[50%] select-none font-antonio">
                                {item.time.split(' ')[0]}
                            </span>

                            <div className="mt-auto space-y-4">
                                <div className="w-12 h-[2px] bg-gold-dark" />
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none">
                                    {item.title}
                                </h3>
                                <p className="text-xl text-black/80 font-medium">
                                    {item.desc}
                                </p>
                                <p className="text-sm font-bold tracking-widest uppercase text-black">
                                    {item.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {/* Spacer */}
                    <div className="w-[10vw]" />
                </div>
            </div>
        </section>
    );
}
