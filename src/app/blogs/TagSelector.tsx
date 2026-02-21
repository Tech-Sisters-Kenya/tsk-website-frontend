'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BlogItem } from './interface';
import Pagination from './Pagination';

import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { useFetchCategories } from '@/hooks/blog/fetch-categories';
import { Search as SearchIcon, ChevronDown } from 'lucide-react';

function TagSelector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Categories');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = useMemo(() => data?.data || [], [data]);

  const { data: categoriesPayload } = useFetchCategories();
  const categories: { id: string; name: string }[] = useMemo(
    () => categoriesPayload?.data || [],
    [categoriesPayload]
  );

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
        <div ref={dropdownRef} className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            data-testid="category-select"
            className="w-full sm:w-64 py-3 px-3 border rounded-xl flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent text-left border-[#45084A]/50"
          >
            <span
              className={selectedCategory === 'Categories' ? 'text-[#45084A]/50' : 'text-[#45084A]'}
            >
              {selectedCategory}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#45084A] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isOpen && (
            <div
              role="listbox"
              className="absolute z-10 w-full sm:w-64 mt-1 bg-white border border-[#45084A]/50 rounded-xl shadow-lg"
            >
              {categoryOptions.map((name) => (
                <button
                  key={name}
                  type="button"
                  role="option"
                  aria-selected={selectedCategory === name}
                  onClick={() => {
                    setSelectedCategory(name);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-3 text-left border-b border-[#45084A]/10 last:border-b-0 first:rounded-t-xl last:rounded-b-xl ${
                    selectedCategory === name
                      ? 'bg-[#efd5f8] text-tsk-primary'
                      : 'hover:bg-gray-50 text-[#45084A]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Pagination blogs={filteredBlogs} />
    </div>
  );
}

export default TagSelector;
