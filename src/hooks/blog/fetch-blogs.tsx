import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/constants';
// import { baseURL } from '@/api/constants';
import { fetchBlogs } from '@/utils';

//this is a query that fetches all the available blogposts

const getAvailableBlogs = async () => {
  const response = await fetchBlogs();
  return response.data;
};

export const useFetchBlogs = () => {
  return useQuery({
    queryKey: [queryKeys.blogs],
    staleTime: 300000,
    queryFn: getAvailableBlogs,
  });
};
