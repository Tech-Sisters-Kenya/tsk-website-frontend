'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogsLayout from './BlogsLayout';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { BlogItem } from './interface';

function Pagination({ blogs }: { blogs: BlogItem[] }) {
  const { isLoading, error } = useFetchBlogs();

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    if (selected !== itemOffset) {
      setItemOffset(selected);
    }
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!blogs.length) return <div>No Blogs Found</div>;

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
            itemOffset + itemsPerPage >= blogs.length
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
