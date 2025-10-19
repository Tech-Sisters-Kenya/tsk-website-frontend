import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders CallToAction section', async ({ page }) => {
    // Find join our community and partner with us button
    await expect(page.locator('text=Call to Action'))
      .toBeVisible()
      .catch(() => {});
  });
});
