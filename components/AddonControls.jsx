import React from "react";
import { useApp } from "../context/AppContext";
import { FaRobot } from "react-icons/fa";

const AddonControls = () => {
  const { chatbotOpen, setChatbotOpen } = useApp();

  return (
    <div className="fixed bottom-24 left-4 xl:left-8 z-[99] flex flex-col items-center group">
      {/* Tooltip */}
      <div className="absolute left-14 opacity-0 group-hover:opacity-100 bg-black/80 border border-white/10 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md transition-all duration-200 pointer-events-none whitespace-nowrap">
        AI Assistant
      </div>

      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        style={{ 
          boxShadow: chatbotOpen 
            ? "0 0 25px var(--accent)" 
            : "0 0 15px rgba(241, 48, 36, 0.45)" 
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 hover:scale-110 active:scale-95 relative ${
          chatbotOpen
            ? "bg-accent border-accent text-white"
            : "bg-[#0b0c10]/90 border-accent/40 text-accent hover:text-white hover:border-accent hover:bg-accent/10"
        }`}
      >
        {/* Pulsing ring selector when closed */}
        {!chatbotOpen && (
          <span className="absolute inset-0 rounded-full border border-accent/30 animate-ping opacity-60 pointer-events-none" />
        )}
        <FaRobot className={`text-xl transition-transform duration-500 ${chatbotOpen ? "rotate-[360deg] scale-110" : ""}`} />
      </button>
    </div>
  );
};

export default AddonControls;
