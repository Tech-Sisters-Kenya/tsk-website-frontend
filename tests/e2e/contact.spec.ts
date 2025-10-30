import { test, expect, Page } from '@playwright/test';

// Test data
const testData = {
  validForm: {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    organisation: 'Tech Sisters Kenya',
    reason: 'general inquiry',
    message: 'This is a test message for the contact form.',
  },
  invalidEmail: {
    fullName: 'John Doe',
    email: 'invalid-email',
    organisation: 'Test Org',
    reason: 'partnerships',
    message: 'Test message',
  },
};

// Helper function to fill the contact form
async function fillContactForm(
  page: Page,
  data: {
    fullName: string;
    email: string;
    organisation?: string;
    reason: string;
    message: string;
  }
) {
  await page.getByLabel(/full name/i).fill(data.fullName);
  await page.getByLabel(/email address/i).fill(data.email);
  if (data.organisation) {
    await page.getByLabel(/organisation\/affiliation/i).fill(data.organisation);
  }
  await page.getByLabel(/i am contacting about/i).selectOption(data.reason);
  await page.getByLabel(/^message/i).fill(data.message);
}

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact page
    await page.goto('/contact'); // Adjust the URL based on your routing
  });

  test.describe('Page Layout and Content', () => {
    test('should display the main heading and subheading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();
      await expect(page.getByText(/we are looking forward to hearing from you/i)).toBeVisible();
    });

    test('should display contact information section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /contact information/i })).toBeVisible();
      await expect(page.getByText(/techsisterskenya@gmail.com/i)).toBeVisible();
      await expect(page.getByText(/\+25470888799/)).toBeVisible();
    });

    test('should display social media section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /connect with us/i })).toBeVisible();

      // Verify all social media icons are present
      await expect(page.getByAltText(/instagram icon/i)).toBeVisible();
      await expect(page.getByAltText(/x icon/i)).toBeVisible();
      await expect(page.getByAltText(/linkedin icon/i)).toBeVisible();
      await expect(page.getByAltText(/tiktok icon/i)).toBeVisible();
    });

    test('should display contact form with all fields', async ({ page }) => {
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/organisation\/affiliation/i)).toBeVisible();
      await expect(page.getByLabel(/i am contacting about/i)).toBeVisible();
      await expect(page.getByLabel(/^message/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty required fields', async ({ page }) => {
      // Try to submit empty form
      await page.getByRole('button', { name: /submit/i }).click();

      // Check for HTML5 validation (fields should be marked as invalid)
      const fullNameInput = page.getByLabel(/full name/i);
      const emailInput = page.getByLabel(/email address/i);
      const reasonSelect = page.getByLabel(/i am contacting about/i);
      const messageInput = page.getByLabel(/^message/i);

      // Verify required fields
      await expect(fullNameInput).toHaveAttribute('required', '');
      await expect(emailInput).toHaveAttribute('required', '');
      await expect(reasonSelect).toHaveAttribute('required', '');
      await expect(messageInput).toHaveAttribute('required', '');
    });

    test('should validate email format', async ({ page }) => {
      await page.getByLabel(/full name/i).fill(testData.invalidEmail.fullName);
      await page.getByLabel(/email address/i).fill(testData.invalidEmail.email);
      await page.getByLabel(/i am contacting about/i).selectOption(testData.invalidEmail.reason);
      await page.getByLabel(/^message/i).fill(testData.invalidEmail.message);

      await page.getByRole('button', { name: /submit/i }).click();

      // HTML5 email validation should prevent submission
      const emailInput = page.getByLabel(/email address/i);
      await expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('should not require organisation field', async ({ page }) => {
      const organisationInput = page.getByLabel(/organisation\/affiliation/i);
      await expect(organisationInput).not.toHaveAttribute('required', '');
    });

    test('should have correct dropdown options', async ({ page }) => {
      const dropdown = page.getByLabel(/i am contacting about/i);

      await expect(dropdown).toBeVisible();

      // Get all options
      const options = await dropdown.locator('option').all();
      const optionTexts = await Promise.all(options.map((opt) => opt.textContent()));

      expect(optionTexts).toContain('Select an option');
      expect(optionTexts).toContain('General Inquiry');
      expect(optionTexts).toContain('Partnerships');
      expect(optionTexts).toContain('Membership');
      expect(optionTexts).toContain('Sponsorship');
      expect(optionTexts).toContain('Press/Media Inquiry');
    });
  });

  test.describe('Form Interaction', () => {
    test('should update form fields when typing', async ({ page }) => {
      const fullNameInput = page.getByLabel(/full name/i);
      const emailInput = page.getByLabel(/email address/i);
      const messageInput = page.getByLabel(/^message/i);

      await fullNameInput.fill('Test Name');
      await expect(fullNameInput).toHaveValue('Test Name');

      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');

      await messageInput.fill('Test message content');
      await expect(messageInput).toHaveValue('Test message content');
    });

    test('should update dropdown when selecting an option', async ({ page }) => {
      const dropdown = page.getByLabel(/i am contacting about/i);

      await dropdown.selectOption('partnerships');
      await expect(dropdown).toHaveValue('partnerships');

      await dropdown.selectOption('membership');
      await expect(dropdown).toHaveValue('membership');
    });

    test('should allow typing in all text fields', async ({ page }) => {
      await fillContactForm(page, testData.validForm);

      await expect(page.getByLabel(/full name/i)).toHaveValue(testData.validForm.fullName);
      await expect(page.getByLabel(/email address/i)).toHaveValue(testData.validForm.email);
      await expect(page.getByLabel(/organisation\/affiliation/i)).toHaveValue(
        testData.validForm.organisation
      );
      await expect(page.getByLabel(/i am contacting about/i)).toHaveValue(
        testData.validForm.reason
      );
      await expect(page.getByLabel(/^message/i)).toHaveValue(testData.validForm.message);
    });
  });

  test.describe('Form Submission', () => {
    test('should successfully submit the form with valid data', async ({ page }) => {
      // Mock the API call
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Contact form submitted' }),
        });
      });

      // Fill and submit the form
      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Wait for success modal to appear
      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });
      await expect(page.getByText(/your message has been sent successfully/i)).toBeVisible();
    });

    test('should show loading state during submission', async ({ page }) => {
      // Mock API with delay
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Check for loading state
      await expect(page.getByRole('button', { name: /submitting/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /submitting/i })).toBeDisabled();

      // Wait for submission to complete
      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });
    });

    test('should disable all form fields during submission', async ({ page }) => {
      // Mock API with delay
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Check that all fields are disabled during submission
      await expect(page.getByLabel(/full name/i)).toBeDisabled();
      await expect(page.getByLabel(/email address/i)).toBeDisabled();
      await expect(page.getByLabel(/organisation\/affiliation/i)).toBeDisabled();
      await expect(page.getByLabel(/i am contacting about/i)).toBeDisabled();
      await expect(page.getByLabel(/^message/i)).toBeDisabled();
    });

    test('should display error message on API failure', async ({ page }) => {
      // Mock API failure
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Check for error message
      await expect(page.getByText(/failed to submit form. please try again/i)).toBeVisible({
        timeout: 5000,
      });
    });

    test('should clear error message when user starts typing after error', async ({ page }) => {
      // Mock API failure
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Wait for error message
      await expect(page.getByText(/failed to submit form. please try again/i)).toBeVisible();

      // Start typing in a field
      await page.getByLabel(/full name/i).fill('Updated Name');

      // Error should disappear
      await expect(page.getByText(/failed to submit form. please try again/i)).not.toBeVisible();
    });

    test('should send correct data to API', async ({ page }) => {
      type ContactRequest = {
        full_name: string;
        email: string;
        organisation?: string | null;
        reason: string;
        message: string;
      };
      let requestBody: ContactRequest | undefined;

      // Intercept and capture the API request
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        const request = route.request();
        requestBody = JSON.parse(request.postData() || '{}');

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      // Wait for request to complete
      await page.waitForTimeout(1000);

      // Verify request body
      expect(requestBody).toMatchObject({
        full_name: testData.validForm.fullName,
        email: testData.validForm.email,
        organisation: testData.validForm.organisation,
        reason: testData.validForm.reason,
        message: testData.validForm.message,
      });
    });
  });

  test.describe('Success Modal', () => {
    test.beforeEach(async ({ page }) => {
      // Mock successful API response
      await page.route('https://api.techsisterskenya.org/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });
    });

    test('should display success modal after form submission', async ({ page }) => {
      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });
      await expect(page.getByText(/your message has been sent successfully/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /done/i })).toBeVisible();
    });

    test('should close modal when Done button is clicked', async ({ page }) => {
      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });

      await page.getByRole('button', { name: /done/i }).click();

      await expect(
        page.getByRole('heading', { name: /thanks for reaching out/i })
      ).not.toBeVisible();
    });

    test('should close modal when backdrop is clicked', async ({ page }) => {
      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });

      // Click on backdrop (outside modal content)
      await page.locator('.bg-black\\/40').click();

      await expect(
        page.getByRole('heading', { name: /thanks for reaching out/i })
      ).not.toBeVisible();
    });

    test('should reset form after closing success modal', async ({ page }) => {
      await fillContactForm(page, testData.validForm);
      await page.getByRole('button', { name: /submit/i }).click();

      await expect(page.getByRole('heading', { name: /thanks for reaching out/i })).toBeVisible({
        timeout: 5000,
      });

      await page.getByRole('button', { name: /done/i }).click();

      // Check that form fields are cleared
      await expect(page.getByLabel(/full name/i)).toHaveValue('');
      await expect(page.getByLabel(/email address/i)).toHaveValue('');
      await expect(page.getByLabel(/organisation\/affiliation/i)).toHaveValue('');
      await expect(page.getByLabel(/i am contacting about/i)).toHaveValue('');
      await expect(page.getByLabel(/^message/i)).toHaveValue('');
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByText(/techsisterskenya@gmail.com/i)).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper labels for all form fields', async ({ page }) => {
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/organisation\/affiliation/i)).toBeVisible();
      await expect(page.getByLabel(/i am contacting about/i)).toBeVisible();
      await expect(page.getByLabel(/^message/i)).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through form fields
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/full name/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/email address/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/organisation\/affiliation/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/i am contacting about/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/^message/i)).toBeFocused();
    });

    test('should have alt text for all images', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const altText = await img.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText?.length).toBeGreaterThan(0);
      }
    });
  });
});
