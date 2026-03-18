"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import VideoText from "./ui/VideoText";
import Image from "next/image";
import SlotCounter from "./ui/SlotCounter";
import { useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- DATA ---
const CORE_TEAM = [
    { name: "Mohammed Liban", role: "Chairperson" },
    { name: "Omkar Modsing", role: "Vice Chairperson" },
    { name: "Shreeya Gangulli", role: "General Secretary" },
    { name: "Aaron Aadhav", role: "Treasurer" },
    { name: "Amaan Mulla", role: "Webmaster" },
];

const HEADS_TEAM = [
    { name: "Aryan Chaturvedi", role: "Management Head" },
    { name: "Harshita Wattal", role: "Media Head" },
    { name: "Radha Badgujar", role: "Sponsorship Head" },
    { name: "Vipul Choudhary", role: "Technical Head" },
    { name: "Aniket Yadav", role: "Chief Event Organizer" },
    { name: "Aditi Salunkhe", role: "C.R.O" },
];

const CHAPTERS = [
    { name: "RAIT ACM", src: "/gold/chapter/logo.png" },
    { name: "KJSCE ACM", src: "/gold/chapter/kjsce.png" },
    { name: "BVP ACM", src: "/gold/chapter/bvpacm.png" },
    { name: "PCCOE ACM", src: "/gold/chapter/amc-pccoe-logo.png" },
    { name: "SNDT ACM", src: "/gold/chapter/sndt.png" },
    { name: "MPSTME ACM", src: "/gold/chapter/mpstme.svg" },
    { name: "VESIT ACM", src: "/gold/chapter/1.png" },
    { name: "TSEC ACM", src: "/gold/chapter/2.png" },
];

export default function MobileExperience() {
    const [showPrompt, setShowPrompt] = useState(true);
    const [showFlash, setShowFlash] = useState(true);
    const counterValue = useMotionValue(0);
    const prizeRef = useRef(null);
    const isPrizeInView = useInView(prizeRef, { once: true });

    useEffect(() => {
        // Timer removed - relying on user interaction
    }, []);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'up' | 'down') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollAmount = container.clientHeight;
        const currentScroll = container.scrollTop;

        container.scrollTo({
            top: direction === 'down'
                ? currentScroll + scrollAmount
                : currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (isPrizeInView) {
            // Simple counter animation for mobile
            const controls = {
                value: 0,
                target: 30000
            };

            let start: number | null = null;
            const duration = 2000;

            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);

                counterValue.set(Math.floor(ease * controls.target));

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        }
    }, [isPrizeInView, counterValue]);

    return (
        <div ref={scrollContainerRef} className="h-screen w-full bg-offwhite text-black flex flex-col overflow-y-scroll snap-y snap-mandatory relative font-sans scroll-smooth">

            {/* Flash Toast (Modal) */}
            <AnimatePresence>
                {showFlash && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-black text-white p-8 rounded-3xl shadow-2xl border-2 border-gold-fresh/20 text-center max-w-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-fresh" />

                            <h3 className="text-3xl font-black text-gold-fresh mb-4 font-antonio tracking-wide uppercase leading-none">
                                Experience The Art
                            </h3>
                            <p className="text-base font-light leading-relaxed mb-8 text-white/80">
                                This crafted experience by <strong className="text-white font-medium">RAIT ACM</strong> is best viewed on a larger canvas.
                                <br /><span className="block mt-2 text-xs uppercase tracking-widest opacity-60">Switch to Desktop for the intended immersion.</span>
                                <span className="block mt-3 text-xs text-gold-fresh/80 tracking-wide">💡 On desktop? Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">F11</kbd> to go fullscreen — scroll effects won't trigger unless the browser is fullscreen.</span>
                            </p>
                            <button
                                onClick={() => setShowFlash(false)}
                                className="w-full bg-gold-fresh text-black py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold-fresh/20"
                            >
                                I Understand
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="fixed bottom-8 right-4 z-50 flex flex-col gap-4 mix-blend-difference text-white">
                <button
                    onClick={() => handleScroll('up')}
                    className="p-3 glass-capsule active:scale-95 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                </button>
                <button
                    onClick={() => handleScroll('down')}
                    className="p-3 glass-capsule active:scale-95 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </button>
            </div>

            {/* Sticky Prompt Bar */}
            {showPrompt && (
                <div className="fixed top-0 left-0 w-full bg-gold-fresh/95 backdrop-blur-sm text-black px-4 py-3 z-50 flex justify-between items-center shadow-md border-b border-black/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Recommendation</span>
                        <span className="text-xs font-bold leading-tight">View on Desktop for the full immersive experience.</span>
                    </div>
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="p-2 ml-4 hover:bg-black/10 rounded-full transition-colors"
                    >
                        <span className="sr-only">Close</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            )}

            {/* --- HERO SECTION --- */}
            <section className="h-screen snap-start flex flex-col items-center justify-start pt-32 p-8 relative shrink-0 overflow-hidden">
                <div className="relative z-10 w-full flex flex-col items-center gap-4 mb-8">
                    <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-gold-dark/40">RAIT ACM PRESENTS</span>
                    <div className="h-[1px] w-16 bg-gold-dark/20" />
                </div>

                <div className="relative z-10">
                    <VideoText
                        text="GOLD"
                        videoSrc="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov"
                        className="text-[25vw] h-[25vw] leading-none"
                    />
                    <h2 className="text-3xl font-black text-center uppercase tracking-tighter mt-8">
                        A place where ideas meet
                    </h2>
                </div>

                {/* Bottom Video Background */}
                <div className="absolute bottom-0 left-0 w-full h-[40vh] z-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-offwhite to-transparent z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov" type="video/mp4" />
                    </video>
                </div>
            </section>

            {/* --- ABOUT US --- */}
            <section className="h-screen snap-start bg-black text-white p-8 flex flex-col justify-center shrink-0 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-5xl font-black font-antonio mb-8 text-gold-fresh">ABOUT US</h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light mb-8 max-w-[80%]">
                        RAIT ACM is a premier technical chapter known for organizing flagship events like <span className="text-gold-fresh font-bold">CodeSummit</span> (India's Biggest National Coding Competition) and <span className="text-gold-fresh font-bold">KLEOS</span>. We are a community where students <span className="text-gold-fresh font-bold">network</span>, <span className="text-gold-fresh font-bold">learn</span>, and <span className="text-gold-fresh font-bold">innovate</span>.
                    </p>
                </div>

                {/* RAIT ACM Logo + "Brought to you by" - Top Right */}
                <div className="absolute top-8 right-8 flex flex-col items-end gap-1 z-20">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/60 font-medium">Brought to you by</span>
                    <div className="relative w-20 h-8">
                        <Image
                            src="https://rait.acm.org/codesummit/ACMWhite.png"
                            alt="RAIT ACM"
                            fill
                            className="object-contain object-right"
                        />
                    </div>
                </div>

                {/* Background Image - Gold About */}
                <div className="absolute bottom-0 right-0 w-[80%] h-[50%] opacity-40 mix-blend-screen pointer-events-none">
                    <Image
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/c7baa1e1-bb04-49ff-9324-942e8f32837c/goldabout-1770278609224.png?width=8000&height=8000&resize=contain"
                        alt="About Gold"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </section>

            {/* --- ABOUT EVENT --- */}
            <section className="h-screen snap-start bg-black text-white flex flex-col relative overflow-hidden shrink-0">

                {/* Background Video */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
                        <source src="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov" type="video/mp4" />
                    </video>
                </div>

                {/* Top Bar */}
                <div className="relative z-20 flex items-start justify-between px-6 pt-10">
                    <div className="flex flex-col">
                        <h2 className="text-[11vw] font-black font-antonio tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold-medium to-gold-fresh py-1">
                            ABOUT GOLD
                        </h2>
                        <p className="text-[9px] font-medium tracking-[0.35em] text-white/40 mt-1 uppercase">
                            A convergence of outstanding leaders
                        </p>
                    </div>
                </div>

                {/* Event Rows */}
                <div className="relative z-20 flex-1 flex flex-col border-t border-white/10 mt-4">

                    {[
                        {
                            num: "01",
                            title: "Speaker\nSession",
                            tagline: "INSIGHT. 30 MINUTES. UNFILTERED.",
                            body: "Industry leaders from ACM chapters across India — 30 minutes of hard-won knowledge on tech, leadership, and building things that last.",
                        },
                        {
                            num: "02",
                            title: "Reverse\nCoding",
                            tagline: "A SCREENSHOT. NO SOURCE. JUST CODE.",
                            body: "You see a finished website. No HTML. No CSS. No hints. Rebuild it pixel by pixel from what you can see.",
                        },
                    ].map((ev, i) => (
                        <motion.div
                            key={ev.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className={`relative flex-1 flex flex-col justify-between p-6 overflow-hidden ${i === 0 ? "border-b border-white/10" : ""}`}
                        >
                            {/* Ghost number */}
                            <span className="absolute right-2 bottom-0 text-[25vw] font-black font-antonio text-white/[0.04] leading-none select-none pointer-events-none">
                                {ev.num}
                            </span>

                            {/* Index */}
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold font-antonio tracking-[0.5em] text-white/20 uppercase">{ev.num}</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <p className="text-[9px] font-medium tracking-[0.25em] text-white/30 uppercase mb-2">{ev.tagline}</p>
                                <h3 className="text-[9vw] font-black font-antonio uppercase tracking-tighter text-white leading-[0.9] whitespace-pre-line mb-3">
                                    {ev.title}
                                </h3>
                                <p className="text-xs font-light text-white/40 leading-relaxed max-w-[85%]">{ev.body}</p>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </section>


            {/* --- PRIZE POOL --- */}
            <section ref={prizeRef} className="h-screen snap-start bg-black text-white p-8 flex flex-col justify-center relative overflow-hidden shrink-0">
                <div className="relative z-10">
                    <span className="text-gold-dark text-sm font-bold uppercase tracking-[0.2em] block mb-2">Total Cash Prize</span>
                    <div className="text-[18vw] font-black text-gold-fresh leading-none font-antonio flex items-baseline gap-2">
                        <span className="text-[10vw]">₹</span>
                        <SlotCounter value={counterValue} />
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-fresh/5 blur-[100px] pointer-events-none" />
            </section>

            {/* --- FACULTY --- */}
            <section className="h-screen snap-start bg-offwhite text-black p-8 flex flex-col justify-center shrink-0">
                <h2 className="text-5xl font-black font-antonio mb-12">FACULTY</h2>
                <div className="flex flex-col items-start gap-6">
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/5">
                        <Image
                            src="https://res.cloudinary.com/dft3midee/image/upload/v1770708861/base_nzzyjm.png"
                            alt="Dr. Sharad P. Jadhav"
                            fill
                            className="object-cover object-top grayscale"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black uppercase text-black leading-none mb-2">Dr. Sharad P. Jadhav</h3>
                        <p className="text-sm font-bold text-gold-dark uppercase tracking-widest">Faculty Coordinator</p>
                    </div>
                </div>
            </section>

            {/* --- TEAM --- */}
            <section className="min-h-screen snap-start bg-black text-white p-8 flex flex-col justify-center shrink-0">
                <h2 className="text-5xl font-black font-antonio mb-12">THE TEAM</h2>

                <div className="space-y-12">
                    {/* Core Team */}
                    <div>
                        <h3 className="text-gold-fresh text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Core Committee</h3>
                        <ul className="space-y-4">
                            {CORE_TEAM.map((member, i) => (
                                <li key={i} className="flex flex-col">
                                    <span className="text-xl font-bold text-white">{member.name}</span>
                                    <span className="text-sm text-white/40">{member.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Heads */}
                    <div>
                        <h3 className="text-gold-fresh text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Heads</h3>
                        <ul className="space-y-4">
                            {HEADS_TEAM.map((member, i) => (
                                <li key={i} className="flex flex-col">
                                    <span className="text-xl font-bold text-white">{member.name}</span>
                                    <span className="text-sm text-white/40">{member.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- SPONSORS --- */}
            <section className="h-screen snap-start bg-offwhite text-black p-8 flex flex-col items-center justify-center text-center shrink-0">
                <h2 className="text-5xl font-black font-antonio mb-4">SPONSORS</h2>
                <p className="text-black/40 text-xl font-medium tracking-wide">Revealing Soon</p>
            </section>


            {/* --- CHAPTERS --- */}
            <section className="h-screen snap-start bg-offwhite text-black p-8 flex flex-col justify-center shrink-0">
                <h2 className="text-5xl font-black font-antonio mb-12 text-center">CHAPTERS</h2>
                <div className="grid grid-cols-2 gap-4">
                    {CHAPTERS.map((chapter, i) => (
                        <div key={i} className="aspect-square bg-white/40 border border-black/5 rounded-xl flex flex-col items-center justify-center p-4 gap-3">
                            <div className="relative w-12 h-12">
                                <Image
                                    src={chapter.src}
                                    alt={chapter.name}
                                    fill
                                    className="object-contain filter grayscale opacity-70"
                                />
                            </div>
                            <span className="text-xs font-bold text-center uppercase tracking-wider">{chapter.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- REGISTER --- */}
            <section className="h-screen snap-start relative bg-black text-white flex flex-col items-center justify-center p-8 overflow-hidden shrink-0">
                {/* Bg Image */}
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="https://res.cloudinary.com/dft3midee/image/upload/v1770278609224/c7baa1e1-bb04-49ff-9324-942e8f32837c.png"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <h2 className="text-6xl font-black font-antonio uppercase tracking-tighter text-center">REGISTER</h2>
                    <a href="https://forms.gle/qg4Bv5gHgxg1UW999" target="_blank" rel="noopener noreferrer" className="bg-gold-fresh text-black font-bold uppercase tracking-widest py-4 px-10 rounded-full hover:scale-105 transition-transform shadow-lg shadow-gold-fresh/20">
                        Join Now
                    </a>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <section className="h-[50vh] snap-start bg-black text-white p-8 flex flex-col items-center justify-center gap-8 border-t border-white/10 shrink-0">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black text-gold-fresh uppercase tracking-[0.4em]">Contact</p>
                    <a href="mailto:reachraitacm@gmail.com" className="text-xl font-bold">reachraitacm@gmail.com</a>
                </div>
                <div className="flex gap-6 opacity-60">
                    <a href="https://www.linkedin.com/company/rait-acm-student-chapter/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/rait.acm/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/raitacm" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
                <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/20 mt-4">
                    © 2026 RAIT ACM
                </p>
            </section>

        </div>
    );
}
