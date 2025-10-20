import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BlogItem } from '@/app/blogs/interface';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import Pagination from '@/app/blogs/Pagination';

const mockBlogs: BlogItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `blog-${i + 1}`,
  title: `Blog ${i + 1}`,
  slug: '',
  extract: '',
  content: '',
  image_url: '',
  is_featured: true,
  author: { id: '', name: '', email: '' },
  category: { id: '', name: '' },
  comments: [],
  created_at: '',
  updated_at: '',
}));

// Mock the useFetchBlogs hook
jest.mock('@/hooks/blog/fetch-blogs', () => ({
  useFetchBlogs: jest.fn(),
}));

jest.mock('@/app/blogs/BlogsLayout', () => ({
  __esModule: true,
  default: ({ items }: { items: BlogItem[] }) => {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id} data-testid="blog-item">
            {item.title}
          </div>
        ))}
      </div>
    );
  },
}));

describe('Pagination Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when fetching data', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
    });

    render(<Pagination blogs={[]} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { message: 'Failed to fetch' },
    });

    render(<Pagination blogs={[]} />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('should render "No Blogs Found" when blogs is empty', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={[]} />);
    expect(screen.getByText(/no blogs found/i)).toBeInTheDocument();
  });

  it('should render first 10 blogs by default', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={mockBlogs} />);
    const blogs = screen.getAllByTestId('blog-item');

    expect(blogs).toHaveLength(10);
    expect(blogs[0]).toHaveTextContent('Blog 1');
    expect(blogs[9]).toHaveTextContent('Blog 10');
  });

  it('navigates to next page using pagination', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={mockBlogs} />);

    // Simulate click on page 2
    const pageButton = screen.getByRole('button', { name: 'Next page' });
    fireEvent.click(pageButton);

    // Re-query to get updated results
    const updatedBlogs = screen.getAllByTestId('blog-item');
    expect(updatedBlogs).toHaveLength(10); // 10 blogs on page 2
    expect(updatedBlogs[0]).toHaveTextContent('Blog 11');
  });

  it('navigates to previous page using pagination', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={mockBlogs} />);

    // on page 3
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));

    // Simulate click to page 2
    const pageButton = screen.getByRole('button', { name: 'Previous page' });
    fireEvent.click(pageButton);

    // Re-query to get updated results
    const updatedBlogs = screen.getAllByTestId('blog-item');
    expect(updatedBlogs).toHaveLength(10); // 10 blogs on page 2
    expect(updatedBlogs[9]).toHaveTextContent('Blog 20');
  });

  it('navigates to first page using pagination', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={mockBlogs} />);

    // on page 3
    fireEvent.click(screen.getByRole('button', { name: 'Last' }));

    // Simulate click to first page
    const pageButton = screen.getByRole('button', { name: 'First' });
    fireEvent.click(pageButton);

    // Re-query to get updated results
    const updatedBlogs = screen.getAllByTestId('blog-item');
    expect(updatedBlogs).toHaveLength(10); // 10 blogs on page 1
    expect(updatedBlogs[9]).toHaveTextContent('Blog 10');
  });

  it('navigates to last page using pagination', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(<Pagination blogs={mockBlogs} />);

    // on page 3
    fireEvent.click(screen.getByRole('button', { name: 'First' }));

    // Simulate click to first page
    const pageButton = screen.getByRole('button', { name: 'Last' });
    fireEvent.click(pageButton);

    // Re-query to get updated results
    const updatedBlogs = screen.getAllByTestId('blog-item');
    expect(updatedBlogs).toHaveLength(5);
    expect(updatedBlogs[4]).toHaveTextContent('Blog 25');
  });
});
