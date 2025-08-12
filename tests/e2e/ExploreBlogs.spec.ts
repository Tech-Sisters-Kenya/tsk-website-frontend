import { test, expect } from '@playwright/test';

test.describe('ExploreBlogs section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders section heading and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'EXPLORE OUR BLOGS' })).toBeVisible();
    await expect(
      page.getByText('Stories, Lessons & Resources for Tech Sisters Kenya')
    ).toBeVisible();
  });

  test('renders latest blogs list with title and excerpt', async ({ page }) => {
    const latestBlogsHeading = page.getByRole('heading', { name: 'Latest blogs' });
    await expect(latestBlogsHeading).toBeVisible();

    // Blog titles should be clickable links
    const blogLinks = page.locator('a[href^="/blogs/"]').filter({
      has: page.locator('h3'),
    });

    const blogCount = await blogLinks.count();
    expect(blogCount).toBeGreaterThan(0);

    for (let i = 0; i < blogCount; i++) {
      const link = blogLinks.nth(i);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /\/blogs\/.+/);
    }

    await expect(page.locator('p.italic')).toHaveCount(blogCount);
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
    await page.goto('landing-page', { waitUntil: 'networkidle' });
    await expect(page.getByRole('img', { name: /Tech sisters logo/i })).toBeVisible();
  });
});
