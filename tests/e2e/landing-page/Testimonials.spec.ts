import { test, expect } from '@playwright/test';

test.describe('TestimonialsCarousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders heading, description, and first testimonial', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Testimonials' })).toBeVisible();
    await expect(page.getByText(/From gaining skills to finding belonging/i)).toBeVisible();
    await expect(page.getByText(/Being part of Tech Sisters Kenya/i)).toBeVisible();
    await expect(page.getByText('Mary Wanjiku')).toBeVisible();
  });

  test('can switch testimonials using mobile dots', async ({ page }) => {
    // Emulate mobile size so dots are visible instead of arrows
    await page.setViewportSize({ width: 500, height: 800 });

    const firstTestimonial = page.getByText(/Being part of Tech Sisters Kenya/i);
    const secondTestimonial = page.getByText(/Joining Tech Sisters Kenya opened doors/i);

    // Ensure the first testimonial is visible
    await expect(firstTestimonial).toBeVisible();

    // Click the second dot to change testimonial
    const dots = page.locator('button[aria-label^="Go to testimonial"]');
    await dots.nth(1).click();

    // Wait for the second testimonial to appear
    await expect(secondTestimonial).toBeVisible();
  });

  test('can switch testimonials using next/previous arrows (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });

    const firstTestimonial = page.getByText(/Being part of Tech Sisters Kenya/i);
    const secondTestimonial = page.getByText(/Joining Tech Sisters Kenya opened doors/i);

    // Ensure first is visible
    await expect(firstTestimonial).toBeVisible();

    // Click the "Next testimonial" button
    await page.getByRole('button', { name: 'Next testimonial' }).click();

    // Wait for second to appear
    await expect(secondTestimonial).toBeVisible();

    // Click the "Previous testimonial" button
    await page.getByRole('button', { name: 'Previous testimonial' }).click();

    // Wait for first to appear again
    await expect(firstTestimonial).toBeVisible();
  });
});
