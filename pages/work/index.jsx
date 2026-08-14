import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "../../variants";

// Icons
import { 
  FaFigma, 
  FaHtml5, 
  FaCss3, 
  FaJs,
  FaDatabase,
  FaJava
} from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { RxArrowTopRight } from "react-icons/rx";
import { HiArrowRight } from "react-icons/hi2";

// Background components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

const Work = () => {
  const projects = [
    {
      id: "01",
      slug: "fixura",
      title: "Fixura",
      category: "Web Design",
      desc: "A modern website for a construction & interior company. Clean, responsive and built to showcase trust & quality.",
      image: "/project-fixura.webp",
      link: "https://www.behance.net/gallery/212585949/UIUX-Mobile-App",
      themeColor: "red",
      techs: [
        { name: "Figma", icon: FaFigma, colorClass: "text-[#F24E1E]", borderClass: "border-[#F24E1E]/20", bgClass: "bg-[#F24E1E]/5 hover:bg-[#F24E1E]/10" }
      ],
      glowClass: "hover:shadow-[0_0_35px_rgba(241,48,36,0.25)] hover:border-accent/50",
      pillClass: "border-accent/30 text-accent bg-accent/5",
      numClass: "border-accent/30 text-accent bg-accent/5",
      arrowClass: "border-accent/30 text-accent group-hover:bg-accent group-hover:text-white"
    },
    {
      id: "02",
      slug: "web-cricket",
      title: "Web Cricket",
      category: "Web App",
      desc: "A lightweight browser-based cricket game. Play quick matches with simple controls and smooth performance.",
      image: "/project-cricket.webp",
      link: "https://github.com/aakashk2005/Web-Cricket-using-HTML-CSS-JS",
      themeColor: "purple",
      techs: [
        { name: "HTML5", icon: FaHtml5, colorClass: "text-[#E34F26]", borderClass: "border-[#E34F26]/20", bgClass: "bg-[#E34F26]/5 hover:bg-[#E34F26]/10" },
        { name: "CSS3", icon: FaCss3, colorClass: "text-[#1572B6]", borderClass: "border-[#1572B6]/20", bgClass: "bg-[#1572B6]/5 hover:bg-[#1572B6]/10" },
        { name: "JavaScript", icon: FaJs, colorClass: "text-[#F7DF1E]", borderClass: "border-[#F7DF1E]/20", bgClass: "bg-[#F7DF1E]/5 hover:bg-[#F7DF1E]/10" }
      ],
      glowClass: "hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:border-purple-500/50",
      pillClass: "border-purple-500/30 text-purple-400 bg-purple-500/5",
      numClass: "border-purple-500/30 text-purple-400 bg-purple-500/5",
      arrowClass: "border-purple-500/30 text-purple-400 group-hover:bg-purple-500 group-hover:text-white"
    },
    {
      id: "03",
      slug: "reeltalks",
      title: "ReelTalks",
      category: "Web Design",
      desc: "A cinematic platform for movie lovers to explore, review & celebrate films. Dark theme with bold visuals.",
      image: "/project-reeltalks.webp",
      link: "https://www.behance.net/gallery/230067247/ReelTalks-A-Cinematic-UI-Experience-for-Movie-Lovers",
      themeColor: "blue",
      techs: [
        { name: "Figma", icon: FaFigma, colorClass: "text-[#F24E1E]", borderClass: "border-[#F24E1E]/20", bgClass: "bg-[#F24E1E]/5 hover:bg-[#F24E1E]/10" }
      ],
      glowClass: "hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] hover:border-blue-500/50",
      pillClass: "border-blue-500/30 text-blue-400 bg-blue-500/5",
      numClass: "border-blue-500/30 text-blue-400 bg-blue-500/5",
      arrowClass: "border-blue-500/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
    },
    {
      id: "04",
      slug: "vaagai-kart",
      title: "VaagaiCart",
      category: "Team Project",
      desc: "E-Commerce Product Catalog with a normalized relational database schema. Built REST APIs on top for full-stack product, order & user management.",
      image: "/project-vaagaicart.webp",
      link: "https://github.com/aakashk2005/VaagaiCart-E-Commerce-Product-Catalog",
      themeColor: "green",
      techs: [
        { name: "SQL", icon: FaDatabase, colorClass: "text-[#00C49F]", borderClass: "border-[#00C49F]/20", bgClass: "bg-[#00C49F]/5 hover:bg-[#00C49F]/10" },
        { name: "MySQL", icon: SiMysql, colorClass: "text-[#4479A1]", borderClass: "border-[#4479A1]/20", bgClass: "bg-[#4479A1]/5 hover:bg-[#4479A1]/10" },
        { name: "Java", icon: FaJava, colorClass: "text-[#ED8B00]", borderClass: "border-[#ED8B00]/20", bgClass: "bg-[#ED8B00]/5 hover:bg-[#ED8B00]/10" },
        { name: "REST API", icon: FaDatabase, colorClass: "text-[#00C49F]", borderClass: "border-[#00C49F]/20", bgClass: "bg-[#00C49F]/5 hover:bg-[#00C49F]/10" }
      ],
      glowClass: "hover:shadow-[0_0_35px_rgba(0,196,159,0.25)] hover:border-emerald-500/50",
      pillClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      numClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      arrowClass: "border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white"
    }
  ];

  return (
    <div className="h-full bg-primary/30 overflow-y-auto overflow-x-hidden xl:overflow-hidden xl:flex xl:items-center scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20">
      <Circles />

      {/* Main Container */}
      <div className="container mx-auto px-4 xl:px-0 flex flex-col xl:flex-row gap-x-8 gap-y-6 xl:items-center xl:justify-center h-full py-24 xl:py-0 pb-24 xl:pb-0">

        {/* Left Column: Heading & Description */}
        <div className="flex flex-col w-full xl:w-[26%] text-left shrink-0">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex items-center gap-x-2 text-accent font-semibold tracking-wider text-xs uppercase mb-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            MY PROJECTS
          </motion.div>

          <motion.h2
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-[28px] xl:text-[36px] leading-tight font-bold mb-3"
          >
            Ideas Turned <br />
            Into <span className="text-accent relative">
              Impact
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
            Projects that reflect my passion for design, development, and problem-solving. Each crafted with purpose.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-x-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300 group"
            >
              Explore All Projects
              <HiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Projects grid */}
        <div className="w-full xl:w-[74%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={fadeIn("left", 0.15 * (idx + 1))}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col justify-between transition-all duration-500 h-full ${project.glowClass}`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-x-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${project.numClass}`}>
                      {project.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${project.pillClass}`}>
                      {project.category}
                    </span>
                  </div>
                  <span className="text-white/50 group-hover:text-white transition-colors duration-300" aria-hidden>
                    <RxArrowTopRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Thumbnail + Title (click → case study) */}
                <Link href={`/work/${project.slug}`} className="block flex-1">
                  <div className="relative w-full h-[90px] sm:h-[55px] rounded-xl overflow-hidden bg-black/40 my-1.5 border border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xs sm:text-[14.5px] font-bold text-white mb-0.5 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-[10px] line-clamp-2 leading-relaxed font-light">
                      {project.desc}
                    </p>
                  </div>
                </Link>

                {/* Footer Action Row */}
                <div className="pt-2 mt-1.5 border-t border-white/5 flex flex-col gap-y-2">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap items-center gap-1">
                    {project.techs.map((tech, techIdx) => {
                      const IconComponent = tech.icon;
                      return (
                        <div key={techIdx} className={`flex items-center gap-x-1 py-0.5 px-1.5 rounded border transition-all duration-300 ${tech.borderClass} ${tech.bgClass}`}>
                          <IconComponent className={`text-[9px] ${tech.colorClass}`} />
                          <span className="text-[8px] font-medium text-white/80">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Two buttons: View Project (external) + View Case Study */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-x-1 px-2 py-1 rounded-lg border text-[8px] font-bold tracking-wider uppercase transition-all duration-300 ${project.arrowClass}`}
                    >
                      <span>View Project</span>
                      <RxArrowTopRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <Link
                      href={`/work/${project.slug}`}
                      className={`flex items-center gap-x-1 px-2 py-1 rounded-lg border text-[8px] font-bold tracking-wider uppercase transition-all duration-300 ${project.arrowClass}`}
                    >
                      <span>View Case Study</span>
                      <RxArrowTopRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Bulb />
    </div>
  );
};

export default Work;


