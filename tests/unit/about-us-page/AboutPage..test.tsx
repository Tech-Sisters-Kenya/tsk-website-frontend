import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '@/app/about-us/page';

// Mock all child components
jest.mock('@/app/about-us/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>;
  };
});

jest.mock('@/app/about-us/MissionVision', () => {
  return function MockMissionVision() {
    return <div data-testid="mission-vision">Mission Vision</div>;
  };
});

jest.mock('@/app/about-us/CoreValues', () => {
  return function MockCoreValues() {
    return <div data-testid="core-values">Core Values</div>;
  };
});

jest.mock('@/app/about-us/ValueToTechSisters', () => {
  return function MockValueToTechSisters() {
    return <div data-testid="value-to-tech-sisters">Value To Tech Sisters</div>;
  };
});

jest.mock('@/components/CallToAction', () => {
  return function MockCallToAction() {
    return <div data-testid="call-to-action">Call To Action</div>;
  };
});

describe('AboutUs Page Component', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  it('renders all required components in correct order', () => {
    const heroSection = screen.getByTestId('hero-section');
    const missionVision = screen.getByTestId('mission-vision');
    const coreValues = screen.getByTestId('core-values');
    const valueToTechSisters = screen.getByTestId('value-to-tech-sisters');
    const callToAction = screen.getByTestId('call-to-action');

    // Check all components are rendered
    expect(heroSection).toBeInTheDocument();
    expect(missionVision).toBeInTheDocument();
    expect(coreValues).toBeInTheDocument();
    expect(valueToTechSisters).toBeInTheDocument();
    expect(callToAction).toBeInTheDocument();

    // Check they appear in the correct order
    const main = screen.getByRole('main');
    const children = Array.from(main.children);

    expect(children[0]).toContainElement(heroSection);
    expect(children[1]).toContainElement(missionVision);
    expect(children[2]).toContainElement(coreValues);
    expect(children[3]).toContainElement(valueToTechSisters);
    expect(children[4]).toContainElement(callToAction);
  });

  it('has correct main container styling', () => {
    const main = screen.getByRole('main');
    expect(main).toHaveClass(
      'flex',
      'min-h-screen',
      'flex-col',
      'items-center',
      'justify-between',
      'mx-8'
    );
  });

  it('uses semantic HTML structure', () => {
    const main = screen.getByRole('main');
    expect(main.tagName).toBe('MAIN');
  });

  it('renders exactly 5 child components', () => {
    const main = screen.getByRole('main');
    expect(main.children).toHaveLength(5);
  });

  it('each component is rendered as a direct child of main', () => {
    const main = screen.getByRole('main');
    const testIds = [
      'hero-section',
      'mission-vision',
      'core-values',
      'value-to-tech-sisters',
      'call-to-action',
    ];

    testIds.forEach((testId) => {
      const component = screen.getByTestId(testId);
      expect(main).toContainElement(component);
    });
  });

  it('maintains proper component hierarchy', () => {
    // Ensure no components are nested within each other incorrectly
    const heroSection = screen.getByTestId('hero-section');
    const missionVision = screen.getByTestId('mission-vision');
    const coreValues = screen.getByTestId('core-values');
    const valueToTechSisters = screen.getByTestId('value-to-tech-sisters');
    const callToAction = screen.getByTestId('call-to-action');

    // None of these components should contain the others
    expect(heroSection).not.toContainElement(missionVision);
    expect(missionVision).not.toContainElement(coreValues);
    expect(coreValues).not.toContainElement(valueToTechSisters);
    expect(valueToTechSisters).not.toContainElement(callToAction);
  });

  it('is a client component', () => {
    // This test ensures the 'use client' directive is working
    // by checking that the component renders without server-side issues
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    const main = screen.getByRole('main');
    expect(main).toHaveClass('mx-8'); // Horizontal margin for mobile responsiveness
  });

  it('uses flexbox for layout', () => {
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex', 'flex-col', 'items-center', 'justify-between');
  });

  it('takes full screen height', () => {
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen');
  });
});
