'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import Button from '@/components/Button';
import { useEditor } from '@tiptap/react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFetchCategories } from '@/hooks/blog/fetch-categories';
import { baseURL } from '@/api/constants';

// --- Tiptap imports (unchanged) ---
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Selection } from '@tiptap/extensions';

import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension';
import { HorizontalRule } from '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';

import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';

interface BlogCategory {
  id: string;
  name: string;
}

const NewBlogpost = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [content] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: blogCategories } = useFetchCategories();

  const { user, token, isAuthenticated } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // redirect unauthorized users before rendering
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login');
      return;
    }
    if (isAuthenticated && !user?.role?.includes('admin')) {
      router.replace('/');
      return;
    }
    setCheckingAuth(false);
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', editor?.getHTML() || '');
    formData.append('category_id', categoryId);
    formData.append('user_id', user?.id || '');
    formData.append('status', 'published');
    formData.append('is_featured', '0');

    if (file) {
      formData.append('image_url', file);
    }

    try {
      //Have a look at the submitted data before you send it to the backend
      console.log('Submitting blog with data:', {
        title,
        content,
        categoryId,
        userId: user?.id,
        file,
      });

      const res = await fetch(`${baseURL}/blogs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        await res.json();
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

  const editor = useEditor({
    // disable immediate rendering to avoid hydration mismatch
    immediatelyRender: false,
    // disable rerendering n every change and only do so when styling changes
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor', // optional, add styling as needed
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    content: `
      <p>Write the content of your post here...</p>
    `,
  });
  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-tsk-primary-dark border-solid mb-6"></div>
        <p className="text-lg font-body text-tsk-primary-dark animate-pulse">
          Checking authorization...
        </p>
      </div>
    );
  }

  // Prevent rendering for unauthorized (in case of fast redirects)
  if (!isAuthenticated || !user?.role?.includes('admin')) {
    return null;
  }

  const categData = blogCategories?.data || [];

  return (
    <section className="w-full pt-24 md:pt-2 text-tsk-primary-dark">
      <div className="flex flex-col justify-center items-center md:px-20 px-10 md:pt-32 md:pb-10">
        <h1 className="md:text-5xl text-3xl font-heading font-extrabold">Add a new Blog Post</h1>
        <div className="my-10 flex flex-col gap-4 border border-tsk-primary-dark p-4 rounded-lg">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            {categData.map((cat: BlogCategory) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

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

          <SimpleEditor editor={editor} />
        </div>

        <Button
          variant="primary"
          className="text-tsk-light-1 font-extrabold text-base sm:text-lg w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-10 md:mb-0"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Blog'}
        </Button>
      </div>
    </section>
  );
};

export default NewBlogpost;
