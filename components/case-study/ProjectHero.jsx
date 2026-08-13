import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { fadeIn } from "../../variants";

// 01 — Project Hero
const ProjectHero = ({ project }) => {
  return (
    <div className="relative overflow-hidden border-b border-white/10">
      {/* soft accent glow */}
      <div
        aria-hidden
        className="absolute -top-32 right-[-10%] w-[420px] h-[420px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] pt-20 md:pt-24 xl:pt-[110px] pb-10 md:pb-16">
        {/* back link */}
        <motion.div
          variants={fadeIn("down", 0.05)}
          initial="hidden"
          animate="show"
          className="relative z-40 mb-8 md:mb-10"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm text-xs font-medium text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.10] transition-all duration-300 group w-fit"
          >
            <HiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1 shrink-0" />
            All Projects
          </Link>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mt-6 md:mt-10">
          {/* left — text */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeIn("right", 0.1)} initial="hidden" animate="show">
              <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                {project.category}
              </span>
              <h1 className="text-[38px] sm:text-[52px] md:text-[64px] leading-[1.05] font-bold text-white tracking-tight">
                {project.title}
              </h1>
            </motion.div>

            <motion.p
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              className="text-sm md:text-base text-white/60 font-light leading-relaxed mt-5 max-w-[520px]"
            >
              {project.tagline}
            </motion.p>

            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              animate="show"
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-[520px]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Role</span>
                <span className="text-xs sm:text-sm text-white/85 font-medium leading-snug">{project.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Type</span>
                <span className="text-xs sm:text-sm text-white/85 font-medium leading-snug">{project.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Status</span>
                <span className="text-xs sm:text-sm text-white/85 font-medium leading-snug">{project.status}</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.focus.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-[11px] text-white/70 font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* right — hero image */}
          <motion.div
            variants={fadeIn("left", 0.25)}
            initial="hidden"
            animate="show"
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <img
                src={project.image}
                alt={`${project.title} — project overview`}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
