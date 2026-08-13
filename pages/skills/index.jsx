import { useState } from "react";
import { motion } from "framer-motion";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import SkillsSphere from "../../components/SkillsSphere";
import Image from "next/image";
import {
  FaPenNib,
  FaCode,
  FaCog,
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaGithub,
  FaProjectDiagram,
  FaRocket,
  FaLaptopCode,
  FaBullseye,
  FaStar,
} from "react-icons/fa";
import {
  SiWebflow,
  SiFlutter,
  SiCanva,
  SiNotion,
  SiTailwindcss,
  SiVisualstudiocode,
  SiMysql,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiPython,
  SiAdobexd,
} from "react-icons/si";

const toolColors = {
  "Figma": { border: "group-hover:border-[#F24E1E]/50 group-hover:shadow-[0_0_12px_rgba(242,78,30,0.25)]", text: "group-hover:text-[#F24E1E]" },
  "Webflow": { border: "group-hover:border-[#4353FF]/50 group-hover:shadow-[0_0_12px_rgba(67,83,255,0.25)]", text: "group-hover:text-[#4353FF]" },
  "FlutterFlow": { border: "group-hover:border-[#00F0FF]/50 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]", text: "group-hover:text-[#00F0FF]" },
  "Canva": { border: "group-hover:border-[#00C4CC]/50 group-hover:shadow-[0_0_12px_rgba(0,196,204,0.25)]", text: "group-hover:text-[#00C4CC]" },
  "Adobe XD": { border: "group-hover:border-[#FF9CFE]/50 group-hover:shadow-[0_0_12px_rgba(255,156,254,0.25)]", text: "group-hover:text-[#FF9CFE]" },
  "HTML": { border: "group-hover:border-[#E34F26]/50 group-hover:shadow-[0_0_12px_rgba(227,79,38,0.25)]", text: "group-hover:text-[#E34F26]" },
  "CSS": { border: "group-hover:border-[#1572B6]/50 group-hover:shadow-[0_0_12px_rgba(21,114,182,0.25)]", text: "group-hover:text-[#1572B6]" },
  "JavaScript": { border: "group-hover:border-[#F7DF1E]/50 group-hover:shadow-[0_0_12px_rgba(247,223,30,0.25)]", text: "group-hover:text-[#F7DF1E]" },
  "Python": { border: "group-hover:border-[#3776AB]/50 group-hover:shadow-[0_0_12px_rgba(55,118,171,0.25)]", text: "group-hover:text-[#3776AB]" },
  "VS Code": { border: "group-hover:border-[#007ACC]/50 group-hover:shadow-[0_0_12px_rgba(0,122,204,0.25)]", text: "group-hover:text-[#007ACC]" },
  "GitHub": { border: "group-hover:border-white/50 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]", text: "group-hover:text-white" },
  "n8n": { border: "group-hover:border-[#FF6F5B]/50 group-hover:shadow-[0_0_12px_rgba(255,111,91,0.25)]", text: "group-hover:text-[#FF6F5B]" },
  "MySQL": { border: "group-hover:border-[#4479A1]/50 group-hover:shadow-[0_0_12px_rgba(68,121,161,0.25)]", text: "group-hover:text-[#4479A1]" },
  "Notion": { border: "group-hover:border-white/40 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]", text: "group-hover:text-white" }
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const isHighlighted = (label) => {
    if (!selectedSkill) return false;
    const cleanLabel = label.toLowerCase().replace(".js", "").replace("5", "").replace("3", "").replace("css", "").replace("html", "").trim();
    const cleanSelected = selectedSkill.toLowerCase().replace(".js", "").replace("5", "").replace("3", "").replace("css", "").replace("html", "").trim();
    return cleanLabel.includes(cleanSelected) || cleanSelected.includes(cleanLabel);
  };

  return (
    <div className="h-full bg-primary/30 py-16 xl:py-32 flex items-center overflow-y-auto overflow-x-hidden xl:overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20">
      <Circles />
      <div className="container mx-auto h-full flex flex-col justify-center">
        
        {/* Top Content Row */}
        <div className="flex flex-col xl:flex-row gap-x-12 w-full items-center xl:items-start pb-20 xl:pb-0">
          
          {/* Left Column: Heading, Description & Glowing Brain */}
          <div className="text-center xl:text-left flex flex-col xl:w-[35%] mb-8 xl:mb-0 select-none">
            <span className="text-accent text-[12px] tracking-[3px] uppercase font-bold mb-3 flex items-center justify-center xl:justify-start gap-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              MY EXPERTISE —
            </span>
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              className="h2 leading-tight mb-4"
            >
              Skills That <br className="hidden xl:inline" /> Build <span className="text-accent">Impact.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              className="max-w-[420px] mx-auto xl:mx-0 text-white/70 leading-relaxed mb-6 font-light"
            >
              I blend design thinking with clean code to craft digital experiences that are not just beautiful, but functional and user-focused.
            </motion.p>

            {/* 3D Skills Sphere (Small inline element) */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              className="flex justify-center mt-2"
            >
              <SkillsSphere selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
            </motion.div>
          </div>

          {/* Right Column: 3 Category Dashboard Cards */}
          <div className="flex-1 w-full flex flex-col gap-y-5">
            {[
              {
                title: "UI/UX DESIGN",
                desc: "Designing intuitive interfaces and seamless user journeys that connect and convert.",
                Icon: FaPenNib,
                tools: [
                  { Icon: FaFigma, label: "Figma" },
                  { Icon: SiWebflow, label: "Webflow" },
                  { Icon: SiFlutter, label: "FlutterFlow" },
                  { Icon: SiCanva, label: "Canva" },
                  { Icon: SiAdobexd, label: "Adobe XD" },
                ],
              },
              {
                title: "DEVELOPMENT",
                desc: "Building responsive, scalable and high-performance web experiences.",
                Icon: FaCode,
                tools: [
                  { Icon: FaHtml5, label: "HTML" },
                  { Icon: FaCss3, label: "CSS" },
                  { Icon: FaJs, label: "JavaScript" },
                  { Icon: SiPython, label: "Python" },
                ],
              },
              {
                title: "TOOLS & TECHNOLOGIES",
                desc: "Powering productivity and streamlining the way I build and create.",
                Icon: FaCog,
                tools: [
                  { Icon: SiVisualstudiocode, label: "VS Code" },
                  { Icon: FaGithub, label: "GitHub" },
                  { Icon: FaProjectDiagram, label: "n8n" },
                  { Icon: SiMysql, label: "MySQL" },
                  { Icon: SiNotion, label: "Notion" },
                ],
              },
            ].map((category, catIdx) => (
              <motion.div
                key={catIdx}
                variants={fadeIn("left", 0.2 * (catIdx + 1))}
                initial="hidden"
                animate="show"
                className="bg-[#0b0c10]/85 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center md:items-start gap-y-4 md:gap-y-0 gap-x-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(241,48,36,0.02)] select-none transition-shadow duration-300"
              >
                {/* Left Hexagon Icon */}
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0 mt-1 select-none">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full stroke-accent/50 fill-black/60 drop-shadow-[0_0_6px_rgba(241,48,36,0.25)]"
                    strokeWidth="4.5"
                  >
                    <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
                  </svg>
                  <div className="z-10 text-accent text-lg">
                    <category.Icon />
                  </div>
                </div>

                {/* Right Info Section */}
                <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-y-0 w-full">
                  <div className="flex flex-col text-left md:max-w-[38%]">
                    <h3 className="text-white font-bold text-base tracking-wider mb-1">
                      {category.title}
                    </h3>
                    <p className="text-white/50 text-[12px] leading-relaxed font-light">
                      {category.desc}
                    </p>
                  </div>
                  
                  {/* Tool Cards grid */}
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-3 justify-start md:justify-start md:max-w-[60%]">
                    {category.tools.map((tool, idx) => {
                      const colors = toolColors[tool.label] || { border: "group-hover:border-[#F13024]/50 group-hover:shadow-[0_0_10px_rgba(241,48,36,0.25)]", text: "group-hover:text-white" };
                      const active = isHighlighted(tool.label);
                      return (
                        <div key={idx} className="flex flex-col items-center gap-y-1 group">
                          <div className={`w-[46px] h-[46px] rounded-xl border flex items-center justify-center transition-all duration-300 ${
                            active
                              ? "border-accent shadow-[0_0_12px_rgba(241,48,36,0.35)] bg-accent/10"
                              : `border-white/10 bg-white/5 ${colors.border}`
                          }`}>
                            <tool.Icon className={`text-xl transition-all duration-300 ${
                              active
                                ? "text-accent scale-110"
                                : `text-white group-hover:scale-110 ${colors.text}`
                            }`} />
                          </div>
                          <span className={`text-[9px] tracking-wider text-center leading-tight max-w-[55px] block break-words transition-colors duration-300 ${
                            active ? "text-accent font-bold" : "text-white/40"
                          }`}>
                            {tool.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Design-oriented Quote */}
            <motion.div
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              animate="show"
              className="border-l-2 border-accent pl-4 py-2.5 text-left w-full select-none bg-accent/5 rounded-r-lg pr-4 mt-2"
            >
              <p className="text-white/70 italic text-[13px] leading-relaxed font-light mb-0">
                &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
              </p>
              <span className="text-[10px] tracking-[2px] uppercase font-bold text-accent block mt-1">
                &mdash; Steve Jobs
              </span>
            </motion.div>
          </div>

        </div>

        
      </div>
      <Bulb />
    </div>
  );
};

export default Skills;
