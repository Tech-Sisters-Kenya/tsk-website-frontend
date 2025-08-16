import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogsPage from '@/app/blogs/page';

// Mock the child components
jest.mock('@/app/blogs/BlogWelcomeHeader', () => {
  return function MockBlogWelcomeHeader() {
    return <div data-testid="blog-welcome-header">Blog Welcome Header</div>;
  };
});

jest.mock('@/app/blogs/TagSelector', () => {
  return function MockTagSelector() {
    return <div data-testid="tag-selector">Tag Selector</div>;
  };
});

describe('BlogsPage', () => {
  it('renders without crashing', () => {
    render(<BlogsPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has correct main element structure and classes', () => {
    render(<BlogsPage />);
    const mainElement = screen.getByRole('main');

    expect(mainElement).toHaveClass('flex', 'flex-col', 'justify-center', 'py-10');
  });

  it('renders BlogWelcomeHeader component', () => {
    render(<BlogsPage />);
    expect(screen.getByTestId('blog-welcome-header')).toBeInTheDocument();
  });

  it('renders Categories heading with correct styling', () => {
    render(<BlogsPage />);
    const heading = screen.getByRole('heading', { level: 3, name: /categories/i });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('font-body', 'text-xl', 'font-bold', 'mb-5');
  });

  it('renders TagSelector component', () => {
    render(<BlogsPage />);
    expect(screen.getByTestId('tag-selector')).toBeInTheDocument();
  });

  it('has correct container structure for categories section', () => {
    render(<BlogsPage />);

    // Check the outer container
    const outerContainer = screen
      .getByTestId('tag-selector')
      .closest('.flex.flex-col.items-center.justify-between.mx-8');
    expect(outerContainer).toBeInTheDocument();

    // Check the inner container with categories
    const innerContainer = screen
      .getByRole('heading', { name: /categories/i })
      .closest('.w-full.px-12.text-tsk-primary-dark.mt-10');
    expect(innerContainer).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    render(<BlogsPage />);

    const mainElement = screen.getByRole('main');
    const children = Array.from(mainElement.children);

    // BlogWelcomeHeader should be first
    expect(children[0]).toContainElement(screen.getByTestId('blog-welcome-header'));

    // Categories section should be second
    expect(children[1]).toContainElement(screen.getByRole('heading', { name: /categories/i }));
    expect(children[1]).toContainElement(screen.getByTestId('tag-selector'));
  });

  it('applies correct CSS classes to all elements', () => {
    const { container } = render(<BlogsPage />);

    // Check main classes
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex', 'flex-col', 'justify-center', 'py-10');

    // Check outer div classes
    const outerDiv = container.querySelector('.flex.flex-col.items-center.justify-between.mx-8');
    expect(outerDiv).toBeInTheDocument();

    // Check inner div classes
    const innerDiv = container.querySelector('.w-full.px-12.text-tsk-primary-dark.mt-10');
    expect(innerDiv).toBeInTheDocument();

    // Check heading classes
    const heading = screen.getByRole('heading', { name: /categories/i });
    expect(heading).toHaveClass('font-body', 'text-xl', 'font-bold', 'mb-5');
  });

  it('matches snapshot', () => {
    const { container } = render(<BlogsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
