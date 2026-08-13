// Central project data for the case-study system.
// Add a new project by appending an object here — the page and components
// render it automatically from the slug.

export const projects = [
  {
    slug: "vaagai-kart",
    title: "VaagaiKart",
    category: "E-Commerce Platform",
    tagline:
      "A modern e-commerce experience designed around simple product discovery, intuitive navigation, and a clean shopping journey.",
    role: "UI/UX Designer + Developer",
    type: "Team Project — Full-Stack",
    status: "Complete",
    focus: ["E-Commerce UX", "Responsive Design", "Product Experience"],
    image: "/project-vaagaicart.webp",
    accent: "emerald",
    tools: [
      { name: "SQL", note: "Data modelling" },
      { name: "MySQL", note: "Relational database" },
      { name: "Java", note: "Backend services" },
      { name: "REST API", note: "Product / order / user management" },
    ],
    links: {
      github: "https://github.com/aakashk2005/VaagaiCart-E-Commerce-Product-Catalog",
    },
    overview:
      "VaagaiKart is an e-commerce product catalog designed as a team project with a clean shopping journey at its heart. The product experience is paired with a normalized relational database schema and REST APIs that power full product, order, and user management end-to-end.",
    challenge: {
      heading: "E-commerce that stays simple",
      text: "Shopping catalogs often bury products under cluttered layouts and heavy navigation. The challenge was to design an e-commerce experience that keeps discovery effortless — a clear browsing path from homepage to checkout — while also structuring the data behind it so products, orders, and users stay consistent and manageable through a relational model.",
    },
    process: [
      {
        num: "01",
        title: "Define",
        text: "Structured the product catalog around a normalized relational model so products, orders, and users stay consistent and queryable.",
      },
      {
        num: "02",
        title: "Design",
        text: "Designed the shopping journey — browse, product detail, cart, and checkout — with clean hierarchy and responsive layouts.",
      },
      {
        num: "03",
        title: "Build",
        text: "Implemented the relational schema in MySQL and built REST APIs with Java to manage products, orders, and users.",
      },
      {
        num: "04",
        title: "Test",
        text: "Verified the core flows end-to-end: catalog reads, order placement, and user management through the APIs.",
      },
    ],
    story: {
      eyebrow: "The Shopping Journey",
      heading: "From browse to checkout without friction",
      intro:
        "Every screen was designed to move the shopper one step closer to a purchase with as little effort as possible.",
      steps: [
        {
          num: "01",
          title: "Home",
          text: "A focused entry point that surfaces categories and featured products instead of overwhelming the shopper.",
        },
        {
          num: "02",
          title: "Browse",
          text: "Listing and filtering make product discovery quick — the catalog stays scannable at any screen size.",
        },
        {
          num: "03",
          title: "Product details",
          text: "A clean detail view keeps the essentials readable: image, price, and a clear add-to-cart action.",
        },
        {
          num: "04",
          title: "Cart & checkout",
          text: "The final steps stay minimal and predictable, keeping the purchase journey calm and uncluttered.",
        },
      ],
    },
    designSystem: {
      eyebrow: "Design Language",
      heading: "A calm, product-first system",
      intro:
        "The interface relies on generous spacing, a restrained palette, and clear hierarchy so products stay the hero.",
      palette: [
        { name: "Surface", hex: "#FFFFFF", text: "Dark text" },
        { name: "Ink", hex: "#111827", text: "Primary text" },
        { name: "Muted", hex: "#6B7280", text: "Secondary text" },
        { name: "Accent", hex: "#10B981", text: "Actions & highlights" },
      ],
      typography: {
        heading: "Sora / Sans-Serif",
        body: "Sora / Light weight",
        note: "Strong headings, lightweight body — consistent with the main portfolio.",
      },
      components: [
        { name: "Product card", note: "Image-led cards with a clear price and action." },
        { name: "Buttons", note: "Rounded, high-contrast primary actions." },
        { name: "Inputs", note: "Simple bordered fields for search, auth, and checkout." },
        { name: "Navigation", note: "A minimal top bar that keeps categories one click away." },
      ],
    },
    screens: [
      { title: "Homepage", alt: "VaagaiKart homepage", caption: "Focused entry into the catalog." },
      { title: "Product listing", alt: "VaagaiKart product listing", caption: "Scannable grid with filtering." },
      { title: "Product details", alt: "VaagaiKart product details", caption: "Clear detail view with a single primary action." },
      { title: "Cart", alt: "VaagaiKart cart", caption: "A minimal, predictable cart." },
      { title: "Authentication", alt: "VaagaiKart authentication", caption: "Simple sign-in / sign-up flow." },
      { title: "Checkout", alt: "VaagaiKart checkout", caption: "The final step, kept calm and clear." },
    ],
    development: {
      eyebrow: "Development",
      heading: "Data first, then APIs",
      intro:
        "VaagaiKart was built as a full-stack product: a normalized schema on MySQL, Java-based services, and REST APIs for product, order, and user management.",
      stack: [
        { name: "MySQL", note: "Normalized relational schema" },
        { name: "Java", note: "Backend services" },
        { name: "REST API", note: "Product / order / user endpoints" },
      ],
      points: [
        { title: "Normalized schema", text: "Products, orders, and users are modeled to avoid duplication and keep data consistent." },
        { title: "REST services", text: "CRUD operations for products, orders, and users exposed through clean REST endpoints." },
        { title: "Full-stack flow", text: "The catalog UI reads from the same APIs that power order and user management." },
      ],
    },
    reflection: {
      eyebrow: "Reflection",
      heading: "What I learned",
      items: [
        { area: "Data design", text: "A thoughtful schema shapes every feature — good modelling makes the rest of the product easier to build." },
        { area: "UX in e-commerce", text: "The purchase journey is a chain; each screen either moves the user forward or quietly loses them." },
        { area: "Full-stack thinking", text: "Designing the API surface alongside the UI kept the experience and the data model in sync." },
      ],
    },
  },
  {
    slug: "reeltalks",
    title: "ReelTalks",
    category: "Cinematic Entertainment Platform",
    tagline:
      "A cinematic digital experience created for movie lovers, combining storytelling, visual design, and entertainment-focused interaction.",
    role: "UI/UX Designer + Developer",
    type: "UI/UX Concept — Web Design",
    status: "Concept",
    focus: ["Cinematic", "Dark", "Immersive", "Editorial"],
    image: "/project-reeltalks.webp",
    accent: "blue",
    tools: [{ name: "Figma", note: "Design & prototyping" }],
    links: {
      behance:
        "https://www.behance.net/gallery/230067247/ReelTalks-A-Cinematic-UI-Experience-for-Movie-Lovers",
    },
    overview:
      "ReelTalks is a cinematic platform concept for movie lovers — a place to explore, review, and celebrate films. The whole interface is designed to feel like entering a cinema rather than opening a conventional website: dark, dramatic, and editorial from the first frame.",
    challenge: {
      heading: "Make the web feel like the cinema",
      text: "Most entertainment websites feel like generic dashboards — grids of text and thumbnails that never capture the emotion of film. The challenge was to translate the cinema experience into an interface: dramatic scale, bold imagery, and an atmosphere that puts the visitor inside the movie before they press play.",
    },
    process: [
      {
        num: "01",
        title: "Discover",
        text: "Defined the mood — cinematic, dark, and immersive — so every screen reads like a film poster or a scene.",
      },
      {
        num: "02",
        title: "Define",
        text: "Structured content around discovery: browsing, featured titles, and detail views with room to breathe.",
      },
      {
        num: "03",
        title: "Design",
        text: "Designed hero, card, and detail layouts with dramatic typography, contrast, and rich imagery.",
      },
      {
        num: "04",
        title: "Refine",
        text: "Iterated on spacing, motion cues, and dark-surface contrast so the interface stays readable and premium.",
      },
    ],
    story: {
      eyebrow: "Behind the Interface",
      heading: "Designing for the dark of a theatre",
      intro:
        "The creative idea behind ReelTalks is simple: treat every screen like a frame. Deep blacks, focused light, and imagery that bleeds to the edges make browsing films feel like moving through a cinema lobby at night.",
      blocks: [
        {
          title: "Hero",
          caption: "A full-bleed, poster-scale hero sets the tone before any content competes for attention.",
        },
        {
          title: "Movie discovery",
          caption: "Editorial rows and featured collections make discovery feel curated rather than algorithmic.",
        },
        {
          title: "Movie details",
          caption: "Detail screens lean on scale and imagery — the film is the protagonist, not the metadata.",
        },
        {
          title: "Cards & navigation",
          caption: "High-contrast cards and a quiet navigation system keep the interface immersive.",
        },
      ],
    },
    designSystem: {
      eyebrow: "Design Language",
      heading: "A cinematic, editorial system",
      intro:
        "A disciplined dark system built around contrast, scale, and restraint — the design language does the storytelling.",
      palette: [
        { name: "Onyx", hex: "#0A0A0F", text: "Base surface" },
        { name: "Ember", hex: "#E50914", text: "Signature accent" },
        { name: "Bone", hex: "#F5F3F0", text: "Primary text" },
        { name: "Smoke", hex: "#8A8A93", text: "Secondary text" },
      ],
      typography: {
        heading: "Sora / Display weight",
        body: "Sora / Light weight",
        note: "Large display headings over lightweight body text create the editorial contrast.",
      },
      components: [
        { name: "Movie card", note: "Image-forward cards that scale on hover like a poster coming to life." },
        { name: "Hero banner", note: "Full-bleed imagery with gradient scrims for text legibility." },
        { name: "Buttons", note: "Sharp, high-contrast actions that feel like cinema tickets." },
        { name: "Navigation", note: "A slim, dark bar that steps out of the way of the content." },
      ],
    },
    screens: [
      { title: "Hero", alt: "ReelTalks hero", caption: "A poster-scale opening frame.", layout: "full" },
      { title: "Movie discovery", alt: "ReelTalks movie discovery", caption: "Curated editorial rows.", layout: "split" },
      { title: "Movie details", alt: "ReelTalks movie details", caption: "The film takes centre stage.", layout: "full" },
      { title: "Movie cards", alt: "ReelTalks movie cards", caption: "High-contrast card language.", layout: "split" },
      { title: "Navigation", alt: "ReelTalks navigation", caption: "A quiet, immersive nav bar." },
      { title: "Interactive elements", alt: "ReelTalks interactive elements", caption: "Motion cues that reward exploration." },
    ],
    reflection: {
      eyebrow: "Reflection",
      heading: "What I learned",
      items: [
        { area: "Atmosphere", text: "Mood is a design decision. Dark surfaces, scale, and restraint can carry an entire experience." },
        { area: "Typography", text: "Dramatic type does the heavy lifting — when imagery leads, type must follow with confidence." },
        { area: "Storytelling", text: "An interface can narrate a story; every scroll feels like the next scene." },
      ],
    },
  },
  {
    slug: "fixura",
    title: "Fixura",
    category: "Digital Product Experience",
    tagline:
      "A user-focused digital solution designed to simplify the way users interact with a service-based platform.",
    role: "UI/UX Designer",
    type: "UI/UX — Product Design",
    status: "Design",
    focus: ["User Experience", "Information Architecture", "Visual Hierarchy", "Responsive Design"],
    image: "/project-fixura.webp",
    accent: "red",
    tools: [{ name: "Figma", note: "Design & prototyping" }],
    links: {
      behance: "https://www.behance.net/gallery/212585949/UIUX-Mobile-App",
    },
    overview:
      "Fixura is a user-focused digital product designed to simplify how people interact with a service-based platform. The work centres on information architecture, clear navigation, and a strong visual hierarchy so users can find what they need and act without friction.",
    challenge: {
      heading: "Simplify a service-heavy experience",
      text: "Service platforms often overload users with options, dense pages, and unclear paths to action. The challenge was to distil the service into a clear, confident interface — one where navigation feels obvious, hierarchy guides the eye, and every screen works responsively from phone to desktop.",
    },
    process: [
      {
        num: "01",
        title: "Discover",
        text: "Mapped the service journey — how users discover, compare, and engage with a service provider.",
      },
      {
        num: "02",
        title: "Define",
        text: "Defined the information architecture and navigation to reduce the steps to key actions.",
      },
      {
        num: "03",
        title: "Design",
        text: "Explored layouts and visual hierarchy to guide attention and build trust in the service.",
      },
      {
        num: "04",
        title: "Iterate",
        text: "Refined responsive behaviour and interaction states across breakpoints.",
      },
    ],
    story: {
      eyebrow: "Design Decisions",
      heading: "Choices that put the user first",
      intro:
        "Each key decision was made to reduce effort — fewer steps to act, clearer paths, and a hierarchy that answers questions before they are asked.",
      steps: [
        {
          num: "01",
          title: "Information architecture",
          text: "Grouped services and content into a shallow structure so nothing is ever more than a click or two away.",
        },
        {
          num: "02",
          title: "Navigation",
          text: "A persistent, predictable navigation keeps orientation across the whole experience.",
        },
        {
          num: "03",
          title: "Visual hierarchy",
          text: "One clear primary action per screen; everything else is visually quieter.",
        },
        {
          num: "04",
          title: "Responsive behaviour",
          text: "Layouts reflow cleanly across breakpoints so the experience is consistent on any device.",
        },
      ],
    },
    designSystem: {
      eyebrow: "Design Language",
      heading: "Trust through clarity",
      intro:
        "The system uses a clean, calm palette and consistent components so the service feels dependable at a glance.",
      palette: [
        { name: "White", hex: "#FFFFFF", text: "Base surface" },
        { name: "Graphite", hex: "#1F2937", text: "Primary text" },
        { name: "Slate", hex: "#6B7280", text: "Secondary text" },
        { name: "Accent", hex: "#F13024", text: "Actions & highlights" },
      ],
      typography: {
        heading: "Sora / Semibold",
        body: "Sora / Light weight",
        note: "Confident headings with light body text keep the interface airy and approachable.",
      },
      components: [
        { name: "Cards", note: "Soft, bordered surfaces that group related information." },
        { name: "Buttons", note: "Rounded, high-contrast actions with clear states." },
        { name: "Inputs", note: "Simple fields with visible focus states." },
        { name: "Navigation", note: "Clear, persistent navigation that never loses the user." },
      ],
    },
    screens: [
      { title: "User flow", alt: "Fixura user flow", caption: "The path from landing to action, kept short.", layout: "full" },
      { title: "Home / Landing", alt: "Fixura landing", caption: "A clear entry into the service." },
      { title: "Service view", alt: "Fixura service view", caption: "Information grouped for quick scanning." },
      { title: "Detail / Action", alt: "Fixura detail view", caption: "One clear primary action per screen.", layout: "split" },
      { title: "Navigation states", alt: "Fixura navigation states", caption: "Predictable orientation everywhere." },
      { title: "Responsive layouts", alt: "Fixura responsive layouts", caption: "The same clarity on every device.", layout: "split" },
    ],
    reflection: {
      eyebrow: "Reflection",
      heading: "What I learned",
      items: [
        { area: "Information architecture", text: "Fewer decisions per screen is a feature — structure quietly does most of the UX work." },
        { area: "Hierarchy", text: "Every element competes for attention; the designer's job is to decide what loses." },
        { area: "Responsive first", text: "Designing for small screens first keeps the essentials honest and the desktop elegant." },
      ],
    },
  },
  {
    slug: "web-cricket",
    title: "Web Cricket",
    category: "Interactive Web Experience",
    tagline:
      "A browser-based cricket experience combining interaction, visual feedback, and entertainment in a lightweight web interface.",
    role: "UI/UX Designer + Developer",
    type: "Frontend Web App",
    status: "Complete",
    focus: ["Interaction", "Feedback", "Responsive Design", "Frontend Development"],
    image: "/project-cricket.webp",
    accent: "purple",
    tools: [
      { name: "HTML5", note: "Structure" },
      { name: "CSS3", note: "Visual style & states" },
      { name: "JavaScript", note: "Game logic & feedback" },
    ],
    links: {
      github: "https://github.com/aakashk2005/Web-Cricket-using-HTML-CSS-JS",
    },
    overview:
      "Web Cricket is a lightweight, browser-based cricket game built with plain HTML, CSS, and JavaScript. It focuses on a tight interaction loop — start, play, respond, score — with immediate visual feedback that keeps the game readable and fun on any device.",
    challenge: {
      heading: "Make a game understandable in seconds",
      text: "A browser game lives or dies on its first few seconds. The challenge was to build a cricket experience with a minimal interface — clear rules, obvious actions, and feedback fast enough that a player always knows what just happened and what to do next.",
    },
    process: [
      {
        num: "01",
        title: "Define",
        text: "Defined the core loop: start a match, take an action, get instant feedback, continue.",
      },
      {
        num: "02",
        title: "Design",
        text: "Designed a minimal interface where the game state is always readable at a glance.",
      },
      {
        num: "03",
        title: "Build",
        text: "Built the game with HTML, CSS, and JavaScript for instant loading and smooth play.",
      },
      {
        num: "04",
        title: "Test",
        text: "Play-tested flows across devices and browsers, tuning feedback speed and layout.",
      },
    ],
    story: {
      eyebrow: "Interaction Design",
      heading: "Feedback you can feel",
      intro:
        "Every action in the game produces an immediate response — a swing, a ball, a score update — so the player is always in the loop.",
      steps: [
        {
          num: "01",
          title: "Start",
          text: "A single, obvious entry point drops the player straight into the match.",
        },
        {
          num: "02",
          title: "Play",
          text: "The interaction is one clear action — swing at the ball — with no hidden rules.",
        },
        {
          num: "03",
          title: "System response",
          text: "The game answers instantly: the delivery plays out and the result is shown.",
        },
        {
          num: "04",
          title: "Score & continue",
          text: "The score updates visibly and the next ball begins — the loop never stalls.",
        },
      ],
    },
    screens: [
      { title: "Main interface", alt: "Web Cricket main interface", caption: "The game state readable at a glance.", layout: "full" },
      { title: "Gameplay", alt: "Web Cricket gameplay", caption: "One clear action, instant response." },
      { title: "Score", alt: "Web Cricket score", caption: "Feedback that updates immediately.", layout: "split" },
      { title: "Interaction states", alt: "Web Cricket interaction states", caption: "Visible state changes for every action." },
      { title: "Result states", alt: "Web Cricket result states", caption: "Clear outcomes — win, lose, or continue." },
    ],
    reflection: {
      eyebrow: "Reflection",
      heading: "What I learned",
      items: [
        { area: "Interaction", text: "Instant, visible feedback is the whole game — a slow response breaks the illusion." },
        { area: "Frontend craft", text: "Plain HTML, CSS, and JavaScript are enough to build something genuinely fun and fast." },
        { area: "Simplicity", text: "Removing options made the game easier to understand and more enjoyable to play." },
      ],
    },
  },
];

// Helpers ------------------------------------------------------------------

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) || null;

export const getProjectSlugs = () => projects.map((p) => p.slug);

// Ordered prev/next navigation (wraps around at the ends).
export const getAdjacentProjects = (slug) => {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return { prev, next };
};
