import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure viewport is large enough for lg:flex to show
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/landing-page');
  });

  test('should render heading and paragraph', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Elevating\s+Women\s+In\s+Technology/i });
    await expect(heading).toBeVisible();
  });

  test('should render Join Our Community button with correct link', async ({ page }) => {
    const joinButton = page.getByRole('link', { name: /join our community/i }).first();
    await expect(joinButton).toHaveAttribute('href', '/get-involved');
  });

  test('should render Partner With Us button with correct link', async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'domcontentloaded' });
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    const partnerButton = heroSection.getByRole('link', { name: /partner with us/i });
    await expect(partnerButton).toHaveAttribute('href', '/get-involved');
  });

  test('should render AnimatedShapes', async ({ page }) => {
    const shapes = page.getByTestId('animated-shapes');
    await expect(shapes).toBeVisible({ timeout: 10000 });
  });
});
