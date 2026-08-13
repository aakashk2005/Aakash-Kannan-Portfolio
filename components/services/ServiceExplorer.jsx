import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa";
import { servicesData, toolDefinitions } from "../../data/services";

// Shared panel used by both the desktop column and the mobile accordion.
const ServicePanel = ({ service }) => {
  const { num, title, tagline, description, deliverables, tools, idealFor } = service;

  return (
    <div>
      <div className="flex items-center gap-x-3 mb-4">
        <span className="text-[11px] font-bold tracking-widest text-accent">
          SERVICE {num}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
      <h3 className="text-[24px] md:text-[28px] font-bold text-white tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-[15px] text-accent/90 font-medium leading-relaxed mb-5">
        {tagline}
      </p>
      <p className="text-sm md:text-[15px] text-white/60 font-light leading-[1.8] mb-8 max-w-[640px]">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 mb-8">
        {/* deliverables */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[2.5px] font-bold text-white/40 mb-4">
            What&apos;s Included
          </h4>
          <ul className="flex flex-col gap-y-3">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-x-3 text-[13px] md:text-sm text-white/70 font-light leading-relaxed"
              >
                <span className="mt-0.5 w-4 h-4 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center shrink-0">
                  <FaCheck className="text-[8px] text-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* tools */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[2.5px] font-bold text-white/40 mb-4">
            Tools I&apos;ll Use
          </h4>
          <div className="flex flex-wrap gap-4">
            {tools.map((label) => {
              const def = toolDefinitions[label];
              const Icon = def?.Icon || FaCheck;
              return (
                <div
                  key={label}
                  className="flex flex-col items-center gap-y-1.5 group cursor-default"
                  style={{ "--brand": def?.color || "#F13024" }}
                >
                  <div className="w-[54px] h-[54px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[color:var(--brand)] group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.15)]">
                    <Icon className="text-white text-xl transition-colors duration-300 group-hover:text-[color:var(--brand)]" />
                  </div>
                  <span className="text-[9px] tracking-wider text-white/40 text-center leading-tight max-w-[60px] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-6">
        <div className="flex-1 rounded-xl border-l-2 border-accent bg-accent/5 p-4">
          <span className="flex items-center gap-x-2 text-[10px] uppercase tracking-[2px] font-bold text-accent mb-1.5">
            <FaBullseye className="text-xs" />
            Best For
          </span>
          <p className="text-[13px] text-white/70 font-light leading-relaxed mb-0">
            {idealFor}
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-x-2.5 text-sm font-semibold text-accent hover:text-white transition-colors duration-300 whitespace-nowrap"
        >
          Start this project
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

// 03 — Interactive Service Explorer
const ServiceExplorer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  // Allow the Overview cards to deep-link into a specific service.
  useEffect(() => {
    const handler = (e) => setActiveIndex(e.detail);
    window.addEventListener("services:select", handler);
    return () => window.removeEventListener("services:select", handler);
  }, []);

  const handleKeyNav = (e) => {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
        ? -1
        : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (activeIndex + dir + servicesData.length) % servicesData.length;
    setActiveIndex(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  };

  return (
    <div
      id="services-explorer"
      className="relative overflow-hidden border-b border-white/10 py-20 md:py-28 scroll-mt-4"
    >
      <div
        aria-hidden
        className="absolute top-[10%] left-[-12%] w-[380px] h-[380px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative">
        <div className="max-w-[560px] mb-12 md:mb-16">
          <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Service Details
          </span>
          <h2 className="text-[30px] md:text-[40px] leading-tight font-bold text-white">
            Pick a service, <br className="hidden md:block" />
            see what&apos;s <span className="text-accent">inside.</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b0c10]/70 overflow-hidden">
          <div className="flex flex-col xl:flex-row">
            {/* tab list (mobile = accordion headers, desktop = side list) */}
            <div
              ref={listRef}
              role="tablist"
              aria-label="Services"
              onKeyDown={handleKeyNav}
              className="w-full xl:w-[360px] xl:shrink-0 xl:border-r xl:border-white/10 flex flex-col"
            >
              {servicesData.map(({ num, title, Icon }, idx) => {
                const active = idx === activeIndex;
                return (
                  <div
                    key={title}
                    className="border-b border-white/10 last:border-b-0 xl:border-b xl:last:border-b-0"
                  >
                    <button
                      id={`service-tab-${idx}`}
                      role="tab"
                      aria-selected={active}
                      aria-expanded={active}
                      aria-controls={`service-panel-${idx}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-full flex items-center gap-x-4 px-5 py-5 text-left transition-colors duration-300 cursor-pointer ${
                        active
                          ? "text-white bg-white/[0.04]"
                          : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="serviceTabIndicator"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent shadow-[0_0_10px_#F13024]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          active
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-white/10 bg-white/5 text-white/50"
                        }`}
                      >
                        <Icon className="text-sm" />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold tracking-widest text-accent/80">
                          {num}
                        </span>
                        <span className="text-sm font-medium truncate">{title}</span>
                      </span>
                      <FaChevronDown
                        className={`ml-auto text-xs shrink-0 transition-all duration-300 xl:hidden ${
                          active ? "rotate-180 text-accent" : "text-white/30"
                        }`}
                      />
                    </button>

                    {/* mobile inline panel (accordion body) */}
                    <div className="xl:hidden overflow-hidden">
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.div
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-7 pt-1 border-t border-white/10">
                              <ServicePanel service={servicesData[idx]} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* desktop panel column */}
            <div className="hidden xl:block flex-1 p-8 lg:p-10 min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  id={`service-panel-${activeIndex}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${activeIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServicePanel service={servicesData[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceExplorer;
