import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-x-3 group cursor-pointer select-none"
      whileHover="hover"
    >
      {/* Icon Mark */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        {/* Glowing background halo */}
        <motion.div 
          className="absolute inset-0 bg-accent/20 rounded-xl blur-md"
          variants={{
            hover: { scale: 1.3, opacity: 0.7 }
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Hexagon/Diamond Border */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-[0_0_6px_rgba(241,48,36,0.4)]"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5e52" />
              <stop offset="100%" stopColor="#F13024" />
            </linearGradient>
          </defs>
          <motion.polygon 
            points="50,6 88,28 88,72 50,94 12,72 12,28" 
            stroke="url(#logoGrad)" 
            strokeWidth="6.5" 
            fill="rgba(241,48,36,0.12)"
            variants={{
              hover: { scale: 1.05, fill: "rgba(241,48,36,0.2)" }
            }}
            transition={{ duration: 0.3 }}
            style={{ originX: "50px", originY: "50px" }}
          />
          <motion.text
            x="50"
            y="61"
            textAnchor="middle"
            fill="white"
            className="font-black text-[38px] tracking-tighter select-none pointer-events-none"
            style={{ 
              fontFamily: "var(--font-sora), sans-serif",
              fontWeight: 900
            }}
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.3 }}
          >
            AK
          </motion.text>
        </svg>
      </div>

      {/* Typographic Text */}
      <div className="flex items-baseline gap-x-1.5 leading-none">
        <motion.span 
          className="text-white font-extralight tracking-[0.08em] text-lg uppercase"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
          variants={{
            hover: { color: "#ff8b80" }
          }}
          transition={{ duration: 0.3 }}
        >
          aakash
        </motion.span>
        <span 
          className="text-white font-extrabold tracking-[0.04em] text-lg uppercase"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          kannan
          <motion.span 
            className="inline-block w-1.5 h-1.5 bg-accent ml-1 rounded-sm"
            variants={{
              hover: { 
                scale: [1, 1.6, 1],
                borderRadius: ["1px", "50%", "1px"],
                backgroundColor: ["#F13024", "#ffffff", "#F13024"]
              }
            }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;
