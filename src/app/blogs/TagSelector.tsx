'use client';

import React, { useCallback, useState } from 'react';
import TagToggleChip from './TagToggleChip';
import { BlogItem } from './interface';
import Pagination from './Pagination';

import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';

const TAGS = [
  'All',
  'TSK Events Recap',
  'She Builds',
  'Voices of Change',
  'PMs, Designers & Beyond',
];

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = data?.data || [];

  // add or remove a tag based on selection
  const handleToggle = useCallback((tag: string, value: boolean) => {
    setSelectedTags((prev) => {
      if (tag === 'All' && value) {
        // select all and clear all tags
        return ['All'];
      } else if (tag !== 'All' && value) {
        // on selecting a tag, deselect 'All'
        return [...prev.filter((t) => t !== 'All'), tag];
      } else {
        // on deselecting a tag, revert to 'All'
        const filtered = prev.filter((t) => t !== tag);
        return filtered.length === 0 ? ['All'] : filtered;
      }
    });
  }, []);

  const filteredBlogs =
    !selectedTags.length || selectedTags.includes('All')
      ? blogs
      : blogs.filter((blog) => selectedTags.includes(blog?.category?.name));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs.length) return <div>No Blogs Found</div>;

  return (
    <div data-testid="tag-selector">
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
