'use client';
import React, { useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';

const BookmarkLike: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex gap-6 lg:mx-20 mx-6 mb-4 text-tsk-primary-dark">
      {/* Likes */}
      <div className="relative group">
        <button onClick={() => setLiked(!liked)} className="cursor-pointer">
          <Heart
            className="text-tsk-primary-dark"
            size={22}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-tsk-light-1 text-tsk-primary-dark text-sm font-medium rounded opacity-0 font-heading group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Like
        </span>
      </div>
      {/* Bookmarks */}
      <div className="relative group">
        <button onClick={() => setBookmarked(!bookmarked)} className="cursor-pointer">
          <Bookmark
            className="text-tsk-primary-dark"
            size={22}
            fill={bookmarked ? 'currentColor' : 'none'}
          />
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-tsk-light-1 text-tsk-primary-dark text-sm font-heading font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Save
        </span>
      </div>
    </div>
  );
};
export default BookmarkLike;
