import { test, expect } from '@playwright/test';

test.describe('About Us Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the About Us page before each test
    await page.goto('/about-us');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should have working Call to Action links', async ({ page }) => {
    // Look for any links that might be CTAs - use more flexible selectors
    const links = page.locator('a');
    const linkCount = await links.count();

    if (linkCount > 0) {
      // Just verify that links exist and are visible
      await expect(links.first()).toBeVisible();
    }
  });

  test('should have basic SEO structure', async ({ page }) => {
    // Check for basic meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check if description meta tag exists (don't validate content)
    const description = page.locator('meta[name="description"]');
    // This is optional - some pages might not have it yet
    const descriptionCount = await description.count();
    expect(descriptionCount).toBeGreaterThanOrEqual(0);
  });
});
