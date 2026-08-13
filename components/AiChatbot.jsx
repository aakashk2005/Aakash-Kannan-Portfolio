import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { FaRobot, FaPaperPlane, FaTimes, FaWindowMinimize } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PRESET_QUESTIONS = [
  { q: "Tell me about your projects", a: "Aakash has worked on several key projects, including this interactive portfolio site, optimized collegiate symposium platforms, and prototypes for national hackathons." },
  { q: "What is your tech stack?", a: "His core stack includes JavaScript (React, Next.js), CSS3 (TailwindCSS), HTML5, Node.js, and Python, along with tools like Figma, Git, and n8n." },
  { q: "Are you open to work?", a: "Yes! Aakash is always open to collaborative design projects, full-stack web roles, and exciting technical challenges. Use the 'Contact' page to get in touch!" },
  { q: "Have you won hackathons?", a: "Yes, Aakash is a National Finalist in the Dark Pattern Buster 2023 Hackathon at IIT Varanasi, and also a finalist in the Gainwell-Bhumi Hackathon 2025." },
];

const AiChatbot = () => {
  const { chatbotOpen, setChatbotOpen } = useApp();
  const [messages, setMessages] = useState([
    { text: "Hello! I am Aakash's AI Assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    // User message
    setMessages((prev) => [...prev, { text, isBot: false }]);
    if (!textToSend) setInput("");

    // Bot response simulation
    setIsTyping(true);
    setTimeout(() => {
      let reply = "I'm not sure about that. Try asking about his projects, tech stack, or hackathons!";
      const query = text.toLowerCase();

      if (query.includes("project") || query.includes("work")) {
        reply = PRESET_QUESTIONS[0].a;
      } else if (query.includes("tech") || query.includes("stack") || query.includes("skill") || query.includes("code")) {
        reply = PRESET_QUESTIONS[1].a;
      } else if (query.includes("job") || query.includes("contact") || query.includes("hire") || query.includes("open")) {
        reply = PRESET_QUESTIONS[2].a;
      } else if (query.includes("hackathon") || query.includes("win") || query.includes("achievement")) {
        reply = PRESET_QUESTIONS[3].a;
      }

      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {chatbotOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 50 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-24 right-4 xl:right-24 z-50 w-[92%] max-w-[370px] h-[min(480px,calc(100dvh-7rem))] bg-[#08080c]/90 border border-white/10 backdrop-blur-2xl rounded-2xl flex flex-col overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-white/[0.02] border-b border-white/[0.08]">
            <div className="flex items-center gap-x-3">
              {/* Glowing Avatar */}
              <div
                style={{ boxShadow: "0 0 15px var(--accent)" }}
                className="relative w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
              >
                <FaRobot className="text-accent text-sm animate-pulse" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#08080c] shadow-[0_0_8px_#22c55e]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11.5px] font-bold text-white tracking-wider uppercase">AI Assistant</span>
                <span className="text-[9px] text-white/40 tracking-wider">Online &bull; Ready</span>
              </div>
            </div>
            
            <div className="flex items-center gap-x-3">
              <button
                onClick={() => setChatbotOpen(false)}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <FaWindowMinimize className="text-[10px]" />
              </button>
              <button
                onClick={() => setChatbotOpen(false)}
                className="text-white/40 hover:text-red-500 transition-colors duration-200"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          </div>

          {/* Messages lists container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  style={{ boxShadow: !msg.isBot ? "0 0 15px var(--accent)" : "none" }}
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-[12px] leading-relaxed shadow-sm transition-all duration-200 hover:shadow-md ${
                    msg.isBot
                      ? "bg-white/[0.04] border border-white/[0.06] text-white/90 rounded-tl-none"
                      : "bg-gradient-to-r from-accent to-accent/90 text-white rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Animated Typing indicators */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] border border-white/[0.06] text-white/50 rounded-2xl rounded-tl-none px-4 py-3 flex gap-x-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick preset chips dashboard */}
          <div className="px-4 py-2.5 flex flex-wrap gap-1.5 border-t border-white/[0.06] bg-white/[0.01]">
            {PRESET_QUESTIONS.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pq.q)}
                className="text-[9.5px] text-white/60 hover:text-white bg-white/5 border border-white/[0.08] hover:border-accent/40 rounded-full px-3 py-1 transition-all duration-300 active:scale-95 shadow-sm hover:bg-accent/5 hover:shadow-md"
              >
                {pq.q}
              </button>
            ))}
          </div>

          {/* Footer Input wrapper */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-x-2 px-4 py-3 bg-[#0c0c12]/80 border-t border-white/[0.08]"
          >
            <div className="flex-1 flex items-center bg-white/[0.03] border border-white/[0.08] focus-within:border-accent/50 rounded-full px-4 py-1.5 transition-all duration-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[11.5px] text-white placeholder:text-white/25 py-0.5"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                style={{ boxShadow: "0 0 8px var(--accent)" }}
                className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
              >
                <FaPaperPlane className="text-[9px]" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiChatbot;
