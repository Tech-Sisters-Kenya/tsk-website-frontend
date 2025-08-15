import { test, expect } from '@playwright/test';

test.describe('WhoWeAre Section on Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page');
  });

  test('should render the "WHO WE ARE" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /who we are/i })).toBeVisible();
  });

  test('should display the mission section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /our mission/i })).toBeVisible();
    await expect(page.getByText(/create a supportive and inclusive community/i)).toBeVisible();
  });

  test('should display the vision section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /our vision/i })).toBeVisible();
    await expect(page.getByText(/a kenya where women are empowered/i)).toBeVisible();
  });

  test('should render all 4 core value icons and labels', async ({ page }) => {
    const values = ['Inclusivity', 'Community', 'Growth', 'Empowerment'];
    for (const value of values) {
      await expect(page.getByText(value, { exact: true })).toBeVisible();
      await expect(page.locator(`img[alt="${value}"]`)).toBeVisible();
    }
  });

  test('should render top image, bottom image, and logo', async ({ page }) => {
    // Target the first "image" alt occurrence for the top image
    const topImage = page.locator('img[alt="image"]').first();
    await expect(topImage).toBeVisible();

    await expect(page.locator('img[alt="group photo"]')).toBeVisible();
    await expect(page.locator('img[alt="logo"]')).toBeVisible();
  });

  test('should render BrandsSection with identifiable container', async ({ page }) => {
    const brandsSection = page.locator('#brands');
    await expect(brandsSection).toBeVisible();
    await expect(brandsSection.getByText(/brands/i)).toBeVisible();
  });
});
