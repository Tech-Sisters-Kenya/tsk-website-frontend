import { test, expect } from '@playwright/test';

test.describe('BlogPost Page E2E Testing', () => {
  test('shows loading state initially', async ({ page }) => {
    await page.route('**/api/*', async (route) => {
      // Delay API response to trigger loading spinner
      await new Promise((res) => setTimeout(res, 2000));
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            id: '1',
            slug: 'test-blog-1',
            title: 'Test Blog Title',
            content: '<p>Blog content here</p>',
            image_url: '/test.jpg',
            extract: 'Test extract',
            status: 'published',
            is_featured: false,
            author: { id: '10', name: 'Valeria Bosibori', email: 'valeria@techsisters.com' },
            category: { id: '20', name: 'TSK' },
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        }),
      });
    });

    await page.goto('/blogs/test-blog-1');
    await expect(page.getByText(/Loading blog/i)).toBeVisible();
  });

  test('renders blog content when API succeeds', async ({ page }) => {
    await page.route('**/api/blogs/*', async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            id: '1',
            slug: 'test-blog-1',
            title: 'Test Blog Title',
            content: '<p>Blog content here</p>',
            image_url: '/test.jpg',
            extract: 'Test extract',
            status: 'published',
            is_featured: false,
            author: { id: '10', name: 'Valeria Bosibori', email: 'valeria@techsisters.com' },
            category: { id: '20', name: 'TSK' },
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        }),
      });
    });

    await page.goto('/blogs/test-blog-1');

    await expect(page.getByRole('heading', { name: 'Test Blog Title' })).toBeVisible();
    await expect(page.getByText('Blog content here')).toBeVisible();
    await expect(page.getByText('Valeria Bosibori')).toBeVisible();
  });

  test('renders error state when API fails', async ({ page }) => {
    await page.route('**/api/blogs/*', async (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });

    await page.goto('/blogs/test-blog-1');

    await expect(page.getByText(/Something went wrong/i)).toBeVisible();
  });

  test("navigates to 'More Blogs' link", async ({ page }) => {
    await page.route('**/api/blogs/*', async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            id: '1',
            slug: 'test-blog-1',
            title: 'Test Blog Title',
            content: '<p>Blog content here</p>',
            image_url: '/test.jpg',
            extract: 'Test extract',
            status: 'published',
            is_featured: false,
            author: { id: '10', name: 'Valeria Bosibori', email: 'valeria@techsisters.com' },
            category: { id: '20', name: 'TSK' },
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        }),
      });
    });

    await page.goto('/blogs/test-blog-1');

    const viewAllBtn = page.getByRole('button', { name: 'View All' });
    await expect(viewAllBtn).toBeVisible();
    await viewAllBtn.click();

    await expect(page).toHaveURL('/blogs');
  });
});
