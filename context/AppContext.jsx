import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const THEMES = {
  red: { hex: "#F13024", rgb: "241 48 36" },
  blue: { hex: "#00E5FF", rgb: "0 229 255" },
  green: { hex: "#00E676", rgb: "0 230 118" },
  purple: { hex: "#D500F9", rgb: "213 0 249" },
};

const LOFI_TRACKS = [
  { id: 1, title: "Lofi Coding Session", artist: "Chillhop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Ambient Workspace", artist: "Lofi Records", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 3, title: "Night Study Beats", artist: "Retro Waves", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("red");
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [particleCount, setParticleCount] = useState(80);
  const [cursorTrails, setCursorTrails] = useState(true);

  // Widget Toggles
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [sphereOpen, setSphereOpen] = useState(false);

  // Guestbook and simulated stats
  const [guestbook, setGuestbook] = useState([
    { id: 1, name: "Jessica L.", message: "Wow, this portfolio design is breathtaking! 🔥", date: "2026-08-05" },
    { id: 2, name: "David K.", message: "Super smooth animations. Love the loading screen!", date: "2026-08-06" },
  ]);
  const [stats, setStats] = useState({
    visits: 1240,
    coffee: 48,
    uptime: "99.98%",
    linesOfCode: "42,810",
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("portfolio-theme");
      if (storedTheme && THEMES[storedTheme]) setTheme(storedTheme);

      const storedSpeed = localStorage.getItem("portfolio-particle-speed");
      if (storedSpeed) setParticleSpeed(parseFloat(storedSpeed));

      const storedCount = localStorage.getItem("portfolio-particle-count");
      if (storedCount) setParticleCount(parseInt(storedCount, 10));

      const storedTrails = localStorage.getItem("portfolio-cursor-trails");
      if (storedTrails !== null) setCursorTrails(storedTrails === "true");

      const storedGuestbook = localStorage.getItem("portfolio-guestbook");
      if (storedGuestbook) setGuestbook(JSON.parse(storedGuestbook));

      // Simulate a small increment in visits on load
      setStats(prev => ({
        ...prev,
        visits: prev.visits + Math.floor(Math.random() * 5) + 1,
        coffee: prev.coffee + (Math.random() > 0.8 ? 1 : 0),
      }));
    } catch (e) {
      console.warn("Storage access not available:", e);
    }
  }, []);

  // Update CSS custom properties on theme change
  useEffect(() => {
    const selected = THEMES[theme];
    if (selected) {
      document.documentElement.style.setProperty("--accent", selected.hex);
      document.documentElement.style.setProperty("--accent-rgb", selected.rgb);
      localStorage.setItem("portfolio-theme", theme);
    }
  }, [theme]);

  // Persist other configurations
  const updateParticleSpeed = (val) => {
    setParticleSpeed(val);
    localStorage.setItem("portfolio-particle-speed", String(val));
  };

  const updateParticleCount = (val) => {
    setParticleCount(val);
    localStorage.setItem("portfolio-particle-count", String(val));
  };

  const updateCursorTrails = (val) => {
    setCursorTrails(val);
    localStorage.setItem("portfolio-cursor-trails", String(val));
  };

  const addGuestbookMessage = (name, message) => {
    const newMsg = {
      id: Date.now(),
      name: name || "Anonymous",
      message: message,
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [newMsg, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem("portfolio-guestbook", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        themes: THEMES,
        particleSpeed,
        setParticleSpeed: updateParticleSpeed,
        particleCount,
        setParticleCount: updateParticleCount,
        cursorTrails,
        setCursorTrails: updateCursorTrails,
        chatbotOpen,
        setChatbotOpen,
        sphereOpen,
        setSphereOpen,
        guestbook,
        addGuestbookMessage,
        stats,
        lofiTracks: LOFI_TRACKS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
