'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import BlogsLayout from './BlogsLayout';

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

  const handlePageChange = ({ selected: pageNumber }: { selected: number }): void => {
    const newOffset = pageNumber * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <BlogsLayout items={currentItems} />
      <ReactPaginate
        breakLabel="..."
        breakClassName="text-xl font-bold text-tsk-primary-dark"
        nextLabel="next"
        previousLabel="previous"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center gap-4 "
        pageClassName="border-2 border-tsk-primary-dark py-2 px-4 rounded-xl text-tsk-primary-dark"
        activeClassName="bg-tsk-primary text-tsk-light-2 py-2 px-4 rounded-xl"
        previousClassName={
          itemOffset === 0
            ? 'hidden'
            : 'border-2 border-tsk-primary-dark py-2 px-4 rounded-xl text-tsk-primary-dark'
        }
        nextClassName={
          itemOffset + itemsPerPage >= sampleItems.length
            ? 'hidden'
            : 'border-2 border-tsk-primary-dark py-2 px-4 rounded-xl text-tsk-primary-dark'
        }
      />
    </>
  );
}

export default Pagination;
