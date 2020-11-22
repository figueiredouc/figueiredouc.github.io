import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonBase, Button, Typography, Paper, Grid } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import isEmpty from 'lodash/isEmpty';
import AddRemoveShopBtns from 'components/shared/AddRemoveShopBtns';
import { useShopCartContext } from 'context/ShopCartContext';
import { Product } from 'types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiButton-root': {
        backgroundColor: '#CCCCCC',
      },
      '& .MuiButton-root:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
      '& .MuiIconButton-root': {
        color: '#CCCCCC',
      },
      '& .MuiIconButton-root:hover': {
        color: fade('#660000', 0.3),
      },
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 95,
      height: 95,
    },
    img: {
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
    },
    nameButton: {
      width: '100%',
      justifyContent: 'flex-start',
    },
    shopButton: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
    },
    quantityBtns: {
      display: 'flex',
      justifyContent: 'space-evenly',
      paddingTop: theme.spacing(1),
    },
    price: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      paddingTop: theme.spacing(1),
    },
  })
);

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();
  const { shopCart, handleCart } = useShopCartContext();

  const handleViewProductDetails = () => {
    history.push(`/product/${product.id}`);
  };

  const productOnCart = shopCart.find((item) => item.id === product.id);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <ButtonBase
              className={classes.image}
              onClick={handleViewProductDetails}
            >
              <img alt="complex" className={classes.img} src={product.photo} />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid container item xs direction="column" spacing={0}>
          <Grid item xs>
            <ButtonBase
              className={classes.nameButton}
              onClick={handleViewProductDetails}
            >
              <Typography gutterBottom noWrap variant="subtitle1">
                {product.name}
              </Typography>
            </ButtonBase>
            <Typography
              gutterBottom
              noWrap
              color="textSecondary"
              variant="body2"
            >
              {isEmpty(product.description) ? <br /> : product.description}
            </Typography>
          </Grid>
          <Grid item className={classes.price}>
            <Typography color="textSecondary" variant="body2">
              {product.price}€
            </Typography>
          </Grid>
          {productOnCart ? (
            <>
              <Grid item xs className={classes.quantityBtns}>
                <AddRemoveShopBtns
                  handleCart={handleCart}
                  item={productOnCart}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs className={classes.shopButton}>
              <Button
                size="small"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => handleCart(product, 'add')}
              >
                Adicionar
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default ProductCard;
