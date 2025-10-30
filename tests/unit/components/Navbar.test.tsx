import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/stores/useAuthStore';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    fill: _fill,
  }: {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    fill?: boolean;
  }) => <img src={src} alt={alt} width={width} height={height} className={className} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock the auth store
jest.mock('@/stores/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

// Mock Button component
jest.mock('@/components/Button', () => ({
  __esModule: true,
  default: ({
    variant,
    className,
    children,
    onClick,
  }: {
    variant: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      className={`btn-${variant} ${className}`}
      onClick={onClick}
      data-testid={`button-${variant}`}
    >
      {children}
    </button>
  ),
}));

// Mock SVG imports
jest.mock('@/assets/tsk-icon-only-logo.svg', () => 'logo.svg');
jest.mock('@/assets/down-arrow-icon.svg', () => 'down-arrow.svg');

describe('Navbar Component', () => {
  const mockLogout = jest.fn();
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
    });
  });

  describe('Basic Rendering', () => {
    test('renders navbar with logo and brand text', () => {
      render(<Navbar />);

      expect(screen.getByAltText('Tech Sisters Kenya logo')).toBeInTheDocument();
      expect(screen.getByText('TECH')).toBeInTheDocument();
      expect(screen.getByText('SISTERS')).toBeInTheDocument();
      expect(screen.getByText('KENYA')).toBeInTheDocument();
    });

    test('renders all navigation items', () => {
      render(<Navbar />);

      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Get Involved')).toBeInTheDocument();
      expect(screen.getByText('Blogs')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    test('renders become a tech sister button when not authenticated', () => {
      render(<Navbar />);
      expect(screen.getByText('Become A Tech Sister')).toBeInTheDocument();
    });

    test('renders logout button when authenticated', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        logout: mockLogout,
      });

      render(<Navbar />);

      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    test('highlights active navigation link', () => {
      mockUsePathname.mockReturnValue('/blogs');
      render(<Navbar />);

      const blogsLink = screen.getByText('Blogs').closest('a');
      expect(blogsLink).toHaveClass('after:w-[60%]');
    });

    test('home link navigates to correct path', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    test('blogs link navigates to correct path', () => {
      render(<Navbar />);

      const blogsLink = screen.getByText('Blogs').closest('a');
      expect(blogsLink).toHaveAttribute('href', '/blogs');
    });
  });

  describe('Dropdown Functionality', () => {
    test('toggles About dropdown on click', () => {
      render(<Navbar />);

      const aboutButton = screen.getByText('About').closest('button');
      expect(aboutButton).not.toBeNull();
      expect(screen.queryByText('About TSK')).not.toBeInTheDocument();

      fireEvent.click(aboutButton!);
      expect(screen.getByText('About TSK')).toBeInTheDocument();
      expect(screen.getByText('Our Team')).toBeInTheDocument();

      fireEvent.click(aboutButton!);
      expect(screen.queryByText('About TSK')).not.toBeInTheDocument();
    });

    test('toggles Get Involved dropdown on click', () => {
      render(<Navbar />);

      const getInvolvedButton = screen.getByText('Get Involved').closest('button');
      if (!getInvolvedButton) {
        throw new Error('Get Involved button not found');
      }

      expect(screen.queryByText('Partnership')).not.toBeInTheDocument();

      fireEvent.click(getInvolvedButton);
      expect(screen.getByText('Partnership')).toBeInTheDocument();
      expect(screen.getByText('Become a TSK Member')).toBeInTheDocument();

      fireEvent.click(getInvolvedButton);
      expect(screen.queryByText('Partnership')).not.toBeInTheDocument();
    });

    test('closes one dropdown when another is opened', () => {
      render(<Navbar />);

      const aboutButton = screen.getByText('About').closest('button');
      const getInvolvedButton = screen.getByText('Get Involved').closest('button');

      if (!aboutButton || !getInvolvedButton) {
        throw new Error('Navigation buttons not found');
      }

      // Open About dropdown
      fireEvent.click(aboutButton);
      expect(screen.getByText('About TSK')).toBeInTheDocument();

      // Open Get Involved dropdown
      fireEvent.click(getInvolvedButton);
      expect(screen.getByText('Partnership')).toBeInTheDocument();
      expect(screen.queryByText('About TSK')).not.toBeInTheDocument();
    });

    test('dropdown arrow rotates when opened', () => {
      render(<Navbar />);

      const aboutButton = screen.getByText('About').closest('button');
      if (!aboutButton) {
        throw new Error('About button not found');
      }

      const arrow = aboutButton.querySelector('span');
      if (!arrow) {
        throw new Error('Arrow element not found');
      }

      expect(arrow).not.toHaveClass('rotate-180');

      fireEvent.click(aboutButton);
      expect(arrow).toHaveClass('rotate-180');
    });
  });

  describe('Mobile Menu', () => {
    test('hamburger menu toggles mobile menu', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });

      // Mobile menu should not be visible initially
      expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop nav

      // Click hamburger to open mobile menu
      fireEvent.click(hamburgerButton);

      // Should show mobile menu
      const mobileMenu = document.querySelector('.md\\:hidden.fixed.inset-0');
      expect(mobileMenu).toBeInTheDocument();
    });

    test('mobile dropdown toggles work correctly', () => {
      render(<Navbar />);

      // Open mobile menu
      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      fireEvent.click(hamburgerButton);

      // Find About button in mobile menu
      const mobileAboutButtons = screen.getAllByText('About');
      const mobileAboutButton = mobileAboutButtons
        .find((btn) => btn.closest('button')?.textContent?.includes('+'))
        ?.closest('button');

      if (!mobileAboutButton) {
        throw new Error('Mobile About button not found');
      }

      expect(mobileAboutButton).toBeInTheDocument();
      expect(mobileAboutButton.textContent).toContain('+');

      // Click to expand
      fireEvent.click(mobileAboutButton);
      expect(mobileAboutButton.textContent).toContain('−');
    });

    test('mobile menu closes when nav link is clicked', () => {
      render(<Navbar />);

      // Open mobile menu
      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      fireEvent.click(hamburgerButton);

      // Click on a nav link (should close menu)
      const homeLinks = screen.getAllByText('Home');
      const mobileHomeLink = homeLinks[homeLinks.length - 1]; // Get the mobile version
      fireEvent.click(mobileHomeLink);

      // Mobile menu should be closed
      const mobileMenu = document.querySelector('.md\\:hidden.fixed.inset-0');
      expect(mobileMenu).not.toBeInTheDocument();
    });
  });

  describe('Authentication Actions', () => {
    test('logout button calls logout function', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        logout: mockLogout,
      });

      render(<Navbar />);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('mobile logout button calls logout and closes menu', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        logout: mockLogout,
      });

      render(<Navbar />);

      // Open mobile menu
      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      fireEvent.click(hamburgerButton);

      // Click mobile logout button
      const logoutButtons = screen.getAllByText('Logout');
      const mobileLogoutButton = logoutButtons[logoutButtons.length - 1];
      fireEvent.click(mobileLogoutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive Behavior', () => {
    test('hamburger menu is hidden on desktop', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      expect(hamburgerButton.closest('div')).toHaveClass('md:hidden');
    });

    test('desktop navigation is hidden on mobile', () => {
      render(<Navbar />);

      const desktopNav = document.querySelector('ul.hidden.md\\:flex');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    test('desktop buttons are hidden on mobile', () => {
      render(<Navbar />);

      const desktopButtonContainer = document.querySelector('div.hidden.md\\:flex.gap-10');
      expect(desktopButtonContainer).toBeInTheDocument();
      expect(desktopButtonContainer).toHaveClass('hidden', 'md:flex');
    });
  });

  describe('Accessibility', () => {
    test('hamburger button has proper aria-label', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      expect(hamburgerButton).toHaveAttribute('aria-label', 'Toggle menu');
    });

    test('logo has proper alt text', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('Tech Sisters Kenya logo');
      expect(logo).toBeInTheDocument();
    });

    test('down arrow icons have proper alt text', () => {
      render(<Navbar />);

      const downArrows = screen.getAllByAltText('Down Arrow Icon');
      expect(downArrows.length).toBeGreaterThan(0);
    });
  });

  describe('Styling and CSS Classes', () => {
    test('navbar has fixed positioning and proper styling', () => {
      render(<Navbar />);

      const navbar = document.querySelector('nav');
      expect(navbar).toHaveClass('fixed', 'z-50');
      expect(navbar).toHaveClass(/w-\[calc\(100%-4rem\)\]/);
    });

    test('active nav links have proper styling', () => {
      mockUsePathname.mockReturnValue('/blogs');
      render(<Navbar />);

      const blogsLink = screen.getByText('Blogs').closest('a');
      expect(blogsLink).toHaveClass('after:w-[60%]');
    });

    test('hamburger menu animation classes are applied correctly', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByRole('button', { name: 'Toggle menu' });
      const lines = hamburgerButton.querySelectorAll('div');

      expect(lines[0]).toHaveClass('w-6', 'h-0.5');
      expect(lines[1]).toHaveClass('w-6', 'h-0.5');
      expect(lines[2]).toHaveClass('w-6', 'h-0.5');

      // Test animation classes when menu is open
      fireEvent.click(hamburgerButton);

      expect(lines[0]).toHaveClass('transform', 'rotate-45', 'translate-y-2');
      expect(lines[1]).toHaveClass('opacity-0');
      expect(lines[2]).toHaveClass('transform', '-rotate-45', '-translate-y-2');
    });
  });
});
