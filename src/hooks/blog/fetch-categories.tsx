import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/constants';
// import { baseURL } from '@/api/constants';
import { fetchCategories } from '@/utils';

//this is a query that fetches all the available blogposts

const getCategories = async () => {
  const response = await fetchCategories();
  return response.data;
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: [queryKeys.categories],
    staleTime: 300000,
    queryFn: getCategories,
  });
};
