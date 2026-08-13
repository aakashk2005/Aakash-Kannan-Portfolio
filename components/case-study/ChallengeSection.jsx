import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// 03 — The Challenge: a large heading + concise paragraph that visually
// emphasises the problem being solved.
const ChallengeSection = ({ challenge }) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* subtle section tint to set it apart */}
      <div aria-hidden className="absolute inset-0 bg-white/[0.015]" />

      <div className="relative container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="max-w-[820px]">
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            animate="show"
            className="flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            The Challenge
          </motion.div>

          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            className="text-[30px] md:text-[52px] leading-[1.15] font-bold text-white mb-6"
          >
            {challenge.heading}
          </motion.h2>

          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            className="border-l-2 border-accent pl-5 md:pl-7"
          >
            <p className="text-sm md:text-[17px] text-white/70 font-light leading-[1.9] max-w-[720px]">
              {challenge.text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
