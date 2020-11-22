/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // 4.0.0
import { render } from '@testing-library/react';
import { AuthContext, AuthStore } from 'context/AuthContext';
import {
  BreadcrumbsContext,
  BreadcrumbsStore,
} from 'context/BreadcrumbsContext';
import { ShopCartContext, ShopCartStore } from 'context/ShopCartContext';
import {
  linkedBreadcrumbs as defaultLinkedB,
  activeBreadcrumb as defaultActiveB,
} from '__mocks__/breadcrumbs';
import { shopCart as defaultShopCart } from '__mocks__/products';

export const defaultStore = {
  AuthStore,
  ShopCartStore,
  BreadcrumbsStore,
};

const customRender = (ui: any, { store = defaultStore, ...options } = {}) => {
  const CombinedProviders = ({ children }: any) => {
    return (
      <AuthContext.Provider value={store.AuthStore()}>
        <ShopCartContext.Provider value={store.ShopCartStore()}>
          <BreadcrumbsContext.Provider value={store.BreadcrumbsStore()}>
            <MemoryRouter>{children}</MemoryRouter>
          </BreadcrumbsContext.Provider>
        </ShopCartContext.Provider>
      </AuthContext.Provider>
    );
  };

  return render(ui, { wrapper: CombinedProviders, ...options });
};

export const customStore = ({
  isLoadingAuthStore = false,
  getLoggedUser = jest.fn(),
  createUser = jest.fn(),
  loggedUser = { user: 'xpto', id: 1, token: '123' },
  shopCart = defaultShopCart,
  shopCartTotalPrices = {
    totalPrice: '20',
    totalPriceBeforeTax: '40',
  },
  linkedBreadcrumbs = defaultLinkedB,
  activeBreadcrumb = defaultActiveB,
  useDefaultAuthStore = false,
  useDefaultShopCartStore = false,
  useDefaultBreadcrumbsStore = false,
} = {}) => {
  const newAuthStore = () => ({
    isLoadingUser: isLoadingAuthStore,
    getLoggedUser,
    loggedUser,
    createUser,
  });

  const newShopCartStore = () => ({
    shopCart,
    shopCartTotalPrices,
  });

  const newBreadcrumbsStore = () => ({
    linkedBreadcrumbs,
    activeBreadcrumb,
  });

  return {
    ...defaultStore,
    AuthStore: useDefaultAuthStore ? defaultStore.AuthStore : newAuthStore,
    ShopCartStore: useDefaultShopCartStore
      ? defaultStore.ShopCartStore
      : newShopCartStore,
    BreadcrumbsStore: useDefaultBreadcrumbsStore
      ? defaultStore.BreadcrumbsStore
      : newBreadcrumbsStore,
  };
};

export * from '@testing-library/react';
export { customRender as render };
