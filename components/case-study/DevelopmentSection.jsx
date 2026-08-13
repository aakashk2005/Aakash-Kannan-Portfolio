import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 08 — Development: technology stack → architecture/implementation →
// important functionality.
const DevelopmentSection = ({ development }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow={development.eyebrow}
          heading={development.heading}
          intro={development.intro}
        />

        {/* stack flow */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 md:mb-14"
        >
          {development.stack.map((tech, i) => (
            <div key={tech.name} className="flex items-center gap-3 md:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 md:px-5 py-3 text-center hover:border-white/25 transition-colors duration-300">
                <p className="text-sm md:text-base font-semibold text-white">{tech.name}</p>
                <p className="text-[10px] md:text-[11px] text-white/45 font-light mt-0.5">
                  {tech.note}
                </p>
              </div>
              {i < development.stack.length - 1 && (
                <HiArrowRight
                  className="text-accent text-base md:text-lg shrink-0"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* architecture / functionality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {development.points.map((point, i) => (
            <motion.div
              key={point.title}
              variants={fadeIn("up", 0.1 + i * 0.1)}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/25"
            >
              <span className="inline-block text-accent text-[11px] font-bold tracking-[0.2em] mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-white mb-2">{point.title}</h3>
              <p className="text-xs md:text-[13px] text-white/55 font-light leading-relaxed">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSection;
