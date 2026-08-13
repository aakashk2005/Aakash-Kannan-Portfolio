import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import {
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaTimes,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

const milestonesData = [
  {
    step: "01",
    title: "Secondary School Certificate",
    inst: "Sri Ragavendra Matric School",
    loc: "Komarapalayam, Tamil Nadu",
    dur: "2019 - 2020",
    stats: "Percentage : 65.8",
    color: "#00F0FF",
    borderClass: "border-[#00F0FF]/30 hover:border-[#00F0FF]/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
    glowClass: "shadow-[0_0_8px_rgba(0,240,255,0.4)]",
    Icon: FaBuilding,
    details: [
      "Acquired strong mathematical, logical, and scientific reasoning foundations.",
      "Participated in school-level science exhibits and computational thinking seminars.",
      "Graduated with a first-class percentage of 65.8%."
    ]
  },
  {
    step: "02",
    title: "Higher Secondary Education",
    inst: "Einstein Matric Hr. Sec. School",
    loc: "Komarapalayam, Tamil Nadu",
    dur: "2020 - 2022",
    stats: "Percentage : 80.83",
    color: "#B800FF",
    borderClass: "border-[#B800FF]/30 hover:border-[#B800FF]/60 hover:shadow-[0_0_15px_rgba(184,0,255,0.2)]",
    glowClass: "shadow-[0_0_8px_rgba(184,0,255,0.4)]",
    Icon: FaGraduationCap,
    details: [
      "Specialized in Mathematics, Computer Science, Physics, and Chemistry.",
      "Built initial logic foundations by learning C++ programming principles and basic algorithm design.",
      "Graduated with a high-performance rank of 80.83%."
    ]
  },
  {
    step: "03",
    title: "B.Tech in IT",
    inst: "K.S.Rangasamy College of Tech",
    loc: "Tiruchengode, Tamil Nadu",
    dur: "2022 - 2026",
    stats: "CGPA : 7.35",
    color: "#F13024",
    borderClass: "border-[#F13024]/30 hover:border-[#F13024]/60 hover:shadow-[0_0_15px_rgba(241,48,36,0.2)]",
    glowClass: "shadow-[0_0_8px_rgba(241,48,36,0.4)]",
    Icon: FaGraduationCap,
    details: [
      "Currently pursuing B.Tech in Information Technology with a solid focus on application design.",
      "Gaining hands-on development expertise across full-stack languages, databases (MySQL), and systems engineering.",
      "Maintaining a strong academic performance of 7.35 CGPA."
    ]
  },
  {
    step: "04",
    title: "UI/UX Designer Intern",
    inst: "Zhahi Infotech",
    loc: "Theni, Tamil Nadu",
    dur: "March 2024 - May 2024",
    stats: "",
    color: "#00F0FF",
    borderClass: "border-[#00F0FF]/30 hover:border-[#00F0FF]/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
    glowClass: "shadow-[0_0_8px_rgba(0,240,255,0.4)]",
    Icon: FaBriefcase,
    details: [
      "Designing responsive UI layouts, mobile modules, and client dashboard wireframes.",
      "Collaborating with engineering leads to translate design templates directly into clean coding interfaces.",
      "Conducting user research loops to identify and remove interface friction points."
    ]
  }
];

const Experience = () => {
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="h-full bg-primary/30 py-16 xl:py-32 flex items-center justify-center overflow-y-auto overflow-x-hidden xl:overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 relative">
      <Circles />

      {/* Tech Grid Blueprint Overlay */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage: "radial-gradient(circle at center, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 75%)",
        }}
      />

      {/* Ambient background glow orbs */}
      <div className="hidden sm:block absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] lg:w-[550px] h-[280px] lg:h-[550px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-1/2 right-1/4 -translate-y-1/2 w-[240px] lg:w-[450px] h-[240px] lg:h-[450px] bg-[#B800FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto h-full flex flex-col justify-center py-6 select-none max-w-[1200px] px-4 md:px-0 pb-24 xl:pb-0 z-20 relative">
        
        {/* Centered Heading Block */}
        <div className="text-center flex flex-col items-center mb-8">
          <span className="text-accent text-[11px] tracking-[3px] uppercase font-bold mb-2 flex items-center gap-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            MY JOURNEY
          </span>
          <motion.h2
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="h2 leading-none mb-3"
          >
            Career <span className="text-accent">Timeline.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] text-white/60 text-xs font-light leading-relaxed"
          >
            A clean chronological path of my educational milestones and professional internships. Click on any card below to view my key achievements.
          </motion.p>
        </div>

        {/* Horizontal Timeline Row Container */}
        <div className="relative w-full flex items-center justify-center mt-6">
          
          {/* Horizontal static background connector line (hidden on mobile) */}
          <div className="hidden md:block absolute w-[74%] h-[2px] bg-white/10 top-6 left-1/2 -translate-x-1/2 z-0" />

          {/* Active progressive laser beam line (hidden on mobile) */}
          <motion.div
            animate={{
              width: hoveredIdx === null ? "74%" : hoveredIdx === 0 ? "0%" : hoveredIdx === 1 ? "24.6%" : hoveredIdx === 2 ? "49.3%" : "74%"
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            style={{ 
              boxShadow: "0 0 10px #F13024, 0 0 20px #00C2FF"
            }}
            className="hidden md:block absolute h-[2px] bg-gradient-to-r from-accent via-purple-500 to-cyan-400 top-6 left-[13%] z-10 origin-left"
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-[1100px] z-10">
            {milestonesData.map((milestone, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn("up", 0.15 * (idx + 1))}
                initial="hidden"
                animate="show"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                onClick={() => setActiveMilestone(milestone)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex flex-col items-center group cursor-pointer active:scale-98"
              >
                {/* Glowing Node Circle on the line */}
                <div
                  style={{ borderColor: milestone.color }}
                  className="w-12 h-12 rounded-full bg-[#0b0c10] border-[3px] shadow-lg flex flex-col items-center justify-center z-20 mb-4 transition-all duration-300 group-hover:scale-105"
                >
                  <milestone.Icon style={{ color: milestone.color }} className="text-xs mb-0.5" />
                  <span className="text-white text-[8px] font-extrabold leading-none">{milestone.step}</span>
                </div>

                {/* Content Card below node */}
                <div className={`bg-[#0b0c10]/85 border ${milestone.borderClass} rounded-2xl p-4 w-full text-left shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 min-h-[145px] flex flex-col justify-between`}>
                  <div>
                    <h3 style={{ color: milestone.color }} className="font-bold text-[11px] tracking-wider uppercase mb-1 line-clamp-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/80 text-[9.5px] font-medium leading-tight mb-0.5 line-clamp-1">{milestone.inst}</p>
                    <p className="text-white/40 text-[9px] font-light mb-2">{milestone.loc}</p>
                  </div>
                  <div className="text-white/60 text-[9px] font-semibold border-t border-white/5 pt-2 flex flex-wrap items-center justify-between gap-1">
                    <span>{milestone.dur}</span>
                    {milestone.stats && <span className="opacity-80">{milestone.stats.replace("Percentage : ", "").replace("CGPA : ", "")}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
      <Bulb />

      {/* Interactive Detail Modal Backdrop */}
      <AnimatePresence>
        {activeMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#07080a]/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setActiveMilestone(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={{ borderColor: activeMilestone.color }}
              className="bg-[#0b0c10] border-2 rounded-2xl w-full max-w-[480px] p-6 md:p-8 relative text-left shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMilestone(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-200 text-lg"
              >
                <FaTimes />
              </button>

              {/* Tag / Step badge */}
              <div className="flex items-center gap-x-2.5 mb-4">
                <span style={{ color: activeMilestone.color, borderColor: activeMilestone.color }} className="border rounded-lg px-2.5 py-0.5 text-[10px] tracking-[1.5px] uppercase font-extrabold select-none">
                  Step {activeMilestone.step}
                </span>
                <div style={{ backgroundColor: activeMilestone.color }} className="h-[1px] flex-1 opacity-20" />
              </div>

              {/* Title & Info */}
              <h2 className="text-white font-extrabold text-lg md:text-xl tracking-wide leading-tight mb-2">
                {activeMilestone.title}
              </h2>
              <h3 className="text-white/80 font-semibold text-sm mb-1">{activeMilestone.inst}</h3>
              <p className="text-white/40 text-xs font-light mb-4">{activeMilestone.loc}</p>

              {/* Date & Grade info grid */}
              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-3 mb-5 text-left">
                <div className="flex items-center gap-x-2">
                  <FaCalendarAlt style={{ color: activeMilestone.color }} className="text-xs" />
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Duration</span>
                    <span className="text-white/80 text-xs font-medium">{activeMilestone.dur}</span>
                  </div>
                </div>
                {activeMilestone.stats && (
                  <div className="flex items-center gap-x-2">
                    <div style={{ color: activeMilestone.color }} className="text-xs font-bold leading-none select-none">
                      %
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Performance</span>
                      <span className="text-white/80 text-xs font-medium">{activeMilestone.stats.replace("Percentage : ", "").replace("CGPA : ", "")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Points */}
              <div className="flex flex-col gap-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Key Achievements & Details</h4>
                {activeMilestone.details.map((point, pIdx) => (
                  <div key={pIdx} className="flex gap-x-3 items-start text-left">
                    <FaArrowRight style={{ color: activeMilestone.color }} className="text-[10px] mt-1 shrink-0 opacity-70 animate-pulse" />
                    <p className="text-white/60 text-xs leading-relaxed font-light">{point}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
