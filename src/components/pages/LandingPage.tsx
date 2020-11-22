import React from 'react';
import 'app/App.css';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import AppPage from 'components/shared/AppPage';
import ProductsList from 'components/shared/ProductsList';
import { useProducts } from 'hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(3),
    },
    divider: {
      backgroundColor: '#B80C09',
    },
    label: {
      color: '#033860',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing(3),
    },
  })
);

const LandingPage = () => {
  const classes = useStyles();

  const { productsWithShopCart, isLoadingProducts } = useProducts({
    featured: true,
  });

  return (
    <AppPage showCarousel>
      {isLoadingProducts ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.content}>
          <Typography className={classes.label} variant="h4">
            Destaques
          </Typography>
          <Divider className={classes.divider} />
          <ProductsList featured products={productsWithShopCart} />
        </div>
      )}
    </AppPage>
  );
};

export default LandingPage;
