import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SectionHeading from "./SectionHeading";
import Placeholder from "./Placeholder";

// Browser-style frame so labelled placeholders read as intentional screen
// mockups rather than empty boxes.
const ScreenFrame = ({ title, caption, children }) => {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors duration-300 hover:border-white/25">
      {/* browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-semibold truncate">
          {title}
        </span>
      </div>

      {/* body */}
      <div className="relative aspect-[16/10]">
        {children}
      </div>

      {/* caption */}
      {caption && (
        <figcaption className="px-4 py-3 border-t border-white/10">
          <p className="text-[11px] md:text-xs text-white/50 font-light leading-relaxed">
            {caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
};

// 07 — Key Screens: large editorial compositions (full-width, split columns).
const ScreensSection = ({ screens }) => {
  const fulls = screens.filter((s) => s.layout === "full");
  const others = screens.filter((s) => s.layout !== "full");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <SectionHeading
          eyebrow="Key Screens"
          heading="The Screens"
          intro="The core screens of the experience, presented in editorial layouts. Where a screen asset is not yet exported, a clearly-labelled placeholder marks its place."
        />

        {/* full-width screens */}
        {fulls.map((screen, i) => (
          <motion.div
            key={screen.title}
            variants={fadeIn("up", 0.1 + i * 0.05)}
            initial="hidden"
            animate="show"
            className="mb-6 md:mb-8 last:mb-0"
          >
            <ScreenFrame title={screen.title} caption={screen.caption}>
              {screen.image ? (
                <img
                  src={screen.image}
                  alt={screen.alt}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <Placeholder label={screen.title} className="absolute inset-0" />
              )}
            </ScreenFrame>
          </motion.div>
        ))}

        {/* split / standard screens */}
        {others.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {others.map((screen, i) => (
              <motion.div
                key={screen.title}
                variants={fadeIn("up", 0.1 + (i % 2) * 0.08)}
                initial="hidden"
                animate="show"
              >
                <ScreenFrame title={screen.title} caption={screen.caption}>
                  {screen.image ? (
                    <img
                      src={screen.image}
                      alt={screen.alt}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <Placeholder label={screen.title} className="absolute inset-0" />
                  )}
                </ScreenFrame>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScreensSection;
