import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/router";

const CursorGlow = () => {
  const router = useRouter();
  const [pathname, setPathname] = useState("/");
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 40, stiffness: 250, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Sync pathname safely on mount/route change
  useEffect(() => {
    if (router && router.pathname) {
      setPathname(router.pathname);
    }
  }, [router]);

  const getGlowColors = () => {
    switch (pathname) {
      case "/":
        return { inner: "rgba(241,48,36,0.14)", outer: "rgba(241,48,36,0.04)" }; // Red
      case "/about":
        return { inner: "rgba(241,48,36,0.12)", outer: "rgba(241,48,36,0.03)" }; // Red/Pink
      case "/skills":
        return { inner: "rgba(0,240,255,0.13)", outer: "rgba(0,240,255,0.03)" }; // Cyan
      case "/services":
        return { inner: "rgba(241,48,36,0.12)", outer: "rgba(241,48,36,0.03)" }; // Red
      case "/experience":
        return { inner: "rgba(241,48,36,0.12)", outer: "rgba(241,48,36,0.03)" }; // Red
      case "/work":
        return { inner: "rgba(16,185,129,0.13)", outer: "rgba(16,185,129,0.03)" }; // Green
      case "/testimonials":
        return { inner: "rgba(251,191,36,0.13)", outer: "rgba(251,191,36,0.03)" }; // Amber/Gold
      case "/contact":
        return { inner: "rgba(241,48,36,0.12)", outer: "rgba(241,48,36,0.03)" }; // Red
      default:
        return { inner: "rgba(241,48,36,0.14)", outer: "rgba(241,48,36,0.04)" };
    }
  };

  const colors = getGlowColors();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        background: `radial-gradient(circle, ${colors.inner} 0%, ${colors.outer} 45%, transparent 70%)`,
      }}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none rounded-full z-[5] mix-blend-screen hidden md:block"
    />
  );
};

export default CursorGlow;
