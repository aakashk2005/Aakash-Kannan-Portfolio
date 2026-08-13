import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Spring configs — multiple layers of natural lag and trail
const SPRING_DOT    = { damping: 100, stiffness: 2000, mass: 0.08 };
const SPRING_TRAIL1  = { damping: 50,  stiffness: 800,  mass: 0.15 };
const SPRING_TRAIL2  = { damping: 40,  stiffness: 450,  mass: 0.25 };
const SPRING_RING   = { damping: 30,  stiffness: 200,  mass: 0.5  };
const SPRING_GLOW   = { damping: 60,  stiffness: 90,   mass: 1.2  };

// Ring morphing per cursor state
const RING_STATES = {
  default: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(var(--accent-rgb), 0)",
    borderColor: "rgba(var(--accent-rgb), 0.4)",
    borderWidth: 1.5,
    boxShadow: "0 0 8px rgba(var(--accent-rgb), 0.05)",
  },
  hover: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: "rgba(var(--accent-rgb), 0.06)",
    borderColor: "rgba(var(--accent-rgb), 1)",
    borderWidth: 2,
    boxShadow: "0 0 20px rgba(var(--accent-rgb), 0.35), 0 0 40px rgba(var(--accent-rgb), 0.1)",
  },
  image: {
    width: 76, height: 76, borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "rgba(var(--accent-rgb), 0.85)",
    borderWidth: 1.5,
    boxShadow: "0 0 24px rgba(var(--accent-rgb), 0.3)",
  },
  text: {
    width: 2, height: 26, borderRadius: 2,
    backgroundColor: "rgba(var(--accent-rgb), 0.9)",
    borderColor: "transparent",
    borderWidth: 0,
    boxShadow: "0 0 8px rgba(var(--accent-rgb), 0.5)",
  },
};

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isTouch, setIsTouch] = useState(false);
  const rippleId = useRef(0);

  // Raw mouse position
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Spring layers
  const dotX   = useSpring(mouseX, SPRING_DOT);
  const dotY   = useSpring(mouseY, SPRING_DOT);
  const t1X    = useSpring(mouseX, SPRING_TRAIL1);
  const t1Y    = useSpring(mouseY, SPRING_TRAIL1);
  const t2X    = useSpring(mouseX, SPRING_TRAIL2);
  const t2Y    = useSpring(mouseY, SPRING_TRAIL2);
  const ringX  = useSpring(mouseX, SPRING_RING);
  const ringY  = useSpring(mouseY, SPRING_RING);
  const glowX  = useSpring(mouseX, SPRING_GLOW);
  const glowY  = useSpring(mouseY, SPRING_GLOW);

  const detectState = useCallback((target) => {
    if (!target) return "default";
    if (target.closest("input, textarea, [contenteditable]")) return "text";
    if (target.closest("img, figure, [data-cursor='image']")) return "image";
    if (target.closest("a, button, [role='button'], label, [data-cursor='hover']")) return "hover";
    return "default";
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onOver = (e) => setCursorState(detectState(e.target));

    const onDown = (e) => {
      const id = rippleId.current++;
      setRipples((prev) => [
        ...prev,
        { id: `${id}-1`, x: e.clientX, y: e.clientY, delay: 0, size: 70 },
        { id: `${id}-2`, x: e.clientX, y: e.clientY, delay: 0.1, size: 50 },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => !r.id.startsWith(id)));
      }, 750);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, detectState]);

  if (isTouch) return null;

  const rs = RING_STATES[cursorState];

  return (
    <>
      {/* Layer 1 — Ambient glow orb */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full mix-blend-screen"
        style={{
          x: glowX, y: glowY,
          translateX: "-50%", translateY: "-50%",
          width: 180, height: 180,
          background:
            "radial-gradient(circle, rgba(var(--accent-rgb), 0.16) 0%, rgba(var(--accent-rgb), 0.05) 50%, transparent 75%)",
          willChange: "transform",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Layer 2 — Morphing ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9991] border flex items-center justify-center overflow-hidden"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ ...rs, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      >

        {cursorState === "hover" && (
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent stroke-current"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Trail Dot 2 (Smaller, slower) */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9992] rounded-full bg-accent/30"
        style={{
          x: t2X, y: t2Y,
          translateX: "-50%", translateY: "-50%",
          width: 3,
          height: 3,
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible && cursorState === "default" ? 0.6 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trail Dot 1 (Medium, medium speed) */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9992] rounded-full bg-accent/60"
        style={{
          x: t1X, y: t1Y,
          translateX: "-50%", translateY: "-50%",
          width: 5,
          height: 5,
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible && cursorState === "default" ? 0.8 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Main Precision Dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9993] rounded-full bg-accent"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: 7, height: 7,
          boxShadow: "0 0 8px rgba(241,48,36,0.85)",
          willChange: "transform",
        }}
        animate={{
          opacity:
            isVisible && cursorState !== "text" && cursorState !== "hover" ? 1 : 0,
          scale: cursorState === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Enhanced Multi-Layer Click Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            aria-hidden
            key={r.id}
            className="fixed top-0 left-0 pointer-events-none z-[9989] rounded-full border border-accent/60"
            style={{ x: r.x, y: r.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 4, height: 4, opacity: 0.8 }}
            animate={{ width: r.size, height: r.size, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: r.delay, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
