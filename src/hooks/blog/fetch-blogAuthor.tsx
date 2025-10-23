import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/constants';
import { fetchBlogAuthor } from '@/utils';

const getBlogAuthor = async (authorId: string) => {
  const response = await fetchBlogAuthor(authorId);
  return response.data;
};

export const useFetchBlogAuthor = (authorId: string, currentBlogId: string) => {
  return useQuery({
    queryKey: [queryKeys.blogAuthor, currentBlogId],
    queryFn: () => getBlogAuthor(authorId),
    // ⬇️ disabled as long as the authorId is empty to prevent a bad API request
    enabled: !!authorId,
    staleTime: 300000,
  });
};
