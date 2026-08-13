import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useApp } from "../context/AppContext";

const ParticlesContainer = () => {
  const { theme, themes, particleSpeed, particleCount } = useApp();

  // init
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const currentThemeColor = themes[theme]?.hex || "#F13024";

  return (
    <Particles
      className="w-full h-full absolute translate-z-0"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repel",
            },
            resize: true,
          },
          modes: {
            repel: {
              distance: 120,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: currentThemeColor,
          },
          links: {
            color: currentThemeColor,
            distance: 150,
            enable: true,
            opacity: 0.55,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: {
              default: "bounce",
            },
            random: false,
            speed: particleSpeed,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: 0.75,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.6,
              max: 2.5,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;
