import { motion } from "framer-motion";
import { valueProps } from "../../data/services";

// 05 — What You Get (4 values)
const ValueSection = () => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute top-[-25%] left-[-10%] w-[360px] h-[360px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative">
        <div className="max-w-[560px] mb-12 md:mb-16">
          <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            What You Get
          </span>
          <h2 className="text-[30px] md:text-[40px] leading-tight font-bold text-white">
            Built on four <span className="text-accent">values.</span>
          </h2>
          <p className="mt-4 text-white/60 font-light leading-[1.8]">
            These aren&apos;t marketing words — they&apos;re the standards I
            hold every deliverable to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {valueProps.map(({ title, Icon, description }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.03] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.06)]"
            >
              <div className="w-12 h-12 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center text-accent text-lg mb-5 transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(var(--accent-rgb),0.25)]">
                <Icon />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
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

export default ValueSection;
