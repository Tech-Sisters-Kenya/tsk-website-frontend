import { test, expect } from '@playwright/test';

test.describe('ExploreBlogs section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
    await page.waitForSelector('[data-testid="blog-card"]', { state: 'visible', timeout: 30000 });
  });

  test('renders section heading and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'EXPLORE OUR BLOGS' })).toBeVisible();
    await expect(
      page.getByText(/Stories, Lessons & Resources for Tech Sisters Kenya/i)
    ).toBeVisible();
  });

  test('renders latest blogs list with title and excerpt', async ({ page }) => {
    const blogCards = page.locator('[data-testid="blog-card"]');
    const blogCount = await blogCards.count();
    expect(blogCount).toBeGreaterThan(0);

    for (let i = 0; i < blogCount; i++) {
      const card = blogCards.nth(i);
      await expect(card.locator('h3')).toBeVisible();
      await expect(card.locator('p.italic')).toBeVisible();
    }
  });

  test('read more button navigates to blogs page', async ({ page }) => {
    const readMoreLink = page.getByRole('link', { name: 'Read More' });
    await expect(readMoreLink).toBeVisible();
    await expect(readMoreLink).toHaveAttribute('href', '/blogs');
  });

  test('card stack section is rendered', async ({ page }) => {
    // This checks the container that would hold the CardStack items
    const cardStackContainer = page.locator('.relative.w-full.h-\\[550px\\]');
    await expect(cardStackContainer).toBeVisible();
  });

  test('Tech Sisters logo is visible on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
    await expect(page.getByRole('img', { name: /Tech sisters logo/i }).first()).toBeVisible();
  });
});
