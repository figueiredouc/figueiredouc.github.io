import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from 'components/shared/ProductCard';
import { ShopCartItem } from 'types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(3),
    },
  })
);

type Props = {
  products: ShopCartItem[];
  featured?: boolean;
  page?: number;
  handlePageChange?: (e: React.ChangeEvent<unknown>, value: number) => void;
};

const ProductsList: React.FC<Props> = ({
  products,
  featured,
  page,
  handlePageChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item lg={3} md={4} sm={6} xs={12}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {!featured && (
        <div className={classes.pagination}>
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
