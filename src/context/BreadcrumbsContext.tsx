import React, { useState, createContext, useContext } from 'react';

export interface Breadcrumbs {
  linkedBreadcrumbs: { name: string; path: string }[];
  activeBreadcrumb: string;
}

type BreadcrumbsContext = {
  breadcrumbs: Breadcrumbs;
  setBreadcrumbs: (value?: Breadcrumbs) => void;
};

export const BreadcrumbsStore = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs>();

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};

export const BreadcrumbsContext = createContext<any | null>(null);

export const useBreadcrumbsContext = (): BreadcrumbsContext => {
  const store = useContext(BreadcrumbsContext);

  if (!store) {
    throw new Error(
      'Cannot use `useBreadcrumbsContext` outside of a BreadcrumbsProvider'
    );
  }

  return store;
};

const BreadcrumbsProvider = (children: any) => {
  return (
    <BreadcrumbsContext.Provider value={BreadcrumbsStore()} {...children} />
  );
};

export default BreadcrumbsProvider;
