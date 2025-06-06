import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BlogItem } from './interface';

// format date
// const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return new Intl.DateTimeFormat('en-GB', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   }).format(date);
// };

function BlogCard({ item }: { item: BlogItem }) {
  // author not set in designs
  const { id, title, category, content, image_url } = item;

  if (!image_url) return null;

  return (
    <Link href={`/blogs/${id}`}>
      <div className="w-full relative h-[360px]">
        {/* image url fix */}
        <Image
          src={'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
          alt={`${title} image`}
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="mt-8 flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {typeof category === 'object' &&
            category.map((tag, index) => (
              <span
                key={index}
                className="text-black font-body font-medium border border-tsk-primary-dark px-2 py-1 rounded-2xl "
              >
                {tag}
              </span>
            ))}
          {typeof category === 'string' && (
            <span className="text-black font-body font-medium border border-tsk-primary-dark px-2 py-1 rounded-2xl">
              {category}
            </span>
          )}
        </div>
        <span className="text-tsk-primary-dark font-medium font-body">
          {/* {formatDate(publishedDate)} */}
        </span>
      </div>
      <h3 className="font-black font-body text-xl mt-8 text-tsk-primary-dark">{title}</h3>
      <p className="text-tsk-primary-dark font-body italic my-4">{content.substring(0, 250)}...</p>
    </Link>
  );
}

export default BlogCard;
