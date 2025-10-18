import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';
import BlogPost from '@/app/blogs/[blogId]/page';
import { useFetchSingleBlog } from '@/hooks/blog/fetch-single-blog';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';

interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  extract: string;
  status: string;
  is_featured: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn(),
}));

// Define types for mock components
interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

interface MockLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface MockButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: MockImageProps) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: MockLinkProps) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock custom hooks
jest.mock('@/hooks/blog/fetch-single-blog');
jest.mock('@/hooks/blog/fetch-blogs');
jest.mock('@/hooks/blog/fetch-blogAuthor');

// Mock Button component
jest.mock('@/components/Button', () => {
  return function MockButton({ children, className, ...props }: MockButtonProps) {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  };
});

// Define hook return types
interface BlogApiResponse {
  data: Blog;
}

interface BlogsApiResponse {
  data: Blog[];
}

interface FetchSingleBlogReturn {
  data: BlogApiResponse | null;
  isLoading: boolean;
  isError: boolean;
}

interface FetchBlogsReturn {
  data: BlogsApiResponse | undefined;
}

interface ParamsReturn {
  blogId?: string;
}

const mockUseFetchSingleBlog = useFetchSingleBlog as unknown as jest.MockedFunction<
  (slug: string) => FetchSingleBlogReturn
>;
const mockUseFetchBlogs = useFetchBlogs as unknown as jest.MockedFunction<() => FetchBlogsReturn>;
const mockUseParams = useParams as jest.MockedFunction<() => ParamsReturn>;

const mockBlogData = {
  id: '1',
  slug: 'test-blog-post',
  title: 'Test Blog Post',
  content: '<p>This is the blog content with <strong>HTML</strong> formatting.</p>',
  image_url: 'https://example.com/blog-image.jpg',
  extract: 'This is a test blog extract',
  status: 'published',
  is_featured: true,
  author: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  category: {
    id: '1',
    name: 'Technology',
  },
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
};

