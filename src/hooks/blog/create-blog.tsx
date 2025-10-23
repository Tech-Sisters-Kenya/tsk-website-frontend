import { useMutation } from '@tanstack/react-query';
import { sendBlogs } from '@/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BlogData } from '@/types/blog';

export const useCreateBlog = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (blogData: BlogData) => {
      const response = await sendBlogs(blogData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Blog created successfully!');
      router.push('/blogs');
    },
    onError: () => {
      const errorMessage = 'Failed to create blog';
      toast.error(errorMessage);
    },
  });
};
