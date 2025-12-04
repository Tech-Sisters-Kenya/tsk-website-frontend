import React, { useState, useEffect } from 'react';
import { Heart, MoreVertical, Edit2, Trash2, CircleUserIcon } from 'lucide-react';
import BookmarkLike from './BookmarkLike';
import Chats from '@/assets/chats.svg';
import Image from 'next/image';

const API_BASE = 'https://api.techsisterskenya.org/api/blogs';

// Types
interface ApiComment {
  id: string;
  comment: string;
  author: string;
  parent_id: string | null;
  created_at: string;
  replies: ApiComment[];
  likes_count?: number;
  liked?: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
  isOwn?: boolean;
  isEdited?: boolean;
}

interface CommentsProps {
  blogId: string;
  currentUserId?: string;
}

// Utility: Transform API response to component format
const transformComment = (apiComment: ApiComment, currentUserId?: string): Comment => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return {
    id: apiComment.id,
    author: apiComment.author,
    avatar: `https://i.pravatar.cc/150?u=${apiComment.author}`,
    content: apiComment.comment,
    date: formatDate(apiComment.created_at),
    likes: parseInt(String(apiComment.likes_count || '0')),
    liked: apiComment.liked || false,
    replies: apiComment.replies?.map((r) => transformComment(r, currentUserId)),
    isOwn: currentUserId ? apiComment.author === currentUserId : false,
  };
};

