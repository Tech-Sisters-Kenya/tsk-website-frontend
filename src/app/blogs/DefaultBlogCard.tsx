import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { BlogItem } from './interface';
import readingDuration from 'reading-duration';
import { ArrowRight } from 'lucide-react';

// format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Unknown date';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid date';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function DefaultBlogCard({ item }: { item: BlogItem }) {
  const { slug, title, category, created_at, extract, image_url, content } = item;

  const readingTime = readingDuration(content || '', { emoji: false });

  return (
    <div className="border border-tsk-primary-dark rounded-3xl w-full ">
      <Link
        href={`/blogs/${slug}`}
        data-testid="blog-card"
        className=" relative transition-all duration-300"
      >
        <div className="w-full relative h-[360px] overflow-hidden">
          {image_url && (
            <Image
              src={image_url}
              alt={`${title} image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-3xl"
            />
          )}
        </div>

        <div className="px-4 pb-6">
          <div className="mt-8 flex justify-between items-center flex-wrap gap-2">
            <span
              key={category.id}
              className="text-white text-[14px] font-medium border border-tsk-primary-dark px-2 py-1 rounded-[10px] absolute top-5 right-5 bg-tsk-primary-dark"
            >
              {category.name}
            </span>
          </div>

          <h3 className="font-bold font-body text-xl text-tsk-primary-dark">{title}</h3>

          <p
            className="text-tsk-primary-dark font-body font-medium text-[16px] my-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(extract),
            }}
          />

          <div className="flex justify-between text-tsk-primary-dark text-[13px] font-body">
            <span>{formatDate(created_at)}</span>
            <span>{readingTime}</span>
          </div>

          <p className="font-semibold text-[15px] p-2 mt-2 cursor-pointer hover:underline">
            Read More <ArrowRight size={18} className="inline" />
          </p>
        </div>
      </Link>
    </div>
  );
}

export default DefaultBlogCard;
