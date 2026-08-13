import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import Link from "next/link";
import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
  FaCode,
  FaBolt,
  FaGithub,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobexd,
  SiFramer,
  SiVisualstudiocode,
  SiNotion,
  SiCanva,
  SiPython,
  SiWebflow,
  SiFlutter,
  SiNextdotjs,
  SiMysql,
} from "react-icons/si";

import Avatar from "../../components/Avatar";
import ContactStrip from "../../components/ContactStrip";
import { fadeIn } from "../../variants";

//  data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Web Development",
        icons: [
          FaHtml5,
          FaCss3,
          FaJs,
          FaReact,
          SiNextdotjs,
          SiFramer,
          FaWordpress,
        ],
      },
      {
        title: "UI/UX Design",
        icons: [FaFigma, SiAdobexd, SiAdobephotoshop],
      },
    ],
  },
  {
    title: "awards",
    info: [
      {
        title: "Dark Pattern Buster 2023 — Finalist",
        stage: "IIT Varanasi (BHU)",
      },
      {
        title: "Gainwell-Bhumi Hackathon — National Finalist",
        stage: "May 2025",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "UI/UX Designer — Freelance",
        stage: "2023 - Present",
      },
      {
        title: "Web Developer — College Projects",
        stage: "2022 - 2023",
      },
      {
        title: "UI/UX Workshop Conductor",
        stage: "2024",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "B.E. Information Technology — Sri Venkateswara College of Engineering",
        stage: "2022 - Present",
      },
      {
        title: "Anthology Co-Author — Voice of Heart, Soulful Scribbles, The Syllabus of Life",
        stage: "2023 - 2024",
      },
      {
        title: "ZITA Event Organizer & Photographer",
        stage: "2023 - Present",
      },
    ],
  },
];

const toolColors = {
  "Figma": { border: "group-hover:border-[#F24E1E]/50 group-hover:shadow-[0_0_12px_rgba(242,78,30,0.25)]", text: "group-hover:text-[#F24E1E]" },
  "Webflow": { border: "group-hover:border-[#4353FF]/50 group-hover:shadow-[0_0_12px_rgba(67,83,255,0.25)]", text: "group-hover:text-[#4353FF]" },
  "FlutterFlow": { border: "group-hover:border-[#00F0FF]/50 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]", text: "group-hover:text-[#00F0FF]" },
  "Canva": { border: "group-hover:border-[#00C4CC]/50 group-hover:shadow-[0_0_12px_rgba(0,196,204,0.25)]", text: "group-hover:text-[#00C4CC]" },
  "Adobe XD": { border: "group-hover:border-[#FF9CFE]/50 group-hover:shadow-[0_0_12px_rgba(255,156,254,0.25)]", text: "group-hover:text-[#FF9CFE]" },
  "HTML5": { border: "group-hover:border-[#E34F26]/50 group-hover:shadow-[0_0_12px_rgba(227,79,38,0.25)]", text: "group-hover:text-[#E34F26]" },
  "CSS3": { border: "group-hover:border-[#1572B6]/50 group-hover:shadow-[0_0_12px_rgba(21,114,182,0.25)]", text: "group-hover:text-[#1572B6]" },
  "JavaScript": { border: "group-hover:border-[#F7DF1E]/50 group-hover:shadow-[0_0_12px_rgba(247,223,30,0.25)]", text: "group-hover:text-[#F7DF1E]" },
  "Python": { border: "group-hover:border-[#3776AB]/50 group-hover:shadow-[0_0_12px_rgba(55,118,171,0.25)]", text: "group-hover:text-[#3776AB]" },
  "VS Code": { border: "group-hover:border-[#007ACC]/50 group-hover:shadow-[0_0_12px_rgba(0,122,204,0.25)]", text: "group-hover:text-[#007ACC]" },
  "GitHub": { border: "group-hover:border-white/50 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]", text: "group-hover:text-white" },
  "n8n": { border: "group-hover:border-[#FF6F5B]/50 group-hover:shadow-[0_0_12px_rgba(255,111,91,0.25)]", text: "group-hover:text-[#FF6F5B]" },
  "SQL": { border: "group-hover:border-[#4479A1]/50 group-hover:shadow-[0_0_12px_rgba(68,121,161,0.25)]", text: "group-hover:text-[#4479A1]" },
  "Notion": { border: "group-hover:border-white/40 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]", text: "group-hover:text-white" }
};

