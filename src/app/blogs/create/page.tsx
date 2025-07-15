'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { useAuthStore } from '@/stores/useAuthStore';

export default function CreateBlogPost() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [content, setContent] = useState('<p class="paragraph">Start typing here...</p>');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const { user, token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    if (!user?.role?.includes('admin')) {
      setUnauthorized(true);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/blog-categories');
        const result = await res.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, [user, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', categoryId);
    formData.append('user_id', user?.id || '');
    formData.append('status', 'published');
    formData.append('is_featured', '0'); // 0 = false, 1 = true

    if (file) {
      formData.append('image_url', file);
    }

    try {
      console.log('Submitting blog with data:', {
        title,
        content,
        categoryId,
        userId: user?.id,
        file,
      });

      const res = await fetch('http://127.0.0.1:8000/api/blogs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      if (res.ok) {
        const data = await res.json();
        console.log('Success response:', data);
        alert('Blog created!');
        router.push('/blogs');
      } else {
        const err = await res.json();
        console.error('Server error:', err);
        alert('Failed to create blog.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error submitting blog.');
    }
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-20 pt-32 pb-10 bg-white font-body">
      <h1 className="font-heading text-4xl font-extrabold mb-10 text-[var(--tsk-primary-dark)]">
        Write a New Blog Post
      </h1>

      {unauthorized ? (
        <div className="w-full flex items-center justify-center text-center">
          <div className="bg-red-50 border border-red-200 text-red-800 p-8 rounded-xl shadow-sm max-w-md">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>
              You do not have permission to write blogs on this site. Please contact your
              administrator.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-10">
          <div className="flex flex-col col-span-5 md:col-span-4 gap-6">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ borderColor: 'var(--tsk-primary)' }}
              className="border p-4 rounded-xl font-body focus:outline-none focus:ring-[var(--tsk-primary)]"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
              style={{ borderColor: 'var(--tsk-primary)' }}
              className="border p-4 rounded-xl font-body focus:outline-none focus:ring-[var(--tsk-primary)]"
            />

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{ borderColor: 'var(--tsk-primary)' }}
              className="border p-4 rounded-xl font-body focus:outline-none focus:ring-[var(--tsk-primary)]"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div
              style={{ borderColor: 'var(--tsk-primary)' }}
              className="border rounded-xl p-4 overflow-y-auto max-h-[400px] ProseMirror selection:bg-purple-100"
            >
              <div className="font-body">
                <SimpleEditor content={content} onChange={setContent} />
              </div>
            </div>

            <Button type="submit" className="mt-4 w-fit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Blog'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
