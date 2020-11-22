import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import size from 'lodash/size';
import { useShopCartContext } from 'context/ShopCartContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    shopCartPrice: { display: 'flex' },
  })
);

type Props = {
  anchorPop: null | HTMLElement;
  setAnchorPop: (value: null | HTMLElement) => void;
};

const PopoverCart: React.FC<Props> = ({ anchorPop, setAnchorPop }) => {
  const classes = useStyles();
  const history = useHistory();
  const id = anchorPop ? 'simple-popover' : undefined;
  const { shopCart, shopCartTotalPrices } = useShopCartContext();

  return (
    <Popover
      anchorEl={anchorPop}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={id}
      open={Boolean(anchorPop)}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={() => setAnchorPop(null)}
    >
      <List className={classes.root}>
        {!size(shopCart) ? (
          <ListItem key="none">
            <ListItemAvatar>
              <Avatar>
                <AddShoppingCartIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Não existem produtos no carrinho" />
          </ListItem>
        ) : (
          <>
            {shopCart.slice(0, 3).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`quantidade: ${item.quantity}`}
                />
              </ListItem>
            ))}
            {size(shopCart) > 3 && (
              <ListItem button>
                <ListItemText primary="Ver mais produtos no carrinho" />
              </ListItem>
            )}
            <ListItem button onClick={() => history.push('/order')}>
              <div className={classes.shopCartPrice}>
                <ListItemText
                  primary="Total"
                  secondary={`${shopCartTotalPrices.totalPrice}€ s/ IVA incluido`}
                />
                <ListItemText secondary="Ver carrinho" />
              </div>
            </ListItem>
          </>
        )}
      </List>
    </Popover>
  );
};

export default PopoverCart;
