import { test, expect } from '@playwright/test';

test.describe('Privacy Policy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy-policy');
    await page.waitForLoadState('networkidle');
  });

  test('should load the Privacy Policy page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tech Sisters Kenya/);

    const mainHeading = page.getByRole('heading', { level: 1 }).first();
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('PRIVACY POLICY');
  });

  test('should display key sections and important content', async ({ page }) => {
    await page.waitForTimeout(500);

    const expectedTexts = [
      'Effective Date:',
      'WHO WE ARE',
      'WHAT INFORMATION WE COLLECT',
      'HOW WE USE YOUR INFORMATION',
      'EMAIL & COMMUNICATION PREFERENCES',
      'DATA PROTECTION',
      'COOKIES',
      'THIRD-PARTY TOOLS',
      "CHILDREN'S PRIVACY",
      'CHANGES TO THIS POLICY',
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

  test('should validate external website link', async ({ page }) => {
    const siteLink = page.locator('a[href^="https://www.techsisterskenya.org"]');
    await expect(siteLink.first()).toBeVisible();
    await expect(siteLink.first()).toHaveAttribute(
      'href',
      /https:\/\/www\.techsisterskenya\.org\/?\.?/
    );
  });

  test('lists should render with multiple items', async ({ page }) => {
    // Multiple sections include bullet lists; ensure they render and have several items
    const listItems = page.locator('ul.list-disc li');
    await expect(listItems.first()).toBeVisible();
    expect(await listItems.count()).toBeGreaterThanOrEqual(10);
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
