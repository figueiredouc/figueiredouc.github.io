import React, { useMemo, createContext, useContext, useReducer } from 'react';
import isString from 'lodash/isString';
import { Product, ShopCartItem } from 'types';

interface ShopCartPrice {
  totalPrice: number;
  totalPriceBeforeTax: number;
}

type IState = {
  shopCartTotalPrices: ShopCartPrice;
  shopCart: ShopCartItem[];
};

type ShopCartContext = {
  shopCartTotalPrices: ShopCartPrice;
  shopCart: ShopCartItem[];
  handleCart: (item: Product | ShopCartItem, operation: string) => void;
};

const handleAddToCart = (shopCart: ShopCartItem[], newProduct: Product) => {
  const productToAdd = shopCart.find((item) => item.id === newProduct.id);

  if (!productToAdd) return [...shopCart, { ...newProduct, quantity: 1 }];

  const newShopCart = shopCart.map((item) => {
    if (item.id === newProduct.id)
      return {
        ...item,
        quantity: item.quantity ? item.quantity + 1 : 1,
      };

    return item;
  });

  return newShopCart;
};

const handleRemoveFromCart = (shopCart: ShopCartItem[], product: Product) => {
  const productId = product.id;
  const productToRemove = shopCart.find((item) => item.id === productId);

  if (productToRemove?.quantity && productToRemove.quantity > 1) {
    const newShopCart = shopCart.map((item) => {
      if (item.id === productId)
        return { ...item, quantity: item.quantity ? item.quantity - 1 : 0 };

      return item;
    });

    return newShopCart;
  }

  const newShopCart = shopCart.filter((item) => item.id !== productId);

  return newShopCart;
};

const reducer = (state: IState, action: { type: string; payload: Product }) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        shopCart: handleAddToCart(state.shopCart, payload),
        shopCartTotalPrices: {
          totalPrice: state.shopCartTotalPrices.totalPrice + payload.price,
          totalPriceBeforeTax:
            state.shopCartTotalPrices.totalPriceBeforeTax +
            payload.priceBeforeTax,
        },
      };
    case 'REMOVE_FROM_CART':
      return {
        shopCart: handleRemoveFromCart(state.shopCart, payload),
        shopCartTotalPrices: {
          totalPrice: state.shopCartTotalPrices.totalPrice - payload.price,
          totalPriceBeforeTax:
            state.shopCartTotalPrices.totalPriceBeforeTax -
            payload.priceBeforeTax,
        },
      };
    default:
      return state;
  }
};

const getInitValue = (): ShopCartItem[] => {
  try {
    const sessionStorageValue = localStorage.getItem('cart');

    if (!isString(sessionStorageValue)) {
      localStorage.setItem('cart', JSON.stringify([]));

      return [];
    }

    return JSON.parse(sessionStorageValue);
  } catch {
    return [];
  }
};

const getTotalPrices = (shopCart: ShopCartItem[]) =>
  shopCart.reduce(
    (acc, item) => {
      return {
        totalPrice: item.price * item?.quantity + acc.totalPrice,
        totalPriceBeforeTax:
          item.priceBeforeTax * item?.quantity + acc.totalPriceBeforeTax,
      };
    },
    { totalPrice: 0, totalPriceBeforeTax: 0 }
  );

export const ShopCartStore = () => {
  const initShopCart = getInitValue();

  const initialState = {
    shopCart: initShopCart,
    shopCartTotalPrices: getTotalPrices(initShopCart),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCart = (product: Product, operation: string) =>
    operation === 'add'
      ? dispatch({ type: 'ADD_TO_CART', payload: product })
      : dispatch({ type: 'REMOVE_FROM_CART', payload: product });

  useMemo(() => {
    if (!state) localStorage.setItem('cart', JSON.stringify([]));

    try {
      const serializedState = JSON.stringify(state.shopCart);

      localStorage.setItem('cart', serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    shopCart: state.shopCart,
    shopCartTotalPrices: state.shopCartTotalPrices,
    handleCart,
  };
};

export const ShopCartContext = createContext<any | null>(null);

export const useShopCartContext = (): ShopCartContext => {
  const store = useContext(ShopCartContext);

  if (!store) {
    throw new Error(
      'Cannot use `useShopCartContext` outside of a ShopCartProvider'
    );
  }

  return store;
};

const ShopCartProvider = (children: any) => {
  return <ShopCartContext.Provider value={ShopCartStore()} {...children} />;
};

export default ShopCartProvider;
