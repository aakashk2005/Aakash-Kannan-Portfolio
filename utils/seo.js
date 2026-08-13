export const getSiteUrl = () => {
  // If NEXT_PUBLIC_SITE_URL is defined, use it (both server and client sides)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // In development environments
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  // Default fallback production URL
  return "https://awersome-portfolio.netlify.app";
};

export const isProductionSite = () => {
  const url = getSiteUrl();
  return (
    url.includes("awersome-portfolio.netlify.app") ||
    (process.env.NEXT_PUBLIC_SITE_URL &&
      !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost") &&
      !process.env.NEXT_PUBLIC_SITE_URL.includes("127.0.0.1"))
  );
};
