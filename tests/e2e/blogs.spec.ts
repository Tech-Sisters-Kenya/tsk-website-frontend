import { test, expect } from '@playwright/test';

test.describe('Blogs Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blogs');
  });

  test('should show all blogs when "All" tag is selected and first 10 blogs are displayed', async ({
    page,
  }) => {
    const allTag = page.getByRole('button', { name: 'All' });
    await allTag.click();

    await expect(allTag).toHaveAttribute('aria-pressed', 'true');
    const blogCards = page.locator('[data-testid="blog-card"]');
    const count = await blogCards.count();
    expect(count).toBeLessThanOrEqual(10);
  });

  test('should render only one page if there are less than 10 blogs from the API', async ({
    page,
  }) => {
    const blogCards = page.locator('[data-testid="blog-card"]');
    const count = await blogCards.count();
    expect(count).toBeLessThanOrEqual(10);

    // pagination shows only 1 page
    const pagination = page.getByRole('navigation', { name: 'Pagination' });
    await expect(pagination).toContainText('1');

    //first, last buttons are not visible
    await expect(page.getByRole('button', { name: 'First' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Last' })).not.toBeVisible();
  });

  test('should paginate to other pages when blogs are greater than 10', async ({ page }) => {
    // mock api call to return more than 10 blogs
    await page.route('**/api/blogs', async (route) => {
      const mockBlogs = Array.from({ length: 25 }, (_, i) => ({
        id: `blog-${i + 1}`,
        title: `Blog ${i + 1}`,
        slug: '',
        extract: '',
        content: '',
        image_url: `https://res.cloudinary.com/dmpks4ts3/image/upload/v1755078581/blogs/vwniazwctarndwpmg6op.png`,
        is_featured: true,
        author: { id: '', name: '', email: '' },
        category: { id: '', name: '' },
        comments: [],
        created_at: new Date(2023, 0, i + 1).toISOString(),
        updated_at: new Date(2023, 0, i + 1).toISOString(),
      }));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: mockBlogs }), // <-- IMPORTANT shape
      });
    });

    await page.goto('/blogs', { waitUntil: 'networkidle' });
    await page.waitForSelector('[data-testid="tag-selector"]');

    // Should see 10 blogs on first page
    const blogCards = page.locator('[data-testid="blog-card"]');
    await expect(blogCards).toHaveCount(10);

    // navigate to page 2 and see 10 blogs
    await page.locator('ul:has-text("1") >> text=2').click();
    await expect(blogCards.first()).toContainText('Blog 11');

    // navigate to last page
    await page.getByRole('button', { name: 'Last' }).click();
    await expect(blogCards.last()).toContainText('Blog 25');
    await expect(blogCards).toHaveCount(5);

    // navigate to first page
    await page.getByRole('button', { name: 'First' }).click();
    await expect(blogCards.first()).toContainText('Blog 1');
    await expect(blogCards).toHaveCount(10);
  });

  test('should display blogs in 3 and 2 grid layout', async ({ page }) => {
    await page.waitForSelector('[data-testid="tag-selector"]');

    // Should see 10 blogs on first page
    const rows = page.locator('div.mb-8');
    const count = await rows.count();
    expect(count).toBeGreaterThan(1);

    await expect(rows.first()).toHaveClass(/grid-cols-[1.2fr_0.8fr]/); // first row should have 2 columns
    await expect(rows.nth(1)).toHaveClass(/grid-cols-3/); // second row should have 3 columns
  });

  test('should be responsive based on screen size', async ({ page }) => {
    await page.waitForSelector('[data-testid="tag-selector"]');
    const rows = page.locator('div.mb-8');
    // mobile view test
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(rows.first()).toHaveClass(/grid-cols-1/);
    await expect(rows.nth(1)).toHaveClass(/grid-cols-1/);

    // tablet view test
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(rows.first()).toHaveClass(/grid-cols-[1.2fr_0.8fr]/);
    await expect(rows.nth(1)).toHaveClass(/grid-cols-3/);

    // desktop view test
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(rows.first()).toHaveClass(/grid-cols-[1.2fr_0.8fr]/);
    await expect(rows.nth(1)).toHaveClass(/grid-cols-3/);
  });
});
