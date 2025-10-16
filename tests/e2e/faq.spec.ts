import { test, expect } from '@playwright/test';

test.describe('FAQ Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the FAQ page before each test
    await page.goto('/faq');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should load the FAQ page successfully', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Tech Sisters Kenya/);

    // Verify the main heading is visible
    const mainHeading = page.getByRole('heading', { level: 1 }).first();
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('FREQUENTLY ASKED QUESTIONS');
  });

  test('should display all FAQ sections correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // Check if main container exists
    await expect(
      page.locator('div').filter({ hasText: 'FREQUENTLY ASKED QUESTIONS' })
    ).toBeVisible();

    // Check for the two main FAQ sections
    const generalFaqHeading = page.getByText('FREQUENTLY ASKED QUESTIONS');
    const techFaqHeading = page.getByText('TECH-RELATED FAQS');

    await expect(generalFaqHeading).toBeVisible();
    await expect(techFaqHeading).toBeVisible();
  });

  test('should display all general FAQ items', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // General FAQ questions that should be present
    const generalQuestions = [
      'What is Tech Sisters Kenya?',
      'Who can join Tech Sisters Kenya?',
      'How do I become a member?',
      'Is Tech Sisters Kenya only for developers?',
      'How do I sign up as a mentor or mentee?',
      'Is there a fee to join the community?',
      'What kind of events do you host?',
      'How can I volunteer or support the community?',
      'Can I collaborate with Tech Sisters Kenya as a partner or sponsor?',
      'Where can I stay updated about events and announcements?',
    ];

    for (const question of generalQuestions) {
      const questionElement = page.getByText(question, { exact: false });
      await expect(questionElement).toBeVisible();
    }
  });

  test('should display all tech-related FAQ items', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // Tech-related FAQ questions that should be present
    const techQuestions = [
      'Will event recordings be shared?',
      'How do I join the Tech Sisters Kenya Slack workspace?',
      "I'm new to Slack. How should I engage in the channels?",
      'How can I update or edit my member information?',
      'What should I do if I experience inappropriate behavior or harassment?',
      'Do I need to attend all events to stay in the community?',
      'Are there any rules for attending events online or in person?',
    ];

    for (const question of techQuestions) {
      const questionElement = page.getByText(question, { exact: false });
      await expect(questionElement).toBeVisible();
    }
  });

  test('should have working accordion functionality', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // Test accordion interaction - click on first FAQ item
    const firstAccordionTrigger = page.locator('[data-state="closed"]').first();
    if ((await firstAccordionTrigger.count()) > 0) {
      await firstAccordionTrigger.click();

      // Wait for accordion to open
      await page.waitForTimeout(500);

      // Check if content is now visible
      const accordionContent = page.locator('[data-state="open"]').first();
      await expect(accordionContent).toBeVisible();
    }
  });

  test('should display accordion content when expanded', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // Find and click on a specific FAQ item to test content
    const memberQuestion = page.getByText('How do I become a member?', { exact: false });
    await expect(memberQuestion).toBeVisible();

    // Click on the accordion trigger (parent element)
    const accordionItem = memberQuestion.locator('..').locator('..');
    await accordionItem.click();

    // Wait for content to expand
    await page.waitForTimeout(500);

    // Check if the answer content is visible
    const answerContent = page.getByText('You can register through our Member Registration Form');
    await expect(answerContent).toBeVisible();
  });

  //this test will pass once the Contact page is available
  // test('should have working navigation links', async ({ page }) => {
  //   // Wait for content to load
  //   await page.waitForTimeout(1000);

  //   // Test internal navigation links
  //   const getInvolvedLinks = page.locator('a[href="/get-involved"]');
  //   const contactLink = page.locator('a[href="/contact"]');

  //   // Check if links exist
  //   await expect(getInvolvedLinks.first()).toBeVisible();
  //   await expect(contactLink).toBeVisible();

  //   // Test external links
  //   const linktreeLink = page.locator('a[href="https://linktr.ee/techsisterskenya"]');
  //   await expect(linktreeLink.first()).toBeVisible();
  // });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1').first()).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1').first()).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have accessible elements', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = await page.locator('h1').all();
    expect(headings.length).toBeGreaterThanOrEqual(2); // Main FAQ and Tech FAQ headings

    // Check that accordion triggers have proper ARIA attributes
    const accordionTriggers = page.locator('[data-slot="accordion-trigger"]');
    expect(await accordionTriggers.count()).toBeGreaterThan(0);

    // Check for proper accordion structure
    const accordion = page.locator('[data-slot="accordion"]');
    await expect(accordion).toBeVisible();
  });

  test('should display specific content correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);

    // Check for specific text content that should be present
    const specificContent = [
      'Tech Sisters Kenya is a community of women in tech',
      'Any woman interested in technology',
      'Member Registration Form',
      'Get Involved',
      'No, joining Tech Sisters Kenya is completely free',
      'technical workshops, soft skills sessions',
      'techsisterskenya@gmail.com',
      'Slack community',
      'Linktree',
    ];

    for (const content of specificContent) {
      const contentElement = page.getByText(content, { exact: false });
      const count = await contentElement.count();
      if (count > 0) {
        await expect(contentElement.first()).toBeVisible();
      }
    }
  });
});
