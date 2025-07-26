import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ValueToTechSisters from '@/app/about-us/ValueToTechSisters';

describe('ValueToTechSisters Component', () => {
  beforeEach(() => {
    render(<ValueToTechSisters />);
  });

  it('renders the main heading correctly', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Our Value To Tech Sisters');
  });

  it('renders all four value items', () => {
    const expectedTitles = [
      'Community Support',
      'Skill Development',
      'Mentorship',
      'Networking Opportunities',
    ];

    expectedTitles.forEach((title) => {
      // Remove line breaks for text matching
      const titleWithoutBreaks = title.replace(/\s+/g, ' ');
      const element = screen.getByText(new RegExp(titleWithoutBreaks, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

  it('renders all value descriptions', () => {
    const descriptions = [
      /Our community offers a space for belonging,.*collaboration, and collective growth/,
      /Focused webinars and practical workshops led by.*expert speakers/,
      /Real guidance from women who've walked the.*path and are here to light yours/,
      /We host networking events, industry panels, and.*meetups to connect Tech Sisters/,
    ];

    descriptions.forEach((description) => {
      const element = screen.getByText(description);
      expect(element).toBeInTheDocument();
    });
  });

  it('has correct main heading styling', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass(
      'text-2xl',
      'md:text-5xl',
      'font-semibold',
      'font-heading',
      'text-tsk-primary-dark',
      'text-center',
      'my-20'
    );
  });

  it('has correct section styling', () => {
    const section = screen.getByText('Our Value To Tech Sisters').closest('section');
    expect(section).toHaveClass('w-full', 'py-16', 'px-4', 'md:px-20');
  });

  it('has correct spacing between value items', () => {
    const section = screen.getByText('Our Value To Tech Sisters').closest('section');
    const spacingContainer = section?.querySelector('.space-y-16');
    expect(spacingContainer).toBeInTheDocument();
    expect(spacingContainer).toHaveClass('space-y-16');
  });

  it('renders HTML content safely using dangerouslySetInnerHTML', () => {
    // Check that line breaks in titles are preserved as HTML
    const communityTitle = screen.getByRole('heading', { level: 3, name: /community support/i });
    expect(communityTitle.innerHTML).toContain('Community <br> Support');

    const skillTitle = screen.getByRole('heading', { level: 3, name: /skill development/i });
    expect(skillTitle.innerHTML).toContain('Skill <br> Development');
  });

  it('alternates layout direction for value items', () => {
    const valueItems = screen.getAllByRole('heading', { level: 3 });

    // Check that we have 4 items
    expect(valueItems).toHaveLength(4);

    // The layout alternation is handled by CSS classes, so we check the parent containers
    const containers = valueItems.map((item) => item.closest('.flex.flex-col'));

    // First and third items should have normal direction (index 0, 2)
    expect(containers[0]).toHaveClass('md:flex-row');
    expect(containers[2]).toHaveClass('md:flex-row');

    // Second and fourth items should have reversed direction (index 1, 3)
    expect(containers[1]).toHaveClass('md:flex-row-reverse');
    expect(containers[3]).toHaveClass('md:flex-row-reverse');
  });

  it('has correct title styling', () => {
    const titles = screen.getAllByRole('heading', { level: 3 });

    titles.forEach((title) => {
      expect(title).toHaveClass(
        'text-tsk-primary-dark',
        'text-xl',
        'md:text-5xl',
        'font-medium',
        'font-heading',
        'text-center'
      );
    });
  });

  it('has correct description styling for normal items', () => {
    // Get descriptions for items that aren't reversed (1st and 3rd items)
    const normalDescriptions = [
      screen.getByText(/Our community offers a space for belonging/),
      screen.getByText(/Real guidance from women who've walked the path/),
    ];

    normalDescriptions.forEach((desc) => {
      expect(desc).toHaveClass(
        'text-sm',
        'text-tsk-primary-dark',
        'md:text-2xl',
        'font-semibold',
        'md:ml-8'
      );
    });
  });

  it('has correct description styling for reversed items', () => {
    // Get descriptions for items that are reversed (2nd and 4th items)
    const reversedDescriptions = [
      screen.getByText(/Focused webinars and practical workshops/),
      screen.getByText(/We host networking events, industry panels/),
    ];

    reversedDescriptions.forEach((desc) => {
      expect(desc).toHaveClass(
        'text-sm',
        'text-tsk-primary-dark',
        'md:text-2xl',
        'font-semibold',
        'md:mr-8'
      );
    });
  });

  it('has proper background styling for value items', () => {
    const section = screen.getByText('Our Value To Tech Sisters').closest('section');
    const backgrounds = section?.querySelectorAll('.bg-tsk-light-2.-z-10');
    expect(backgrounds && backgrounds.length).toBeGreaterThan(0);
  });

  it('maintains proper semantic HTML structure', () => {
    const section = screen.getByText('Our Value To Tech Sisters').closest('section');
    expect(section?.tagName).toBe('SECTION');

    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading.tagName).toBe('H2');

    const subHeadings = screen.getAllByRole('heading', { level: 3 });
    subHeadings.forEach((heading) => {
      expect(heading.tagName).toBe('H3');
    });
  });
});
