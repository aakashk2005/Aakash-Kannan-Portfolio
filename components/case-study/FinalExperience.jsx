import { motion } from "framer-motion";
import { FaGithub, FaFigma, FaGlobe } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi2";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 09 — Final Experience: text-based project review with outcome highlights
// and optional project links (GitHub / Behance / Live).
const FinalExperience = ({ project }) => {
  const links = [
    project.links?.github && { label: "View on GitHub", Icon: FaGithub, href: project.links.github },
    project.links?.behance && { label: "View on Behance", Icon: FaFigma, href: project.links.behance },
    project.links?.live && { label: "View Live", Icon: FaGlobe, href: project.links.live },
  ].filter(Boolean);

  // Build review points from the project's reflection items (already in every project).
  // Falls back to an auto-generated summary if reflection is missing.
  const reviewItems = project.reflection?.items ?? [
    {
      area: "Overview",
      text: project.overview,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow="Final Product"
          heading="Project Review"
          intro={`A final look at what ${project.title} achieved — the decisions that shaped it, the outcomes delivered, and the lessons carried forward.`}
        />

        {/* Tagline highlight */}
        <motion.blockquote
          variants={fadeIn("up", 0.05)}
          initial="hidden"
          animate="show"
          className="relative mb-12 md:mb-16 pl-5 border-l-2 border-accent"
        >
          <p className="text-lg md:text-xl text-white/80 italic leading-relaxed font-light">
            &ldquo;{project.tagline}&rdquo;
          </p>
          <footer className="mt-3 text-xs md:text-sm text-white/40 uppercase tracking-widest font-semibold">
            {project.role} — {project.category}
          </footer>
        </motion.blockquote>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {reviewItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.08 + i * 0.06)}
              initial="hidden"
              animate="show"
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Area label with check icon */}
              <div className="flex items-center gap-2.5">
                <HiCheckCircle className="text-accent text-lg shrink-0" aria-hidden />
                <h3 className="text-sm font-semibold text-white/90 capitalize tracking-wide">
                  {item.area}
                </h3>
              </div>

              {/* Review text */}
              <p className="text-sm md:text-[15px] text-white/60 leading-relaxed font-light">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Status + type badges */}
        <motion.div
          variants={fadeIn("up", 0.1 + reviewItems.length * 0.06)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-3 mt-10 md:mt-12"
        >
          {project.status && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/60 font-medium tracking-wide">
              <span
                className={`w-2 h-2 rounded-full ${
                  project.status === "Complete" ? "bg-emerald-400" : "bg-amber-400"
                }`}
                aria-hidden
              />
              {project.status}
            </span>
          )}

          {project.type && (
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/60 font-medium tracking-wide">
              {project.type}
            </span>
          )}
        </motion.div>

        {/* Action links */}
        {links.length > 0 && (
          <motion.div
            variants={fadeIn("up", 0.15 + reviewItems.length * 0.06)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 mt-6 md:mt-8"
          >
            {links.map(({ label, Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent to-[#ff6b5b] text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(241,48,36,0.4)] transition-all duration-300 active:scale-95"
              >
                <Icon className="text-sm" aria-hidden />
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FinalExperience;
