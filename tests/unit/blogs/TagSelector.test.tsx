import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { BlogItem } from '../../../src/app/blogs/interface';
import TagSelector from '@/app/blogs/TagSelector';

const mockBlogs = [
  {
    id: 'blog-1',
    title: 'Building a Better Future',
    slug: 'building-better-future',
    extract: 'A summary of our recent event.',
    content: 'Full content here...',
    image_url: 'https://example.com/image.jpg',
    is_featured: true,
    author: {
      id: 'author-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
    category: {
      id: 'cat-tsk-events-recap',
      name: 'TSK Events Recap',
    },
    comments: [
      {
        id: 'comment-1',
        comment: 'Great event!',
        author: 'User1',
        created_at: '2024-01-01',
      },
    ],
    created_at: '2024-01-01',
    updated_at: '2024-01-02',
  },
  {
    id: 'blog-2',
    title: 'Women in Tech',
    slug: 'women-in-tech',
    extract: 'Voices from She Builds',
    content: 'Full content here...',
    image_url: 'https://example.com/image2.jpg',
    is_featured: false,
    author: {
      id: 'author-2',
      name: 'John Doe',
      email: 'john@example.com',
    },
    category: {
      id: 'cat-she-builds',
      name: 'She Builds',
    },
    comments: [],
    created_at: '2024-02-01',
    updated_at: '2024-02-02',
  },
];

type TagToggleChipProps = {
  selected?: boolean;
  onToggle: (value: boolean) => void;
  label: string;
};

// Mock the useFetchBlogs hook
jest.mock('@/hooks/blog/fetch-blogs', () => ({
  useFetchBlogs: jest.fn(),
}));

jest.mock('@/app/blogs/TagToggleChip', () => ({
  __esModule: true,
  default: ({ selected, onToggle, label }: TagToggleChipProps) => {
    return (
      <button data-testid={label} aria-pressed={selected} onClick={() => onToggle(!selected)}>
        {label}
      </button>
    );
  },
}));

jest.mock('@/app/blogs/Pagination', () => ({
  __esModule: true,
  default: ({ blogs }: { blogs: BlogItem[] }) => {
    return (
      <div data-testid="pagination">
        {blogs.map((blog: BlogItem) => (
          <div key={blog.id} data-testid={`test-${blog.id}`}>
            {blog.title}
          </div>
        ))}
      </div>
    );
  },
}));

describe('Tag Selector Component Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<TagSelector />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error message if there is an error', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Something went wrong'),
    });

    render(<TagSelector />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should show no blogs found when data is empty', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<TagSelector />);
    expect(screen.getByText('No Blogs Found')).toBeInTheDocument();
  });

  it('should render all blogs by default', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: mockBlogs },
      isLoading: false,
      error: null,
    });

    render(<TagSelector />);

    const renderedBlogs = screen.getAllByTestId(/^test-blog/);

    expect(renderedBlogs.length).toBe(2);
    expect(screen.getByTestId('test-blog-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-blog-2')).toBeInTheDocument();
  });

  it('should show all blogs when "All" tag is selected', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: mockBlogs },
      isLoading: false,
      error: null,
    });

    render(<TagSelector />);

    fireEvent.click(screen.getByTestId('All'));

    expect(screen.getByTestId('test-blog-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-blog-2')).toBeInTheDocument();
  });

  it('should show only blogs with the selected tag', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: mockBlogs },
      isLoading: false,
      error: null,
    });

    render(<TagSelector />);

    fireEvent.click(screen.getByTestId('TSK Events Recap'));

    expect(screen.getByTestId('test-blog-1')).toBeInTheDocument();
    expect(screen.queryByTestId('test-blog-2')).not.toBeInTheDocument();
  });

  it('should toggle tags on and off', () => {
    (useFetchBlogs as jest.Mock).mockReturnValue({
      data: { data: mockBlogs },
      isLoading: false,
      error: null,
    });

    render(<TagSelector />);

    const tagBtn = screen.getByTestId('She Builds');

    fireEvent.click(tagBtn);
    expect(screen.getByTestId('test-blog-2')).toBeInTheDocument();
    expect(screen.queryByTestId('test-blog-1')).not.toBeInTheDocument();

    fireEvent.click(tagBtn);
    expect(screen.getByTestId('test-blog-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-blog-2')).toBeInTheDocument();
  });
});
