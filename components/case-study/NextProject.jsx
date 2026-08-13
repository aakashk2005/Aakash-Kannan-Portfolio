import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { fadeIn } from "../../variants";

// 11 — Next Project navigation + "Have a project in mind?" CTA.
const NextProject = ({ prev, next }) => {
  return (
    <section className="py-16 md:py-24 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* prev / next cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-14 md:mb-20">
          {prev && (
            <motion.div variants={fadeIn("right", 0.1)} initial="hidden" animate="show">
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 h-full hover:border-white/25 transition-colors duration-300"
              >
                <span className="flex items-center gap-x-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                  <HiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
                  Previous Project
                </span>
                <span className="text-lg md:text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                  {prev.title}
                </span>
                <span className="text-xs text-white/45 font-light">{prev.category}</span>
              </Link>
            </motion.div>
          )}

          {next && (
            <motion.div variants={fadeIn("left", 0.15)} initial="hidden" animate="show">
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 h-full text-right md:items-end hover:border-white/25 transition-colors duration-300"
              >
                <span className="flex items-center gap-x-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                  Next Project
                  <HiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
                <span className="text-lg md:text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                  {next.title}
                </span>
                <span className="text-xs text-white/45 font-light">{next.category}</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          animate="show"
          className="text-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-6 py-14 md:py-20"
        >
          <h2 className="text-[26px] md:text-[40px] leading-tight font-bold text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-sm md:text-base text-white/55 font-light mb-8 max-w-md mx-auto">
            Let&apos;s build something thoughtful together — from first sketch to final product.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-[#ff6b5b] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(241,48,36,0.45)] transition-all duration-300 active:scale-95"
          >
            Let&apos;s Work Together
            <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NextProject;
