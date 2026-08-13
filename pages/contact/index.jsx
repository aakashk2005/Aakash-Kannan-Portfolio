import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { fadeIn } from "../../variants";

// Icons
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaPencilAlt,
  FaPaperPlane,
  FaBolt,
  FaShieldAlt,
  FaHandshake,
  FaQuoteLeft,
  FaDownload,
  FaLinkedinIn,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const myForm = event.target;
    const formData = new FormData(myForm);
    
    // Convert form data to a clean JSON object for Web3Forms
    const data = Object.fromEntries(formData);
    delete data["form-name"];

    // Client-side validations
    const name = data.name ? data.name.trim() : "";
    const email = data.email ? data.email.trim() : "";
    const subject = data.subject ? data.subject.trim() : "";
    const msgText = message.trim();

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!subject) newErrors.subject = "Subject is required";
    if (!msgText) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    // Validate access key and fall back to default template key if unset or placeholder
    let accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey.trim() === "" || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      console.warn("Web3Forms access key not configured or using placeholder. Falling back to default.");
      accessKey = "c457eabc-4f82-4bf4-bfaa-48b495f8bcd0";
    }
    data["access_key"] = accessKey;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let responseData;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          responseData = await res.json();
        } else {
          const text = await res.text();
          throw new Error(text || `Server returned status ${res.status}`);
        }

        if (res.ok && responseData.success) {
          setIsSubmitted(true);
          setMessage("");
          myForm.reset();
        } else {
          console.error("Web3Forms Error response:", responseData);
          alert(responseData.message || "Failed to send message. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Web3Forms Network Error:", error);
        alert(
          "A network error occurred. If you are using an ad-blocker or privacy shield, please temporarily disable it for this site, as it may block form submissions. Otherwise, please try again."
        );
      })
      .finally(() => setIsLoading(false));
  };

  const badges = [
    {
      icon: FaBolt,
      title: "Quick Response",
      desc: "I usually reply within 24 hours."
    },
    {
      icon: FaShieldAlt,
      title: "Confidential",
      desc: "Your ideas and data are always safe."
    },
    {
      icon: FaHandshake,
      title: "Let's Collaborate",
      desc: "Open to exciting projects and new challenges."
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aakash-kannan-8b51a827b/", icon: FaLinkedinIn, bgClass: "bg-[#0077B5] border-[#0077B5] hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]" },
    { name: "GitHub", url: "https://github.com/aakashk2005", icon: FaGithub, bgClass: "bg-[#24292e] border-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
    { name: "Behance", url: "https://www.behance.net/aakashkannan", icon: FaBehance, bgClass: "bg-[#1769ff] border-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(23,105,255,0.15)]" },
    { name: "Dribbble", url: "https://dribbble.com/Aakash_Kannan", icon: FaDribbble, bgClass: "bg-[#EA4C89] border-[#EA4C89] hover:shadow-[0_0_15px_rgba(234,76,137,0.4)]" },
    { name: "WhatsApp", url: "https://wa.me/918778074550", icon: FaWhatsapp, bgClass: "bg-[#25D366] border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]" }
  ];

  return (
    <div className="h-full bg-primary/30 py-16 xl:py-32 flex flex-col justify-between overflow-y-auto overflow-x-hidden xl:overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 relative">
      
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Main Container */}
      <div className="container mx-auto px-4 flex-grow flex flex-col justify-center gap-y-8 z-20 pb-24 xl:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start max-w-[1200px] mx-auto w-full">
          
          {/* Left Column: Heading, description, quick contact stats badges */}
          <div className="lg:col-span-5 flex flex-col text-left relative">
            
            {/* Paper Airplane decorative background (large screens only) */}
            <div className="absolute -right-16 -top-12 w-[180px] h-[180px] hidden lg:block select-none pointer-events-none opacity-40 hover:opacity-75 transition-opacity duration-[2000ms]">
              <img 
                src="/paper-airplane.webp"
                alt="Origami paper airplane line art"
                className="absolute inset-0 w-full h-full object-contain animate-pulse"
              />
            </div>

            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex items-center gap-x-2 text-accent font-semibold tracking-wider text-xs md:text-sm uppercase mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              GET IN TOUCH
            </motion.div>

            <motion.h2
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-[32px] md:text-[44px] leading-tight font-bold mb-4"
            >
              Let&apos;s create <br />
              something <span className="text-accent relative">
                epic.
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-8 w-full"
            >
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </motion.p>

            {/* Grid of 3 Quick Features */}
            <motion.div 
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 w-full"
            >
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -6, scale: 1.03, borderColor: "rgba(241, 48, 36, 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-left flex flex-col justify-between min-h-[120px] hover:shadow-[0_8px_20px_rgba(var(--accent-rgb),0.1)] transition-all duration-300 cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/5 border border-accent/20 flex items-center justify-center text-accent text-sm shadow-[0_0_8px_rgba(var(--accent-rgb),0.2)]">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-bold text-white mb-0.5">{badge.title}</h4>
                      <p className="text-[9px] text-white/40 leading-snug font-light">{badge.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Red Quotes Banner */}
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="bg-accent/5 border-l-4 border-l-accent border-y border-r border-white/5 p-4 rounded-r-xl flex items-center gap-x-4 w-full shadow-[0_4px_20px_rgba(var(--accent-rgb),0.05)] mb-4"
            >
              <div className="text-accent text-xl shrink-0 opacity-80 animate-pulse">
                <FaQuoteLeft />
              </div>
              <p className="text-white/80 text-xs md:text-sm font-light tracking-wide">
                Great things start with a <span className="text-accent font-semibold">simple hello</span>.
              </p>
            </motion.div>

            {/* Location & Availability blocks below quote banner */}
            <motion.div
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <motion.div 
                whileHover={{ y: -4, scale: 1.02, borderColor: "rgba(241, 48, 36, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-x-3 bg-white/[0.02] border border-white/5 p-3 rounded-xl flex-1 hover:shadow-[0_8px_20px_rgba(var(--accent-rgb),0.1)] transition-all duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div className="text-left">
                  <div className="text-white/40 text-[9px] font-bold tracking-wider uppercase mb-0.5">LOCATION</div>
                  <div className="text-white font-semibold text-xs leading-tight">Tamil Nadu, India</div>
                  <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-accent text-[9px] font-medium hover:underline mt-0.5 block">View on map</Link>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02, borderColor: "rgba(241, 48, 36, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-x-3 bg-white/[0.02] border border-white/5 p-3 rounded-xl flex-1 hover:shadow-[0_8px_20px_rgba(var(--accent-rgb),0.1)] transition-all duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm shrink-0">
                  <FaClock />
                </div>
                <div className="text-left">
                  <div className="text-white/40 text-[9px] font-bold tracking-wider uppercase mb-0.5">AVAILABLE</div>
                  <div className="text-white font-semibold text-xs leading-tight">Mon - Sat : 9AM - 8PM</div>
                  <Link href="#" className="text-accent text-[9px] font-medium hover:underline mt-0.5 block">Schedule a call</Link>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Message Form & Platform quick connect */}
          <div className="lg:col-span-7 flex flex-col gap-y-6 w-full">
            
            {/* Form Card */}
            <motion.div
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative overflow-hidden bg-[#0b0c10]/85 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl w-full shadow-[0_15px_35px_rgba(0,0,0,0.4)] min-h-[380px] flex flex-col justify-center transition-all duration-300 hover:border-accent/20"
            >
              {/* Dynamic Mouse Glow Tracker */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
                  style={{
                    background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--accent-rgb), 0.1), transparent 80%)`,
                  }}
                />
              )}

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-6 text-left">Send me a message</h3>
                      
                      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4" autoComplete="off" name="contact">
                        <input type="hidden" name="form-name" value="contact" />
                        
                        {/* Name & Email Inputs row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          <div className="relative w-full">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none" />
                            <input 
                              type="text" 
                              id="name"
                              name="name" 
                              placeholder=" " 
                              className={`peer w-full bg-[#12131a]/40 border ${errors.name ? "border-accent/60 focus:border-accent" : "border-white/10 focus:border-accent"} focus:ring-1 focus:ring-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] rounded-xl pt-5 pb-2 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300`}
                              disabled={isLoading}
                              required 
                            />
                            <label 
                              htmlFor="name"
                              className="absolute left-11 top-[14px] text-white/30 text-sm font-light transition-all duration-300 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-[5px] peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-[5px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50"
                            >
                              Your Name
                            </label>
                            {errors.name && (
                              <span className="text-[10px] text-accent mt-1 block text-left pl-2">
                                {errors.name}
                              </span>
                            )}
                          </div>
                          
                          <div className="relative w-full">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none" />
                            <input 
                              type="email" 
                              id="email"
                              name="email" 
                              placeholder=" " 
                              className={`peer w-full bg-[#12131a]/40 border ${errors.email ? "border-accent/60 focus:border-accent" : "border-white/10 focus:border-accent"} focus:ring-1 focus:ring-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] rounded-xl pt-5 pb-2 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300`}
                              disabled={isLoading}
                              required 
                            />
                            <label 
                              htmlFor="email"
                              className="absolute left-11 top-[14px] text-white/30 text-sm font-light transition-all duration-300 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-[5px] peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-[5px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50"
                            >
                              Your Email
                            </label>
                            {errors.email && (
                              <span className="text-[10px] text-accent mt-1 block text-left pl-2">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Subject Input */}
                        <div className="relative w-full">
                          <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none" />
                          <input 
                            type="text" 
                            id="subject"
                            name="subject" 
                            placeholder=" " 
                            className={`peer w-full bg-[#12131a]/40 border ${errors.subject ? "border-accent/60 focus:border-accent" : "border-white/10 focus:border-accent"} focus:ring-1 focus:ring-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] rounded-xl pt-5 pb-2 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300`}
                            disabled={isLoading}
                            required 
                          />
                          <label 
                            htmlFor="subject"
                            className="absolute left-11 top-[14px] text-white/30 text-sm font-light transition-all duration-300 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-[5px] peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-[5px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50"
                          >
                            Subject
                          </label>
                          {errors.subject && (
                            <span className="text-[10px] text-accent mt-1 block text-left pl-2">
                              {errors.subject}
                            </span>
                          )}
                        </div>

                        {/* Message TextArea */}
                        <div className="relative w-full">
                          <FaPencilAlt className="absolute left-4 top-4 text-white/30 text-sm pointer-events-none" />
                          <textarea 
                            id="message"
                            name="message" 
                            placeholder=" " 
                            value={message}
                            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                            className={`peer w-full bg-[#12131a]/40 border ${errors.message ? "border-accent/60 focus:border-accent" : "border-white/10 focus:border-accent"} focus:ring-1 focus:ring-accent focus:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] rounded-xl pt-6 pb-2.5 pl-11 pr-4 h-[120px] text-sm text-white outline-none resize-none transition-all duration-300`}
                            disabled={isLoading}
                            required
                          />
                          <label 
                            htmlFor="message"
                            className="absolute left-11 top-[14px] text-white/30 text-sm font-light transition-all duration-300 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-[5px] peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-[5px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50"
                          >
                            Your Message
                          </label>
                          {errors.message && (
                            <span className="text-[10px] text-accent mt-1 block text-left pl-2">
                              {errors.message}
                            </span>
                          )}
                          {/* Word / Character Counter */}
                          <span className={`absolute bottom-3 right-4 text-[9px] font-light select-none transition-colors duration-300 ${
                            message.length >= 450 
                              ? "text-accent font-medium animate-pulse" 
                              : message.length >= 400 
                              ? "text-yellow-500" 
                              : "text-white/30"
                          }`}>
                            {message.length} / 500
                          </span>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-center mt-2">
                          <motion.button 
                            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(241, 48, 36, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            disabled={isLoading}
                            className="flex items-center justify-center gap-x-2 px-8 py-3.5 bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent text-white font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group w-full md:w-auto"
                          >
                            <FaPaperPlane className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <span>{isLoading ? "Sending..." : "Send Message"}</span>
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="text-center flex flex-col items-center justify-center py-6 select-none"
                    >
                      <div className="w-16 h-16 rounded-full bg-accent/15 border-2 border-accent flex items-center justify-center text-accent text-2xl shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] mb-6 animate-pulse">
                        <FaPaperPlane className="transform translate-x-0.5 -translate-y-0.5" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-white/60 font-light text-sm max-w-[280px] leading-relaxed mb-6">
                        Thank you for reaching out. I will read it and get back to you as soon as possible.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(241, 48, 36, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2.5 border border-accent/40 text-accent font-semibold text-xs rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Prefer a quick chat? platforms links block */}
            <motion.div
              variants={fadeIn("left", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="bg-[#0b0c10]/85 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-full flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0"
            >
              <div className="text-left w-full md:w-auto">
                <h4 className="text-sm font-bold text-white mb-0.5">Prefer a quick chat?</h4>
                <p className="text-xs text-white/40 font-light">Let&apos;s connect on your favorite platform.</p>
              </div>

              <div className="flex items-center gap-x-3 w-full md:w-auto justify-start md:justify-end">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white border text-sm transition-all duration-300 ${social.bgClass}`}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="text-center text-white/30 text-[11px] font-light z-20 select-none w-full py-4 mt-8">
        &copy; 2025 Aakash Kannan. All rights reserved.
      </div>
    </div>
  );
};

export default Contact;
