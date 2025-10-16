import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from '@/app/blogs/[blogId]/page';
import { useParams } from 'next/navigation';

// Mock Next.js hooks & the three hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock('@/hooks/blog/fetch-single-blog', () => ({
  useFetchSingleBlog: jest.fn(),
}));

jest.mock('@/hooks/blog/fetch-blogs', () => ({
  useFetchBlogs: jest.fn(),
}));

jest.mock('@/hooks/blog/fetch-blogAuthor', () => ({
  useFetchBlogAuthor: jest.fn(),
}));

// Import mocked hooks
import { useFetchSingleBlog } from '@/hooks/blog/fetch-single-blog';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { useFetchBlogAuthor } from '@/hooks/blog/fetch-blogAuthor';

//start the test suite
describe('BlogPost component', () => {
  const mockBlog = {
    id: '1',
    slug: 'test-blog-1',
    title: 'Test Blog Title',
    content: '<p>This is the Blog content here</p>',
    image_url: '/test.jpg',
    extract: 'Test extract',
    status: 'published',
    is_featured: false,
    author: { id: '10', name: 'Valeria Bosibori', email: 'valeria@techsisters.com' },
    category: { id: '20', name: 'TSK' },
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ blogId: 'test-blog-1' });

    // Default mocks (can be overridden per test when needed)
    (useFetchBlogs as jest.Mock).mockReturnValue({ isLoading: false, data: { data: [] } });
    (useFetchBlogAuthor as jest.Mock).mockReturnValue({ isLoading: false, data: { data: [] } });
  });

  it('renders loading state when fetching blog', () => {
    (useFetchSingleBlog as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<BlogPost />);
    expect(screen.getByText(/Loading blog/i)).toBeInTheDocument();
  });

  it('renders error state when fetch fails', () => {
    (useFetchSingleBlog as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Failed to load'),
    });

    render(<BlogPost />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  it('renders blog content when data is available', () => {
    (useFetchSingleBlog as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { data: mockBlog },
    });

    render(<BlogPost />);
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText(/This is the Blog content here/i)).toBeInTheDocument();
    expect(screen.getByText('Valeria Bosibori')).toBeInTheDocument();
  });

  it("renders 'No recent posts available' when author has no blogs", () => {
    (useFetchSingleBlog as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { data: mockBlog },
    });

    render(<BlogPost />);
    expect(screen.getByText('No recent posts available.')).toBeInTheDocument();
  });

  it("renders 'More Blogs' section when additional blogs exist", () => {
    (useFetchSingleBlog as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { data: mockBlog },
    });

    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        data: [{ ...mockBlog, id: '2', slug: 'another-blog', title: 'Another Blog' }],
      },
    });

    render(<BlogPost />);
    expect(screen.getByText('More Blogs')).toBeInTheDocument();
    expect(screen.getByText('Another Blog')).toBeInTheDocument();
  });
});