const About = () => {
  const [index, setIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [callCopied, setCallCopied] = useState(false);

  const copyEmail = (e) => {
    // Prevent navigating away if clipboard API is active
    if (navigator.clipboard) {
      navigator.clipboard.writeText("aakashkannan05@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const copyCall = (e) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("+918778074550");
      setCallCopied(true);
      setTimeout(() => setCallCopied(false), 2000);
    }
  };

  return (
    <div className="h-full bg-primary/30 py-12 xl:py-20 text-center xl:text-left overflow-y-auto overflow-x-hidden xl:overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 relative pb-24 xl:pb-0">

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-accent/5 rounded-full blur-[90px] pointer-events-none z-10" />

      <div className="container mx-auto h-full flex flex-col justify-center gap-y-4 z-20 relative">
        {/* Top Row: Text on left, Alignment spacer on right */}
        <div className="flex flex-col items-center xl:flex-row gap-x-6 w-full">
          {/* text */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2"
            >
              Crafting Digital Experiences That <span className="text-accent">Inspire & Perform.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              className="max-w-[500px] mx-auto xl:mx-0 mb-4 xl:mb-5 px-2 xl:px-0 text-white/80 leading-relaxed text-sm xl:text-base"
            >
              I&apos;m a Creative Developer & Designer who blends
              creativity with code to build immersive digital
              experiences. From sleek user interfaces to powerful
              web applications, I turn ideas into impactful solutions
              that connect brands with people.
            </motion.p>
          </div>

          {/* Right Column: What I Do & Tools I Use Dashboard */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            animate="show"
            className="w-full xl:max-w-[48%] flex flex-col md:flex-row gap-x-8 gap-y-8 xl:gap-y-0 text-left select-none mt-4 xl:mt-0 z-10"
          >
            {/* What I Do Column */}
            <div className="flex-1 min-w-[180px]">
              <div className="flex items-center gap-x-3 text-white font-semibold text-base sm:text-lg mb-4 pb-2 border-b border-white/10 select-none">
                <FaCode className="text-accent text-lg" />
                <span>What I Do</span>
              </div>
              <ul className="flex flex-col gap-y-3">
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>UI/UX Design</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>Web Development</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>Mobile App Design</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>Python Solutions</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>No-Code Product Development</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-x-3 text-white/80 text-xs sm:text-sm font-medium cursor-default transition-colors duration-300 hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] shrink-0" />
                  <span>Brand & Digital Design</span>
                </motion.li>
              </ul>
            </div>

            {/* Vertical dashed divider */}
            <div className="hidden md:block w-[1px] border-r border-dashed border-white/10 min-h-[220px] self-stretch mx-1" />

            {/* Tools Grid Column */}
            <div className="flex-1">
              <div className="flex items-center gap-x-3 text-white font-semibold text-base sm:text-lg mb-4 pb-2 border-b border-white/10 select-none">
                <FaBolt className="text-accent text-lg animate-pulse" />
                <span>Tools I Use</span>
              </div>
              <div className="grid grid-cols-4 gap-y-4 gap-x-3">
                {[
                  { Icon: FaHtml5, label: "HTML5" },
                  { Icon: FaCss3, label: "CSS3" },
                  { Icon: FaJs, label: "JavaScript" },
                  { Icon: SiPython, label: "Python" },
                  { Icon: FaFigma, label: "Figma" },
                  { Icon: SiVisualstudiocode, label: "VS Code" },
                  { Icon: SiWebflow, label: "Webflow" },
                  { Icon: SiFlutter, label: "FlutterFlow" },
                  { Icon: FaGithub, label: "GitHub" },
                  { Icon: SiNotion, label: "Notion" },
                  { Icon: SiAdobexd, label: "Adobe XD" },
                  { Icon: SiCanva, label: "Canva" },
                  { Icon: FaProjectDiagram, label: "n8n" },
                  { Icon: SiMysql, label: "SQL" },
                ].map((tool, idx) => {
                  const colors = toolColors[tool.label] || { 
                    border: "group-hover:border-[#F13024]/50 group-hover:shadow-[0_0_12px_rgba(241,48,36,0.25)]", 
                    text: "group-hover:text-[#F13024]" 
                  };
                  return (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex flex-col items-center gap-y-1 group cursor-default"
                    >
                      <div className={`w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] rounded-lg border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 ${colors.border}`}>
                        <tool.Icon className={`text-white text-xl transition-transform duration-300 ${colors.text}`} />
                      </div>
                      <span className="text-[8.5px] md:text-[9.5px] text-white/50 tracking-wider text-center leading-tight max-w-[70px] block break-words transition-colors duration-300 group-hover:text-white">
                        {tool.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Details Grid Card (Full container width) */}
        <ContactStrip />
      </div>
    </div>
  );
};

export default About;
