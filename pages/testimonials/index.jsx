import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// Icons
import {
  FaTrophy,
  FaGlobe,
  FaBookOpen,
  FaMedal,
  FaChalkboardTeacher,
  FaCamera,
  FaDownload
} from "react-icons/fa";

// Background components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

const Achievements = () => {
  const cards = [
    {
      id: 1,
      category: "HACKATHON",
      title: "Dark Pattern Buster 2023",
      desc: "Finalist at BHU (IIT Varanasi) among 400+ teams for exposing deceptive design patterns.",
      icon: FaTrophy,
      color: "#F13024",
      glow: "rgba(241,48,36,0.18)",
    },
    {
      id: 2,
      category: "WEB DESIGN",
      title: "Official Symposium Website",
      desc: "Designed & developed the official college symposium website with improved UX and visual appeal.",
      icon: FaGlobe,
      color: "#00C2FF",
      glow: "rgba(0,194,255,0.15)",
    },
    {
      id: 3,
      category: "WRITING",
      title: "Anthology Co-Author",
      desc: "Co-authored published anthologies \"Voice of Heart\" , \"Soulful Scribbles\" & \"The Syllabus of Life\" showcasing creativity.",
      icon: FaBookOpen,
      color: "#B800FF",
      glow: "rgba(184,0,255,0.15)",
    },
    {
      id: 4,
      category: "HACKATHON",
      title: "Gainwell-Bhumi Hackathon",
      desc: "Reached the national finals of the prestigious Gainwell-Bhumi Hackathon, May 2025.",
      icon: FaMedal,
      color: "#FFB800",
      glow: "rgba(255,184,0,0.15)",
    },
    {
      id: 5,
      category: "LEADERSHIP",
      title: "UI/UX Mastery Workshop",
      desc: "Conducted a design mastery workshop for junior students, teaching UX fundamentals and Figma.",
      icon: FaChalkboardTeacher,
      color: "#00F0A0",
      glow: "rgba(0,240,160,0.15)",
    },
    {
      id: 6,
      category: "CREATIVE",
      title: "Department ZITA Organizer",
      desc: "Official photographer & event organizer for the IT association ZITA, managing coverage and logistics.",
      icon: FaCamera,
      color: "#FF6B6B",
      glow: "rgba(255,107,107,0.15)",
    }
  ];

  return (
    <div className="h-full bg-primary/30 overflow-y-auto overflow-x-hidden xl:overflow-hidden flex items-center scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20">
      <Circles />

      <div className="container mx-auto px-4 xl:px-0 flex flex-col xl:flex-row gap-x-8 gap-y-6 items-center justify-center h-full py-20 xl:py-0 pb-24 xl:pb-0">

        {/* Left Column */}
        <div className="flex flex-col w-full xl:w-[26%] text-left shrink-0">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex items-center gap-x-2 text-accent font-semibold tracking-wider text-xs uppercase mb-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Achievements By Aakash Kannan
          </motion.div>

          <motion.h2
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-[28px] xl:text-[36px] leading-tight font-bold mb-3"
          >
            Milestones That <br />
            Define{" "}
            <span className="text-accent relative">
              Growth
              <span className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-white/60 font-light text-xs leading-relaxed mb-5 max-w-[300px]"
          >
            A journey of learning, building, and pushing boundaries. These achievements reflect my passion for creating real impact.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <a
              href="https://drive.google.com/uc?export=download&id=17eLUBKogFyOJ-pcfpykR148zcQBIhSHN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium hover:bg-white/5 hover:border-accent/40 transition-all duration-300 group"
            >
              Download Resume
              <FaDownload className="text-xs transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3x2 Achievement Cards */}
        <div className="w-full xl:w-[74%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4">
            {cards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeIn("left", 0.1 * (idx + 1))}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-2xl p-4 flex flex-col gap-y-2 transition-all duration-300 cursor-default"
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 28px ${card.glow}`; e.currentTarget.style.borderColor = `${card.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = ""; }}
                >
                  <div className="flex justify-between items-center">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${card.color}10`, borderColor: `${card.color}30` }}
                    >
                      <IconComponent style={{ color: card.color }} className="text-base" />
                    </div>
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase"
                      style={{ color: `${card.color}99` }}
                    >
                      {card.category}
                    </span>
                  </div>

                  <h3 className="text-[13px] font-bold leading-tight text-white/90 group-hover:text-white transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="text-white/50 text-[11px] leading-relaxed font-light">
                    {card.desc}
                  </p>

                  <div
                    className="h-[2px] rounded-full mt-1 w-6 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: card.color, opacity: 0.45 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      <Bulb />
    </div>
  );
};

export default Achievements;
