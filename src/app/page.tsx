"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp, Search, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";

import SplashScreen from "@/components/SplashScreen";
import Orb from "@/components/ui/orb";
import GoldScroller from "@/components/sections/GoldScroller";
import VideoText from "@/components/ui/VideoText";
import DarkVeil from "@/components/DarkVeil";
import Lanyard from "@/components/Lanyard";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "home", title: "GOLD", theme: "offwhite" },
  { id: "about-us", title: "ABOUT US", theme: "black" },
  { id: "sequence", title: "SEQUENCE", theme: "offwhite" },
  { id: "about-event", title: "ABOUT EVENT", theme: "offwhite" },
  { id: "faculty", title: "FACULTY", theme: "offwhite" },
  { id: "team", title: "TEAM", theme: "offwhite" },
  { id: "chapters", title: "CHAPTERS", theme: "offwhite" },
];



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  });

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        scroller: containerRef.current,
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      });
    });
  }, { scope: containerRef });

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-offwhite font-sans selection:bg-gold-fresh/30">
      <AnimatePresence>
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="snap-container h-screen w-full"
      >
        {/* Hero Section */}
        <section className="snap-section bg-offwhite overflow-hidden relative">
          {/* RAIT ACM PRESENTS - Top Center */}
          <div className="absolute top-8 left-0 right-0 z-20 flex flex-col items-center gap-4">
            <span className="text-[10px] font-bold tracking-[1em] uppercase text-gold-dark/40">RAIT ACM PRESENTS</span>
            <div className="h-[1px] w-24 bg-gold-dark/20" />
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex w-full h-full relative z-10">
            {/* Left Side - Text Content */}
            <div className="w-1/2 h-full flex flex-col justify-center pl-20 pr-32 items-end text-right">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 flex flex-col items-end"
              >
                <VideoText
                  text="GOLD"
                  videoSrc="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov"
                  className="text-[18vw] h-[18vw] -mr-20"
                />

                <div className="space-y-6 flex flex-col items-end">
                  <h2 className="text-3xl font-black text-black tracking-tighter uppercase">
                    A place where ideas meet
                  </h2>

                  <p className="text-lg text-black/40 font-medium leading-relaxed max-w-md text-right">
                    We&apos;re building places for bold thinkers and creators ready to reshape the future of digital excellence.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Video/Visual */}
            <div className="w-1/2 h-full flex items-center justify-start pl-32 pr-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-square max-w-[500px]"
              >
                {/* Liquid Gold Video Block */}
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov" />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="snap-section bg-black text-offwhite relative overflow-hidden">
          {/* Animated Circuit Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,223,0,0.08),transparent_60%)]" />

            {/* Animated grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="circuit-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#FFDF00" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-grid)" />
            </svg>

            {/* Floating tech nodes */}
            <motion.div
              animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[15%] w-3 h-3 bg-gold-fresh rounded-full blur-[1px]"
            />
            <motion.div
              animate={{ y: [15, -15, 15], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[35%] left-[25%] w-2 h-2 bg-gold-fresh rounded-full blur-[1px]"
            />
            <motion.div
              animate={{ y: [-10, 25, -10], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[60%] left-[10%] w-2 h-2 bg-gold-fresh rounded-full blur-[1px]"
            />

            {/* Animated connection lines */}
            <svg className="absolute top-0 left-0 w-[50%] h-full opacity-20">
              <motion.line
                x1="15%" y1="20%" x2="25%" y2="35%"
                stroke="#FFDF00"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.line
                x1="25%" y1="35%" x2="10%" y2="60%"
                stroke="#FFDF00"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="w-full h-full px-20 pt-20 relative z-10 flex flex-col items-start justify-start">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="h-[1px] w-24 bg-gold-fresh" />
              <span className="text-xs font-black tracking-[0.5em] text-gold-fresh uppercase">The Vision</span>
            </motion.div>

            {/* Title with stagger animation */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true }}
              className="text-7xl font-black uppercase tracking-tighter leading-none font-antonio mb-10"
            >
              ABOUT US
            </motion.h2>

            {/* Description with word animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <p className="text-xl leading-relaxed font-medium opacity-80">
                A collaborative ecosystem of ACM chapters across India,
                bringing together the brightest minds to{" "}
                <motion.span
                  className="text-gold-fresh inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  innovate
                </motion.span>,{" "}
                <motion.span
                  className="text-gold-fresh inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  collaborate
                </motion.span>, and shape the future of technology.
              </p>
            </motion.div>

            {/* Stats / Key Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-16 mt-16"
            >
              <div>
                <span className="text-5xl font-black text-gold-fresh font-antonio">15+</span>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mt-2">Chapters</p>
              </div>
              <div>
                <span className="text-5xl font-black text-gold-fresh font-antonio">500+</span>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mt-2">Members</p>
              </div>
              <div>
                <span className="text-5xl font-black text-gold-fresh font-antonio">50+</span>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mt-2">Events</p>
              </div>
            </motion.div>
          </div>

          {/* Collaboration Image - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute h-[70%] w-auto pointer-events-none"
            style={{ bottom: "-3rem", right: "-3rem" }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/c7baa1e1-bb04-49ff-9324-942e8f32837c/goldabout-1770278609224.png?width=8000&height=8000&resize=contain"
              alt="Collaboration"
              width={800}
              height={800}
              className="h-full w-auto object-contain object-bottom"
              priority
            />
          </motion.div>
        </section>

        {/* SEQUENCE Section - GoldScroller Component */}
        <GoldScroller />

        {/* About Event Section */}
        <section className="snap-section bg-offwhite">
          <div className="w-full px-20 mt-20">
            <div className="flex justify-between items-end mb-14">
              <div>

                <h2 className="text-8xl font-black uppercase tracking-tighter leading-none font-antonio">THE EVENT</h2>
              </div>
              <p className="text-black/40 font-bold uppercase tracking-widest text-xs max-w-[200px] leading-relaxed">
                Join the most exclusive gathering of technology enthusiasts in the country.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 mb-10 overflow-hidden rounded-3xl relative">
                  <div className="absolute inset-0 bg-gold-fresh/5 group-hover:bg-transparent transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10rem] font-black text-black/5 select-none font-antonio">01</span>
                  </div>
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Collaborate</h3>
                <p className="text-black/60 text-xl leading-relaxed font-medium max-w-md">Meet members from various ACM chapters and share ideas that matter in a high-stakes environment.</p>
              </div>

              <div className="group cursor-pointer mt-20">
                <div className="aspect-[4/3] bg-zinc-100 mb-10 overflow-hidden rounded-3xl relative">
                  <div className="absolute inset-0 bg-gold-fresh/5 group-hover:bg-transparent transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10rem] font-black text-black/5 select-none font-antonio">02</span>
                  </div>
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Celebrate</h3>
                <p className="text-black/60 text-xl leading-relaxed font-medium max-w-md">Join exclusive activities designed to foster community and celebrate the achievements of our chapters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="snap-section bg-offwhite text-black relative">
          <div className="absolute top-0 left-0 p-20 z-10 w-full">
            <div className="space-y-4">
              <h2 className="text-7xl font-black leading-none tracking-tighter text-black uppercase font-antonio">
                Dr. Sharad P. Jadhav
              </h2>
              <p className="text-xl font-black text-black/40 uppercase tracking-[0.3em]">
                Faculty Coordinator
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-[40%] h-[85%] pointer-events-none">
            <div className="relative w-full h-full grayscale contrast-125 brightness-90">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
                alt="Faculty Coordinator"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </section>

        {/* Core Team Section */}
        {/* Core Team Section */}
        <section className="snap-section relative min-h-screen bg-offwhite flex flex-col items-center justify-between pb-24 overflow-hidden">
          {/* Lanyards at Top (Hanging) */}
          <div className="w-full h-[60vh] absolute top-0 left-0 z-10 pointer-events-auto">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
          </div>

          {/* Empty spacer for the lanyards area */}
          <div className="flex-grow" />

          {/* Title/Connect at Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20 text-left space-y-4 -mb-20 mr-5 self-end"
          >
            <h2 className="text-8xl font-black tracking-tighter uppercase font-antonio text-black leading-none text-right">
              THE TEAM
            </h2>
          </motion.div>
        </section>



        {/* Footer Section */}
        <section className="snap-section bg-black text-offwhite min-h-[60vh] flex flex-col relative overflow-hidden">
          {/* Ambient Glow */}
          {/* Ambient Glow & Aurora */}
          <div className="absolute inset-0 pointer-events-none rotate-180">
            <DarkVeil
              hueShift={-155}
              noiseIntensity={0}
              scanlineIntensity={0.9}
              speed={0.5}
              scanlineFrequency={22}
              warpAmount={0.05}
              resolutionScale={1}
            />
          </div>

          <div className="w-full px-20 py-12 border-b border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20 relative z-10">
            <span>© 2026 RAIT ACM. ALL RIGHTS RESERVED.</span>
            <span>DESIGNED BY RAIT ACM</span>
          </div>

          <div className="flex-1 w-full px-20 flex items-start justify-between relative z-10 pt-12 pointer-events-none">
            <div className="space-y-16">
              <VideoText
                text="GOLD"
                videoSrc="https://res.cloudinary.com/dft3midee/video/upload/v1770295524/vid_ceu7ut.mov"
                className="text-[15rem] leading-[0.8]"
              />

              <div className="flex gap-20 pointer-events-auto">
                <div>
                  <p className="text-xs font-black text-gold-fresh uppercase tracking-[0.6em] mb-6 opacity-60">Contact</p>
                  <p className="text-3xl font-bold tracking-tight text-white select-text">hello@acmgold.in</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gold-fresh uppercase tracking-[0.6em] mb-6 opacity-60">Location</p>
                  <p className="text-3xl font-bold tracking-tight text-white">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-24 pointer-events-auto">
              <nav className="flex flex-col items-end space-y-6">
                {["Home", "About", "Event", "Chapters", "Team"].map((item) => (
                  <button
                    key={item}
                    className="text-5xl font-black uppercase tracking-tighter text-white/40 hover:text-gold-fresh transition-all duration-300 font-antonio hover:scale-110 origin-right"
                  >
                    {item}
                  </button>
                ))}
              </nav>

              <div className="flex gap-8 relative z-20">
                <Linkedin className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                <Instagram className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                <Twitter className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                <Mail className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
              </div>
            </div>
          </div>



          {/* <div className="w-full px-20 py-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20 relative z-10">
            <span>© 2026 RAIT ACM. ALL RIGHTS RESERVED.</span>
            <span>DESIGNED BY RAIT ACM</span>
          </div> */}
        </section>
      </div >

      {/* Navbar / Arrow */}
      < div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[150]" >
        <AnimatePresence mode="wait">
          {!showArrow ? (
            <motion.div
              key="nav-container"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <GlassSurface
                width="auto"
                height="auto"
                borderRadius={100}
                displace={0.1}
                distortionScale={-100}
                brightness={80}
                opacity={0.08}
                blur={15}
                className="px-4 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                <nav className="flex items-center gap-10">
                  {SECTIONS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        containerRef.current?.children[i].scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 relative group py-2 ${activeSection === i ? "text-gold-fresh" : "text-black/40 hover:text-black"
                        }`}
                    >
                      {s.id === "team" ? "TEAM" : s.id.replace("-", " ")}
                      {activeSection === i && (
                        <motion.div
                          layoutId="active-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-fresh rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </GlassSurface>
            </motion.div>
          ) : (
            <motion.div
              key="arrow-container"
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <GlassSurface
                width={70}
                height={70}
                borderRadius={100}
                displace={0.2}
                brightness={90}
                opacity={0.1}
                blur={20}
                className="flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                <button
                  onClick={scrollToTop}
                  className="w-full h-full flex items-center justify-center text-gold-fresh"
                >
                  <ArrowUp size={28} strokeWidth={3} />
                </button>
              </GlassSurface>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </main >
  );
}
