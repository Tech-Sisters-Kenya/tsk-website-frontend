'use client';

import React, { useCallback, useState, useEffect } from 'react';
import TagToggleChip from './TagToggleChip';
import { BlogItem } from './interface';
import Pagination from './Pagination';

const TAGS = [
  'All',
  'Career & Growth',
  'Community Stories',
  'Event Highlights',
  'Opportunities & Resources',
  'Sisterhood & Lifestyle',
  'Tech Tips & Tutorials',
];

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);

      try {
        const response = await fetch('https://api.techsisterskenya.org/api/blogs');

        if (!response.ok) {
          throw new Error('Failed to fetch content. Please try again later.');
        }

        const data = await response.json();
        setBlogs(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // add or remove a tag based on selection
  const handleToggle = useCallback((tag: string, value: boolean) => {
    setSelectedTags((prev) => (value ? [...prev, tag] : prev.filter((t) => t !== tag)));
  }, []);

  const filteredBlogs =
    !selectedTags.length || selectedTags.includes('All')
      ? blogs
      : blogs.filter((blog) => selectedTags.includes(blog.category.name));

  return (
    <div>
      {TAGS.map((tag) => (
        <TagToggleChip
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onToggle={(value) => handleToggle(tag, value)}
        />
      ))}

      <Pagination blogs={filteredBlogs} loading={loading} error={error} />
    </div>
  );
}

export default TagSelector;
