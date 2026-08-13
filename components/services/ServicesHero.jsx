import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaPenNib, FaCode, FaMobileAlt, FaRocket, FaPalette } from "react-icons/fa";
import { SiPython } from "react-icons/si";

const floatChips = [
  { Icon: FaPenNib, label: "UI/UX", className: "left-[4%] top-[14%]", dur: 5, delay: 0 },
  { Icon: FaCode, label: "Web", className: "left-[8%] bottom-[16%]", dur: 6, delay: 0.6 },
  { Icon: FaMobileAlt, label: "Mobile", className: "right-[6%] top-[12%]", dur: 4.5, delay: 0.3 },
  { Icon: SiPython, label: "Python", className: "right-[10%] bottom-[20%]", dur: 5.5, delay: 1 },
  { Icon: FaRocket, label: "No-Code", className: "left-[-2%] top-1/2 -translate-y-1/2", dur: 6.5, delay: 0.2 },
  { Icon: FaPalette, label: "Brand", className: "right-[-1%] top-1/2 -translate-y-1/2", dur: 5, delay: 0.8 },
];

// 01 — Services Hero
const ServicesHero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-b border-white/10 xl:min-h-full flex items-center">
      {/* ambient glows */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-12%] w-[460px] h-[460px] rounded-full bg-accent/10 blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-[-10%] w-[380px] h-[380px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] pt-20 pb-16 md:pt-28 md:pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
          {/* left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              WHAT I DO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[56px] leading-[1.08] font-bold text-white tracking-tight"
            >
              Digital Experiences Built With <span className="text-accent drop-shadow-[0_0_18px_rgba(241,48,36,0.45)]">Purpose.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[500px] text-white/60 font-light leading-[1.8]"
            >
              I&apos;m Aakash Kannan — a designer-developer who turns ideas into
              websites, apps, and automations. Clean interfaces, honest copy, and
              builds that actually do a job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch sm:items-center"
            >
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-accent to-[#ff6b5b] hover:shadow-[0_0_25px_rgba(241,48,36,0.45)] text-white font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-x-2.5 transition-all duration-300 active:scale-95 select-none"
              >
                <span>Start a Project</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-x-2.5 transition-all duration-300 active:scale-95 select-none"
              >
                <span>View My Work</span>
              </Link>
            </motion.div>
          </div>

          {/* right — abstract visual (desktop only) */}
          <div
            aria-hidden
            className="relative hidden lg:block h-[420px] xl:h-[460px] select-none pointer-events-none"
          >
            {/* grid backdrop */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.015]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
            {/* corner accent lines */}
            <div className="absolute left-0 top-0 w-16 h-16 rounded-tl-2xl border-l-2 border-t-2 border-accent/40" />
            <div className="absolute right-0 bottom-0 w-16 h-16 rounded-br-2xl border-r-2 border-b-2 border-accent/40" />

            {/* red accent guide lines */}
            <div className="absolute left-0 right-0 top-[112px] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="absolute top-0 bottom-0 left-[116px] w-px bg-gradient-to-b from-accent/40 via-accent/15 to-transparent" />

            {/* soft glow behind mock */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[240px] rounded-full bg-accent/10 blur-[90px]" />

            {/* mini browser mock */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] xl:w-[330px] rounded-xl border border-white/10 bg-[#0b0c10]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              {/* title bar */}
              <div className="flex items-center gap-x-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 h-4 flex-1 rounded-md bg-white/10" />
              </div>
              {/* skeleton content */}
              <div className="p-5 flex flex-col gap-y-3">
                <div className="h-3 w-2/3 rounded-full bg-accent/70" />
                <div className="h-3 w-1/2 rounded-full bg-white/15" />
                <div className="h-3 w-3/5 rounded-full bg-white/15" />
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <div className="h-14 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <span className="text-[9px] tracking-widest uppercase text-white/40 font-semibold">01</span>
                  </div>
                  <div className="h-14 rounded-lg border border-accent/25 bg-accent/5 flex items-center justify-center">
                    <span className="text-[9px] tracking-widest uppercase text-accent/80 font-semibold">02</span>
                  </div>
                </div>
                <div className="mt-1 h-7 w-2/5 rounded-full bg-gradient-to-r from-accent to-[#ff6b5b] opacity-90" />
              </div>
            </motion.div>

            {/* floating chips */}
            {floatChips.map(({ Icon, label, className, dur, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${className}`}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                  transition={{
                    duration: dur,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-x-2 rounded-full border border-white/10 bg-[#0b0c10]/95 backdrop-blur px-3.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                >
                  <Icon className="text-accent text-sm" />
                  <span className="text-[11px] text-white/80 font-medium">{label}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
