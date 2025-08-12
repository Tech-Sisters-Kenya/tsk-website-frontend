import { test, expect } from '@playwright/test';
test.describe('BrandsSection on Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { timeout: 60000 });
  });

  test('should render section title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Brands That Believe In Us' })).toBeVisible();
  });

  test('should render all brand logos', async ({ page }) => {
    const logos = page.locator('#brands img[alt$="Logo"]');
    await expect(logos).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(logos.nth(i)).toBeVisible();
    }
  });
});
