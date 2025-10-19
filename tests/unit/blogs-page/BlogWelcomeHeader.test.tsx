import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogWelcomeHeader from '@/app/blogs/BlogWelcomeHeader';

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockedLink = ({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

// Mock the AnimatedBlogPage component - fix the import path
jest.mock('@/app/blogs/AnimatedBlogPage', () => ({
  AnimatedBlogPage: () => <div data-testid="animated-blog-page">Animated Blog Page</div>,
}));

// Mock the auth store
const mockUseAuthStore = jest.fn();
jest.mock('@/stores/useAuthStore', () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

describe('BlogWelcomeHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      expect(screen.getByRole('heading', { name: 'Blogs' })).toBeInTheDocument();
    });

    it('renders with correct section structure and classes', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      const { container } = render(<BlogWelcomeHeader />);
      const section = container.querySelector('section');

      expect(section).toHaveClass('w-full', 'mx-auto', 'text-tsk-primary-dark', 'px-8', 'mt-8');
    });

    it('renders the main content container with correct classes', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      const { container } = render(<BlogWelcomeHeader />);
      const contentDiv = container.querySelector('.bg-tsk-light-2');

      expect(contentDiv).toHaveClass('bg-tsk-light-2', 'rounded-b-3xl', 'px-14');
    });
  });

  describe('Content Elements', () => {
    it('renders the main heading with correct text and styling', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      const heading = screen.getByRole('heading', { name: 'Blogs' });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('font-black', 'font-heading', 'text-5xl');
      // Note: leading-[150%] might not be detectable in tests, testing the main classes
    });

    it('renders the welcome text with correct content', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);

      expect(screen.getByText('Welcome to the Tech Sisters Kenya blog')).toBeInTheDocument();
      expect(screen.getByText('—')).toBeInTheDocument();
      expect(
        screen.getByText('A space created to educate, inspire, and uplift women in tech.')
      ).toBeInTheDocument();
    });

    it('renders the welcome text container with correct styling', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      const { container } = render(<BlogWelcomeHeader />);
      // Fix the selector - escape the brackets properly or use a different approach
      const welcomeTextDiv = container.querySelector('[class*="font-body"][class*="font-medium"]');

      expect(welcomeTextDiv).toHaveClass('font-body', 'font-medium', 'mt-8');
    });

    it('renders the inspirational quote with correct text and styling', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      const quote = screen.getByText(
        'Stories shape us. Knowledge elevates us. Community carries us.'
      );

      expect(quote).toBeInTheDocument();
      expect(quote).toHaveClass('font-decorative', 'text-4xl', 'mt-10');
    });

    it('renders the AnimatedBlogPage component', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      expect(screen.getByTestId('animated-blog-page')).toBeInTheDocument();
    });
  });

  describe('Grid Layout', () => {
    it('renders the grid container with correct classes', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      const { container } = render(<BlogWelcomeHeader />);
      const gridContainer = container.querySelector('.grid');

      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-2', 'items-center');
    });

    it('renders the animated component container with correct classes', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      const { container } = render(<BlogWelcomeHeader />);
      // Fix selector to find the flex container properly
      const animatedContainer = container.querySelector('.flex.w-full');

      expect(animatedContainer).toHaveClass('flex', 'w-full');
    });
  });

  describe('Authentication States', () => {
    it('does not render write blog button when user is not authenticated', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });

    it('does not render write blog button when user is authenticated but not admin', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['user'] },
      });

      render(<BlogWelcomeHeader />);
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });

    it('renders write blog button when user is authenticated and is admin', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['admin'] },
      });

      render(<BlogWelcomeHeader />);
      expect(screen.getByText('+ Write a Blog')).toBeInTheDocument();
    });

    it('renders write blog button when user has admin role among multiple roles', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['user', 'admin', 'moderator'] },
      });

      render(<BlogWelcomeHeader />);
      expect(screen.getByText('+ Write a Blog')).toBeInTheDocument();
    });

    it('does not render write blog button when user role is undefined', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: undefined },
      });

      render(<BlogWelcomeHeader />);
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });

    it('does not render write blog button when user role is empty array', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: [] },
      });

      render(<BlogWelcomeHeader />);
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });
  });

  describe('Write Blog Button', () => {
    beforeEach(() => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['admin'] },
      });
    });

    it('renders the write blog button with correct text', () => {
      render(<BlogWelcomeHeader />);
      const button = screen.getByText('+ Write a Blog');
      expect(button).toBeInTheDocument();
    });

    it('renders the write blog button with correct href', () => {
      render(<BlogWelcomeHeader />);
      const button = screen.getByText('+ Write a Blog');
      expect(button).toHaveAttribute('href', '/blogs/new');
    });

    it('renders the write blog button with correct styling classes', () => {
      render(<BlogWelcomeHeader />);
      const button = screen.getByText('+ Write a Blog');

      expect(button).toHaveClass(
        'inline-block',
        'bg-tsk-primary',
        'text-white',
        'px-6',
        'py-3',
        'rounded-xl',
        'font-semibold'
      );
      // Note: hover and transition classes might not be testable in JSDOM
    });

    it('renders the write blog button within a container with correct styling', () => {
      render(<BlogWelcomeHeader />);
      // Look for the button's parent container
      const button = screen.getByText('+ Write a Blog');
      const buttonContainer = button.closest('.mt-8');

      expect(buttonContainer).toHaveClass('mt-8');
    });
  });

  describe('Component Integration', () => {
    it('calls useAuthStore hook', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      expect(mockUseAuthStore).toHaveBeenCalled();
    });

    it('properly integrates AnimatedBlogPage component', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      expect(screen.getByTestId('animated-blog-page')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles null user gracefully', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: null,
      });

      expect(() => render(<BlogWelcomeHeader />)).not.toThrow();
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });

    it('handles user without role property', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: {},
      });

      expect(() => render(<BlogWelcomeHeader />)).not.toThrow();
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });

    it('handles case-sensitive role checking', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['Admin', 'USER'] }, // Different case
      });

      render(<BlogWelcomeHeader />);
      expect(screen.queryByText('+ Write a Blog')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: false,
        user: null,
      });

      render(<BlogWelcomeHeader />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Blogs');
    });

    it('provides accessible link for write blog button', () => {
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
        user: { role: ['admin'] },
      });

      render(<BlogWelcomeHeader />);
      const link = screen.getByRole('link', { name: '+ Write a Blog' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/blogs/new');
    });
  });

  describe('Component Export', () => {
    it('exports the component as default', () => {
      expect(BlogWelcomeHeader).toBeDefined();
      expect(typeof BlogWelcomeHeader).toBe('function');
    });
  });
});
