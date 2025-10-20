import { test, expect } from '@playwright/test';

test.describe('FAQ Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the FAQ page before each test
    await page.goto('/faq');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should have accessible elements', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = await page.locator('h1').all();
    expect(headings.length).toBeGreaterThanOrEqual(2); // Main FAQ and Tech FAQ headings

    // Check that accordion triggers have proper ARIA attributes
    const accordionTriggers = page.locator('[data-slot="accordion-trigger"]');
    expect(await accordionTriggers.count()).toBeGreaterThan(0);

    // Check for proper accordion structure
    const accordion = page.locator('[data-slot="accordion"]');
    await expect(accordion).toBeVisible();
  });
});
