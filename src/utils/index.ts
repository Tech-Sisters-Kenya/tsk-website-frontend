import { endpoints } from '@/api/constants';
import { axiosInstance } from '@/api/axios';

export const fetchBlogs = () => {
  return axiosInstance.get(endpoints.getBlogs);
};

export const fetchSingleBlog = (blogId: string) => {
  return axiosInstance.get(endpoints.getSingleBlog(blogId));
};
