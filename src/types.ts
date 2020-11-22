export interface Product {
  id: number;
  name: string;
  brand?: string;
  price: number;
  priceBeforeTax: number;
  photo: string;
  stock: number;
  category: string;
  categoryId: number;
  subCategory: string;
  subCategoryId: number;
  description: string | null;
}

export interface ShopCartItem extends Product {
  quantity: number;
}

export interface CreateOrderParams {
  products: { id: number; quantity: number }[];
  kind: number;
  token: string;
}

export interface UserCredendials {
  email: string;
  password: string;
}

export interface User {
  email?: string;
  id?: number;
  token?: string;
  name?: string;
  morada?: string;
  nif?: string;
  telefone?: string;
}

export interface ProductParams {
  featured?: boolean;
  category?: number;
  subCategory?: number;
  page?: number;
  perPage?: number;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories?: SubCategory[];
}
