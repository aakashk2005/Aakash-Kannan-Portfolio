import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 04 — Approach / Process: a visual, numbered timeline.
const ProcessTimeline = ({ process }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow="Approach"
          heading="The Process"
          intro="How the project moved from problem to product — only the stages that were actually part of the work."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {process.map((stage, i) => (
            <motion.div
              key={stage.num}
              variants={fadeIn("up", 0.1 + i * 0.1)}
              initial="hidden"
              animate="show"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden transition-colors duration-300 hover:border-white/25"
            >
              {/* oversized stage number */}
              <span
                aria-hidden
                className="absolute -top-3 right-3 text-[64px] leading-none font-bold text-white/[0.06] select-none"
              >
                {stage.num}
              </span>

              <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent/40 text-accent text-xs font-bold mb-4">
                {stage.num}
              </span>
              <h3 className="relative text-base font-semibold text-white mb-2">
                {stage.title}
              </h3>
              <p className="relative text-xs md:text-[13px] text-white/55 font-light leading-relaxed">
                {stage.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
