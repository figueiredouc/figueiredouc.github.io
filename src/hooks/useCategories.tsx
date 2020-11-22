import { useMemo } from 'react';
import { useQuery } from 'react-query';
import api from 'api';
import { Category } from 'types';

type Hook = () => {
  categories?: Category[];
  isLoadingCategories: boolean;
};

type HookKey = string;

const useCategories: Hook = () => {
  const { data, isFetching } = useQuery<Category, HookKey>(
    ['categories'],
    api.getCategories,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      retry: 0,
    }
  );

  return useMemo(() => {
    if (!data)
      return {
        categories: [],
        isLoadingCategories: isFetching,
      };

    return {
      categories: data.subCategories,
      isLoadingCategories: isFetching,
    };
  }, [data, isFetching]);
};

export default useCategories;