// API Functions
const api = {
  getComments: async (blogId: string): Promise<Comment[]> => {
    const res = await fetch(`${API_BASE}/${blogId}/comments`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    const data = await res.json();
    return data.data.map((c: ApiComment) => transformComment(c));
  },

  postComment: async (blogId: string, comment: string, parentId?: string): Promise<ApiComment> => {
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blog_id: blogId, comment, parent_id: parentId }),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to post comment');
    const data = await res.json();
    return data.comment;
  },

  updateComment: async (commentId: string, comment: string): Promise<ApiComment> => {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update comment');
    const data = await res.json();
    return data.comment;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete comment');
  },

  likeComment: async (commentId: string): Promise<{ liked: boolean; likes_count: string }> => {
    const res = await fetch(`${API_BASE}/comments/${commentId}/like`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to like comment');
    const data = await res.json();
    return data.data;
  },

  unlikeComment: async (commentId: string): Promise<{ liked: boolean; likes_count: string }> => {
    const res = await fetch(`${API_BASE}/comments/${commentId}/like`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to unlike comment');
    const data = await res.json();
    return data.data;
  },
};

const CommentInput: React.FC<{
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  initialValue?: string;
  maxLength?: number;
  isReply?: boolean;
  isLoading?: boolean;
}> = ({
  onSubmit,
  onCancel,
  placeholder = 'Write your thoughts...',
  initialValue = '',
  maxLength = 100,
  isReply = false,
  isLoading = false,
}) => {
  const [content, setContent] = useState(initialValue);
  const [showAuth, setShowAuth] = useState(false);

  const handleSubmit = async () => {
    if (content.trim() && !isLoading) {
      await onSubmit(content);
      setContent('');
    }
  };

  const handleFocus = () => {
    const isLoggedIn = false;
    if (!isLoggedIn && !isReply) {
      setShowAuth(true);
    }
  };

  return (
    <>
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-tsk-light-1 flex items-center justify-center text-white flex-shrink-0">
          <CircleUserIcon size={30} className="text-tsk-primary-dark" />
        </div>
        <div className="flex-1">
          <p className="font-body text-[16px] mb-2 text-tsk-primary-dark font-medium">
            Share your thoughts, another Tech Sister might just need your insights
          </p>
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              placeholder={placeholder}
              maxLength={maxLength}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg p-3 font-body text-[16px] text-tsk-primary-dark focus:outline-none focus:border-tsk-primary-dark resize-none disabled:opacity-50"
              rows={isReply ? 2 : 3}
            />
            <span
              className={`absolute bottom-2 right-3 text-xs ${content.length > maxLength ? 'text-red-500' : 'text-gray-400'}`}
            >
              {content.length}/{maxLength}
            </span>
          </div>
          {content.trim() && (
            <div className="flex gap-3 mt-3 justify-end">
              {onCancel && (
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-6 py-2 font-body text-sm font-medium text-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={content.length > maxLength || isLoading}
                className="px-6 py-2 bg-tsk-primary-dark text-white rounded-full font-body text-sm font-medium disabled:opacity-50"
              >
                {isLoading ? 'Posting...' : initialValue ? 'Update' : 'Publish Comment'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="font-body font-semibold text-2xl text-center mb-6">
              Want to join the conversation?
            </h2>
            <button
              onClick={() => setShowAuth(false)}
              className="w-full bg-tsk-primary-dark text-white py-3 rounded-full font-body font-medium"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowAuth(false)}
              className="w-full mt-3 text-gray-600 py-2 font-body text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const CommentCard: React.FC<{
  comment: Comment;
  blogId: string;
  onReply: (commentId: string, content: string) => Promise<void>;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  isNested?: boolean;
}> = ({ comment, blogId, onReply, onEdit, onDelete, onLike, isNested = false }) => {
  const [showReply, setShowReply] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (content: string) => {
    setIsLoading(true);
    try {
      await onEdit(comment.id, content);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to edit comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (content: string) => {
    setIsLoading(true);
    try {
      await onReply(comment.id, content);
      setShowReply(false);
    } catch (error) {
      console.error('Failed to reply:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isNested ? 'ml-12' : ''}>
      <div className="flex gap-3 mb-4">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-body font-semibold text-sm">{comment.author}</span>
              {comment.isOwn && (
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">You</span>
              )}
            </div>
            {comment.isOwn && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreVertical size={16} />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg py-1 z-10 w-32">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await onDelete(comment.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {comment.date}
            {comment.isEdited && ' (edited)'}
          </p>

          {isEditing ? (
            <div className="mb-3">
              <CommentInput
                onSubmit={handleEdit}
                onCancel={() => setIsEditing(false)}
                initialValue={comment.content}
                maxLength={100}
                placeholder="Edit your comment..."
                isReply
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="bg-tsk-light-1 rounded-lg p-4 mb-3">
              <p className="font-body text-sm leading-relaxed">{comment.content}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button onClick={() => onLike(comment.id)} className="flex items-center gap-1 text-sm">
              <Heart size={16} className={comment.liked ? 'fill-red-500 text-red-500' : ''} />
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-tsk-primary-dark text-sm font-medium"
            >
              Reply
            </button>
          </div>

          {showReply && (
            <div className="mt-4">
              <CommentInput
                onSubmit={handleReply}
                onCancel={() => setShowReply(false)}
                placeholder="Write your reply..."
                maxLength={100}
                isReply
                isLoading={isLoading}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-sm text-gray-600 mb-3"
              >
                {showReplies ? 'Collapse replies' : `Show ${comment.replies.length} replies`}
              </button>
              {showReplies && (
                <div className="space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      blogId={blogId}
                      onReply={onReply}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onLike={onLike}
                      isNested
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Comments: React.FC<CommentsProps> = ({ blogId, currentUserId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const data = await api.getComments(blogId);
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleAddComment = async (content: string) => {
    setIsPostingComment(true);
    try {
      const apiComment = await api.postComment(blogId, content);
      const newComment = transformComment(apiComment, currentUserId);
      setComments([newComment, ...comments]);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsPostingComment(false);
    }
  };

  // Handle replying to comments
  const handleReply = async (commentId: string, content: string) => {
    try {
      const apiComment = await api.postComment(blogId, content, commentId);
      const newReply = transformComment(apiComment, currentUserId);

      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error('Failed to reply:', error);
      throw error;
    }
  };

  // Handle editing comments
  const handleEdit = async (commentId: string, content: string) => {
    try {
      await api.updateComment(commentId, content);

      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content, isEdited: true };
          }
          // Handle nested replies
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId ? { ...reply, content, isEdited: true } : reply
              ),
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error('Failed to edit comment:', error);
      throw error;
    }
  };

  // Deleting comments
  const handleDelete = async (commentId: string) => {
    try {
      await api.deleteComment(commentId);

      setComments(
        comments.filter((comment) => {
          if (comment.id === commentId) return false;
          if (comment.replies) {
            comment.replies = comment.replies.filter((reply) => reply.id !== commentId);
          }
          return true;
        })
      );
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    }
  };

  // Handle liking comments
  const handleLike = async (commentId: string) => {
    try {
      const comment = comments.find((c) => c.id === commentId);
      if (!comment) return;

      const result = comment.liked
        ? await api.unlikeComment(commentId)
        : await api.likeComment(commentId);

      setComments(
        comments.map((c) => {
          if (c.id === commentId) {
            return {
              ...c,
              liked: result.liked,
              likes: parseInt(result.likes_count),
            };
          }
          // Handle nested replies
          if (c.replies) {
            return {
              ...c,
              replies: c.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, liked: result.liked, likes: parseInt(result.likes_count) }
                  : reply
              ),
            };
          }
          return c;
        })
      );
    } catch (error) {
      console.error('Failed to toggle like:', error);
      throw error;
    }
  };

  const handleLoadMore = () => {
    const isLoggedIn = false;
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  if (isLoading) {
    return (
      <div className="lg:mx-20 mx-6 my-5">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tsk-primary-dark"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BookmarkLike />

      <div className="lg:mx-20 mx-6 my-5">
        <div>
          <h1 className="font-medium font-body text-xl">Blog Comments ({comments.length})</h1>
          <hr className="mt-5 border-tsk-primary-dark border-1 w-full" />
        </div>

        <div className="mt-6">
          <CommentInput onSubmit={handleAddComment} isLoading={isPostingComment} />

          {comments.length === 0 ? (
            <p className="font-body font-medium text-tsk-primary-dark my-5">No comments yet.</p>
          ) : (
            <div className="space-y-6">
              {comments.slice(0, visibleCount).map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  blogId={blogId}
                  onReply={handleReply}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onLike={handleLike}
                />
              ))}

              {visibleCount < comments.length && (
                <button
                  onClick={handleLoadMore}
                  className="w-full py-3 text-center font-body text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Load more comments
                </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-tsk-light-2 rounded-2xl p-12 mt-12 text-center">
          <h2 className="font-body font-bold md:text-[32px] text-2xl text-tsk-primary-dark my-10">
            Want to join the conversation?
          </h2>
          <div className="mx-auto mb-8 relative flex justify-center items-center">
            <Image
              src={Chats}
              alt="Chats Illustration"
              width={150}
              height={100}
              className="w-2/5 h-2/5"
            />
            <button className="absolute inset-0 m-auto bottom-5 bg-tsk-primary-dark text-white lg:px-12 md:px-8 px-4 sm:py-3 py-1 rounded-2xl font-heading md:font-black font-medium flex items-center justify-center w-fit h-fit lg:text-2xl sm:text-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-tsk-primary-dark bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="font-body font-semibold text-2xl text-center mb-6">
              Want to join the conversation?
            </h2>
            <div className="flex justify-center mb-6">
              <svg width="120" height="80" viewBox="0 0 120 80">
                <path d="M30 60 Q30 40 50 40 Q70 40 70 60" fill="#E9D5F5" opacity="0.6" />
                <path d="M50 60 Q50 30 70 30 Q90 30 90 60" fill="#E9D5F5" opacity="0.8" />
                <path d="M70 60 Q70 40 90 40 Q110 40 110 60" fill="#E9D5F5" opacity="0.6" />
              </svg>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full bg-tsk-primary-dark text-white py-3 rounded-full font-body font-medium"
            >
              Good stuff, I want in!
            </button>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full mt-3 text-gray-600 py-2 font-body text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