const mockMoreBlogsData = [
  {
    id: '2',
    slug: 'second-blog-post',
    title: 'Second Blog Post',
    content: '<p>Second blog content</p>',
    image_url: 'https://example.com/blog-2.jpg',
    extract: 'Second blog extract',
    status: 'published',
    is_featured: false,
    author: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    category: {
      id: '2',
      name: 'Design',
    },
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '3',
    slug: 'third-blog-post',
    title: 'Third Blog Post',
    content: '<p>Third blog content</p>',
    image_url: 'https://example.com/blog-3.jpg',
    extract: 'Third blog extract',
    status: 'published',
    is_featured: true,
    author: {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
    category: {
      id: '3',
      name: 'Marketing',
    },
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z',
  },
  {
    id: '4',
    slug: 'fourth-blog-post',
    title: 'Fourth Blog Post',
    content: '<p>Fourth blog content</p>',
    image_url: 'https://example.com/blog-4.jpg',
    extract: 'Fourth blog extract',
    status: 'published',
    is_featured: false,
    author: {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
    },
    category: {
      id: '4',
      name: 'Business',
    },
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
  },
];

describe('BlogPost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading States', () => {
    it('renders loading when blogSlug is not available', () => {
      mockUseParams.mockReturnValue({});
      mockUseFetchSingleBlog.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [] },
      });

      render(<BlogPost />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders loading when blog data is loading', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [] },
      });

      render(<BlogPost />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error message when there is an error', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [] },
      });

      render(<BlogPost />);
      expect(screen.getByText('Something went wrong loading this blog.')).toBeInTheDocument();
    });
  });

  describe('Successful Blog Rendering', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [mockBlogData, ...mockMoreBlogsData] },
      });
    });

    it('renders blog title correctly', () => {
      render(<BlogPost />);
      expect(screen.getByRole('heading', { name: 'Test Blog Post' })).toBeInTheDocument();
    });

    it('renders blog image with correct attributes', () => {
      render(<BlogPost />);
      const blogImage = screen.getByAltText('Test Blog Post');
      expect(blogImage).toBeInTheDocument();
      expect(blogImage).toHaveAttribute('src', 'https://example.com/blog-image.jpg');
    });

    it('renders blog content with HTML formatting', () => {
      render(<BlogPost />);
      const contentDiv = document.querySelector('.prose');
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv?.innerHTML).toContain(
        '<p>This is the blog content with <strong>HTML</strong> formatting.</p>'
      );
    });

    it('renders "More Blogs" section title', () => {
      render(<BlogPost />);
      expect(screen.getByRole('heading', { name: 'More Blogs' })).toBeInTheDocument();
    });

    it('renders "View All" button with correct link', () => {
      render(<BlogPost />);
      const viewAllButton = screen.getByRole('button', { name: 'View All' });
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton.closest('a')).toHaveAttribute('href', '/blogs');
    });
  });

  describe('More Blogs Section', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [mockBlogData, ...mockMoreBlogsData] },
      });
    });

    it('filters out current blog and displays up to 3 more blogs', () => {
      render(<BlogPost />);

      // Should not show the current blog in more blogs section
      const moreBlogsSection = document.querySelector('.grid');
      expect(moreBlogsSection?.children).toHaveLength(3);

      // Verify the other blogs are shown
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Third Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Fourth Blog Post')).toBeInTheDocument();
    });

    it('renders blog categories correctly', () => {
      render(<BlogPost />);
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Marketing')).toBeInTheDocument();
      expect(screen.getByText('Business')).toBeInTheDocument();
    });

    it('renders blog extracts correctly', () => {
      render(<BlogPost />);
      expect(screen.getByText('Second blog extract')).toBeInTheDocument();
      expect(screen.getByText('Third blog extract')).toBeInTheDocument();
      expect(screen.getByText('Fourth blog extract')).toBeInTheDocument();
    });

    it('renders formatted dates correctly', () => {
      render(<BlogPost />);
      expect(screen.getByText('10 January 2024')).toBeInTheDocument();
      expect(screen.getByText('05 January 2024')).toBeInTheDocument();
      expect(screen.getByText('01 January 2024')).toBeInTheDocument();
    });

    it('renders correct links for more blogs', () => {
      render(<BlogPost />);
      const blogLinks = screen.getAllByText('Second Blog Post');
      blogLinks.forEach((link) => {
        expect(link.closest('a')).toHaveAttribute('href', '/blogs/second-blog-post');
      });
    });

    it('renders blog images in more blogs section', () => {
      render(<BlogPost />);
      expect(screen.getByAltText('Second Blog Post')).toBeInTheDocument();
      expect(screen.getByAltText('Third Blog Post')).toBeInTheDocument();
      expect(screen.getByAltText('Fourth Blog Post')).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('formats dates correctly in British format', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [mockBlogData, ...mockMoreBlogsData] },
      });

      render(<BlogPost />);

      // Test various date formats
      expect(screen.getByText('10 January 2024')).toBeInTheDocument();
      expect(screen.getByText('05 January 2024')).toBeInTheDocument();
      expect(screen.getByText('01 January 2024')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles blog without image_url', () => {
      const blogWithoutImage = { ...mockBlogData, image_url: '' };
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: blogWithoutImage },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [blogWithoutImage] },
      });

      render(<BlogPost />);
      expect(screen.getByRole('heading', { name: 'Test Blog Post' })).toBeInTheDocument();
      expect(screen.queryByAltText('Test Blog Post')).not.toBeInTheDocument();
    });

    it('handles empty blogs array', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [mockBlogData] }, // Only current blog
      });

      render(<BlogPost />);
      expect(screen.getByRole('heading', { name: 'More Blogs' })).toBeInTheDocument();
      const moreBlogsGrid = document.querySelector('.grid');
      expect(moreBlogsGrid?.children).toHaveLength(0);
    });

    it('handles undefined blogs data', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-post' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: undefined,
      });

      render(<BlogPost />);
      expect(screen.getByRole('heading', { name: 'Test Blog Post' })).toBeInTheDocument();
    });
  });

  describe('Hook Calls', () => {
    it('calls useFetchSingleBlog with correct blog slug', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-slug' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [] },
      });

      render(<BlogPost />);
      expect(mockUseFetchSingleBlog).toHaveBeenCalledWith('test-blog-slug');
    });

    it('calls useFetchBlogs hook', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog' });
      mockUseFetchSingleBlog.mockReturnValue({
        data: { data: mockBlogData },
        isLoading: false,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({
        data: { data: [] },
      });

      render(<BlogPost />);
      expect(mockUseFetchBlogs).toHaveBeenCalled();
    });
  });

  describe('Additional BlogPost Tests', () => {
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

    it('renders loading state when fetching blog', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-1' });
      mockUseFetchSingleBlog.mockReturnValue({
        isLoading: true,
        data: null,
        isError: false,
      });
      mockUseFetchBlogs.mockReturnValue({ data: { data: [] } });

      render(<BlogPost />);
      expect(screen.getByText(/Loading blog/i)).toBeInTheDocument();
    });

    it('renders error state when fetch fails', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-1' });
      mockUseFetchSingleBlog.mockReturnValue({
        isError: true,
        data: null,
        isLoading: false,
      });
      mockUseFetchBlogs.mockReturnValue({ data: { data: [] } });

      render(<BlogPost />);
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
    });

    it('renders blog content when data is available', () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-1' });
      mockUseFetchSingleBlog.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { data: mockBlog },
      });
      mockUseFetchBlogs.mockReturnValue({ data: { data: [] } });

      render(<BlogPost />);
      expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
      expect(screen.getByText(/This is the Blog content here/i)).toBeInTheDocument();
      expect(screen.getByText('Valeria Bosibori')).toBeInTheDocument();
    });

    it("renders 'No recent posts available' when author has no blogs", () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-1' });
      mockUseFetchSingleBlog.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { data: mockBlog },
      });
      mockUseFetchBlogs.mockReturnValue({ data: { data: [] } });

      render(<BlogPost />);
      expect(screen.getByText('No recent posts available.')).toBeInTheDocument();
    });

    it("renders 'More Blogs' section when additional blogs exist", () => {
      mockUseParams.mockReturnValue({ blogId: 'test-blog-1' });
      mockUseFetchSingleBlog.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { data: mockBlog },
      });
      mockUseFetchBlogs.mockReturnValue({
        data: {
          data: [{ ...mockBlog, id: '2', slug: 'another-blog', title: 'Another Blog' }],
        },
      });

      render(<BlogPost />);
      expect(screen.getByText('More Blogs')).toBeInTheDocument();
      expect(screen.getByText('Another Blog')).toBeInTheDocument();
    });
  });
});
