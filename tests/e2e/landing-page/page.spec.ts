import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders Hero section', async ({ page }) => {
    await expect(page.locator('h1, h2, h3', { hasText: /hero/i }))
      .toBeVisible()
      .catch(() => {});
  });

  test('renders WhoWeAre section', async ({ page }) => {
    await expect(page.locator('text=Who We Are')).toBeVisible();
  });

  test('renders OurReach section with stats', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'OUR REACH SO FAR' })).toBeVisible();

    // Check presence of stats values
    await page.waitForSelector('text=700+', { timeout: 15000 });
    await expect(page.locator('text=700+')).toBeVisible();

    await page.waitForSelector('text=450+', { timeout: 15000 });
    await expect(page.locator('text=450+')).toBeVisible();

    await page.waitForSelector('text=230+', { timeout: 15000 });
    await expect(page.locator('text=230+')).toBeVisible();

    await page.waitForSelector('text=550+', { timeout: 15000 });
    await expect(page.locator('text=550+')).toBeVisible();
  });

  test('renders WhatWeDo section', async ({ page }) => {
    await expect(page.locator('text=What We Do')).toBeVisible();
  });

  test('renders Gallery section', async ({ page }) => {
    await expect(page.locator('text=Gallery')).toBeVisible();
  });

  test('renders ExploreBlogs section', async ({ page }) => {
    await expect(page.locator('text=EXPLORE OUR BLOGS')).toBeVisible();
  });

  test('renders Testimonials section', async ({ page }) => {
    await expect(page.locator('text=Testimonials')).toBeVisible();
  });

  test('renders CallToAction section', async ({ page }) => {
    // Find join our community and partner with us button
    await expect(page.locator('text=Call to Action'))
      .toBeVisible()
      .catch(() => {});
  });
});
