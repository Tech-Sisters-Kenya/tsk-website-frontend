import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInfo from '@/app/contact/ContactInfo';

// Constants for testing
const CONTACT_INFO = {
  email: 'techsisterskenya@gmail.com',
  phone: '+25470888799',
};

// Mock next/image and SVG imports
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const altWithHyphens = props.alt?.toLowerCase().replace(' ', '-');
    return <img {...props} alt={altWithHyphens} data-testid={altWithHyphens} />;
  },
}));

jest.mock('@/../public/email.svg', () => ({
  src: '/email.svg',
}));

jest.mock('@/../public/call.svg', () => ({
  src: '/call.svg',
}));

jest.mock('@/../public/instagram.svg', () => ({
  src: '/instagram.svg',
}));

jest.mock('@/../public/x.svg', () => ({
  src: '/x.svg',
}));

jest.mock('@/../public/linkedin.svg', () => ({
  src: '/linkedin.svg',
}));

jest.mock('@/../public/tiktok.svg', () => ({
  src: '/tiktok.svg',
}));

describe('ContactInfo', () => {
  describe('Contact Information Section', () => {
    it('renders contact information heading', () => {
      render(<ContactInfo />);
      const heading = screen.getByRole('heading', { name: /contact information/i });
      expect(heading).toBeInTheDocument();
    });

    it('displays email information correctly', () => {
      render(<ContactInfo />);

      const emailLabel = screen.getByText(/email address/i);
      const emailValue = screen.getByText(CONTACT_INFO.email);
      const emailIcon = screen.getByTestId('email-icon');

      expect(emailLabel).toBeInTheDocument();
      expect(emailValue).toHaveTextContent(CONTACT_INFO.email);
      expect(emailIcon).toBeInTheDocument();
      expect(emailValue).toHaveClass('underline');
    });

    it('displays phone information correctly', () => {
      render(<ContactInfo />);

      const phoneLabel = screen.getByText(/phone number/i);
      const phoneValue = screen.getByText(CONTACT_INFO.phone);
      const phoneIcon = screen.getByTestId('phone-icon');

      expect(phoneLabel).toBeInTheDocument();
      expect(phoneValue).toHaveTextContent(CONTACT_INFO.phone);
      expect(phoneIcon).toBeInTheDocument();
      expect(phoneIcon.parentElement).toHaveClass('bg-tsk-primary-dark', 'rounded-full');
    });
  });

  describe('Social Media Section', () => {
    it('renders social media heading', () => {
      render(<ContactInfo />);
      const heading = screen.getByRole('heading', { name: /connect with us/i });
      expect(heading).toBeInTheDocument();
    });

    it('renders all social media icons', () => {
      render(<ContactInfo />);

      const socialIcons = [
        { alt: 'instagram-icon' },
        { alt: 'x-icon' },
        { alt: 'linkedin-icon' },
        { alt: 'tiktok-icon' },
      ];

      socialIcons.forEach(({ alt }) => {
        const icon = screen.getByTestId(alt);
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('alt', alt);
      });

      // Verify social icons container by locating the "Connect With Us" section
      const socialSection = screen.getByRole('heading', { name: /connect with us/i }).parentElement;
      const iconsContainer = socialSection?.querySelector('.flex.gap-4');
      expect(iconsContainer).toBeTruthy();
      expect(iconsContainer).toHaveClass('flex', 'gap-4');
    });
  });

  describe('Layout and Styling', () => {
    it('has correct layout structure and classes', () => {
      const { container } = render(<ContactInfo />);
      const mainSection = container.firstChild as HTMLElement;

      // Main container layout
      expect(mainSection).toHaveClass('w-full', 'flex', 'flex-col', 'gap-4');

      // Contact info containers
      const contactItems = screen.getAllByText(/^(Email Address|Phone Number)$/);
      contactItems.forEach((item) => {
        const itemContainer = item.parentElement?.parentElement;
        expect(itemContainer).toHaveClass('flex', 'items-center', 'gap-4');
      });

      // Social media container
      const socialSection = screen.getByText(/Connect With Us/i).parentElement;
      const iconsContainer = socialSection?.querySelector('.flex.gap-4');
      expect(socialSection).toHaveClass(
        'flex',
        'justify-center',
        'pl-8',
        'flex-col',
        'gap-2',
        'sm:mt-6',
        'mt-4'
      );
      expect(iconsContainer).toHaveClass('flex', 'gap-4');
    });

    it('has correct responsive styling', () => {
      render(<ContactInfo />);

      // Icon containers
      const iconContainers = [
        screen.getByTestId('email-icon').parentElement,
        screen.getByTestId('phone-icon').parentElement,
      ];
      iconContainers.forEach((container) => {
        expect(container).toHaveClass('bg-tsk-primary-dark', 'sm:p-4', 'p-2', 'rounded-full');
      });

      // Heading text styles
      const headings = screen.getAllByRole('heading');
      headings.forEach((heading) => {
        expect(heading).toHaveClass('font-body', 'font-semibold', 'text-xl');
      });

      // Label text styles
      const labels = screen.getAllByText(/^(Email Address|Phone Number)$/);
      labels.forEach((label) => {
        expect(label).toHaveClass('font-body', 'font-semibold', 'sm:text-xl', 'text-lg');
      });

      // Value text styles
      const values = [
        screen.getByText('techsisterskenya@gmail.com'),
        screen.getByText('+25470888799'),
      ];
      values.forEach((value) => {
        expect(value).toHaveClass('font-body', 'font-medium', 'sm:text-[16px]', 'text-sm');
      });
    });
  });
});
