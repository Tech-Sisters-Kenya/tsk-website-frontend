import { test, expect } from '@playwright/test';

test.describe('ExploreBlogs section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page');
    // Wait for the main content to be visible
    await page.waitForSelector('main', { state: 'visible', timeout: 30000 });
    // Scroll to the blogs section to ensure it's in view
    await page.evaluate(() => {
      const element = document.querySelector('[data-testid="blog-card"]');
      if (element) element.scrollIntoView();
    });
    // Wait for blog cards to be visible with a retry mechanism
    let retries = 3;
    let lastError;

    while (retries > 0) {
      try {
        await page.waitForSelector('[data-testid="blog-card"]', {
          state: 'visible',
          timeout: 10000,
        });
        return;
      } catch (error) {
        lastError = error;
        retries--;
        if (retries > 0) {
          await page.reload();
          await page.waitForTimeout(1000);
        }
      }
    }
    throw lastError;
  });

  test('renders section heading and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'EXPLORE OUR BLOGS' })).toBeVisible();
    await expect(
      page.getByText(/Stories, Lessons & Resources for Tech Sisters Kenya/i)
    ).toBeVisible();
  });

  test('renders latest blogs list with title and excerpt', async ({ page }) => {
    // Wait for blog cards to be present
    await page.waitForSelector('[data-testid="blog-card"]', { state: 'attached' });

    // Get all blog cards with retry logic
    let blogCards = page.locator('[data-testid="blog-card"]');
    let blogCount = 0;
    let retries = 3;

    while (retries > 0) {
      blogCount = await blogCards.count();

      if (blogCount > 0) break;

      retries--;
      if (retries > 0) {
        await page.waitForTimeout(1000);
      }
    }

    expect(blogCount).toBeGreaterThan(0);

    // Test each blog card
    for (let i = 0; i < blogCount; i++) {
      const card = blogCards.nth(i);

      // Scroll to the card to ensure it's in view
      await card.scrollIntoViewIfNeeded();

      // Wait for the title to be visible with a small timeout
      await expect(card.locator('h3').first()).toBeVisible({ timeout: 5000 });

      // Check for excerpt (either in p.italic or first p)
      const excerpt = card.locator('p.italic').first().or(card.locator('p').first());
      await expect(excerpt).toBeVisible({ timeout: 5000 });
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
