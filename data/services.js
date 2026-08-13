// Central data for the Services page. Adding/editing a service here updates
// every Services section (overview, explorer, tools) automatically.

import {
  FaPenNib,
  FaCode,
  FaMobileAlt,
  FaRocket,
  FaPalette,
  FaCompass,
  FaBullseye,
  FaLaptopCode,
  FaEye,
  FaThumbsUp,
  FaLayerGroup,
  FaBolt,
  FaPython,
  FaFigma,
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaGithub,
  FaDatabase,
  FaVial,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  SiAdobexd,
  SiCanva,
  SiPython,
  SiMysql,
  SiWebflow,
  SiFlutter,
  SiNotion,
  SiVisualstudiocode,
  SiTailwindcss,
  SiNextdotjs,
  SiAdobephotoshop,
} from "react-icons/si";

// Brand colour used for each tool chip on hover (matches the Skills page style).
export const toolDefinitions = {
  Figma: { Icon: FaFigma, color: "#F24E1E" },
  "Adobe XD": { Icon: SiAdobexd, color: "#FF9CFE" },
  Canva: { Icon: SiCanva, color: "#00C4CC" },
  Maze: { Icon: FaVial, color: "#FF5C5C" },
  HTML5: { Icon: FaHtml5, color: "#E34F26" },
  CSS3: { Icon: FaCss3, color: "#1572B6" },
  JavaScript: { Icon: FaJs, color: "#F7DF1E" },
  Python: { Icon: SiPython, color: "#3776AB" },
  SQL: { Icon: FaDatabase, color: "#4479A1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  React: { Icon: FaReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  Tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  Webflow: { Icon: SiWebflow, color: "#4353FF" },
  FlutterFlow: { Icon: SiFlutter, color: "#00F0FF" },
  n8n: { Icon: FaProjectDiagram, color: "#FF6F5B" },
  Notion: { Icon: SiNotion, color: "#FFFFFF" },
  GitHub: { Icon: FaGithub, color: "#FFFFFF" },
  "VS Code": { Icon: SiVisualstudiocode, color: "#007ACC" },
  Photoshop: { Icon: SiAdobephotoshop, color: "#31A8FF" },
  "REST APIs": { Icon: FaCode, color: "#F13024" },
};

export const servicesData = [
  {
    id: "ui-ux-design",
    num: "01",
    title: "UI/UX Design",
    tagline: "Interfaces that feel effortless — and look unmistakably yours.",
    Icon: FaPenNib,
    description:
      "I design intuitive interfaces and user journeys that are clear, usable, and human. Every screen starts from a real goal — whether that is helping someone find a product, finish a task, or understand a complex idea — and the visuals support that goal instead of competing with it.",
    deliverables: [
      "Wireframes, user flows & information architecture",
      "High-fidelity interface design in Figma",
      "Interactive prototypes for testing & stakeholders",
      "Reusable component & design-system foundations",
      "Usability review & iteration on live screens",
    ],
    tools: ["Figma", "Adobe XD", "Canva", "Maze"],
    idealFor:
      "SaaS dashboards, mobile apps, and websites that need a clear, conversion-friendly interface.",
  },
  {
    id: "web-development",
    num: "02",
    title: "Web Development",
    tagline: "Fast, responsive sites built with modern tools and clean code.",
    Icon: FaCode,
    description:
      "I build responsive, performant websites with a modern stack — Next.js, React, and Tailwind — that hold up on every device. The focus is on speed, accessibility, and a clean codebase that stays easy to maintain long after launch.",
    deliverables: [
      "Responsive marketing sites & landing pages",
      "Portfolios, dashboards & interactive web apps",
      "Front-end builds with Next.js / React",
      "Form handling, CMS & third-party integrations",
      "Performance, SEO & accessibility pass before launch",
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind"],
    idealFor:
      "Portfolios, product landing pages, and small-to-medium business sites that need speed, polish, and a mobile-first experience.",
  },
  {
    id: "mobile-app-design",
    num: "03",
    title: "Mobile App Design",
    tagline: "Product-focused mobile UI from first launch to final flow.",
    Icon: FaMobileAlt,
    description:
      "I design mobile experiences that respect the platform — thumb-friendly targets, sensible navigation, and flows that take users from onboarding to action without friction. I work closely with builders so the design survives the jump from mockup to working app.",
    deliverables: [
      "iOS & Android screen design",
      "Onboarding, auth & core user flows",
      "Design-to-FlutterFlow handoff with specs",
      "Clickable prototypes for user testing",
      "UI states, empty states & error states",
    ],
    tools: ["Figma", "Adobe XD", "FlutterFlow"],
    idealFor:
      "Startups and product teams prototyping an app idea before committing to a full native build.",
  },
  {
    id: "python-solutions",
    num: "04",
    title: "Python Solutions",
    tagline: "Automation and data workflows that save real hours.",
    Icon: FaPython,
    description:
      "I write practical Python that removes repetitive work — scripts that fetch, clean, and organise data, small APIs that connect tools, and automations that run themselves. No over-engineered systems, just reliable code that solves the specific problem you have.",
    deliverables: [
      "Automation scripts for repetitive tasks",
      "Data cleaning, processing & reporting",
      "Small REST APIs for internal tools",
      "Workflow automation with n8n",
      "Documentation your team can actually follow",
    ],
    tools: ["Python", "SQL", "MySQL", "n8n", "REST APIs"],
    idealFor:
      "Teams automating manual work, syncing tools, or preparing data for daily decisions.",
  },
  {
    id: "no-code-development",
    num: "05",
    title: "No-Code Product Development",
    tagline: "Real products shipped this month — not next quarter.",
    Icon: FaRocket,
    description:
      "When speed matters more than a bespoke build, I use Webflow, FlutterFlow, and n8n to ship working products fast. You get a real, hosted product with a real database and real automations — without the six-month engineering cycle.",
    deliverables: [
      "Webflow marketing sites & CMS setups",
      "FlutterFlow app builds (iOS & Android)",
      "n8n automations between your tools",
      "Database & content structure",
      "Handover documentation & training",
    ],
    tools: ["Webflow", "FlutterFlow", "n8n", "Notion", "GitHub"],
    idealFor:
      "Founders and small teams who want a working product this month — a launch site, an MVP app, or an internal workflow.",
  },
  {
    id: "brand-digital-design",
    num: "06",
    title: "Brand & Digital Design",
    tagline: "Visual identity that stays consistent across every touchpoint.",
    Icon: FaPalette,
    description:
      "I shape brands that look the same everywhere — from the website to social posts to slide decks. Starting with a few core decisions (palette, type, layout rhythm), I build lightweight systems that keep your visuals consistent without a full agency retainer.",
    deliverables: [
      "Visual identity & style guidelines",
      "Social media & marketing templates",
      "Presentation & pitch deck design",
      "Print-ready & web-ready asset packs",
      "Brand refresh for existing businesses",
    ],
    tools: ["Figma", "Canva", "Adobe XD", "Photoshop"],
    idealFor:
      "Individuals and small brands that need consistent, polished visuals across web, social, and decks.",
  },
];

// 04 — How I Work
export const processSteps = [
  {
    num: "01",
    title: "Discover",
    Icon: FaCompass,
    description:
      "We talk through your goals, audience, and constraints. I study what already exists, what works, and where the friction is — so we are solving the right problem.",
  },
  {
    num: "02",
    title: "Define",
    Icon: FaBullseye,
    description:
      "We narrow the scope into clear features and a focused direction — wireframes, flows, or a written spec you can actually follow and budget against.",
  },
  {
    num: "03",
    title: "Build",
    Icon: FaLaptopCode,
    description:
      "Design and development happen in short loops with working previews early. You see real progress often, so nothing quietly drifts from what we agreed.",
  },
  {
    num: "04",
    title: "Refine",
    Icon: FaRocket,
    description:
      "We test, polish, and tighten the details — responsiveness, performance, and edge cases — until it ships clean, then hand it over with what you need to maintain it.",
  },
];

// 05 — What You Get
export const valueProps = [
  {
    title: "Clarity",
    Icon: FaEye,
    description:
      "Every screen starts from a clear goal. If a feature does not earn its place, it does not ship.",
  },
  {
    title: "Usability",
    Icon: FaThumbsUp,
    description:
      "Layouts are built around how people actually read and act — not just how they look in a screenshot.",
  },
  {
    title: "Consistency",
    Icon: FaLayerGroup,
    description:
      "One design language across pages, states, and devices, so nothing feels bolted on.",
  },
  {
    title: "Execution",
    Icon: FaBolt,
    description:
      "Design and code live in the same workflow, so what you see in the mockup is what goes live.",
  },
];
