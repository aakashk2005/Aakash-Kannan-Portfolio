import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { servicesData } from "../../data/services";

// 02 — Services Overview (6 service blocks)
const ServicesOverview = () => {
  const handleSelect = (index) => {
    const el = document.getElementById("services-explorer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("services:select", { detail: index }));
  };

  return (
    <div className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute -top-24 right-[-15%] w-[360px] h-[360px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-y-6 mb-12 md:mb-16">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              What I Offer
            </span>
            <h2 className="text-[30px] md:text-[40px] leading-tight font-bold text-white">
              Six ways I can <span className="text-accent">help.</span>
            </h2>
            <p className="mt-4 text-white/60 font-light leading-[1.8]">
              Each service is scoped to a real outcome — pick the one that
              matches what you&apos;re trying to do, or tap any card to jump
              into the details.
            </p>
          </div>
          <p className="hidden lg:block text-[11px] uppercase tracking-widest text-white/30 font-semibold pb-1">
            Tap a card to explore →
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {servicesData.map(({ num, title, tagline, Icon }, idx) => (
            <motion.button
              key={title}
              type="button"
              onClick={() => handleSelect(idx)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group text-left rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-y-5 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.08)] active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-accent/25 bg-accent/5 flex items-center justify-center text-accent text-xl transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]">
                  <Icon />
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-white/30">
                  {num}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-[13px] text-white/55 font-light leading-relaxed">
                  {tagline}
                </p>
              </div>
              <span className="mt-auto flex items-center gap-x-2 text-[11px] uppercase tracking-wider font-semibold text-accent opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Explore service
                <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
