import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import api from 'api';
import { useShopCartContext } from 'context/ShopCartContext';
import { Product, ProductParams, ShopCartItem } from 'types';

type Hook = (
  params?: ProductParams
) => {
  products: Product[];
  productsWithShopCart: ShopCartItem[];
  isLoadingProducts: boolean;
  page: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void;
};

const useProducts: Hook = (
  { featured, category, subCategory } = { featured: false }
) => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const { shopCart } = useShopCartContext();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination({ ...pagination, page: value });
  };

  const { data, isFetching } = useQuery(
    ['products', { featured, category, subCategory, ...pagination }],
    api.getProducts,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      retry: 0,
    }
  );

  return useMemo(() => {
    if (!data)
      return {
        products: [],
        productsWithShopCart: [],
        isLoadingProducts: isFetching,
        page: pagination.page,
        handlePageChange,
      };

    const productsWithShopCart = data.products.map((item: Product) => {
      const shopCartItem = shopCart.find((cartItem) => cartItem.id === item.id);

      if (!shopCartItem) return item;

      return {
        ...item,
        quantity: shopCartItem.quantity,
      };
    });

    return {
      products: data.products,
      productsWithShopCart,
      isLoadingProducts: isFetching,
      page: pagination.page,
      handlePageChange,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, shopCart, pagination]);
};

export default useProducts;
