import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogCard from '@/app/blogs/BlogCard';
import { BlogItem } from '@/app/blogs/interface';

const mockBlog: BlogItem = {
  id: 'Blog-1',
  title: 'Test Blog Title',
  slug: 'test-blog',
  extract: 'This is a short extract of the blog post.',
  content: 'Full content here',
  image_url: 'https://example.com/test-image.jpg',
  is_featured: true,
  author: {
    id: 'author1',
    name: 'Author Name',
    email: 'author@example.com',
  },
  category: {
    id: 'cat1',
    name: 'Tech News',
  },
  comments: [],
  created_at: '2024-08-15T12:00:00Z',
  updated_at: '2024-08-15T12:00:00Z',
};

describe('Blog Card Component Tests', () => {
  it('should render blog data correctly', () => {
    render(<BlogCard item={mockBlog} />);

    // Title
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    // Category
    expect(screen.getByText('Tech News')).toBeInTheDocument();
    // Date
    expect(screen.getByText('15 August 2024')).toBeInTheDocument();
    // Extract preview
    expect(screen.getByText(/This is a short extract of the blog post/)).toBeInTheDocument();
    // Link
    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link).toHaveAttribute('href', '/blogs/test-blog');
    // Image alt
    const img = screen.getByAltText('Test Blog Title image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test-image.jpg');
  });
});
