import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { fadeIn } from "../variants";

// Reusable contact details card. Single source of truth for the site's
// contact values (email / phone / location / availability).
const ContactStrip = () => {
  const items = [
    {
      Icon: FaEnvelope,
      label: "Email",
      value: "aakashkannan05@gmail.com",
      action: "Send an email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=aakashkannan05@gmail.com",
      external: true,
    },
    {
      Icon: FaPhoneAlt,
      label: "Phone",
      value: "+91 8778074550",
      action: "Call me",
      href: "tel:+918778074550",
      external: false,
    },
    {
      Icon: FaMapMarkerAlt,
      label: "Location",
      value: "Tamil Nadu, India",
      action: "View on map",
      href: "https://maps.google.com/?q=Tamil+Nadu,+India",
      external: true,
    },
    {
      Icon: FaClock,
      label: "Available",
      value: "Mon \u2013 Sat : 9AM \u2013 8PM",
      action: "Schedule a call",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=aakashkannan05@gmail.com&su=Scheduling%20a%20Call",
      external: true,
    },
  ];

  return (
    <motion.div
      variants={fadeIn("up", 0.6)}
      initial="hidden"
      animate="show"
      className="w-full xl:max-w-[1120px] mx-auto xl:mx-0 select-none z-10 pb-6 xl:pb-0"
    >
      <div className="bg-[#0b0c10]/85 border border-white/10 rounded-2xl p-6 xl:py-7 xl:px-8 shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_20px_rgba(var(--accent-rgb),0.03)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-6 sm:gap-y-8 xl:gap-y-0 xl:divide-x xl:divide-white/10 xl:divide-dashed">
          {items.map(({ Icon, label, value, action, href, external }, idx) => (
            <motion.a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`flex items-center gap-x-4 xl:px-4 group/item cursor-pointer ${
                idx === 0 ? "first:pl-0" : ""
              } ${idx === items.length - 1 ? "last:pr-0" : ""}`}
            >
              <div className="w-12 h-12 rounded-full border border-accent/50 shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)] bg-black/40 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:border-accent group-hover/item:shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]">
                <Icon className="text-white text-base" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] tracking-[1.5px] uppercase font-bold text-white/40 mb-0.5">
                  {label}
                </span>
                <span className="text-[12px] md:text-[13px] text-white font-medium truncate group-hover/item:text-accent transition-colors">
                  {value}
                </span>
                <span className="text-[11px] text-accent font-semibold flex items-center gap-x-1 hover:text-red-400 transition-colors mt-0.5">
                  {action} &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactStrip;
