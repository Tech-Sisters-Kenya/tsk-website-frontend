import { test, expect } from '@playwright/test';

test.describe('Gallery section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing-page', { waitUntil: 'networkidle' });
  });
  test('renders the gallery header and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible();
    await expect(page.getByText(/Every picture tells a story/i)).toBeVisible();
  });

  test('renders all gallery images with correct alt text', async ({ page }) => {
    const altTexts = [
      'Gallery data edition photo',
      'Software workshop session photo',
      'Mental health & market day edition photo',
    ];

    for (const alt of altTexts) {
      await expect(page.getByRole('img', { name: alt })).toBeVisible();
    }
  });

  test('gallery buttons are visible and link to correct URLs', async ({ page }) => {
    const buttons = [
      {
        text: 'Data Edition',
        link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
      },
      {
        text: 'Software Edition',
        link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
      },
      {
        text: 'Mental health & Market Day',
        link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
      },
    ];

    for (const { text, link } of buttons) {
      const button = page.getByRole('link', { name: text });
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('href', link);
    }
  });

  test('view more button links to Instagram', async ({ page }) => {
    const viewMoreBtn = page.getByRole('link', { name: 'View More' });
    await expect(viewMoreBtn).toBeVisible();
    await expect(viewMoreBtn).toHaveAttribute('href', 'http://www.instagram.com/techsisterskenya');
  });
});
