import { test, expect } from '@playwright/test';

test.describe('Code of Conduct Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/code-of-conduct');
    await page.waitForLoadState('networkidle');
  });

  test('should load the Code of Conduct page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tech Sisters Kenya/);

    const mainHeading = page.getByRole('heading', { level: 1 }).first();
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('CODE OF CONDUCT');
  });

  test('should display key sections and content', async ({ page }) => {
    await page.waitForTimeout(500);

    const expectedTexts = [
      'Welcome to Tech Sisters Kenya (TSK)',
      'Behavior Expectations',
      'Unacceptable Behaviors Include:',
      'Our Mantra',
      'What it Means to Us',
      'Reporting Concerns & Community Safety',
      'You can report via:',
      'Confidentiality & Action',
      'Final Note: Building This Together',
      'Handling Violations',
      'techsisterskenya@gmail.com',
    ];

    for (const text of expectedTexts) {
      const locator = page.getByText(text, { exact: false });
      const count = await locator.count();
      if (count > 0) {
        await expect(locator.first()).toBeVisible();
      } else {
        // Fallback to heading roles for robustness
        const heading = page.getByRole('heading', { name: new RegExp(text, 'i') });
        await expect(heading.first()).toBeVisible();
      }
    }
  });
});
