'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import BlogsLayout from './BlogsLayout';

// NB: TO BE REMOVED
// fetch data instead of using dummy data
const sampleItems = [
  {
    id: 1,
    image: '/blog-img1.svg',
    title: 'Blog Title',
    tags: ['Opportunities & Resources', 'Sisterhood & Lifestyle'],
    publishedDate: '2023-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 2,
    image: '/blog-img2.svg',
    title: 'Blog Title',
    tags: ['Career & Growth', 'Event Highlights'],
    publishedDate: '2024-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 3,
    image: '/blog-img3.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 4,
    image: '/blog-img4.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 5,
    image: '/blog-img5.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 6,
    image: '/blog-img2.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 7,
    image: '/blog-img1.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 8,
    image: '/blog-img3.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 9,
    image: '/blog-img4.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 10,
    image: '/blog-img5.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
  {
    id: 11,
    image: '/blog-img5.svg',
    title: 'Blog Title',
    tags: ['Tech Tips & Tutorials', 'Community Stories'],
    publishedDate: '2025-01-01',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, sed! Optio maiores debitis, rem adipisci, soluta reiciendis nostrum dolore quibusdam iure aliquid beatae quae natus!',
  },
];

function Pagination() {
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // fetch data from API instead of using dummy data
  const currentItems = sampleItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sampleItems.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    if (selected !== itemOffset) {
      setItemOffset(selected);
    }
    console.log('selected', selected);
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <BlogsLayout items={currentItems} />
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setItemOffset(0)}
          className={
            itemOffset === 0
              ? 'hidden'
              : 'border-2 border-tsk-primary-dark py-2 px-4 rounded-xl text-tsk-primary-dark'
          }
        >
          First
        </button>

        <ReactPaginate
          breakLabel="..."
          breakClassName="text-xl font-bold text-tsk-primary-dark"
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          forcePage={itemOffset / itemsPerPage}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center gap-4 "
          pageClassName="border-2 border-tsk-primary-dark rounded-xl text-tsk-primary-dark"
          pageLinkClassName="block w-full h-full py-2 px-4"
          activeClassName="bg-tsk-primary text-tsk-light-2 rounded-xl"
          previousClassName="hidden"
          nextClassName="hidden"
        />

        <button
          onClick={() => setItemOffset(itemsPerPage * (pageCount - 1))}
          className={
            itemOffset + itemsPerPage >= sampleItems.length
              ? 'hidden'
              : 'border-2 border-tsk-primary-dark py-2 px-4 rounded-xl text-tsk-primary-dark'
          }
        >
          Last
        </button>
      </div>
    </>
  );
}

export default Pagination;
