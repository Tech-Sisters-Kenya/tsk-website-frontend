import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/constants';
import { fetchSingleBlog } from '@/utils';

const getSingleBlog = async (blogId: string) => {
  const response = await fetchSingleBlog(blogId);
  return response.data;
};

export const useFetchSingleBlog = (blogId: string) => {
  return useQuery({
    queryKey: [queryKeys.singleBlog, blogId],
    queryFn: () => getSingleBlog(blogId),
    // ⬇️ disabled as long as the blogId is empty
    enabled: !!blogId,
    staleTime: 300000,
  });
};
