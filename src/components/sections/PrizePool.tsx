"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import SlotCounter from "../ui/SlotCounter";
import SplitText from "../ui/SplitText";

// --- CONFIGURATION ---
const VIDEO_DURATION = 27; // seconds
const COUNTER_TARGET = 30000;
const STAGE_DURATION = 2500; // 2.5s per text stage

export default function PrizePool() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [revealStage, setRevealStage] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [interactionRequired, setInteractionRequired] = useState(false);
    const [timeLeft, setTimeLeft] = useState(VIDEO_DURATION);
    const [lastFrameSrc, setLastFrameSrc] = useState<string | null>(null); // canvas snapshot of last frame

    const counterValue = useMotionValue(0);

    // Sequence Controller
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && revealStage === 0) {
                    setRevealStage(1); // Start sequence
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [revealStage]);

    // Stage Timer
    useEffect(() => {
        if (revealStage >= 1 && revealStage < 4) {
            const timer = setTimeout(() => {
                // Next Stage
                if (revealStage < 3) {
                    setRevealStage(prev => prev + 1);
                } else {
                    // At stage 3 ("Wait for it..."), allow transition to 4 (Playing) ONLY if video loaded
                    if (videoLoaded) {
                        attemptPlay();
                    }
                }
            }, STAGE_DURATION);
            return () => clearTimeout(timer);
        } else if (revealStage === 3 && videoLoaded) {
            // If we were waiting at stage 3 and video finally loads
            const timer = setTimeout(() => attemptPlay(), 500);
            return () => clearTimeout(timer);
        }
    }, [revealStage, videoLoaded]);

    const attemptPlay = () => {
        // Play video (with its own synced audio) imperatively
        if (videoRef.current) {
            videoRef.current.play()
                .then(() => {
                    setRevealStage(4);
                    setIsPlaying(true);
                    setInteractionRequired(false);
                })
                .catch(() => {
                    setRevealStage(4);
                    setInteractionRequired(true); // Autoplay blocked — show tap-to-play overlay
                });
        } else {
            setRevealStage(4);
            setIsPlaying(true);
        }
    };

    const manualStart = () => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setIsPlaying(true);
                setInteractionRequired(false);
            });
        }
    };

    // Sync Logic (same as before)
    useEffect(() => {
        if (!isPlaying) return;

        let startTime = Date.now();
        let animationFrame: number;

        const tick = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, VIDEO_DURATION - elapsed);

            setTimeLeft(remaining);

            const COUNT_END = 25;      // reach 30k at second 25
            const DEAD_ZONE = 6;       // flat / near-zero for first 6s

            if (elapsed >= COUNT_END) {
                counterValue.set(COUNTER_TARGET);
            } else if (elapsed < DEAD_ZONE) {
                // Crawl: 0 → 100 in dead zone (doubled speed vs before)
                counterValue.set(Math.floor((elapsed / DEAD_ZONE) * 100));
            } else {
                // Map seconds 6→25 onto 0→1, exponential ease-in (power-8 = softer than 10)
                const t = (elapsed - DEAD_ZONE) / (COUNT_END - DEAD_ZONE);
                const eased = Math.pow(2, 8 * t - 8); // less steep than before
                counterValue.set(Math.floor(eased * COUNTER_TARGET));
            }

            if (elapsed < VIDEO_DURATION) {
                animationFrame = requestAnimationFrame(tick);
            } else {
                setIsEnded(true);
                const nextSection = document.getElementById("timeline");
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        animationFrame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying, counterValue]);

    // Imperatively play the video when isPlaying becomes true
    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch(() => {
                // autoplay blocked — already handled by interactionRequired state
            });
        }
    }, [isPlaying]);

    // Re-seek to last frame whenever section is revisited after ending
    // (browsers can GC video frames when section scrolls offscreen)
    useEffect(() => {
        if (!isEnded || !videoRef.current) return;
        const video = videoRef.current;
        const freeze = () => {
            if (video.duration) {
                video.currentTime = video.duration - 0.01;
                video.pause();
            }
        };
        // Freeze now
        freeze();
        // Also freeze whenever the video might re-buffer
        video.addEventListener("seeked", freeze);
        return () => video.removeEventListener("seeked", freeze);
    }, [isEnded]);


    return (
        <section
            id="prize-pool"
            ref={sectionRef}
            className="snap-section bg-black text-white relative h-screen w-full overflow-hidden flex items-center justify-center font-antonio select-none"
        >
            {/* Prize Pool Video — always mounted for preloading, visible when playing */}
            <div className="absolute inset-0 bg-black">
                <motion.div
                    animate={{ opacity: (isPlaying || isEnded) ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 flex justify-center items-start"
                >
                    <video
                        ref={videoRef}
                        playsInline
                        preload="auto"
                        onCanPlayThrough={() => setVideoLoaded(true)}
                        onEnded={() => {
                            // Show static last frame image (public/last.png)
                            setLastFrameSrc("https://res.cloudinary.com/dojuhlxvc/image/upload/v1771500126/last_qybu4e.png");
                            if (videoRef.current) videoRef.current.pause();
                        }}
                        className="w-[80%] h-auto object-contain"
                        style={{ marginTop: 0 }}
                    >
                        <source src="https://res.cloudinary.com/dft3midee/video/upload/v1771496840/prizepool_sqaduq.mov" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Static last-frame image — shown after video ends, survives browser GC */}
                    {isEnded && lastFrameSrc && (
                        <img
                            src={lastFrameSrc}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                            style={{ marginTop: 0 }}
                        />
                    )}
                </motion.div>

                {interactionRequired && (
                    <div
                        onClick={manualStart}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 cursor-pointer animate-pulse"
                    >
                        <span className="text-8xl md:text-6xl text-gold-medium uppercase tracking-widest font-bold">
                            Click to Reveal
                        </span>
                    </div>
                )}
            </div>

            {/* Text Reveal Sequence */}
            <AnimatePresence mode="wait">
                {revealStage === 1 && (
                    <motion.div key="text1" exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-10">
                        <SplitText
                            text="NOT ONLY THAT..."
                            className="text-6xl md:text-9xl font-black uppercase text-white tracking-tighter text-center max-w-5xl leading-none"
                            delay={0.2}
                        />
                    </motion.div>
                )}
                {revealStage === 2 && (
                    <motion.div key="text2" exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-10">
                        <SplitText
                            text="WE HAVE A PRIZE POOL AS WELL"
                            className="text-5xl md:text-8xl font-black uppercase text-gold-fresh tracking-tighter text-center max-w-6xl leading-none"
                            delay={0}
                        />
                    </motion.div>
                )}
                {revealStage === 3 && (
                    <motion.div
                        key="text3"
                        exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-10"
                    >
                        <SplitText
                            text="WAIT FOR IT..."
                            className="text-6xl md:text-9xl font-black uppercase text-white tracking-widest text-center"
                            delay={0}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slot Machine Counter (Bottom-Left) */}
            {isPlaying && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute bottom-10 left-10 z-20"
                >
                    <div className="flex flex-col items-start gap-0">
                        <span className="text-white text-lg md:text-xl uppercase tracking-[0.2em] font-medium font-antonio mb-2 pl-1">
                            Total Cash Prize
                        </span>
                        <div className="text-[12vw] leading-none font-black text-gold-fresh drop-shadow-[0_0_50px_rgba(255,215,0,0.4)] flex items-baseline">
                            <span className="text-[8vw] mr-2">₹</span>
                            <SlotCounter value={counterValue} />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Final Countdown Overlay (Bottom-Right) */}
            {timeLeft <= 4 && timeLeft > 0 && isPlaying && (
                <div className="absolute bottom-10 right-10 z-50 pointer-events-none">
                    <motion.span
                        key={Math.floor(timeLeft)}
                        initial={{ scale: 1.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="block text-[25vw] leading-none py font-black text-white mix-blend-overlay opacity-50"
                    >
                        {Math.ceil(timeLeft)}
                    </motion.span>
                </div>
            )}

        </section>
    );
}
