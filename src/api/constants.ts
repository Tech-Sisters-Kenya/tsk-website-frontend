// #TODO : move to env file. Bridgit to create an env file
export const baseURL = 'https://api.techsisterskenya.org/api';

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
  updateBlog: (id: string) => `${baseURL}/blogs/${id}`,
  deleteBlog: (id: string) => `${baseURL}/blogs/${id}`,
  publishBlog: (id: string) => `${baseURL}/blogs/${id}/publish`,
  unpublishBlog: (id: string) => `${baseURL}/blogs/${id}/unpublish`,
  registerTechSister: `${baseURL}/auth/register/tech-sister`,
};

//these are queryKeys for the query functions
export const queryKeys = {
  blogs: ['blogs'],
  singleBlog: ['blog'],
};
