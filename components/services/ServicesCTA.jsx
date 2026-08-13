import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// 07 — CTA
const ServicesCTA = () => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c10]/80 px-6 py-16 md:py-24 text-center"
        >
          {/* subtle red atmospheric glow */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[320px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.3] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-x-2 text-accent font-semibold tracking-[3px] text-[11px] uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Ready When You Are
            </span>
            <h2 className="text-[32px] md:text-[46px] leading-tight font-bold text-white max-w-[620px] mx-auto">
              Have an Idea? <br className="hidden md:block" />
              Let&apos;s <span className="text-accent drop-shadow-[0_0_18px_rgba(241,48,36,0.45)]">Build It.</span>
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-white/60 font-light leading-[1.8]">
              Tell me what you&apos;re trying to do and I&apos;ll help you shape
              it into something shippable — a site, an app, or an automation.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center items-stretch sm:items-center">
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-accent to-[#ff6b5b] hover:shadow-[0_0_25px_rgba(241,48,36,0.45)] text-white font-medium px-8 py-3.5 rounded-full flex items-center justify-center gap-x-2.5 transition-all duration-300 active:scale-95 select-none"
              >
                <span>Start a Project</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-full flex items-center justify-center gap-x-2.5 transition-all duration-300 active:scale-95 select-none"
              >
                <span>View My Work</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesCTA;
