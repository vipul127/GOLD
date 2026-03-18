import { motion, useTransform, MotionValue } from "framer-motion";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const CELL_HEIGHT = 1.1; // em

function Digit({ value, place }: { value: MotionValue<number>; place: number }) {
    const y = useTransform(value, (latest) => {
        // Get just this digit's current value (0–9), with fractional part for smooth rolling
        const digitValue = (latest / place) % 10;
        return `-${digitValue * CELL_HEIGHT}em`;
    });

    return (
        <div
            className="relative overflow-hidden inline-flex font-antonio font-bold"
            style={{ height: `${CELL_HEIGHT}em`, width: "0.62em" }}
        >
            <motion.div
                className="absolute left-0 w-full flex flex-col items-center"
                style={{ y }}
            >
                {/* 3 full sets — current, next, and overflow buffer — ensures no hard swap */}
                {[...NUMBERS, ...NUMBERS, ...NUMBERS].map((num, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center shrink-0"
                        style={{ height: `${CELL_HEIGHT}em` }}
                    >
                        {num}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function SlotCounter({ value }: { value: MotionValue<number> }) {
    return (
        <div className="flex items-center tracking-tighter overflow-hidden text-white gap-0">
            <Digit value={value} place={10000} />
            <Digit value={value} place={1000} />
            <Digit value={value} place={100} />
            <Digit value={value} place={10} />
            <Digit value={value} place={1} />
        </div>
    );
}
