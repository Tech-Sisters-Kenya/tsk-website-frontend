import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogItem } from '@/app/blogs/interface';
import BlogsLayout from '@/app/blogs/BlogsLayout';

jest.mock('@/app/blogs/BlogCard', () => ({
  __esModule: true,
  default: ({ item }: { item: BlogItem }) => (
    <div data-testid={`blog-card-${item.id}`}>{item.title}</div>
  ),
}));

const createBlog = (id: number): BlogItem => ({
  id: `id-${id}`,
  title: `Blog ${id}`,
  slug: `blog-${id}`,
  extract: 'extract',
  content: 'content',
  image_url: '',
  is_featured: false,
  created_at: '',
  updated_at: '',
  author: {
    id: 'auth-id',
    name: 'Author',
    email: 'author@example.com',
  },
  category: {
    id: 'cat-id',
    name: 'Category',
  },
  comments: [],
});

export const generateBlogs = (count = 10) =>
  Array.from({ length: count }, (_, i) => createBlog(i + 1));

describe('BlogsLayout Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all blog items', () => {
    const items = generateBlogs();
    render(<BlogsLayout items={items} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`blog-card-id-${i}`)).toBeInTheDocument();
    }
  });

  it('should render correct number of row wrappers', () => {
    const items = generateBlogs();
    const { container } = render(<BlogsLayout items={items} />);

    // Each row is a div with margin-bottom
    const rowDivs = container.querySelectorAll('div.mb-8');
    expect(rowDivs).toHaveLength(4);
  });

  it('should apply correct grid class for 3-column rows', () => {
    const items = generateBlogs();
    const { container } = render(<BlogsLayout items={items} />);

    // in md screen sizes, there should be at least one row with 3 columns
    const threeColRows = container.querySelectorAll('.md\\:grid-cols-3');
    expect(threeColRows).toHaveLength(2);
  });

  it('should apply correct grid class for 2-column rows', () => {
    const items = generateBlogs();
    const { container } = render(<BlogsLayout items={items} />);

    // in md screen sizes, there should be at least one row with 2 columns
    const twoColRowsA = container.querySelectorAll('.md\\:grid-cols-\\[1\\.2fr_0\\.8fr\\]');
    const twoColRowsB = container.querySelectorAll('.md\\:grid-cols-\\[0\\.8fr_1\\.2fr\\]');

    expect(twoColRowsA.length + twoColRowsB.length).toBe(2);
  });
});
