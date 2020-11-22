import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppPage from 'components/shared/AppPage';
import ProductsList from 'components/shared/ProductsList';
import { useProducts } from 'hooks';

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const Products = () => {
  const classes = useStyles();
  const match = useRouteMatch<{ categoryId: string; subCategoryId: string }>();
  const category = match && match.params && match.params.categoryId;
  const subCategory = match && match.params && match.params.subCategoryId;

  const {
    page,
    handlePageChange,
    productsWithShopCart,
    isLoadingProducts,
  } = useProducts({
    category: Number(category),
    subCategory: Number(subCategory),
  });

  return (
    <AppPage>
      {isLoadingProducts ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <ProductsList
          handlePageChange={handlePageChange}
          page={page}
          products={productsWithShopCart}
        />
      )}
    </AppPage>
  );
};

export default Products;
