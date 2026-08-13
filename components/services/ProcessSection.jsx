import { motion } from "framer-motion";
import { processSteps } from "../../data/services";

// 04 — How I Work (4-step process)
const ProcessSection = () => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute bottom-[-20%] right-[-12%] w-[360px] h-[360px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative">
        <div className="text-center max-w-[560px] mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            How I Work
          </span>
          <h2 className="text-[30px] md:text-[40px] leading-tight font-bold text-white">
            A process built around <span className="text-accent">momentum.</span>
          </h2>
          <p className="mt-4 text-white/60 font-light leading-[1.8]">
            Four stages, no black boxes. You always know where the project is
            and what comes next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {processSteps.map(({ num, title, Icon, description }, idx) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.03] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.06)]"
            >
              <span className="absolute top-5 right-6 text-4xl font-bold text-white/[0.06] transition-colors duration-300 group-hover:text-accent/10 select-none">
                {num}
              </span>
              <div className="w-12 h-12 rounded-xl border border-accent/25 bg-accent/5 flex items-center justify-center text-accent text-xl mb-5 transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(var(--accent-rgb),0.25)]">
                <Icon />
              </div>
              <span className="text-[10px] uppercase tracking-[2.5px] font-bold text-accent/80">
                Step {num}
              </span>
              <h3 className="text-white font-semibold text-lg mt-2 mb-2">{title}</h3>
              <p className="text-[13px] text-white/55 font-light leading-relaxed mb-0">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
