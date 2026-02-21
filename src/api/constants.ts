// API Configuration using environment variables
export const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.techsisterskenya.org/api';
export const authBaseURL =
  process.env.NEXT_PUBLIC_API_AUTH_URL || 'https://api.techsisterskenya.org/auth';

export const endpoints = {
  /*Note that for endpoints which require the id to be passed in, we cant have the id in the endpoint as is. we need to have a function that takes in the id as a parameter then passes it to the actual url */
  getComment: (id: string) => `${baseURL}/blogs/comments/${id}`,
  updateComment: (id: string) => `${baseURL}/blogs/comments/${id}`,
  addComment: (id: string) => `${baseURL}/blogs/comments/${id}`,
  deleteComment: (id: string) => `${baseURL}/blogs/comments/${id}`,
  listComments: (blog_id: string) => `${baseURL}/blogs/${blog_id}/comments`,
  getBlogs: `${baseURL}/blogs`,
  createBlog: `${baseURL}/blogs`,
  getSingleBlog: (id: string) => `${baseURL}/blogs/${id}`,
  getBlogAuthor: (authorId: string) => `${baseURL}/blogs/author/${authorId}`,
  updateBlog: (id: string) => `${baseURL}/blogs/${id}`,
  deleteBlog: (id: string) => `${baseURL}/blogs/${id}`,
  publishBlog: (id: string) => `${baseURL}/blogs/${id}/publish`,
  unpublishBlog: (id: string) => `${baseURL}/blogs/${id}/unpublish`,
  registerTechSister: `${baseURL}/auth/register/tech-sister`,
  registerPartner: `${baseURL}/auth/register/partner`,
  registerSponsor: `${baseURL}/auth/register/sponsor`,
  getCategories: `${baseURL}/blog-categories`,
};

//these are queryKeys for the query functions
export const queryKeys = {
  blogs: ['blogs'],
  singleBlog: ['blog'],
  blogAuthor: ['blogAuthor'],
  categories: ['categories'],
};
