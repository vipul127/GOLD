"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { ArrowUp, Search, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";

import SplashScreen from "@/components/SplashScreen";
import Orb from "@/components/ui/orb";
import GoldScroller from "@/components/sections/GoldScroller";
import VideoText from "@/components/ui/VideoText";
import DarkVeil from "@/components/DarkVeil";
import Lanyard from "@/components/Lanyard";
import MobileExperience from "@/components/MobileExperience";

import Sponsors from "@/components/sections/Sponsors";
import PrizePool from "@/components/sections/PrizePool";
import Timeline from "@/components/sections/Timeline";
import AboutEvent from "@/components/sections/AboutEvent";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "home", title: "GOLD", theme: "offwhite" },
  { id: "about-us", title: "ABOUT US", theme: "black" },
  { id: "sequence", title: "SEQUENCE", theme: "offwhite" },
  { id: "about-event", title: "ABOUT EVENT", theme: "offwhite" },
  { id: "prize-pool", title: "PRIZE POOL", theme: "black" },
  { id: "timeline", title: "TIMELINE", theme: "offwhite" },
  { id: "faculty", title: "FACULTY", theme: "offwhite" },
  { id: "team", title: "TEAM", theme: "offwhite" },
  { id: "sponsors", title: "SPONSORS", theme: "black" },
  { id: "chapters", title: "CHAPTERS", theme: "offwhite" },
  { id: "register", title: "REGISTER", theme: "black" },
];



function LazyFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "200px 0px" });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="snap-section bg-black text-offwhite min-h-[60vh] flex flex-col relative overflow-hidden">
      {isInView && (
        <>
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
            <span>DESIGNED BY TECHNICAL CHIEF AT RAIT ACM</span>
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
                  <p className="text-3xl font-bold tracking-tight text-white select-text">reachraitacm@gmail.com</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gold-fresh uppercase tracking-[0.6em] mb-6 opacity-60">Location</p>
                  <p className="text-3xl font-bold tracking-tight text-white">Navi Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-24 pointer-events-auto">
              <nav className="flex flex-col items-end space-y-6">
                {SECTIONS.filter(s => s.id !== "home").map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className="text-5xl font-black uppercase tracking-tighter text-white/40 hover:text-gold-fresh transition-all duration-300 font-antonio hover:scale-110 origin-right"
                  >
                    {s.title}
                  </button>
                ))}
              </nav>

              <div className="flex gap-8 relative z-20">
                <a href="https://www.linkedin.com/company/rait-acm-student-chapter/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                </a>
                <a href="https://www.instagram.com/rait.acm/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                </a>
                <a href="https://www.facebook.com/raitacm" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                </a>
                <a href="mailto:reachraitacm@gmail.com">
                  <Mail className="w-8 h-8 text-white/40 hover:text-gold-fresh cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function LazyLanyard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "200px 0px" });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 1500);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div ref={ref} className="w-full h-[100vh] absolute bottom-[5vh] z-10 pointer-events-auto flex justify-center items-end">
      {/* Loading Overlay - Ghost Text */}
      <AnimatePresence>
        {!isLoaded && isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <h3 className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-[0.5em] animate-pulse font-antonio select-none">
              Loading Team...
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {isInView && (
        <Lanyard
          position={[0, 0, isSmallScreen ? 19 : 15]}
          gravity={[0, -40, 0]}
          transparent={true}
          onLoaded={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}

export default function Home() {
  // Use state ref to ensure we react when the DOM node is actually mounted
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false); // Start as false to avoid hydration errors
  const [viewportChecked, setViewportChecked] = useState(false);
  const [registrationVideoPlayed, setRegistrationVideoPlayed] = useState(false);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      // Check for desktop: Wide screen AND fine pointer (mouse/trackpad)
      // This forces mobile view on:
      // 1. Small screens (< 1280px)
      // 2. Touch devices (Phones/Tablets) even if they have large screens or use "Desktop Mode"
      const isWide = window.innerWidth >= 1280;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;

      setIsDesktop(isWide && isFinePointer);
      setViewportChecked(true);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Handle scroll arrow visibility manually to avoid hydration errors
  useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      // Show arrow after scrolling past 30% of the viewport height
      if (container.scrollTop > window.innerHeight * 0.3) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [container]); // Re-run when container is set

  useGSAP(() => {
    if (!container) return;

    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        scroller: container,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(i);
          }
        },
      });
    });
  }, { scope: container ?? undefined, dependencies: [container] });

  const scrollToTop = () => {
    container?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-offwhite font-sans selection:bg-gold-fresh/30">
      <AnimatePresence>
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Show mobile experience for screens < 1920px */}
      {!isLoading && viewportChecked && !isDesktop && <MobileExperience />}

      {/* Show full desktop experience for screens >= 1920px */}
      {!isLoading && viewportChecked && isDesktop && (
        <>
          <div
            ref={setContainer}
            className="snap-container h-screen w-full"
          >
            {/* Hero Section */}
            <section id="home" className="snap-section bg-offwhite overflow-hidden relative">
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
                      className="text-[18vw] h-[18vw]"
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
                <div className="w-1/2 h-full flex items-center justify-center pr-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[4/3] max-w-[650px]"
                  >
                    {/* Liquid Gold Video Block */}
                    <div className="w-full h-full overflow-hidden mix-blend-multiply">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain scale-110"
                      >
                        <source src="https://res.cloudinary.com/dft3midee/video/upload/v1770449608/bgrem_onvgmf.mp4" />
                      </video>
                    </div>
                  </motion.div>
                </div>
              </div>


              {/* Bottom Meaning Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-4 w-full text-center pointer-events-none z-20"
              >
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gold-dark/60 animate-pulse">
                  GATHERING OF OUTSTANDING LEADERS IN VARIOUS DOMAINS
                </p>
              </motion.div>
            </section>

            {/* About Us Section */}
            {/* About Us Section - Typography Focus */}
            {/* About Us Section - Diagonal Layout */}
            <section id="about-us" className="snap-section bg-black text-white relative overflow-hidden h-screen w-full">

              {/* Radial Gradient for Image Depth */}
              <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-gold-fresh/5 blur-[120px] rounded-full pointer-events-none" />

              {/* Top-Left Content Container */}
              <div className="absolute top-0 left-0 w-full md:w-[60%] h-full p-8 md:p-20 flex flex-col justify-start z-20 pointer-events-none">
                <div className="pointer-events-auto">
                  {/* Massive Header */}
                  <div className="relative mb-8">
                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-[12vw] md:text-[9vw] font-black font-antonio leading-[0.85] tracking-tighter text-white z-10 relative"
                    >
                      ABOUT US
                    </motion.h2>
                    <motion.h2
                      className="text-[12vw] md:text-[9vw] font-black font-antonio leading-[0.85] tracking-tighter text-transparent stroke-white stroke-2 absolute top-0 left-0 translate-x-2 -translate-y-2 -z-10 select-none pointer-events-none"
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      ABOUT US
                    </motion.h2>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-xl mb-12"
                  >
                    <div className="h-[2px] w-20 bg-gold-fresh mb-8" />
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-white/80">
                      RAIT ACM is a premier technical chapter known for organizing top-tier flagship events like <span className="text-gold-fresh font-bold">CodeSummit</span>, India's Biggest National Coding Competition, and <span className="text-gold-fresh font-bold">KLEOS</span>, a National-Level Hackathon. Beyond events, we are a community where students network, learn, and innovate.
                    </p>
                  </motion.div>

                  {/* RAIT ACM Logo + "Brought to you by" - Top Right of Content Area */}


                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg">
                    {[
                      { value: "3", label: "Chapters" },
                      { value: "20+", label: "Members" },
                      { value: "10+", label: "Events" }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                      >
                        <h4 className="text-4xl md:text-5xl font-black font-antonio text-gold-fresh">{stat.value}</h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom-Right Image Container */}
              <motion.div
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 right-0 w-[90%] md:w-[60%] h-[60%] md:h-[90%] z-10 flex items-end justify-end pointer-events-none"
              >
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/c7baa1e1-bb04-49ff-9324-942e8f32837c/goldabout-1770278609224.png?width=8000&height=8000&resize=contain"
                  alt="About Gold"
                  fill
                  className="object-contain object-bottom md:object-right-bottom drop-shadow-2xl"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-12 right-12 md:top-20 w-full md:w-auto md:right-20 pointer-events-none z-30 flex flex-col items-end gap-2"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">Brought to you by</span>
                <div className="relative w-32 h-12 md:w-40 md:h-16">
                  <Image
                    src="https://rait.acm.org/codesummit/ACMWhite.png"
                    alt="RAIT ACM"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              </motion.div>

            </section>

            {/* SEQUENCE Section - GoldScroller Component */}
            <GoldScroller />

            {/* About Event Section */}
            <AboutEvent />
            {/* Prize Pool Section */}
            <PrizePool />
            {/* Timeline Section */}
            <Timeline />




            <section id="faculty" className="snap-section bg-offwhite text-black relative flex flex-col justify-start pt-32 overflow-hidden">
              <div className="absolute top-0 left-0 p-10 z-10 w-full">
                <div className="space-y-6">
                  <motion.h2
                    className="text-4xl font-black leading-[1.3] tracking-tight text-black uppercase font-antonio pb-4"
                    style={{ fontSize: '9rem' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.03,
                        },
                      },
                    }}
                  >
                    {"Dr. Sharad P. Jadhav".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mb-6"
                        style={{ overflow: 'hidden', display: char === " " ? "inline" : "inline-block" }}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 50,
                            clipPath: "inset(0 100% 0 0)",
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            clipPath: "inset(0 0% 0 0)",
                            transition: {
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.h2>
                  <p className="text-3xl -mt-15 font-black text-black/40 uppercase tracking-[0.3em]">
                    Faculty Sponsor
                  </p>
                </div>
              </div>
              {/* https://res.cloudinary.com/dft3midee/image/upload/v1770708847/res2_obr6lz.png */}
              {/* https://res.cloudinary.com/dft3midee/image/upload/v1770708861/base_nzzyjm.png colored*/}
              <div className="absolute -bottom-20 -right-10 w-[55%] h-[65%] pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="https://res.cloudinary.com/dft3midee/image/upload/v1770708861/base_nzzyjm.png"
                    alt="Faculty Sponsor"
                    fill
                    className="object-contain object-bottom object-right"
                    style={{
                      filter: 'contrast(1.05) brightness(0.98)',
                    }}
                  />
                  {/* Grain overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Core Team Section */}
            <section id="team" className="snap-section relative min-h-screen bg-black flex flex-col items-center justify-between pb-24 overflow-hidden">
              {/* Title/Team at Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-20 text-left space-y-4 top-[85%] self-start ml-[-4%] rotate-[-90deg]"
              >
                <h2 className="text-8xl font-black tracking-tighter uppercase font-antonio text-offwhite leading-none text-left">
                  THE TEAM
                </h2>
              </motion.div>

              {/* Empty spacer for the lanyards area */}
              <div className="flex-grow" />

              {/* Lanyards at Bottom (Hanging) */}
              <LazyLanyard />
            </section>

            {/* Sponsors Section */}
            <Sponsors id="sponsors" />

            {/* Chapters Section */}
            <section id="chapters" className="snap-section bg-offwhite min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20">
              <div className="container mx-auto px-4 z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[10vw] md:text-[7vw] font-black font-antonio text-black text-center leading-none mb-12 select-none"
                >
                  OUR CHAPTERS
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
                  {[
                    { name: "RAIT ACM", src: "/gold/chapter/logo.png" },
                    { name: "KJSCE ACM", src: "/gold/chapter/kjsce.png" },
                    { name: "BVP ACM", src: "/gold/chapter/bvpacm.png" },
                    { name: "PCCOE ACM", src: "/gold/chapter/amc-pccoe-logo.png" },
                    { name: "SNDT ACM", src: "/gold/chapter/sndt.png" },
                    { name: "MPSTME ACM", src: "/gold/chapter/mpstme.svg" },
                    { name: "VESIT ACM", src: "/gold/chapter/1.png" },
                    { name: "TSEC ACM", src: "/gold/chapter/2.png" },
                  ].map((chapter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative aspect-square"
                    >
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-2xl border border-gold-medium/10 transition-all duration-300 group-hover:border-gold-medium/40 group-hover:bg-white/60 shadow-lg shadow-gold-dark/5" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4">
                        <div className="relative w-full flex-1 flex items-center justify-center">
                          <Image
                            src={chapter.src}
                            alt={chapter.name}
                            width={120}
                            height={120}
                            className="object-contain w-auto h-auto max-w-full max-h-full filter grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                          />
                        </div>
                        <span className="text-gold-dark font-antonio text-lg tracking-widest opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                          {chapter.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>



            {/* Registration Section */}
            <section id="register" className="snap-section relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
              {/* Video Background - Plays once, then fades down */}
              <motion.video
                ref={(el) => {
                  if (!el) return;

                  // Intersection Observer to play video when in viewport
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting && el.paused && !registrationVideoPlayed) {
                          el.play().catch(err => console.log('Video play failed:', err));
                        }
                      });
                    },
                    { threshold: 0.5 }
                  );

                  observer.observe(el);

                  // Mark as played when video ends
                  el.addEventListener('ended', () => {
                    setRegistrationVideoPlayed(true);
                  });

                  return () => observer.disconnect();
                }}
                className="absolute inset-0 w-full h-full object-cover"
                src="https://res.cloudinary.com/dft3midee/video/upload/v1770889781/1080_rb9m8x.mp4"
                playsInline
                muted
                initial={{ opacity: 1 }}
                animate={{ opacity: registrationVideoPlayed ? 0.3 : 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Content - Only appears AFTER video ends */}
              {registrationVideoPlayed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full">

                  {/* Top Event Details - Slide Down */}
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute top-24 left-0 right-0 flex justify-center gap-8 text-gold-fresh/80 text-sm font-medium tracking-[0.3em] uppercase z-20"
                  >
                    <span>GOLD 2026</span>
                    <span>•</span>
                    <span>Navi Mumbai, India</span>
                    <span>•</span>
                    <span>RAIT ACM</span>
                  </motion.div>

                  {/* Huge REGISTER Typography - Scale + Fade with Spring */}
                  <div className="flex flex-col items-center justify-center gap-16 z-20">
                    {/* Huge REGISTER Typography - Scale + Fade with Spring */}
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.8, delay: 0.3 }
                      }}
                      className="text-[15vw] font-black uppercase tracking-tighter font-antonio text-white leading-none drop-shadow-2xl"
                    >
                      REGISTER
                    </motion.h1>

                    {/* Glass Button - Smooth Rise */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <a href="https://forms.gle/qg4Bv5gHgxg1UW999" target="_blank" rel="noopener noreferrer">
                        <GlassSurface
                          width={280}
                          height={85}
                          borderRadius={999}
                          displace={0.1}
                          distortionScale={0.5}
                          brightness={1.2}
                          opacity={1}
                          blur={0}
                          className="bg-gold"
                        >
                          <button className="w-full h-full flex items-center justify-center gap-4 text-gold-medium font-bold tracking-[0.2em] uppercase text-lg hover:text-gold-light hover:scale-105 transition-all duration-300 group px-8">
                            Join Now
                            <motion.span
                              className="inline-block text-2xl"
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              →
                            </motion.span>
                          </button>
                        </GlassSurface>
                      </a>
                    </motion.div>
                  </div>
                </div>
              )}
            </section>





            {/* Footer Section */}
            <LazyFooter />
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
                            container?.children[i].scrollIntoView({ behavior: "smooth" });
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
        </>
      )
      }
    </main >
  );
}
