import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Magnetic from "../components/Magnetic";
import HeroRobot from "../components/Hero/HeroRobot";

import About from "./about/index.jsx";
import Skills from "./skills/index.jsx";
import Services from "./services/index.jsx";
import Experience from "./experience/index.jsx";
import Work from "./work/index.jsx";
import Achievements from "./testimonials/index.jsx";
import Contact from "./contact/index.jsx";

import { fadeIn } from "../variants";

const Home = () => {
  // On mobile the whole portfolio is one scrollable page. When the user lands
  // on a hash (e.g. /#skills) or navigates there via the bottom nav, glide to
  // that section instead of relying on native anchor jumps (the page scrolls
  // inside its own container, not the window).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      id="home-scroll"
      className="bg-primary/60 h-full relative overflow-y-auto overflow-x-hidden xl:overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 pb-20 xl:pb-0"
    >
      {/* text */}
      <div
        id="home"
        className="w-full min-h-[100svh] xl:min-h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10 z-10 relative"
      >
        {/* particles background */}
        <ParticlesContainer />

        <div className="text-center sm:text-left flex flex-col justify-center items-center sm:items-start pt-24 pb-20 sm:pt-28 sm:pb-24 xl:pt-24 xl:pb-12 min-h-full container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 z-20 relative">


          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 font-black tracking-tight text-center sm:text-left"
          >
            Transforming Ideas <br /> Into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-[#ff6b5b] to-[#ff9a8b] drop-shadow-[0_0_20px_rgba(241,48,36,0.5)]">
              Digital Reality
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mb-6 xl:mb-8 text-center sm:text-left mx-auto sm:mx-0 border-l-2 border-accent pl-4 text-white/80 leading-relaxed"
          >
            I craft immersive digital experiences and scalable solutions that connect creativity with technology.
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-3 justify-center sm:justify-start items-stretch sm:items-center mb-4 xl:mb-6 z-40 w-full"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-accent to-[#ff6b5b] hover:shadow-[0_0_20px_rgba(241,48,36,0.4)] text-white font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-x-2 transition-all duration-300 cursor-pointer active:scale-95 select-none w-full sm:w-auto"
              >
                <span>Contact Me</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://drive.google.com/file/d/1xjrXGVtKrjtdtHRZKyZahTEOw0NgVQet/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-white/50 text-white font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-x-2 transition-all duration-300 hover:bg-white/5 cursor-pointer active:scale-95 select-none w-full sm:w-auto"
              >
                <span>Download CV</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>

          {/* circular button & slanted path connector */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex items-center gap-x-4 justify-start"
          >
            <ProjectsBtn />
            <div className="relative hidden xl:flex flex-col justify-center h-[148px]">
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex flex-col pl-16">
                <span className="text-[12px] tracking-[0.2em] font-bold text-white/70 mb-3 uppercase select-none whitespace-nowrap">
                  Explore My Work
                </span>
                <div className="relative flex items-center">
                  <svg width="240" height="32" viewBox="0 0 240 32" fill="none" className="absolute left-[-62px] top-[-15px]">
                    {/* Base Background Line */}
                    <path
                      d="M0 8 H30 L45 22 H240"
                      stroke="url(#lineGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Glowing Animated Pulse */}
                    <motion.path
                      d="M0 8 H30 L45 22 H240"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 0, strokeDasharray: "25 120" }}
                      animate={{ strokeDashoffset: -145 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "linear"
                      }}
                    />
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F13024" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#F13024" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#F13024" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Perfectly-aligned Glowing Dot Node */}
                  <div className="absolute left-[72px] top-[7px] -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#F13024] flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F13024]/40 opacity-75"></span>
                    <div className="w-2.5 h-2.5 rounded-full bg-accent z-10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* robot (desktop only — hidden entirely on mobile) */}
      <div className="hidden xl:flex w-full xl:w-[58%] h-[280px] sm:h-[340px] md:h-[420px] xl:h-full relative xl:absolute xl:right-0 xl:bottom-0 items-center justify-center z-10">
        {/* bg img */}
        <div className="hidden xl:block w-full h-full absolute translate-z-0 pointer-events-none opacity-90 mix-blend-screen overflow-hidden">
          <img
            src="/bg-hero.webp"
            alt="background graphic"
            className="absolute inset-0 w-full h-full object-contain object-center scale-115"
          />
        </div>
        {/* interactive 3D robot */}
        <div className="w-full h-full relative pointer-events-none">
          <HeroRobot />
        </div>
      </div>

      {/* Mobile-only: the remaining portfolio sections stack below the hero
          as one continuous vertically-scrollable page. Desktop never renders
          these here (it keeps the per-route experience). */}
      <div className="mobile-stack xl:hidden w-full flex flex-col">
        {[
          { id: "about", C: About },
          { id: "skills", C: Skills },
          { id: "services", C: Services },
          { id: "experience", C: Experience },
          { id: "work", C: Work },
          { id: "achievements", C: Achievements },
          { id: "contact", C: Contact },
        ].map(({ id, C }) => (
          <section key={id} id={id} className="scroll-mt-20">
            {/* Neutralize the page components' own scroll containers so each
                section grows to fit its content and the parent scrolls. */}
            <div className="[&>div]:!h-auto [&>div]:!min-h-[100svh] [&>div]:!overflow-visible">
              <C />
            </div>
          </section>
        ))}
      </div>

    </div>
  );
};

export default Home;
