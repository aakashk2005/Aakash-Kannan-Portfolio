import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Initializing Experience...",
  "Building Creativity...",
  "Crafting Interface...",
  "Preparing Portfolio...",
];

const TOTAL_MS = 2200;

// Pre-computed star positions: [left%, top%, size, twinkleDur, delay]
const STARS = [
  [4,8,1.5,3.1,0.0], [12,21,1,2.7,0.4], [19,14,2,4.2,0.8], [27,32,1,3.5,1.2],
  [8,45,2.5,2.9,0.2], [35,7,1,3.8,1.6], [42,28,1.5,2.5,0.6], [56,15,1,4.0,1.0],
  [63,42,2,3.3,0.3], [71,8,2.5,2.8,1.4], [78,55,1,3.6,0.7], [85,22,1.5,4.1,1.8],
  [92,38,1,2.6,0.1], [15,63,2,3.4,0.9], [22,74,1,2.9,1.5], [31,82,2.5,3.7,0.5],
  [44,91,1,4.3,1.1], [52,58,1.5,3.0,1.9], [67,69,1,2.7,0.4], [74,47,2,3.9,0.8],
  [81,84,1,4.0,1.3], [89,11,2.5,3.2,0.2], [96,66,1,2.8,1.7], [3,77,1.5,3.5,0.6],
  [11,93,1,4.1,1.0], [48,3,2,3.6,0.3], [60,80,1,2.5,1.6], [73,25,2.5,3.8,0.7],
  [87,50,1,3.1,1.2], [97,88,1.5,4.4,0.5], [6,35,1,3.3,1.8], [18,56,2,2.9,0.1],
  [29,72,1,4.0,1.4], [40,17,2.5,3.7,0.9], [53,40,1,2.6,0.4], [65,90,1.5,3.4,1.3],
  [76,60,1,4.2,0.8], [84,33,2,3.0,1.7], [93,75,1,2.8,0.2], [10,48,1.5,3.9,1.1],
];

// Energy streams: SVG paths converging from edges to center (viewBox 0 0 100 100)
const STREAMS = [
  { d: "M 0 0 Q 25 25 50 50",     delay: 0.0,  col: "rgba(241,48,36,0.55)",   dur: 2.4 },
  { d: "M 100 0 Q 75 25 50 50",   delay: 0.12, col: "rgba(241,48,36,0.55)",   dur: 2.4 },
  { d: "M 0 100 Q 25 75 50 50",   delay: 0.24, col: "rgba(241,48,36,0.45)",   dur: 2.4 },
  { d: "M 100 100 Q 75 75 50 50", delay: 0.36, col: "rgba(241,48,36,0.45)",   dur: 2.4 },
  { d: "M 50 0 L 50 50",          delay: 0.06, col: "rgba(150,30,240,0.4)",   dur: 2.2 },
  { d: "M 50 100 L 50 50",        delay: 0.18, col: "rgba(150,30,240,0.4)",   dur: 2.2 },
  { d: "M 0 50 L 50 50",          delay: 0.30, col: "rgba(150,30,240,0.35)",  dur: 2.2 },
  { d: "M 100 50 L 50 50",        delay: 0.42, col: "rgba(150,30,240,0.35)",  dur: 2.2 },
];

// Spectrum visualizer bar configurations
const SPEC_BARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  delay: ((i * 0.07) % 0.9).toFixed(2),
  dur: (0.3 + (i % 6) * 0.1).toFixed(2),
  maxH: 4 + (i % 3) * 6 + (Math.abs(i - 16) < 4 ? 8 : 0),
}));

const ORBIT_R = 92;

