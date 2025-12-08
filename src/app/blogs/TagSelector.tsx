'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { BlogItem } from './interface';
import Pagination from './Pagination';

import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { Search } from 'lucide-react';

const TAGS = [
  'TechSister Stories',
  'Behind the Scenes',
  'Voices of Change',
  'Celebrating Sisters',
  'Dev Diaries',
  'She Builds',
  'Toolbox Tips',
  'Tech 101',
  'Ask a TechSister',
  'Breaking In',
  'Leveling Up',
  'Soft Skills, Real Impact',
  'PMs, Designers & Beyond',
  'Resume to Real Talks',
  'TSK Events Recap',
  'Coming Up',
  'Global Sisterhood',
  'AI & Emerging Technologies',
  'Building for Africa',
  'The Next Gen',
];

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>(selectedTags);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useFetchBlogs();
  const blogs: BlogItem[] = data?.data || [];

  // Handle temporary tag changes inside dropdown
  const handleDropdownToggle = (tag: string, value: boolean) => {
    setTempSelectedTags((prev) => {
      if (value) return [...prev.filter((t) => t !== 'All'), tag];
      const filtered = prev.filter((t) => t !== tag);
      return filtered.length === 0 ? ['All'] : filtered;
    });
  };

  const applyTags = () => {
    setSelectedTags(tempSelectedTags);
    setOpen(false); // ✅ close dropdown
  };

  const [open, setOpen] = useState(false);

  const resetTags = () => {
    setTempSelectedTags(['All']);
    setSelectedTags(['All']);
  };

  // Filter blogs by category + search term entered by user
  const filteredBlogs = blogs
    .filter((blog) =>
      selectedTags.includes('All') ? true : selectedTags.includes(blog?.category?.name)
    )
    .filter((blog) => blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs.length) return <div>No Blogs Found</div>;

  const isTagSelected = !selectedTags.includes('All');

  return (
    <div className="flex flex-col gap-4">
      {/* 🔥 FLEX PARENT: Search (child 1) + Dropdown (child 2) */}
      <div className="flex justify-between gap-4 p-4">
        {/* 🔍 CHILD 1 — Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tsk-primary-dark" />
          <input
            type="text"
            placeholder="Search blog titles…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tsk-primary-dark"
          />
        </div>

        {/* 🔽 CHILD 2 — Dropdown Filter */}
        <div className={`rounded-lg ${isTagSelected ? 'bg-tsk-primary-light-2' : 'bg-white'}`}>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                className={`w-full justify-center ${open ? 'bg-tsk-primary-light-2' : ''}`}
              >
                Categories
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-96 p-2 text-center flex flex-col items-center gap-2  max-h-96 overflow-y-auto bg-white border border-tsk-primary-dark rounded-xl"
            >
              {TAGS.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={tempSelectedTags.includes(tag)}
                  onCheckedChange={(value) => handleDropdownToggle(tag, value)}
                  onSelect={(e) => e.preventDefault()} // ⬅ prevents closing
                  className="w-full flex justify-center items-center text-center text-tsk-primary-dark font-medium rounded-xl
    focus:outline-none focus:ring-0 outline-none ring-0
    data-[state=checked]:bg-tsk-light-2 
    data-[state=checked]:border-none[&>svg]:hidden
  "
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}

              <div className="flex justify-between items-center mt-2 pt-2 w-full">
                <Button variant="secondary" onClick={resetTags}>
                  Reset
                </Button>
                <Button onClick={applyTags}>Apply</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Pagination */}
      <Pagination blogs={filteredBlogs} />
    </div>
  );
}

export default TagSelector;
