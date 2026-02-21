'use client';

import React, { useCallback, useMemo, useState } from 'react';
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
  const [selectedTags, setSelectedTags] = useState<string[]>(['Categories']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Categories');

  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = data?.data || [];

  // derive category options from available blogs to avoid extra requests and keep tests stable
  const categoryOptions = useMemo(() => {
    const names = Array.from(new Set(blogs.map((b) => b?.category?.name).filter(Boolean)));
    return ['Categories', ...names];
  }, [blogs]);

  // add or remove a tag based on selection
  const handleToggle = useCallback((tag: string, value: boolean) => {
    setSelectedTags((prev) => {
      if (tag === 'Categories' && value) {
        return ['Categories'];
      } else if (tag !== 'Categories' && value) {
        return [...prev.filter((t) => t !== 'Categories'), tag];
      } else {
        const filtered = prev.filter((t) => t !== tag);
        return filtered.length === 0 ? ['Categories'] : filtered;
      }
    });
  }, []);

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // apply tag filters
    if (selectedTags.length && !selectedTags.includes('Categories')) {
      result = result.filter((blog) => selectedTags.includes(blog?.category?.name));
    }

    // apply category dropdown filter
    if (selectedCategory && selectedCategory !== 'Categories') {
      result = result.filter((blog) => blog?.category?.name === selectedCategory);
    }

    // apply search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((blog) => {
        const title = (blog.title || '').toLowerCase();
        const extractText = (blog.extract || '').replace(/<[^>]*>/g, '').toLowerCase();
        return title.includes(q) || extractText.includes(q);
      });
    }

    return result;
  }, [blogs, selectedTags, selectedCategory, searchQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs.length) return <div>No Blogs Found</div>;

  return (
    <div data-testid="tag-selector">
      {/* Filters Row: Search (left) and Category dropdown (right) */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          aria-label="Search blogs"
          className="flex-1 border border-tsk-primary-dark rounded-2xl px-4 py-2 font-body text-tsk-primary-dark focus:outline-none"
          data-testid="blog-search"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
          className="border border-tsk-primary-dark rounded-2xl px-4 py-2 font-body text-tsk-primary-dark bg-white"
          data-testid="category-select"
        >
          {categoryOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Existing Tag chips */}
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
