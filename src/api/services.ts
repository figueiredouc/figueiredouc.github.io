import axiosClient from 'api/client';
import { CreateOrderParams, UserCredendials, ProductParams } from 'types';

export const url = {
  getLoggedUser: '/login',
  createUser: '/users',
  getCategories: '/sub_categories',
  getProducts: '/products',
  getProduct: (id: string) => `/products/${id}`,
  createOrder: () => `/purchases`,
};

export const getLoggedUser = (params: UserCredendials) =>
  axiosClient.post(url.getLoggedUser, params);

export const createUser = (params: UserCredendials) =>
  axiosClient.post(url.createUser, params);

export const getCategories = async () => {
  const { data } = await axiosClient.get(url.getCategories);

  return data;
};

export const getProducts = async (_key: string, params: ProductParams) => {
  const { data } = await axiosClient.get(url.getProducts, { params });

  return data;
};

export const getProduct = async (key: string, id: string) => {
  const { data } = await axiosClient.get(url.getProduct(id));

  return data;
};

export const createOrder = async (params: CreateOrderParams) => {
  const { token } = params;

  const { data } = await axiosClient.post(url.createOrder(), params, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
