import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.setTimeout(60000);
  test('renders all major sections', async ({ page }) => {
    await page.goto('https://techsisterskenya.org/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByText('Our Reach So Far')).toBeVisible();
    await expect(page.getByText(/Software\s*Developers/i)).toBeVisible();
    await expect(page.getByText(/Data\s*Analysts/i)).toBeVisible();
    await expect(page.getByText(/CyberSecurity\s*Enthusiasts/i)).toBeVisible();
    await expect(page.getByText(/Other\s*TechFields/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Who\s*We\s*Are/i })).toBeVisible();
    await expect(page.getByText(/What\s*We\s*Do/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Testimonials/i })).toBeVisible();
  });
});