// Corner HUD SVG data
const CORNERS = [
  { pos: "top-5 left-5",     label: "X:2048 Y:1024", svg: <><line x1="0" y1="28" x2="0" y2="0" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><line x1="0" y1="0" x2="28" y2="0" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><circle cx="0" cy="0" r="2.5" fill="#F13024"/></> },
  { pos: "top-5 right-5",    label: "Z:0512 W:4096", svg: <><line x1="36" y1="28" x2="36" y2="0" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><line x1="36" y1="0" x2="8" y2="0" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><circle cx="36" cy="0" r="2.5" fill="#F13024"/></> },
  { pos: "bottom-5 left-5",  label: "∇:8192 Δ:0001", svg: <><line x1="0" y1="8" x2="0" y2="36" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><line x1="0" y1="36" x2="28" y2="36" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><circle cx="0" cy="36" r="2.5" fill="#F13024"/></> },
  { pos: "bottom-5 right-5", label: "Ω:9999 λ:0.7μ", svg: <><line x1="36" y1="8" x2="36" y2="36" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><line x1="36" y1="36" x2="8" y2="36" stroke="rgba(241,48,36,0.7)" strokeWidth="1.5"/><circle cx="36" cy="36" r="2.5" fill="#F13024"/></> },
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress]     = useState(0);
  const [typedText, setTypedText]   = useState("");
  const [isExiting, setIsExiting]   = useState(false);
  const [pulseRings, setPulseRings] = useState([{ id: 0 }]);
  const ringId = useRef(1);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // ── rAF-driven progress ─────────────────────────────────
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(((now - start) / TOTAL_MS) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => onCompleteRef.current?.(), 900);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Typewriter effect ───────────────────────────────────
  useEffect(() => {
    const msgGap = TOTAL_MS / MESSAGES.length;
    let curInterval;

    const typeMessage = (msg) => {
      setTypedText("");
      let idx = 0;
      curInterval = setInterval(() => {
        idx++;
        setTypedText(msg.slice(0, idx));
        if (idx >= msg.length) clearInterval(curInterval);
      }, 30);
    };

    typeMessage(MESSAGES[0]);
    const timers = MESSAGES.slice(1).map((msg, i) =>
      setTimeout(() => {
        clearInterval(curInterval);
        typeMessage(msg);
      }, (i + 1) * msgGap)
    );

    return () => {
      clearInterval(curInterval);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = ringId.current++;
      setPulseRings(prev => [...prev, { id }]);
      setTimeout(() => setPulseRings(prev => prev.filter(r => r.id !== id)), 2200);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // ── Orbiting comet math ─────────────────────────────────
  const angleDeg = (progress / 100) * 360 - 90;
  const angleRad = angleDeg * (Math.PI / 180);
  const cx = Math.cos(angleRad) * ORBIT_R;
  const cy = Math.sin(angleRad) * ORBIT_R;

  const trailDots = Array.from({ length: 6 }, (_, i) => {
    const tr = (angleDeg - (i + 1) * 9) * (Math.PI / 180);
    return {
      x: Math.cos(tr) * ORBIT_R,
      y: Math.sin(tr) * ORBIT_R,
      op: (1 - (i + 1) * 0.15) * 0.5,
      r: 3.5 - i * 0.4,
    };
  });

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, #060010 0%, #000000 70%)" }}
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.08, filter: "blur(28px)" } : {}}
      transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
    >

      {/* ── Scanlines ────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
          zIndex: 2,
        }}
      />

      {/* ── Aurora nebula blobs ───────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div style={{ position:"absolute", top:"-30%", left:"-20%", width:"80vw", height:"80vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(241,48,36,0.11) 0%, transparent 60%)", animation:"loaderPulse 4.5s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:"-30%", right:"-20%", width:"65vw", height:"65vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(120,20,240,0.09) 0%, transparent 60%)", animation:"loaderPulse 5.5s ease-in-out infinite 2s" }} />
        <div style={{ position:"absolute", top:"15%", right:"0%", width:"35vw", height:"35vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,60,200,0.07) 0%, transparent 70%)", animation:"loaderPulse 7s ease-in-out infinite 1s" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"5%", width:"25vw", height:"25vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,50,0,0.05) 0%, transparent 70%)", animation:"loaderPulse 6s ease-in-out infinite 3s" }} />
      </div>

      {/* ── Star field ───────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {STARS.map(([l, t, sz, dur, delay], i) => (
          <div
            key={i}
            style={{
              position:"absolute", left:`${l}%`, top:`${t}%`,
              width:sz, height:sz, borderRadius:"50%",
              background: i % 5 === 0 ? "rgba(241,120,100,0.9)" : i % 7 === 0 ? "rgba(180,200,255,0.9)" : "rgba(255,255,255,0.9)",
              animation:`starTwinkle ${dur}s ease-in-out infinite ${delay}s`,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      {/* ── Expanding pulse rings (centered) ─────────────────── */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }}>
        {pulseRings.map(ring => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full"
            style={{ border: "1px solid rgba(241,48,36,0.5)" }}
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 600, height: 600, opacity: 0 }}
            transition={{ duration: 2.1, ease: [0.15, 0.8, 0.35, 1] }}
          />
        ))}
      </div>

      {/* ── Energy streams SVG ───────────────────────────────── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 4 }}
      >
        {STREAMS.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            fill="none"
            stroke={s.col}
            strokeWidth="0.18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity:    [0, 0.9, 0],
            }}
            transition={{
              duration: s.dur,
              delay: s.delay,
              times: [0, 0.55, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
          />
        ))}
      </svg>

      {/* ── Rotating hexagonal wireframe rings (centered) ─────── */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 4 }}>
        <motion.svg
          width="320" height="320" viewBox="-160 -160 320 320"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position:"absolute", overflow:"visible" }}
        >
          <polygon
            points="0,-140 121.2,-70 121.2,70 0,140 -121.2,70 -121.2,-70"
            fill="none"
            stroke="rgba(241,48,36,0.1)"
            strokeWidth="0.8"
            strokeDasharray="10 6"
          />
        </motion.svg>
        <motion.svg
          width="240" height="240" viewBox="-120 -120 240 240"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ position:"absolute", overflow:"visible" }}
        >
          <circle r="115" fill="none" stroke="rgba(150,30,240,0.08)" strokeWidth="0.6" strokeDasharray="5 10" />
        </motion.svg>
        <motion.svg
          width="180" height="180" viewBox="-90 -90 180 180"
          animate={{ rotate: 180 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ position:"absolute", overflow:"visible" }}
        >
          <polygon
            points="0,-85 73.6,-42.5 73.6,42.5 0,85 -73.6,42.5 -73.6,-42.5"
            fill="none"
            stroke="rgba(241,48,36,0.07)"
            strokeWidth="0.5"
          />
        </motion.svg>
      </div>

      {/* ── Orbit track + comet (centered) ───────────────────── */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
        <svg
          width={ORBIT_R * 2 + 40}
          height={ORBIT_R * 2 + 40}
          viewBox={`${-(ORBIT_R+20)} ${-(ORBIT_R+20)} ${(ORBIT_R+20)*2} ${(ORBIT_R+20)*2}`}
          style={{ overflow:"visible" }}
        >
          <defs>
            <filter id="cometGlow">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="orbitGlow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          {/* Orbit track */}
          <circle r={ORBIT_R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          {/* Comet trail */}
          {trailDots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="#F13024" opacity={dot.op} />
          ))}
          {/* Comet glow halo */}
          <circle cx={cx} cy={cy} r={14} fill="rgba(241,48,36,0.25)" filter="url(#orbitGlow)" />
          {/* Comet core */}
          <circle cx={cx} cy={cy} r={4.5} fill="#F13024" filter="url(#cometGlow)" />
          <circle cx={cx} cy={cy} r={2.5} fill="white" opacity={0.9} />
        </svg>
      </div>

      {/* ── Corner HUD tech brackets ──────────────────────────── */}
      {CORNERS.map(({ pos, label, svg }, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute ${pos} pointer-events-none`}
          style={{ zIndex: 8 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.23,1,0.32,1] }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">{svg}</svg>
          <div style={{ fontSize:7, color:"rgba(241,48,36,0.5)", fontFamily:"monospace", letterSpacing:"0.08em", marginTop:3 }}>
            {label}
          </div>
        </motion.div>
      ))}

      {/* ── Center content ─────────────────────────────────────── */}
      <div className="relative flex flex-col items-center gap-5" style={{ zIndex: 10 }}>

        {/* Glowing initials with chromatic aberration */}
        <div className="relative flex gap-4 items-baseline" aria-label="Aakash Kannan initials">
          {/* Cyan ghost (chromatic shift) */}
          <span
            aria-hidden
            className="absolute font-bold leading-none select-none pointer-events-none"
            style={{
              fontSize:"clamp(68px,10vw,118px)", fontFamily:"var(--font-sora),sans-serif",
              letterSpacing:"-0.02em", color:"rgba(0,255,230,0.15)",
              mixBlendMode:"screen", transform:"translate(-3px, 2px)",
              animation:"glitchShift 7s ease-in-out infinite 1.5s",
              left:0, top:0, width:"100%",
            }}
          >AK</span>
          {/* Red ghost (chromatic shift) */}
          <span
            aria-hidden
            className="absolute font-bold leading-none select-none pointer-events-none"
            style={{
              fontSize:"clamp(68px,10vw,118px)", fontFamily:"var(--font-sora),sans-serif",
              letterSpacing:"-0.02em", color:"rgba(255,0,80,0.15)",
              mixBlendMode:"screen", transform:"translate(3px, -2px)",
              animation:"glitchShift 7s ease-in-out infinite 2s",
              left:0, top:0, width:"100%",
            }}
          >AK</span>
          {/* Primary letters */}
          {["A","K"].map((letter, i) => (
            <motion.span
              key={letter}
              className="text-white font-bold leading-none select-none"
              style={{
                fontSize:"clamp(68px,10vw,118px)", fontFamily:"var(--font-sora),sans-serif",
                letterSpacing:"-0.02em",
                textShadow:"0 0 60px rgba(241,48,36,0.6), 0 0 120px rgba(241,48,36,0.25), 0 0 200px rgba(241,48,36,0.1)",
                animation:`glitchShift 8s ease-in-out infinite ${i === 0 ? "2.2s" : "2.7s"}`,
              }}
              initial={{ y:90, opacity:0, filter:"blur(20px)", scale:0.75 }}
              animate={{ y:0, opacity:1, filter:"blur(0px)", scale:1 }}
              transition={{ duration:1.1, delay:0.2 + i * 0.15, ease:[0.23,1,0.32,1] }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Glowing accent underline */}
        <motion.div
          className="rounded-full"
          style={{
            height:1.5,
            background:"linear-gradient(90deg,transparent,rgba(241,48,36,0.4) 15%,#F13024 40%,#ff7e79 60%,rgba(241,48,36,0.4) 85%,transparent)",
            boxShadow:"0 0 20px rgba(241,48,36,1), 0 0 60px rgba(241,48,36,0.6)",
          }}
          initial={{ width:0, opacity:0 }}
          animate={{ width:185, opacity:1 }}
          transition={{ duration:1.0, delay:0.52, ease:[0.23,1,0.32,1] }}
        />

        {/* Progress percentage — large mono display */}
        <motion.div
          className="flex items-start"
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.65 }}
        >
          <span
            className="text-white font-light tabular-nums"
            style={{ fontSize:20, fontFamily:"var(--font-sora),sans-serif", letterSpacing:"0.12em" }}
          >
            {Math.floor(progress).toString().padStart(3, "0")}
          </span>
          <span className="text-accent font-light" style={{ fontSize:11, marginTop:3, marginLeft:1 }}>%</span>
        </motion.div>

        {/* Typewriter message + blinking cursor */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.75 }}
          style={{ minHeight:18 }}
        >
          <span
            className="text-white/35 text-[9px] tracking-[0.32em] uppercase"
            style={{ fontFamily:"var(--font-sora),sans-serif", minWidth:"24ch", textAlign:"center" }}
          >
            {typedText}
            <span
              className="inline-block bg-accent align-middle ml-px"
              style={{ width:1.5, height:10, animation:"cursorBlink 0.9s step-end infinite" }}
            />
          </span>
        </motion.div>
      </div>

      {/* ── Spectrum visualizer ───────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute bottom-10 pointer-events-none flex items-end gap-[2px]"
        style={{ left:"50%", transform:"translateX(-50%)", zIndex:8 }}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:0.9 }}
      >
        {SPEC_BARS.map(bar => (
          <div
            key={bar.id}
            style={{
              width:2, minHeight:2,
              background:"linear-gradient(to top, rgba(241,48,36,0.9), rgba(241,100,80,0.3))",
              borderRadius:1,
              animation:`specWave ${bar.dur}s ease-in-out infinite ${bar.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* ── System data footer ────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute bottom-4 flex justify-center w-full pointer-events-none"
        initial={{ opacity:0 }}
        animate={{ opacity:0.28 }}
        transition={{ delay:1.0 }}
        style={{ zIndex:8 }}
      >
        <span style={{ fontSize:7, color:"rgba(241,48,36,0.7)", fontFamily:"monospace", letterSpacing:"0.3em" }}>
          SYS.BOOT ◆ {Math.floor(progress).toString().padStart(3,"0")}% ◆ {["STANDBY ","LOADING ","ACTIVE  ","OPTIMAL "][Math.min(Math.floor(progress / 25), 3)]}◆ VER 2.0.24
        </span>
      </motion.div>

      {/* ── Cinematic movie-edit shutter panels ────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#030008] border-b border-accent/20 z-[999] pointer-events-none"
        initial={{ height: "50vh" }}
        animate={
          isExiting
            ? { height: "0vh" }
            : progress < 15
            ? { height: "50vh" }
            : progress > 90
            ? { height: "50vh" }
            : { height: "12vh" }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
          mass: 0.8,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-[#030008] border-t border-accent/20 z-[999] pointer-events-none"
        initial={{ height: "50vh" }}
        animate={
          isExiting
            ? { height: "0vh" }
            : progress < 15
            ? { height: "50vh" }
            : progress > 90
            ? { height: "50vh" }
            : { height: "12vh" }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
          mass: 0.8,
        }}
      />

      {/* ── Cinematic Shutter Chromatic Flash ────────────────── */}
      {progress > 90 && !isExiting && (
        <motion.div
          className="absolute inset-0 bg-accent/20 z-[1000] pointer-events-none mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0, 0.8, 0] }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      )}

    </motion.div>
  );
};

export default LoadingScreen;
