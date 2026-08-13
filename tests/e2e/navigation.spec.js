import { test, expect } from "@playwright/test";

test.describe("Desktop Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport size
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test("should load the home page and render the main layout", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Aakash Kannan — UI\/UX Designer & Web Developer/i);

    // Verify navigation bar is present
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("should navigate to About page via desktop nav link", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500); // Wait for media query listeners and hydration
    
    // Click about nav link
    const aboutLink = page.locator('nav a[href="/about"]');
    await aboutLink.click();
    
    // Verify route and title changes
    await expect(page).toHaveURL(/\/about$/);
    await expect(page).toHaveTitle(/About Aakash Kannan/i);
  });

  test("should navigate to Contact page via desktop nav link", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500); // Wait for media query listeners and hydration
    
    const contactLink = page.locator('nav a[href="/contact"]');
    await contactLink.click();
    
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page).toHaveTitle(/Contact Aakash Kannan/i);
  });
});

test.describe("Mobile Navigation Scroll Behavior", () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport size
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test("should load home page and not trigger client-side route navigation on nav click", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    
    // On mobile, the homepage sections are all stacked. Let's verify nav links click scrolls instead of route change
    const aboutLink = page.locator('nav a[href="/about"]');
    await aboutLink.click();
    
    // The URL should remain "/" or have section hash like "/#about", but not change route to "/about"
    const currentURL = page.url();
    expect(currentURL).not.toContain("/about");
  });
});
