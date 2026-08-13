import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiTrophy,
  HiEnvelope,
  HiWrench,
  HiBriefcase,
  HiAcademicCap,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "skills", path: "/skills", Icon: HiWrench },
  { name: "services", path: "/services", Icon: HiBriefcase },
  { name: "career timeline", path: "/experience", Icon: HiAcademicCap },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "achievements",
    path: "/testimonials",
    Icon: HiTrophy,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;

  // Mobile (<768) uses the stacked single-page layout, so the bottom nav
  // items smooth-scroll to the matching section on the home page instead of
  // navigating routes. Desktop (xl) keeps its click-based route navigation.
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Route path -> section id used on the mobile stacked home page.
  const sectionMap = {
    "/": "home",
    "/about": "about",
    "/skills": "skills",
    "/services": "services",
    "/experience": "experience",
    "/work": "work",
    "/testimonials": "achievements",
    "/contact": "contact",
  };

  // Section scroll-tracking for mobile single-page layout
  useEffect(() => {
    if (!isMobile || pathname !== "/") return;

    const sections = ["home", "about", "skills", "services", "experience", "work", "achievements", "contact"];
    const observerOptions = {
      root: null, // viewport scroll container
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates screen center
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, pathname]);

  const handleNav = (e, path) => {
    if (!isMobile) return; // desktop / tablet: normal Link navigation
    e.preventDefault();
    const id = sectionMap[path];
    const scroll = () => {
      const scroller = document.getElementById("home-scroll");
      if (id === "home") {
        (scroller || window).scrollTo?.({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (router.pathname === "/") {
      scroll();
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        /* ignore */
      }
    } else {
      // Navigate to the stacked home page; Home's hash effect scrolls to it.
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 w-full xl:w-16 xl:max-w-md xl:h-screen">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[64px] xl:h-max py-0 xl:py-8 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-3xl xl:text-xl xl:rounded-full">
        {navData.map((link, i) => {
          // Determine if tab is active based on path (desktop) or section view (mobile home)
          const isActive = isMobile
            ? (pathname === "/" ? sectionMap[link.path] === activeSection : link.path === pathname)
            : link.path === pathname;

          return (
            <Link
              className={`${
                isActive
                  ? "text-accent drop-shadow-[0_0_8px_rgba(241,48,36,0.8)]"
                  : "text-white/60 hover:text-white"
              } relative flex items-center group transition-all duration-300`}
              href={link.path}
              key={i}
              onClick={(e) => handleNav(e, link.path)}
            >
              {/* active indicator bar (desktop only) */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-[-24px] w-[3px] h-6 bg-accent rounded-l-full shadow-[0_0_8px_#F13024] hidden xl:block"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* tooltip */}
              <div
                role="tooltip"
                className="absolute pr-14 right-0 hidden xl:group-hover:flex"
              >
                <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                  <div className="text-[12px] leading-none font-semibold capitalize">
                    {link.name}
                  </div>
                  {/* triangle */}
                  <div
                    className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"
                    aria-hidden
                  />
                </div>
              </div>

              {/* icon */}
              <div className="transition-all duration-300 group-hover:scale-110">
                <link.Icon aria-hidden />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
