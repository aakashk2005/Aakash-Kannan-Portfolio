import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";
import Placeholder from "./Placeholder";

// Reusable narrative section used for project-specific stories:
// - steps  → numbered flow (Shopping Journey, Design Decisions, Interaction Design)
// - blocks → image + annotation rows (Behind the Interface, UX explorations)
const StorySection = ({ story, accent }) => {
  const isSteps = Array.isArray(story.steps) && story.steps.length > 0;

  if (isSteps) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <SectionHeading eyebrow={story.eyebrow} heading={story.heading} intro={story.intro} />
          <ol className="relative border-l border-white/10 ml-3">
            {story.steps.map((step, i) => (
              <motion.li
                key={step.num}
                variants={fadeIn("right", 0.1 + i * 0.08)}
                initial="hidden"
                animate="show"
                className="relative pl-8 md:pl-12 pb-10 md:pb-12 last:pb-0"
              >
                <span className="absolute -left-[9px] top-1 w-[18px] h-[18px] rounded-full bg-accent/15 border border-accent/60 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
                <div className="flex items-center gap-x-3 mb-2">
                  <span className="text-accent text-xs font-bold tracking-[0.2em]">
                    {step.num}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-white/55 font-light leading-relaxed max-w-[560px]">
                  {step.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading eyebrow={story.eyebrow} heading={story.heading} intro={story.intro} />

        <div className="flex flex-col gap-6 md:gap-8">
          {story.blocks.map((block, i) => (
            <motion.div
              key={block.title}
              variants={fadeIn("up", 0.1 + i * 0.06)}
              initial="hidden"
              animate="show"
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* numbered label */}
              <div className="flex items-center gap-x-2 mb-3">
                <span className="w-8 h-[2px] bg-accent" aria-hidden />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* title */}
              <h3 className="text-lg md:text-2xl font-semibold text-white mb-3">
                {block.title}
              </h3>
              {/* caption */}
              <p className="text-xs md:text-sm text-white/55 font-light leading-relaxed max-w-[640px]">
                {block.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default StorySection;
