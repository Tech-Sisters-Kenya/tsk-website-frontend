/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ExploreBlogs from '@/app/landing-page/ExploreBlogs';
import '@testing-library/jest-dom';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';

// Mocks
jest.mock('@/hooks/blog/fetch-blogs', () => ({
  useFetchBlogs: jest.fn(),
}));

jest.mock('@/ui/card-stack', () => ({
  CardStack: () => <div data-testid="card-stack">Mock Card Stack</div>,
}));

jest.mock('next/image', () => {
  const MockedImage = (props: any) => {
    const { fill: _fill, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || 'mocked image'} />;
  };
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

jest.mock('@/components/Button', () => {
  const MockedButton = (props: any) => <button {...props}>{props.children}</button>;
  MockedButton.displayName = 'MockedButton';
  return MockedButton;
});

jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

describe('ExploreBlogs component', () => {
  const mockBlogs = [
    {
      id: '1',
      slug: 'test-blog',
      title: 'Test Blog Title',
      content: 'Test content',
      image_url: '/test.jpg',
      extract: 'This is a test extract.',
      status: 'published',
      is_featured: false,
      author: {
        id: 'author1',
        name: 'Author Name',
        email: 'author@example.com',
      },
      category: {
        id: 'cat1',
        name: 'Category Name',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: mockBlogs },
    });
  });

  it('renders blog section with title and extract', () => {
    render(<ExploreBlogs />);
    expect(screen.getByText('EXPLORE OUR BLOGS')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText(/This is a test extract/i)).toBeInTheDocument();
  });

  it('renders card stack and button', () => {
    render(<ExploreBlogs />);
    expect(screen.getByTestId('card-stack')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });
});
