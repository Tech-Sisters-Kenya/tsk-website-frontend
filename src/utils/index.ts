import { endpoints } from '@/api/constants';
import { axiosInstance } from '@/api/axios';
import { BlogData } from '@/types/blog';
import { useAuthStore } from '@/stores/useAuthStore';

const token = useAuthStore.getState().token;

export const fetchBlogs = () => {
  return axiosInstance.get(endpoints.getBlogs);
};

export const fetchSingleBlog = (blogId: string) => {
  return axiosInstance.get(endpoints.getSingleBlog(blogId));
};

export const sendBlogs = (blogData: BlogData) => {
  //add formdata
  return axiosInstance.post(endpoints.createBlog, blogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchBlogAuthor = (authorId: string) => {
  return axiosInstance.get(endpoints.getBlogAuthor(authorId));
};
