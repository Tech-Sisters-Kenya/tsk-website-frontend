import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogItem {
  // tags: string[];
  // publishedDate: string;
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
  created_at: string;
  updated_at: string;
}

// format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function BlogCard({ item }: { item: BlogItem }) {
  const { id, title, category, created_at, content, image_url } = item;
  const { name } = category;
  console.log(`this is the image ${image_url}`);

  return (
    <Link href={`/blogs/${id}`}>
      <div className="w-full relative h-[360px]">
        <Image src={image_url} alt={`${title} image`} fill className="object-cover rounded-3xl" />
      </div>
      <div className="mt-8 flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {/* {tags.map((tag, index) => (
            <span
              key={index}
              className="text-black font-body font-medium border border-tsk-primary-dark px-2 py-1 rounded-2xl "
            >
              {tag}
            </span>
          ))} */}
          <span className="text-black font-body font-medium border border-tsk-primary-dark px-2 py-1 rounded-2xl ">
            {name}
          </span>
        </div>
        <span className="text-tsk-primary-dark font-medium font-body">
          {formatDate(created_at)}
        </span>
      </div>
      <h3 className="font-black font-body text-xl mt-8 text-tsk-primary-dark">{title}</h3>
      <p className="text-tsk-primary-dark font-body italic my-4">{content.substring(0, 250)}...</p>
    </Link>
  );
}

export default BlogCard;
