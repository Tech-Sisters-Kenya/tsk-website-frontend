'use client';

import React, { useState } from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import Button from '@/components/Button';
import { useEditor } from '@tiptap/react';

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { useCreateBlog } from '@/hooks/blog/create-blog';
import { toast } from 'sonner';

const blogCategories = [
  {
    id: '1',
    name: 'Technology',
  },
  {
    id: '2',
    name: 'Community',
  },
  {
    id: '3',
    name: 'Events',
  },
  {
    id: '4',
    name: 'Mentorship',
  },
];

const NewBlogpost = () => {
  const { mutate: createBlog } = useCreateBlog();
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      <h1>Post Title</h1>
      <p>Write your introduction here...</p>
      <h2>Main Content</h2>
      <p>Write the main content here...</p>
    `,
  });

  const handleBlogSubmit = () => {
    if (!editor) return;

    console.log('submit before content');

    const content = editor?.getHTML();
    if (!content || content.trim() === '') {
      toast.error('Content cannot be empty.');
      return;
    }

    createBlog({
      title: 'Post Title',
      content: content,
      image_url: imageUrl,
      status: 'published',
      category_id: Number(categoryId),
      user_id: 1, // Replace with actual user ID,
      isFeatured: true,
    });

    console.log(`this is the content: ${content}`);
  };

  return (
    <section className="w-full pt-24 md:pt-2">
      <div className="flex flex-col justify-center items-center md:px-20 px-10  md:pt-32 md:pb-10">
        <div className="my-10 flex flex-col gap-4 border border-tsk-primary-dark p-4 rounded-lg">
          <h1 className="md:text-5xl text-3xl font-heading font-extrabold ">Add a new blogpost</h1>

          {/* To capture the category id and the header image url */}
          <Select onValueChange={setCategoryId} value={categoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select blog category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-tsk-primary-dark">
              {blogCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* enter the header image url: */}

          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />

          <SimpleEditor editor={editor} />
        </div>
        <Button
          variant="primary"
          className="text-tsk-light-1 font-extrabold text-base sm:text-lg w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-10 md:mb-0"
          onClick={handleBlogSubmit}
        >
          Submit Blogpost
        </Button>
      </div>
    </section>
  );
};
export default NewBlogpost;
