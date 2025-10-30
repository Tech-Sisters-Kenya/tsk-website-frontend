import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '@/app/contact/page';

// Mock child components
jest.mock('@/app/contact/ContactInfo', () => {
  return function ContactInfo() {
    return <div data-testid="contact-info">Contact Info</div>;
  };
});

jest.mock('@/app/contact/ContactForm', () => {
  return function ContactForm() {
    return <div data-testid="contact-form">Contact Form</div>;
  };
});

describe('Contact Page', () => {
  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks();
  });

  it('renders the page heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', {
      name: /contact us/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Contact />);
    const subheading = screen.getByText(/we are looking forward to hearing from you/i);
    expect(subheading).toBeInTheDocument();
  });

  it('renders ContactInfo component', () => {
    render(<Contact />);
    expect(screen.getByTestId('contact-info')).toBeInTheDocument();
  });

  it('renders ContactForm component', () => {
    render(<Contact />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    const { container } = render(<Contact />);
    const section = container.querySelector('[class*="border-[1.5px]"]');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('border-[1.5px]');
  });

  it('applies responsive classes', () => {
    const { container } = render(<Contact />);
    const flex = container.querySelector('[class*="lg:flex-row"]');
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass('lg:flex-row', 'flex-col');
  });
});
