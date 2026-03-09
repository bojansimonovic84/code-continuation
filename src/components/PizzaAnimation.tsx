import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import pizzaImg from "@/assets/pizza-half.png";

/**
 * Uses the real pizza image. Overlays 4 "mask" slices on the right half
 * that disappear one by one to reveal the pizza underneath,
 * then the right half fades out to show "half pizza" = pola pizze.
 * Then it loops.
 */
const SLICE_COUNT = 4; // 4 slices on the right side to hide/reveal

export const PizzaAnimation = () => {
  // Which right-side slices are currently visible (covering the pizza)
  const [visibleCovers, setVisibleCovers] = useState<number[]>([0, 1, 2, 3]);
  const [phase, setPhase] = useState<"eating" | "waiting" | "restoring">("eating");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "eating") {
      if (visibleCovers.length > 0) {
        // Remove one cover slice at a time
        timeout = setTimeout(() => {
          setVisibleCovers((prev) => prev.slice(0, -1));
        }, 500);
      } else {
        // All eaten, wait then restore
        timeout = setTimeout(() => {
          setPhase("restoring");
        }, 2000);
      }
    } else if (phase === "restoring") {
      if (visibleCovers.length < SLICE_COUNT) {
        timeout = setTimeout(() => {
          setVisibleCovers((prev) => [...prev, prev.length]);
        }, 350);
      } else {
        timeout = setTimeout(() => {
          setPhase("eating");
        }, 1500);
      }
    }

    return () => clearTimeout(timeout);
  }, [visibleCovers, phase]);

  // The cover slices clip paths for the RIGHT half of the pizza (4 quadrants)
  // Pizza image shows left half, we overlay right half covers that disappear
  const coverPaths = [
    "polygon(50% 50%, 50% 0%, 75% 0%, 50% 50%)",   // top-right inner
    "polygon(50% 50%, 75% 0%, 100% 0%, 100% 50%)",  // top-right outer  
    "polygon(50% 50%, 100% 50%, 100% 100%, 75% 100%)", // bottom-right outer
    "polygon(50% 50%, 75% 100%, 50% 100%, 50% 50%)",   // bottom-right inner
  ];

  return (
    <motion.div
      className="relative inline-block"
      animate={{ rotate: [0, -1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      {/* The actual pizza image */}
      <img
        src={pizzaImg}
        alt="Pizza"
        className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl select-none"
        draggable={false}
      />

      {/* Cover slices that hide the right half - they disappear to "eat" */}
      <AnimatePresence>
        {visibleCovers.map((sliceIndex) => (
          <motion.div
            key={`cover-${sliceIndex}`}
            className="absolute inset-0"
            style={{
              clipPath: coverPaths[sliceIndex],
              backgroundColor: "hsl(var(--background))",
            }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.3,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          />
        ))}
      </AnimatePresence>

      {/* Bite emoji */}
      <AnimatePresence>
        {phase === "eating" && visibleCovers.length < SLICE_COUNT && visibleCovers.length > 0 && (
          <motion.span
            key={visibleCovers.length}
            className="absolute text-2xl md:text-3xl pointer-events-none"
            style={{ top: "30%", right: "-10%" }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [0, 1.3, 1], rotate: [0, 10, 0] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            😋
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
