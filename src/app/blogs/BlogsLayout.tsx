import React from 'react';
import BlogCard from './BlogCard';
import clsx from 'clsx';

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  extract: string;
  status: string;
  is_featured: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  //replaced array of tags with the category since tags dont come from the BE
  // tags: string[];
  created_at: string;
  updated_at: string;
}

function BlogsLayout({ items }: { items: BlogItem[] }) {
  const rows = [];
  let idx = 0;

  while (idx < items.length) {
    // Row 1: 2 columns
    const row1 = items.slice(idx, idx + 2);
    if (row1.length > 0) {
      rows.push(
        <div
          key={`row-${idx}-2col`}
          className={
            row1.length === 2
              ? 'grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 mb-8'
              : 'grid grid-cols-1'
          }
        >
          {row1.map((item, id) => (
            <BlogCard key={item.id || id} item={item} />
          ))}
        </div>
      );
    }
    idx += 2;

    // Row 2: 3 columns
    const row2 = items.slice(idx, idx + 3);
    if (row2.length > 0) {
      rows.push(
        <div
          key={`row-${idx}-3col`}
          className={clsx(
            row2.length === 3 && `grid grid-cols-1 md:grid-cols-3 gap-12 mb-8`,
            row2.length === 2 && 'grid grid-cols-1 md:grid-cols-2 gap-12 mb-8',
            row2.length === 1 && 'grid grid-cols-1'
          )}
        >
          {row2.map((item, id) => (
            <BlogCard key={item.id || id} item={item} />
          ))}
        </div>
      );
    }
    idx += 3;

    // Row 3: 2 columns
    const row3 = items.slice(idx, idx + 2);
    if (row3.length > 0) {
      rows.push(
        <div
          key={`row-${idx}-2col`}
          className={
            row3.length === 2
              ? 'grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 mb-8'
              : 'grid grid-cols-1'
          }
        >
          {row3.map((item, id) => (
            <BlogCard key={item.id || id} item={item} />
          ))}
        </div>
      );
    }
    idx += 2;

    // Row 4: 3 columns
    const row4 = items.slice(idx, idx + 3);
    if (row4.length > 0) {
      rows.push(
        <div
          key={`row-${idx}-3col`}
          className={clsx(
            row4.length === 3 && `grid grid-cols-1 md:grid-cols-3 gap-12 mb-8`,
            row4.length === 2 && 'grid grid-cols-1 md:grid-cols-2 gap-12 mb-8',
            row4.length === 1 && 'grid grid-cols-1'
          )}
        >
          {row4.map((item, id) => (
            <BlogCard key={item.id || id} item={item} />
          ))}
        </div>
      );
    }
    idx += 3;
  }

  return <div className="p-4">{rows}</div>;
}
export default BlogsLayout;
