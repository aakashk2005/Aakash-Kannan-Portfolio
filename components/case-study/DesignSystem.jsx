import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 06 — Design System: colour palette, typography, and the key components
// that communicate the design language.
const DesignSystem = ({ designSystem }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow={designSystem.eyebrow}
          heading={designSystem.heading}
          intro={designSystem.intro}
        />

        {/* palette */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14"
        >
          {designSystem.palette.map((color) => (
            <div
              key={color.hex}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]"
            >
              <div
                className="h-24 md:h-28 w-full border-b border-white/10"
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-3 md:p-4">
                <p className="text-xs font-semibold text-white">{color.name}</p>
                <p className="text-[11px] text-white/40 font-mono mt-0.5">{color.hex}</p>
                <p className="text-[11px] text-white/55 font-light mt-1">{color.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* typography */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-5 block">
              Typography
            </span>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">
              Aa
            </p>
            <p className="text-sm text-white/60 font-light mb-6">
              {designSystem.typography.heading}
            </p>
            <p className="text-base text-white/80 font-light mb-6">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-xs text-white/50 font-light leading-relaxed border-t border-white/10 pt-4">
              {designSystem.typography.note}
            </p>
          </motion.div>

          {/* components */}
          <motion.div
            variants={fadeIn("left", 0.25)}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-5 block">
              Components
            </span>
            <ul className="flex flex-col divide-y divide-white/10">
              {designSystem.components.map((c) => (
                <li key={c.name} className="py-3.5 flex items-start justify-between gap-6">
                  <span className="text-sm font-medium text-white">{c.name}</span>
                  <span className="text-xs text-white/50 font-light text-right max-w-[240px]">
                    {c.note}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignSystem;
