import React, { useState, useEffect, useRef } from "react";

const TAGS = [
  "React", "Next.js", "Figma", "Tailwind",
  "HTML5", "CSS3", "JavaScript", "ES6",
  "Python", "MySQL", "GitHub", "n8n",
  "Webflow", "Canva", "Notion", "Framer"
];

const SkillsSphere = ({ selectedSkill, onSelectSkill }) => {
  const containerRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [mouseX, setMouseX] = useState(0.8);
  const [mouseY, setMouseY] = useState(0.8);

  const radius = 60;
  const size = 170;
  const center = size / 2;

  const isMatch = (text) => {
    if (!selectedSkill) return false;
    const cleanText = text.toLowerCase().replace(".js", "").replace("5", "").replace("3", "").trim();
    const cleanSelected = selectedSkill.toLowerCase().replace(".js", "").replace("5", "").replace("3", "").trim();
    return cleanText.includes(cleanSelected) || cleanSelected.includes(cleanText);
  };

  useEffect(() => {
    const total = TAGS.length;
    const initialTags = TAGS.map((text, idx) => {
      const theta = Math.acos(-1 + (2 * idx) / total);
      const phi = Math.sqrt(total * Math.PI) * theta;

      return {
        text,
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      };
    });
    setTags(initialTags);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const radX = (mouseY * Math.PI) / 360;
      const radY = (mouseX * Math.PI) / 360;

      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);

      setTags((prevTags) =>
        prevTags.map((tag) => {
          const y1 = tag.y * cosX - tag.z * sinX;
          const z1 = tag.z * cosX + tag.y * sinX;
          const x2 = tag.x * cosY - z1 * sinY;
          const z2 = z1 * cosY + tag.x * sinY;

          return { ...tag, x: x2, y: y1, z: z2 };
        })
      );
    }, 20);

    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (centerY - e.clientY) / (rect.height / 2);

    setMouseX(x * 1.2);
    setMouseY(y * 1.2);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden mx-auto mt-4 border border-white/10 bg-[#0b0c10]/85 hover:border-accent/30 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(241,48,36,0.03)] transition-all duration-500"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {tags.map((tag, idx) => {
        const scale = (radius * 2.2 + tag.z) / (radius * 2.8);
        const alpha = (radius * 2.5 + tag.z) / (radius * 3);
        
        const left = `${center + tag.x}px`;
        const top = `${center + tag.y}px`;
        const matches = isMatch(tag.text);

        return (
          <span
            key={idx}
            onClick={() => onSelectSkill && onSelectSkill(matches ? null : tag.text)}
            className={`absolute text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full select-none cursor-pointer transition-all duration-300 ${
              matches 
                ? "bg-accent/20 border border-accent shadow-[0_0_15px_rgba(241,48,36,0.45)]" 
                : "bg-[#0b0c10]/95 border border-white/10 hover:border-white/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            }`}
            style={{
              transform: `translate(-50%, -50%) scale(${matches ? scale * 1.15 : scale})`,
              left,
              top,
              opacity: matches ? 1.0 : (selectedSkill ? alpha * 0.55 : alpha),
              color: matches 
                ? "rgb(var(--accent-rgb))" 
                : (tag.z > 0 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.6)"),
              zIndex: matches ? 999 : Math.round(tag.z + 200),
              textShadow: matches 
                ? "0 0 10px rgba(var(--accent-rgb), 0.75)" 
                : "0 1px 3px rgba(0, 0, 0, 0.9)",
            }}
          >
            {tag.text}
          </span>
        );
      })}
    </div>
  );
};

export default SkillsSphere;
