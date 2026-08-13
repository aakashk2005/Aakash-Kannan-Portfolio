import { test, expect } from "@playwright/test";

test.describe("Project Case Study Page E2E", () => {
  test("should render the VaagaiKart case study page correctly", async ({ page }) => {
    await page.goto("/work/vaagai-kart");

    // Title verification
    await expect(page).toHaveTitle(/VaagaiKart — E-Commerce Platform Case Study/i);

    // Canonical link verification
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", "https://awersome-portfolio.netlify.app/work/vaagai-kart");

    // Verify OpenGraph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", "VaagaiKart — E-Commerce Platform Case Study | Aakash Kannan");

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", "https://awersome-portfolio.netlify.app/project-vaagaicart.webp");

    // Verify exactly one description tag is present (deduplication check)
    const descriptions = await page.locator('meta[name="description"]').count();
    expect(descriptions).toBe(1);
  });


  test("should return 404 for an invalid project slug", async ({ page }) => {
    // Navigate to invalid slug
    const response = await page.goto("/work/invalid-slug-xyz");
    
    // Response status code should be 404
    expect(response.status()).toBe(404);
  });
});
