'use client';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import BlogsLayout from './BlogsLayout';
import { BlogItem } from './interface';

function Pagination() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);

      try {
        const response = await fetch('https://faux-api.com/api/v1/blog_8047236583693721');

        if (!response.ok) {
          throw new Error('Failed to fetch content. Please try again later.');
        }

        const data = await response.json();
        setBlogs(data.result);
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // fetch data from API instead of using dummy data
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    if (selected !== itemOffset) {
      setItemOffset(selected);
    }
    console.log('selected', selected);
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
