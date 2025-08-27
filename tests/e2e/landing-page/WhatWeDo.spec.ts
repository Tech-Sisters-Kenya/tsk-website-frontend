import { test, expect } from '@playwright/test';

test.describe('WhatWeDo section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders the main title and description', async ({ page }) => {
    await expect(page.getByText('WHAT WE DO')).toBeVisible();
    await expect(page.getByText(/At Tech Sisters, we elevate women in technology/i)).toBeVisible();
  });

  test('initially shows Initiatives content', async ({ page }) => {
    await expect(
      page.getByText('Programs and projects designed to equip, inspire & support women in tech.')
    ).toBeVisible();
  });

  test('switches to Our Events content on click', async ({ page }) => {
    const eventsTab = page.locator('[data-testid="tab-events"]');

    await expect(eventsTab).toBeVisible({ timeout: 10000 });
    await eventsTab.click();
    await expect(page.getByText('Where learning meets connection')).toBeVisible({ timeout: 5000 });
  });

  test('switches to Our Community content on click', async ({ page }) => {
    await page.getByText('Our Community').first().click();
    await expect(page.getByText('More than just tech - it is sisterhood.')).toBeVisible({
      timeout: 5000,
    });
  });
});
