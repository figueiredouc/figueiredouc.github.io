import { useMemo } from 'react';
import { useQuery } from 'react-query';
import api from 'api';
import { Product } from 'types';

interface HookParams {
  id: string;
}

type Hook = (
  params: HookParams
) => {
  product?: Product;
  isLoadingProduct: boolean;
};

type HookKey = string;

const useProduct: Hook = ({ id }) => {
  const { data, isFetching } = useQuery<Product, HookKey>(
    ['product', id],
    api.getProduct,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      retry: 0,
    }
  );

  return useMemo(() => {
    return {
      product: data,
      isLoadingProduct: isFetching,
    };
  }, [data, isFetching]);
};

export default useProduct;
