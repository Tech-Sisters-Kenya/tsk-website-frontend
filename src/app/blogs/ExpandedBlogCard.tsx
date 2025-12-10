import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { BlogItem } from './interface';
import readingDuration from 'reading-duration';
import { Bookmark, Clock, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

// Have the backend team send a longer excerpt to display on this expanded blog card in order to meet the design standards - currently using the EXTRACT field
function ExpandedBlogCard({ item }: { item: BlogItem }) {
  const { slug, title, category, created_at, extract, image_url, content } = item;

  const readingTime = readingDuration(content || '', { emoji: false });

  return (
    <div className="absolute inset-0 scale-110 transition-all duration-300 z-10 p-6 bg-white rounded-3xl shadow-lg lg:w-[604px]">
      <Link
        href={`/blogs/${slug}`}
        data-testid="blog-card"
        className=" rounded-3xl relative transition-all duration-300 "
      >
        <div className="relative overflow-hidden mb-4">
          <h3 className="font-bold font-body text-xl text-tsk-primary-dark">{title}</h3>
          <div className="flex justify-between">
            <div className="flex justify-between gap-4 mt-2">
              <p className="text-[13px]">
                <CalendarDays size={16} className="text-tsk-primary-dark  mr-2 inline" />{' '}
                {formatDate(created_at)}
              </p>
              <p className="text-[13px]">
                {' '}
                <Clock size={16} className="text-tsk-primary-dark  mr-2 inline" /> {readingTime}
              </p>
            </div>
            <span
              key={category.id}
              className="text-white text-[14px] font-medium border border-tsk-primary-dark px-2 py-1 rounded-[10px] top-5 right-5 bg-tsk-primary-dark "
            >
              {category.name}
            </span>
          </div>
        </div>
        <div className="w-full  overflow-hidden">
          {image_url && (
            <Image
              src={image_url}
              alt={`${title} image`}
              width={604}
              height={338}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-3xl"
            />
          )}
        </div>
        {/* added DOMPurify to sanitize the injected HTML */}{' '}
        <p
          className="text-tsk-primary-dark font-body font-medium text-[16px] my-4"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(extract) }}
        />
        <div className="flex justify-between">
          {' '}
          <Button className="h-[58px] text-xl bg-tsk-primary-dark text-white py-[10px] px-5 cursor-pointer hover:bg-white hover:text-tsk-primary-dark border border-tsk-primary-dark rounded-2xl">
            Read Blog
          </Button>
          <Bookmark size={24} className="text-tsk-primary-dark mt-5" />
        </div>
      </Link>
    </div>
  );
}

export default ExpandedBlogCard;
