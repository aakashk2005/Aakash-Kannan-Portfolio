import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";

// 02 — Project Overview: structured info rather than a long paragraph.
const ProjectOverview = ({ project }) => {
  const meta = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.type },
    { label: "Status", value: project.status },
    project.platform && { label: "Platform", value: project.platform },
    project.timeline && { label: "Timeline", value: project.timeline },
    { label: "Tools", value: project.tools.map((t) => t.name).join(", ") },
  ].filter(Boolean);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow="Overview"
          heading="Project Overview"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* overview text */}
          <motion.div
            variants={fadeIn("right", 0.15)}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <p className="text-sm md:text-base text-white/70 font-light leading-[1.9] max-w-[620px]">
              {project.overview}
            </p>
          </motion.div>

          {/* structured facts */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            animate="show"
            className="lg:col-span-5"
          >
            <dl className="divide-y divide-white/10 border border-white/10 rounded-2xl bg-white/[0.03]">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-6 px-5 py-4"
                >
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold pt-1 shrink-0">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-white/85 font-medium text-right">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
