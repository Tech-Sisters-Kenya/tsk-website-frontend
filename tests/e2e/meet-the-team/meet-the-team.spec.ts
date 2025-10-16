import { test, expect } from '@playwright/test';

test.describe('Meet The Team Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API for team members
    await page.route('https://api.techsisterskenya.org/api/team-members', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: '2',
              user: 'Imani Grace',
              role: 'Content editor',
              image_url: '/imani.svg',
            },
            {
              id: '3',
              user: 'Oral Langosh',
              role: 'Full stack developer',
              image_url: '/orallangosh.svg',
            },
          ],
        }),
      });
    });

    await page.goto('/meet-the-team');
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto('meet-the-team');
    await expect(page.getByTestId('loading-state')).toBeVisible();
  });

  test('renders page header', async ({ page }) => {
    await expect(page.getByTestId('header-section')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Meet The Team' })).toBeVisible();
  });

  test('renders founder section with clickable founder', async ({ page }) => {
    const founderSection = page.getByTestId('founder-section');
    await expect(founderSection).toBeVisible();
    await expect(founderSection.getByText('Founder / Co-Founder')).toBeVisible();

    // Click a founder card
    await founderSection.getByTestId('team-member').first().click();
    // bio popup should appear
    await expect(page.getByTestId('founder-bio-popup')).toBeVisible();
    // close popup
    await page.getByTestId('close-bio-btn').click();
    await expect(page.getByTestId('founder-bio-popup')).toHaveCount(0);
  });

  test('renders team members from API', async ({ page }) => {
    const teamSection = page.getByTestId('team-section');
    await expect(teamSection).toBeVisible();

    // founder /co-founder mocked
    await expect(teamSection.getByText('Imani Grace')).toBeVisible();
    await expect(teamSection.getByText('Oral Langosh')).toBeVisible();
  });
});
