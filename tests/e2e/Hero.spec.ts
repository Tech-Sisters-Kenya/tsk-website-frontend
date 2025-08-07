import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page');
  });

  test('should render heading and paragraph', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /elevating/i })).toBeVisible();
    await expect(page.getByText(/Tech Sisters Kenya is a non-profit organization/i)).toBeVisible();
  });

  test('should render Join Our Community button with correct link', async ({ page }) => {
    const joinButton = page.getByRole('link', { name: /join our community/i });
    await expect(joinButton).toHaveAttribute('href', '/get-involved');
  });

  test('should render Partner With Us button with correct link', async ({ page }) => {
    const partnerButton = page.getByRole('link', { name: /partner with us/i });
    await expect(partnerButton).toHaveAttribute('href', '/get-involved');
  });
});
