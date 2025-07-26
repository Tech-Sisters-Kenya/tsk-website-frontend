'use client';

import React, { useCallback, useState } from 'react';
import TagToggleChip from './TagToggleChip';
import { BlogItem } from './interface';
import Pagination from './Pagination';

import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';

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
  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = data?.data || [];

  // add or remove a tag based on selection
  const handleToggle = useCallback((tag: string, value: boolean) => {
    setSelectedTags((prev) => (value ? [...prev, tag] : prev.filter((t) => t !== tag)));
  }, []);

  const filteredBlogs =
    !selectedTags.length || selectedTags.includes('All')
      ? blogs
      : blogs.filter((blog) => selectedTags.includes(blog.category.name));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs) return <div>No Blogs Found</div>;

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

      <Pagination blogs={filteredBlogs} />
    </div>
  );
}

export default TagSelector;
