import Link from "next/link";
import { motion } from "framer-motion";

import {
  RiLinkedinLine,
  RiGithubLine,
  RiBehanceLine,
  RiDribbbleLine,
  RiLink,
} from "react-icons/ri";

export const socialData = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/aakash-kannan-8b51a827b/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Github",
    link: "https://github.com/aakashk2005",
    Icon: RiGithubLine,
  },
  {
    name: "Behance",
    link: "https://www.behance.net/aakashkannan",
    Icon: RiBehanceLine,
  },
  {
    name: "Dribbble",
    link: "https://dribbble.com/Aakash_Kannan",
    Icon: RiDribbbleLine,
  },
  {
    name: "Linktree",
    link: "https://linktr.ee/Aakash.Kannan",
    Icon: RiLink,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

const Socials = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex items-center gap-x-4 text-lg"
    >
      {socialData.map((social, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.12, 
            y: -3, 
            rotate: 4,
            transition: { type: "spring", stiffness: 400, damping: 12 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            title={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 hover:text-accent hover:border-accent/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(241,48,48,0.25)] transition-all duration-300"
          >
            <social.Icon aria-hidden className="text-xl" />
            <span className="sr-only">{social.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Socials;
