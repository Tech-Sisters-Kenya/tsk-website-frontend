import React from 'react';
import { BlogItem } from './interface';
import DefaultBlogCard from './DefaultBlogCard';
import ExpandedBlogCard from './ExpandedBlogCard';
import { useState } from 'react';

function BlogCard({ item }: { item: BlogItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative transition-all duration-300"
    >
      {isHovered ? <ExpandedBlogCard item={item} /> : <DefaultBlogCard item={item} />}
    </div>
  );
}

export default BlogCard;
