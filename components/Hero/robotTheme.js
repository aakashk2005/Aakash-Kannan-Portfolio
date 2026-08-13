// Centralized robot theme configuration with Red / Orange accents
// matching the portfolio's dark futuristic aesthetic
export const robotTheme = {
  // Primary body color (main metallic surfaces)
  primary: "#0d0e11",

  // Secondary/grey metallic parts
  secondary: "#1f242d",

  // Dark/black parts (joints, gaps, inner areas)
  dark: "#08090b",

  // Accent color (glowing elements, eyes, chest core, particles)
  accent: "#F13024",

  // Lighter accent variation (warm glow, particle variations)
  accentWarm: "#ff4422",

  // Lighter accent variation (cool glow, particle variations)
  accentCool: "#cc2200",

  // Emissive glow for primary material
  primaryEmissive: "#330808",
  primaryEmissiveIntensity: 0.2,

  // Core chest glow
  coreEmissive: "#F13024",
  coreEmissiveIntensity: 2.0,

  // Chest light color/intensity
  chestLightColor: "#F13024",
  chestLightIntensity: 1.6,

  // Environment/lighting colors
  keyLightColor: "#fff5f0",
  keyLightIntensity: 1.4,
  rimLightColor: "#ff4422",
  rimLightIntensity: 0.9,
  accentPointLightColor: "#F13024",
  accentPointLightIntensity: 1.2,
  warmPointLightColor: "#ff6644",
  warmPointLightIntensity: 0.5,
  coolPointLightColor: "#882200",
  coolPointLightIntensity: 0.35,

  // Environment map lightformers
  envKeyColor: "#ffffff",
  envKeyIntensity: 2,
  envRimColor: "#ff4422",
  envRimIntensity: 0.8,
  envWarmColor: "#ff6644",
  envWarmIntensity: 0.6,
  envCoolColor: "#441100",
  envCoolIntensity: 0.4,

  // Particle colors
  particleWarm: "#F13024",
  particleCool: "#cc2200",
  particleDim: "#4c3028",

  // Sparkle colors
  sparkleColor: "#ff4422",
  sparkleLargeColor: "#cc2200",

  // Ground glow colors
  groundGlowColor: "#F13024",
  groundGlowOpacity: 0.07,
  groundGlow2Color: "#882200",
  groundGlow2Opacity: 0.05,

  // Orbiting ring/torus
  ringColor: "#F13024",
  ringOpacity: 0.35,
  ringSparkleColor: "#ff6644",

  // Boot overlay spinner colors
  spinnerBorder: "rgba(241,48,36,0.4)",
  spinnerAccent: "#F13024",
  spinnerInnerBorder: "rgba(255,68,34,0.35)",
  progressBarGradient: "linear-gradient(90deg, #F13024, #cc2200)",

  // Fallback SVG colors
  fallbackStroke: "rgba(241,48,36,0.35)",
  fallbackStrokeAccent: "rgba(241,48,36,0.5)",
  fallbackFaceplate: "rgba(241,48,36,0.55)",
  fallbackScreen: "#F13024",
  fallbackEyes: "#F13024",
  fallbackChest: "rgba(241,48,36,0.5)",
  fallbackCore: "#F13024",
  fallbackText: "rgba(241,48,36,0.6)",

  // Cursor glow (HeroRobot component)
  cursorGlowInner: "rgba(241,48,36,0.14)",
  cursorGlowOuter: "rgba(241,48,36,0.04)",

  // Model scale/size
  modelScale: 1.0,
  robotSize: 1.0,
};

// Helper to generate CSS custom properties for easy CSS usage
export const robotThemeCSS = {
  "--robot-primary": robotTheme.primary,
  "--robot-accent": robotTheme.accent,
  "--robot-accent-warm": robotTheme.accentWarm,
  "--robot-accent-cool": robotTheme.accentCool,
  "--robot-core-emissive": robotTheme.coreEmissive,
  "--robot-cursor-glow-inner": robotTheme.cursorGlowInner,
  "--robot-cursor-glow-outer": robotTheme.cursorGlowOuter,
};

export default robotTheme;