'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import Button from '@/components/Button';
import { useEditor } from '@tiptap/react';
import { useAuthStore } from '@/stores/useAuthStore';

// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Selection } from '@tiptap/extensions';

// --- Tiptap Node ---
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension';
import { HorizontalRule } from '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-node/image-node/image-node.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';

// --- Styles ---
import '@/components/tiptap-templates/simple/simple-editor.scss';

const NewBlogpost = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [content] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    if (!user?.role?.includes('admin')) {
      console.log('Current user token:', token);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch('https://api.techsisterskenya.org/api/blog-categories');
        const result = await res.json();
        setCategories(result.data || []);
        console.log(result.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, [user, isAuthenticated, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append('title', title);
    //Set the content to be updated to be the value of editor once the form is submitted. No other pre-processing is needed. The data it gives is already formatted to html
    formData.append('content', editor?.getHTML() || '');
    formData.append('category_id', categoryId);
    formData.append('user_id', user?.id || '');
    formData.append('status', 'published');
    formData.append('is_featured', '0'); // 0 = false, 1 = true

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
      /**
       * A sample console log output should look lie this in order for the request to be successful
       * Submitting blog with data: 
            {title: 'Dolore sit ipsum ab', content: '<p class="paragraph">Start typing here...</p>', categoryId: '0197f0cb-d060-737f-b7e4-e976af9da905', userId: '0197f0ca-e8a4-73fa-9d1a-c62dac3bf844', file: File}
            categoryId
            : 
            "0197f0cb-d060-737f-b7e4-e976af9da905"
            content
            : 
            "<p class=\"paragraph\">Start typing here...</p>"
            file
            : 
            File {name: 'Logo.png', lastModified: 1723116813000, lastModifiedDate: Thu Aug 08 2024 14:33:33 GMT+0300 (East Africa Time), webkitRelativePath: '', size: 141207, …}
            title
            : 
            "Dolore sit ipsum ab"
            userId
            : 
            "0197f0ca-e8a4-73fa-9d1a-c62dac3bf844"
            [[Prototype]]
            : 
            Object
       */

      const res = await fetch('https://api.techsisterskenya.org/api/blogs', {
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

  // instantiate the editor and pass it as a prop to SimpleEditor
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

  return (
    <section className="w-full pt-24 md:pt-2">
      <div className="flex flex-col justify-center items-center md:px-20 px-10  md:pt-32 md:pb-10">
        <h1 className="md:text-5xl text-3xl font-heading font-extrabold ">Add a new Blog Post</h1>
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
            {categories.map((cat) => (
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
