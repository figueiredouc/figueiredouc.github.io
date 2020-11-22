import React, { useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  Container,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import isEmpty from 'lodash/isEmpty';
import AppPage from 'components/shared/AppPage';
import { useBreadcrumbsContext } from 'context/BreadcrumbsContext';
import { useShopCartContext } from 'context/ShopCartContext';
import { useUnmountEffect, useProduct } from 'hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'inherit',
      flexGrow: 1,
      paddingTop: theme.spacing(10),
      paddingLeft: 0,
      paddingRight: 0,
      '& .MuiButton-root': {
        backgroundColor: '#CCCCCC',
      },
      '& .MuiButton-root:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
      '& .MuiIconButton-root': {
        color: '#CCCCCC',
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
      },
      '& .MuiIconButton-root:hover': {
        color: fade('#660000', 0.3),
      },
    },
    productInfo: {
      padding: theme.spacing(2),
    },
    productName: {
      color: '#033860',
    },
    productBrand: {
      textTransform: 'uppercase',
      fontSize: '1rem',
    },
    productDescription: {
      paddingTop: theme.spacing(2),
    },
    quantityBtns: {
      display: 'flex',
    },
    quantityLabel: {
      paddingTop: theme.spacing(0.5),
    },
  })
);

const ProductDetails = () => {
  const classes = useStyles();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { shopCart, handleCart } = useShopCartContext();

  const match = useRouteMatch<{ id: string }>();

  const productId = match && match.params && match.params.id;
  const { product, isLoadingProduct } = useProduct({ id: productId });

  const findProductOnCart = useMemo(
    () =>
      shopCart.filter((item) => {
        return Number(item.id) === Number(productId);
      }),
    [shopCart, productId]
  );

  const [productOnCart] = findProductOnCart;

  useEffect(
    () => {
      if (!product) return;

      setBreadcrumbs({
        linkedBreadcrumbs: [
          { name: product.category, path: '/products' },
          { name: product.subCategory, path: '/products' },
        ],
        activeBreadcrumb: product.name,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
  );

  useUnmountEffect(() => setBreadcrumbs());

  return (
    <AppPage>
      <>
        {isLoadingProduct ? (
          <CircularProgress />
        ) : (
          product && (
            <Container className={classes.root}>
              <Grid container direction="row">
                <Grid item sm={4}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    spacing={4}
                  >
                    <Grid item>
                      <img
                        alt="complex"
                        height="250"
                        src={product.photo}
                        width="250"
                      />
                    </Grid>
                    {productOnCart?.quantity ? (
                      <Grid item className={classes.quantityBtns}>
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          size="small"
                          onClick={() => handleCart(product, 'remove')}
                        >
                          <RemoveCircleOutlineIcon fontSize="large" />
                        </IconButton>
                        <Typography
                          className={classes.quantityLabel}
                          variant="h5"
                        >
                          {productOnCart.quantity}
                        </Typography>
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          size="small"
                          onClick={() => handleCart(product, 'add')}
                        >
                          <ControlPointIcon fontSize="large" />
                        </IconButton>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Button
                          startIcon={<AddShoppingCartIcon />}
                          variant="outlined"
                          onClick={() => handleCart(product, 'remove')}
                        >
                          Adicionar ao carrinho
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <Grid item sm={8}>
                  <Grid
                    container
                    className={classes.productInfo}
                    direction="row"
                  >
                    <Grid item sm={10}>
                      <Typography className={classes.productName} variant="h4">
                        {product.name}
                      </Typography>
                      <Typography className={classes.productBrand} variant="h6">
                        {product.brand}
                      </Typography>
                      <Typography
                        className={classes.productDescription}
                        color="textSecondary"
                        variant="body1"
                      >
                        {isEmpty(product.description) ? (
                          ''
                        ) : (
                          <>
                            <strong>Descrição: </strong> {product.description}
                          </>
                        )}
                      </Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Typography gutterBottom variant="h6">
                        {product.price}€
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          )
        )}
      </>
    </AppPage>
  );
};

export default ProductDetails;
