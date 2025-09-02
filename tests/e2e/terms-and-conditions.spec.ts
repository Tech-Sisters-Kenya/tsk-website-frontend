import { test, expect } from '@playwright/test';

test.describe('Terms and Conditions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/terms-and-conditions');
    await page.waitForLoadState('networkidle');
  });

  test('should load the Terms and Conditions page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tech Sisters Kenya/);

    const mainHeading = page.getByRole('heading', { level: 1 }).first();
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('TERMS AND CONDITIONS');
  });

  test('should display key sections and important content', async ({ page }) => {
    await page.waitForTimeout(500);

    const expectedTexts = [
      'Effective Date:',
      'Last Updated:',
      'Welcome to Tech Sisters Kenya (TSK)',
      'THE PURPOSE OF THE SITE',
      'ACCEPTANCE OF TERMS',
      'COMMUNITY CONDUCT',
      'USER SUBMISSIONS',
      'COMMUNICATION',
      'INTELLECTUAL PROPERTY',
      'THIRD-PARTY SERVICES',
      'DISCLAIMER',
      'CHANGES TO THIS TERM',
      'TERMINATION',
      'CONTACT US',
      'techsisterskenya@gmail.com',
      'https://www.techsisterskenya.org',
    ];

    for (const text of expectedTexts) {
      const locator = page.getByText(text, { exact: false });
      const count = await locator.count();
      if (count > 0) {
        await expect(locator.first()).toBeVisible();
      } else {
        const heading = page.getByRole('heading', { name: new RegExp(text, 'i') });
        await expect(heading.first()).toBeVisible();
      }
    }
  });

  test('lists should render with multiple items', async ({ page }) => {
    const listItems = page.locator('ul.list-disc li');
    await expect(listItems.first()).toBeVisible();
    expect(await listItems.count()).toBeGreaterThanOrEqual(6);
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

    const headingSelectors = 'h2, h3, h4';
    expect(await page.locator(headingSelectors).count()).toBeGreaterThanOrEqual(6);
  });
});
