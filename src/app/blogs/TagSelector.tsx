'use client';

import React, { useMemo, useState } from 'react';
import { BlogItem } from './interface';
import Pagination from './Pagination';

import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { useFetchCategories } from '@/hooks/blog/fetch-categories';
import { Search as SearchIcon } from 'lucide-react';

function TagSelector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Categories');

  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = useMemo(() => data?.data || [], [data]);

  const { data: categoriesPayload } = useFetchCategories();
  const categories: { id: string; name: string }[] = categoriesPayload?.data || [];

  // derive category options from available blogs to avoid extra requests and keep tests stable
  const categoryOptions = useMemo(() => {
    const names =
      categories.length > 0
        ? categories.map((c) => c.name)
        : Array.from(new Set(blogs.map((b) => b?.category?.name).filter(Boolean)));
    return ['Categories', ...names];
  }, [categories, blogs]);

  const filteredBlogs = useMemo(() => {
    let result = blogs;

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
  }, [blogs, selectedCategory, searchQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs.length) return <div>No Blogs Found</div>;

  return (
    <div data-testid="tag-selector">
      {/* Filters Row: Search (left) and Category dropdown (right) */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative flex-1">
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-tsk-primary-dark"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search blogs"
            className="w-full border border-tsk-primary-dark rounded-2xl pl-10 pr-4 py-2 font-body text-tsk-primary-dark focus:outline-none"
            data-testid="blog-search"
          />
        </div>
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

      <Pagination blogs={filteredBlogs} />
    </div>
  );
}

export default TagSelector;
