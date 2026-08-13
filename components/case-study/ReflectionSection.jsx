import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 10 — Reflection: an honest, concise "What I learned".
const ReflectionSection = ({ reflection }) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-white/[0.015]" />

      <div className="relative container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow={reflection.eyebrow}
          heading={reflection.heading}
          intro="A short, honest account of what this project taught me."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {reflection.items.map((item, i) => (
            <motion.div
              key={item.area}
              variants={fadeIn("up", 0.1 + i * 0.1)}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 transition-colors duration-300 hover:border-white/25"
            >
              <span className="inline-block w-8 h-[2px] bg-accent mb-5" aria-hidden />
              <h3 className="text-sm md:text-base font-semibold text-white mb-2 uppercase tracking-wide">
                {item.area}
              </h3>
              <p className="text-xs md:text-[13px] text-white/55 font-light leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
