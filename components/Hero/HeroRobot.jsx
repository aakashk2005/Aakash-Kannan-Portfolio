import { useRef, useState, useCallback, useEffect, Component } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { robotTheme } from "./robotTheme";

const RobotScene = dynamic(() => import("./RobotScene"), {
  ssr: false,
  loading: () => null,
});

// Fallback shown when WebGL is unavailable (or the scene errors out).
const RobotFallback = () => (
  <div
    aria-hidden
    className="w-full h-full flex items-center justify-center"
    style={{
      background:
        "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(0,240,255,0.04) 45%, transparent 70%)",
    }}
  >
    <svg width="220" height="300" viewBox="0 0 220 300" fill="none">
      <circle cx="110" cy="150" r="110" stroke={robotTheme.fallbackStroke} strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="110" cy="150" r="92" stroke={robotTheme.fallbackStrokeAccent} strokeWidth="1" />
      <rect x="45" y="42" width="130" height="110" rx="18" fill="rgba(20,22,28,0.9)" stroke={robotTheme.fallbackFaceplate} strokeWidth="2" />
      <rect x="62" y="78" width="96" height="22" rx="6" fill="#050608" stroke={robotTheme.fallbackScreen} />
      <rect x="82" y="84" width="14" height="10" rx="2" fill={robotTheme.fallbackEyes} style={{ filter: `drop-shadow(0 0 6px ${robotTheme.fallbackEyes})` }} />
      <rect x="124" y="84" width="14" height="10" rx="2" fill={robotTheme.fallbackEyes} style={{ filter: `drop-shadow(0 0 6px ${robotTheme.fallbackEyes})` }} />
      <circle cx="110" cy="52" r="5" fill={robotTheme.fallbackCore} style={{ filter: `drop-shadow(0 0 5px ${robotTheme.fallbackCore})` }} />
      <rect x="78" y="160" width="64" height="70" rx="10" fill="rgba(20,22,28,0.9)" stroke={robotTheme.fallbackChest} strokeWidth="2" />
      <circle cx="110" cy="196" r="11" fill={robotTheme.fallbackCore} opacity="0.9" style={{ filter: `drop-shadow(0 0 8px ${robotTheme.fallbackCore})` }} />
      <text x="110" y="286" textAnchor="middle" fill={robotTheme.fallbackText} fontSize="10" letterSpacing="3" fontFamily="monospace">
        AI CORE STANDBY
      </text>
    </svg>
  </div>
);

class RobotBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("Robot scene failed, showing fallback:", error);
    }
  }
  render() {
    return this.state.hasError ? <RobotFallback /> : this.props.children;
  }
}

const detectWebGL = () => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
};

const findScrollableAncestor = (el) => {
  let node = el && el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      node.scrollHeight > node.clientHeight + 4
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const HeroRobot = () => {
  const wrapRef = useRef(null);
  const [webglOk, setWebglOk] = useState(null);
  const [ready, setReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const mountedAt = useRef(typeof window !== "undefined" ? Date.now() : 0);

  const motionRef = useRef({
    pointerX: 0,
    pointerY: 0,
    proximity: 0,
    scroll: 0,
    reducedMotion: false,
  });

  // Init once (client-only)
  useEffect(() => {
    setWebglOk(detectWebGL());
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    motionRef.current.reducedMotion = prefersReduced;

    const onMove = (e) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      motionRef.current.pointerX = (e.clientX / W) * 2 - 1;
      motionRef.current.pointerY = -((e.clientY / H) * 2 - 1);

      const el = wrapRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        motionRef.current.proximity = Math.min(
          Math.max(1 - dist / (0.45 * Math.min(W, H)), 0),
          1
        );
      }
    };

    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const sc = findScrollableAncestor(el);
      if (sc && sc.scrollHeight > sc.clientHeight) {
        motionRef.current.scroll = sc.scrollTop / (sc.scrollHeight - sc.clientHeight);
      } else {
        motionRef.current.scroll = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Hide the boot overlay once the scene is live AND a short minimum
  // duration has passed (keeps the "INITIALIZING AI..." beat readable).
  useEffect(() => {
    if (!sceneReady) return;
    const remaining = 1150 - (Date.now() - mountedAt.current);
    const timer = setTimeout(() => setReady(true), Math.max(remaining, 0));
    return () => clearTimeout(timer);
  }, [sceneReady]);

  // Safety net: never leave the overlay stuck.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  // Compact framing on small screens / short containers.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setCompact(rect.width < 720 || rect.height < 480);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleVisible = useCallback(() => setSceneReady(true), []);

  return (
    <div
      ref={wrapRef}
      className="w-full h-full relative pointer-events-none"
      role="img"
      aria-label="Interactive 3D AI robot companion — an animated futuristic humanoid that responds to mouse movement and can be clicked."
      style={{
        "--robot-cursor-glow-inner": robotTheme.cursorGlowInner,
        "--robot-cursor-glow-outer": robotTheme.cursorGlowOuter,
      }}
    >
      {webglOk !== null && webglOk && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            <RobotBoundary>
              <RobotScene motionRef={motionRef} onReady={handleVisible} compact={compact} />
            </RobotBoundary>
          </div>
        </div>
      )}

      {webglOk === null && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}

      {webglOk !== null && !webglOk && <RobotFallback />}

      {/* Boot loading overlay */}
      <AnimatePresence>
        {!ready && webglOk !== null && webglOk && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6,0,10,0.85) 0%, rgba(0,0,0,0.95) 70%)",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            aria-label="Loading 3D robot"
            role="status"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${robotTheme.spinnerBorder}` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: robotTheme.spinnerAccent, boxShadow: `0 0 10px ${robotTheme.spinnerAccent}` }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{ border: `1px dashed ${robotTheme.spinnerInnerBorder}` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: robotTheme.spinnerAccent, boxShadow: `0 0 12px ${robotTheme.spinnerAccent}` }}
              />
            </div>

            <motion.p
              className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              Initializing AI...
            </motion.p>

            <div className="w-36 h-[2px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: robotTheme.progressBarGradient }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroRobot;
