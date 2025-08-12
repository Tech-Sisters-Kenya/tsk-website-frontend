import { test, expect } from '@playwright/test';

test.describe('ReachSection on Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page');
  });

  test('should render title and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Our Reach so Far/i })).toBeVisible();
  });

  test('should render 4 stats', async ({ page }) => {
    const stats = page.getByTestId(/reach-stat-/);
    await expect(stats).toHaveCount(4);
  });

  test('should render Get Involved button with correct link', async ({ page }) => {
    const button = page.getByRole('link', { name: /Get Involved/i });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('href', '/get-involved');
  });

  test('should render the hero image', async ({ page }) => {
    const heroImage = page.getByTestId('reach-image-bug');
    await expect(heroImage).toBeVisible();
  });
});
