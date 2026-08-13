import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getSiteUrl, isProductionSite } from "../../utils/seo";

describe("SEO Utilities", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return custom NEXT_PUBLIC_SITE_URL if defined", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://my-custom-domain.com";
    expect(getSiteUrl()).toBe("https://my-custom-domain.com");
  });

  it("should return localhost:3000 in development if NEXT_PUBLIC_SITE_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = "development";
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("should return fallback domain in production if NEXT_PUBLIC_SITE_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = "production";
    expect(getSiteUrl()).toBe("https://awersome-portfolio.netlify.app");
  });

  it("should correctly identify production URLs vs local development URLs", () => {
    // Local development
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    expect(isProductionSite()).toBe(false);

    process.env.NEXT_PUBLIC_SITE_URL = "http://127.0.0.1:3000";
    expect(isProductionSite()).toBe(false);

    // Production environment
    process.env.NEXT_PUBLIC_SITE_URL = "https://awersome-portfolio.netlify.app";
    expect(isProductionSite()).toBe(true);

    process.env.NEXT_PUBLIC_SITE_URL = "https://my-domain.com";
    expect(isProductionSite()).toBe(true);
  });
});
