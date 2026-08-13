import Head from "next/head";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";
import { getSiteUrl, isProductionSite } from "../utils/seo";

// Add-ons components
import AddonControls from "./AddonControls";
import AiChatbot from "./AiChatbot";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const siteUrl = getSiteUrl();
  const isProd = isProductionSite();
  const isHome = pathname === "/";
  const cleanPath = router.asPath.split("?")[0];
  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const absoluteOgImage = `${siteUrl}/paper-airplane.webp`;

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Aakash Kannan — UI/UX Designer & Web Developer";
      case "/about":
        return "About Aakash Kannan — UI/UX Designer & Web Developer";
      case "/work":
        return "Selected Work — Aakash Kannan";
      case "/services":
        return "UI/UX Design & Web Development Services — Aakash Kannan";
      case "/contact":
        return "Contact Aakash Kannan — UI/UX Designer & Web Developer";
      case "/skills":
        return "Skills & Technologies — Aakash Kannan";
      case "/experience":
        return "Career Experience & Timeline — Aakash Kannan";
      case "/testimonials":
        return "Achievements By Aakash Kannan";
      default:
        return "Aakash Kannan — Portfolio";
    }
  };

  const getPageDescription = () => {
    switch (pathname) {
      case "/":
        return "Aakash Kannan is a UI/UX Designer and Web Developer creating intuitive digital experiences, modern websites, and creative digital products.";
      case "/about":
        return "Learn about Aakash Kannan, a UI/UX Designer & Web Developer with a passion for creative digital experiences and front-end development.";
      case "/work":
        return "Explore the design and development case studies by Aakash Kannan, showcasing full-stack applications and e-commerce platforms.";
      case "/services":
        return "Professional digital services including UI/UX Design, Web Development, Mobile Development, Automation, and Branding.";
      case "/contact":
        return "Get in touch with Aakash Kannan for web design, development inquiries, collaboration, or job opportunities.";
      case "/skills":
        return "A breakdown of technologies, frameworks, and design tools Aakash Kannan uses, including React, Next.js, and Tailwind CSS.";
      case "/experience":
        return "A timeline of Aakash Kannan's career milestones, roles, and professional history in web design and development.";
      case "/testimonials":
        return "Achievements, awards, and milestones of Aakash Kannan, including hackathons, web design projects, and leadership workshops.";
      default:
        return "Aakash Kannan is a UI/UX Designer and Web Developer creating intuitive digital experiences, modern websites, and creative digital products.";
    }
  };

  const getPageKeywords = () => {
    switch (pathname) {
      case "/":
        return "Aakash Kannan, UI/UX Designer, Web Developer, UI UX Design, Web Design, Frontend Development, Portfolio, Digital Product Design";
      case "/about":
        return "Aakash Kannan, About Me, Web Developer background, UI/UX Designer biography, front-end developer history";
      case "/work":
        return "Aakash Kannan projects, VaagaiKart, ReelTalks, Fixura, Web Cricket, Case Studies, portfolio projects";
      case "/services":
        return "UI/UX Design, Web Development, Mobile Design, Automation, Prototyping, Brand Identity, React development services";
      case "/contact":
        return "Contact Aakash Kannan, hire web developer, hire UI/UX designer, contact form, freelance developer";
      case "/skills":
        return "React, Next.js, Tailwind CSS, Javascript, CSS, HTML, Three.js, Framer Motion, design systems, development tools";
      case "/experience":
        return "Career timeline, work history, web development experience, professional milestones, portfolio history";
      case "/testimonials":
        return "Aakash Kannan achievements, hackathons, awards, Gainwell-Bhumi hackathon, Dark Pattern Buster, college symposium website design, anthology co-author";
      default:
        return "Aakash Kannan, UI/UX Designer, Web Developer, UI UX Design, Web Design, Frontend Development, Portfolio, Digital Product Design";
    }
  };

  return (
    <main
      className="page bg-site text-white bg-cover bg-no-repeat relative"
    >
      <Head>
        <title key="title">{getPageTitle()}</title>
        <meta
          name="description"
          content={getPageDescription()}
          key="description"
        />
        <meta
          name="keywords"
          content={getPageKeywords()}
          key="keywords"
        />
        <meta name="author" content="Aakash Kannan" key="author" />
        <meta name="theme-color" content="#f13024" key="theme-color" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} key="canonical" />

        {/* Robots configuration */}
        {isProd ? (
          <meta name="robots" content="index, follow" key="robots" />
        ) : (
          <meta name="robots" content="noindex, nofollow" key="robots" />
        )}

        {/* OpenGraph / Social Metadata */}
        <meta property="og:title" content={getPageTitle()} key="og-title" />
        <meta
          property="og:description"
          content={getPageDescription()}
          key="og-description"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:image" content={absoluteOgImage} key="og-image" />
        <meta property="og:url" content={canonicalUrl} key="og-url" />
        <meta property="og:site_name" content="Aakash Kannan" key="og-site-name" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:title" content={getPageTitle()} key="twitter-title" />
        <meta
          name="twitter:description"
          content={getPageDescription()}
          key="twitter-description"
        />
        <meta name="twitter:image" content={absoluteOgImage} key="twitter-image" />

        {/* Homepage JSON-LD Structured Data */}
        {isHome && (
          <script
            type="application/ld+json"
            key="jsonld-person"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Aakash Kannan",
                "jobTitle": "UI/UX Designer & Web Developer",
                "url": siteUrl,
                "sameAs": [
                  "https://www.linkedin.com/in/aakash-kannan-8b51a827b/",
                  "https://github.com/aakashk2005",
                  "https://www.behance.net/aakashkannan",
                  "https://dribbble.com/Aakash_Kannan",
                  "https://linktr.ee/Aakash.Kannan"
                ]
              })
            }}
          />
        )}
        {isHome && (
          <script
            type="application/ld+json"
            key="jsonld-website"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Aakash Kannan — Portfolio",
                "url": siteUrl
              })
            }}
          />
        )}
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* Dynamic Add-ons floating overlays */}
      <AddonControls />
      <AiChatbot />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
