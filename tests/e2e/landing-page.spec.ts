import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });

  test('renders CallToAction section with visible buttons', async ({ page }) => {
    const callToAction = page.getByTestId('call-to-action');
    await expect(callToAction).toBeVisible();

    // Verify main call-to-action buttons/texts
    await expect(page.getByText('Join Our Community')).toBeVisible();
    await expect(page.getByText('Partner With Us')).toBeVisible();
  });
});
