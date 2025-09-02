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

  test('should have a working mailto link', async ({ page }) => {
    const mailLink = page.locator('a[href^="mailto:"]');
    await expect(mailLink.first()).toBeVisible();
    await expect(mailLink.first()).toHaveAttribute('href', /mailto:techsisterskenya@gmail.com/i);
  });

  test('lists should render with multiple items', async ({ page }) => {
    // Behavior expectations list
    const behaviorListItems = page.locator('ul.list-disc >> li');
    await expect(behaviorListItems.first()).toBeVisible();
    expect(await behaviorListItems.count()).toBeGreaterThanOrEqual(6);

    // Unacceptable behaviors list likely follows; ensure there are many list items overall
    expect(await page.locator('ul.list-disc li').count()).toBeGreaterThanOrEqual(10);
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1').first()).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1').first()).toBeVisible();

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have accessible elements', async ({ page }) => {
    const h1Headings = await page.locator('h1').all();
    expect(h1Headings.length).toBeGreaterThanOrEqual(1);

    // Ensure multiple section headings exist (h2/h3/h4)
    const headingSelectors = 'h2, h3, h4';
    expect(await page.locator(headingSelectors).count()).toBeGreaterThanOrEqual(6);
  });
});
