import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function SplitText({
    text,
    className = "",
    delay = 0,
    duration = 0.5
}: SplitTextProps) {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: true, amount: 0.5 }); // Reveal when 50% visible? Or just trigger immediately?
    // Let's rely on parent to mount/unmount or just trigger on mount.
    // Actually, for this specific use case (stage-based reveal), mount animation is perfect.

    useEffect(() => {
        controls.start("visible");
    }, [controls]);

    // Split by words first to keep them together, then characters?
    // User asked for "text appear from the bottom... make them disappear".
    // Let's split by words to keep it readable and impactful.
    const words = text.split(" ");

    return (
        <h2 ref={ref} className={`${className} flex flex-wrap justify-center overflow-hidden`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mx-[0.2em] -mb-[0.2em] pb-[0.2em]">
                    <motion.span
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { y: "100%" },
                            visible: (i) => ({
                                y: "0%",
                                transition: {
                                    duration: duration,
                                    ease: [0.33, 1, 0.68, 1], // Cubic ease out
                                    delay: delay + i * 0.1, // Stagger words
                                },
                            }),
                            exit: {
                                y: "-100%",
                                opacity: 0,
                                transition: { duration: 0.3 }
                            }
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </h2>
    );
}
