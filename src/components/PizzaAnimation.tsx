import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Full pizza with 8 slices. Slices 0-3 (right half) disappear one by one,
 * then reappear, creating a looping "eating" animation.
 * The result always shows the left half = "pola pizze".
 */
const SLICE_COUNT = 8;
const RADIUS = 90;
const CENTER = 100;
const GAP_ANGLE = 1.5; // degrees gap between slices

// Colors for pizza
const CRUST_COLOR = "#D4A050";
const CHEESE_COLOR = "#F5D76E";
const SAUCE_COLOR = "#E74C3C";
const PEPPERONI_COLOR = "#C0392B";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function slicePath(index: number, radius: number, cx: number, cy: number) {
  const sliceAngle = 360 / SLICE_COUNT;
  const startAngle = index * sliceAngle + GAP_ANGLE / 2;
  const endAngle = (index + 1) * sliceAngle - GAP_ANGLE / 2;
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArc = sliceAngle - GAP_ANGLE > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

// Pepperoni positions per slice (relative angle offset within slice, radius fraction)
const pepperoniPerSlice = [
  [{ a: 0.35, r: 0.55 }, { a: 0.65, r: 0.7 }],
  [{ a: 0.4, r: 0.6 }],
  [{ a: 0.3, r: 0.5 }, { a: 0.7, r: 0.65 }],
  [{ a: 0.5, r: 0.55 }],
  [{ a: 0.35, r: 0.65 }, { a: 0.6, r: 0.5 }],
  [{ a: 0.5, r: 0.7 }],
  [{ a: 0.4, r: 0.55 }, { a: 0.7, r: 0.7 }],
  [{ a: 0.3, r: 0.6 }],
];

export const PizzaAnimation = () => {
  // Slices to hide: indices 0, 1, 2, 3 (right half) disappear sequentially
  const disappearOrder = [0, 7, 1, 6]; // top-right, bottom-right, etc - the right side slices
  const [hiddenSlices, setHiddenSlices] = useState<number[]>([]);
  const [phase, setPhase] = useState<"eating" | "restoring">("eating");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "eating") {
      if (hiddenSlices.length < disappearOrder.length) {
        // Hide next slice after delay
        timeout = setTimeout(() => {
          setHiddenSlices((prev) => [...prev, disappearOrder[prev.length]]);
        }, 600);
      } else {
        // All slices eaten, wait then start restoring
        timeout = setTimeout(() => {
          setPhase("restoring");
        }, 1500);
      }
    } else {
      // Restoring phase
      if (hiddenSlices.length > 0) {
        timeout = setTimeout(() => {
          setHiddenSlices((prev) => prev.slice(0, -1));
        }, 400);
      } else {
        // All restored, wait then start eating again
        timeout = setTimeout(() => {
          setPhase("eating");
        }, 1500);
      }
    }

    return () => clearTimeout(timeout);
  }, [hiddenSlices, phase]);

  const sliceAngle = 360 / SLICE_COUNT;

  return (
    <motion.div
      className="relative inline-block"
      animate={{ rotate: [0, -2, 2, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-40 h-40 md:w-56 md:h-56 drop-shadow-xl"
        style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }}
      >
        {/* Pizza base shadow */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 2} fill="rgba(0,0,0,0.08)" />

        {Array.from({ length: SLICE_COUNT }).map((_, i) => {
          const isHidden = hiddenSlices.includes(i);
          const path = slicePath(i, RADIUS, CENTER, CENTER);
          const innerPath = slicePath(i, RADIUS - 8, CENTER, CENTER);

          // Pepperoni for this slice
          const pepperonis = pepperoniPerSlice[i] || [];
          const startAngle = i * sliceAngle;

          // Direction to fly out when disappearing
          const midAngle = startAngle + sliceAngle / 2;
          const flyX = Math.cos((midAngle * Math.PI) / 180) * 120;
          const flyY = Math.sin((midAngle * Math.PI) / 180) * 120;

          return (
            <AnimatePresence key={i}>
              {!isHidden && (
                <motion.g
                  initial={phase === "restoring" ? { opacity: 0, x: flyX * 0.3, y: flyY * 0.3, scale: 0.5 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: flyX * 0.5,
                    y: flyY * 0.5,
                    scale: 0.3,
                    transition: { duration: 0.4, ease: "easeIn" },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Crust */}
                  <path d={path} fill={CRUST_COLOR} stroke="#C4904A" strokeWidth="0.5" />
                  {/* Cheese/sauce layer */}
                  <path d={innerPath} fill={CHEESE_COLOR} />
                  {/* Sauce spots */}
                  <path d={slicePath(i, RADIUS - 12, CENTER, CENTER)} fill={SAUCE_COLOR} opacity={0.15} />

                  {/* Pepperoni */}
                  {pepperonis.map((p, pi) => {
                    const angle = startAngle + p.a * sliceAngle;
                    const r = p.r * (RADIUS - 10);
                    const px = CENTER + r * Math.cos((angle * Math.PI) / 180);
                    const py = CENTER + r * Math.sin((angle * Math.PI) / 180);
                    return (
                      <circle
                        key={pi}
                        cx={px}
                        cy={py}
                        r={5}
                        fill={PEPPERONI_COLOR}
                        stroke="#A93226"
                        strokeWidth="0.5"
                        opacity={0.9}
                      />
                    );
                  })}
                </motion.g>
              )}
            </AnimatePresence>
          );
        })}

        {/* Center circle (sauce pool) */}
        <circle cx={CENTER} cy={CENTER} r={8} fill={SAUCE_COLOR} opacity={0.3} />
        <circle cx={CENTER} cy={CENTER} r={4} fill={CHEESE_COLOR} opacity={0.5} />
      </svg>

      {/* Bite/chomp effect emoji */}
      <AnimatePresence>
        {phase === "eating" && hiddenSlices.length > 0 && hiddenSlices.length <= disappearOrder.length && (
          <motion.span
            key={hiddenSlices.length}
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
