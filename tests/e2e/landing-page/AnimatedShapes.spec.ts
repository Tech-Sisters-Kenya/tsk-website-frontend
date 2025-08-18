import { test, expect } from '@playwright/test';

test.describe('AnimatedShapes Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
    await page.waitForSelector('[data-testid="animated-shapes"]', {
      state: 'visible',
      timeout: 30000,
    });
  });

  test('renders main images and SVG shapes', async ({ page }) => {
    await expect(page.getByAltText('Tech Sister 1')).toBeVisible();
    await expect(page.getByAltText('Tech Sister 2')).toBeVisible();
    await expect(page.locator('svg rect[width="539"][height="165.929"]')).toBeVisible();
    await expect(page.locator('[data-testid="animated-shapes"]')).toBeVisible();
  });

  test('renders animated semi-circle shape', async ({ page }) => {
    const semiCircle = page.locator('svg path[d*="152.464 168.216"]');
    await expect(semiCircle).toBeVisible();
    await expect(semiCircle).toHaveAttribute('fill', '#45084A');
  });

  test('renders animated circle shape', async ({ page }) => {
    const circle = page.locator('svg circle[fill="#FFBAFF"]');
    await expect(circle).toBeVisible();
    await expect(circle).toHaveAttribute('r', '60');
  });

  test('renders animated cloud shape', async ({ page }) => {
    const cloud = page.locator('svg path[d*="37.9636 35.3243"]');
    await expect(cloud).toBeVisible();
    await expect(cloud).toHaveAttribute('fill', '#45084A');
  });

  test('renders animated pill shape', async ({ page }) => {
    const pill = page.locator('svg rect[stroke="#70169E"][transform*="rotate"]');
    await expect(pill).toBeVisible({ timeout: 10000 });
    await expect(pill).toHaveAttribute('stroke', '#70169E');
  });

  test('renders animated text elements', async ({ page }) => {
    await expect(page.locator('svg path[d*="41.3959 33.6857"]')).toBeVisible();
    await expect(page.locator('svg path[d*="51.0469 23.3779"]')).toBeVisible();
  });

  test('renders logo animation', async ({ page }) => {
    const logoSvg = page.locator('svg path[fill="#70169E"]').first();
    await expect(logoSvg).toBeVisible({ timeout: 10000 });
  });
});
