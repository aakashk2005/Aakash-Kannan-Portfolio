import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// Shared section heading — eyebrow label + large heading + optional intro.
// Consistent with the rest of the portfolio's section typography.
const SectionHeading = ({ eyebrow, heading, intro, align = "left" }) => {
  const center = align === "center";
  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      animate="show"
      className={`flex flex-col ${center ? "items-center text-center" : "items-start text-left"} mb-10 md:mb-14`}
    >
      {eyebrow && (
        <span className="flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-[26px] md:text-[40px] leading-tight font-bold text-white">
        {heading}
      </h2>
      {intro && (
        <p className="text-sm md:text-base text-white/60 font-light mt-4 max-w-2xl">
          {intro}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
