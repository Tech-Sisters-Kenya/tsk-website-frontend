export const mockBlogs = [
  {
    id: 'blog-1',
    title: 'Building a Better Future',
    slug: 'building-better-future',
    extract: 'A summary of our recent event.',
    content: 'Full content here...',
    image_url: 'https://example.com/image.jpg',
    is_featured: true,
    author: {
      id: 'author-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
    category: {
      id: 'cat-tsk-events-recap',
      name: 'TSK Events Recap',
    },
    comments: [
      {
        id: 'comment-1',
        comment: 'Great event!',
        author: 'User1',
        created_at: '2024-01-01',
      },
    ],
    created_at: '2024-01-01',
    updated_at: '2024-01-02',
  },
  {
    id: 'blog-2',
    title: 'Women in Tech',
    slug: 'women-in-tech',
    extract: 'Voices from She Builds',
    content: 'Full content here...',
    image_url: 'https://example.com/image2.jpg',
    is_featured: false,
    author: {
      id: 'author-2',
      name: 'John Doe',
      email: 'john@example.com',
    },
    category: {
      id: 'cat-she-builds',
      name: 'She Builds',
    },
    comments: [],
    created_at: '2024-02-01',
    updated_at: '2024-02-02',
  },
];
