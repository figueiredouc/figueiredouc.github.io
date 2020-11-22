import React from 'react';
import { Typography, Container, Divider, TableHead } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  fade,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import WarningIcon from '@material-ui/icons/Warning';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import AddRemoveShopBtns from 'components/shared/AddRemoveShopBtns';
import AppPage from 'components/shared/AppPage';
import { useAuthContext } from 'context/AuthContext';
import { useShopCartContext } from 'context/ShopCartContext';
import { useOrder } from 'hooks';

const TAX_RATE = 0.07;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'inherit',
      flexGrow: 1,
      paddingTop: theme.spacing(8),
      paddingLeft: 0,
      paddingRight: 0,
      '& .MuiButton-root': {
        backgroundColor: '#CCCCCC',
        margin: theme.spacing(2),
      },
      '& .MuiButton-root:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
    },
    title: { color: '#033860' },
    divider: { backgroundColor: '#B80C09' },
    item: { display: 'flex' },
    table: { minWidth: 700 },
    addRemoveBtns: { display: 'flex', justifyContent: 'space-evenly' },
    avatarProduct: { display: 'flex', justifyContent: 'center' },
    productDetails: { display: 'flex', alignItems: 'center' },
    productQuantity: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    itemName: { paddingLeft: theme.spacing(2) },
    requestBtns: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    warningMessage: { padding: theme.spacing(2) },
    emptyCart: { display: 'flex', alignItems: 'center' },
  })
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const ccyFormat = (num: number) => `${num.toFixed(2)}`;

const OrderPage = () => {
  const classes = useStyles();
  const { loggedUser } = useAuthContext();
  const { shopCart, handleCart, shopCartTotalPrices } = useShopCartContext();
  const taxes = TAX_RATE * shopCartTotalPrices.totalPrice;
  const { createOrder } = useOrder();

  const handleRequestOrder = (kind: number) => {
    if (loggedUser) {
      const { token } = loggedUser;

      const products = shopCart.map((item) => pick(item, ['id', 'quantity']));

      if (token) createOrder({ kind, products, token });
    }
  };

  return (
    <AppPage>
      <Container className={classes.root}>
        <Typography className={classes.title} variant="h5">
          Encomenda
        </Typography>
        <Divider className={classes.divider} />
        {isEmpty(shopCart) ? (
          <div className={classes.emptyCart}>
            <WarningIcon />
            <Typography className={classes.warningMessage} variant="body2">
              Não existem produtos no carrinho!
            </Typography>
          </div>
        ) : (
          <TableContainer>
            <Table aria-label="spanning table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Detalhes
                  </TableCell>
                  <TableCell align="right">Preço</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Produto</TableCell>
                  <TableCell align="right">Qtd.</TableCell>
                  <TableCell align="right">Unidade</TableCell>
                  <TableCell align="right">Soma</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shopCart.map((item) => (
                  <StyledTableRow key={item.id}>
                    <TableCell>
                      <div className={classes.productDetails}>
                        <Avatar alt={item.name} src={item.photo} />
                        <Typography
                          className={classes.itemName}
                          variant="body2"
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <Typography noWrap color="textSecondary" variant="body2">
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <div className={classes.productQuantity}>
                        <AddRemoveShopBtns
                          handleCart={handleCart}
                          item={item}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(item.price * item.quantity)}
                    </TableCell>
                  </StyledTableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(shopCartTotalPrices.totalPrice)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(taxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {ccyFormat(shopCartTotalPrices.totalPriceBeforeTax)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!isEmpty(shopCart) && (
          <div className={classes.requestBtns}>
            {loggedUser ? (
              <>
                <Button onClick={() => handleRequestOrder(1)}>
                  Pedir orçamento
                </Button>
                <Button onClick={() => handleRequestOrder(2)}>
                  Encomendar
                </Button>
              </>
            ) : (
              <>
                <WarningIcon />
                <Typography className={classes.warningMessage} variant="body2">
                  Por favor inicie sessão para proceder com a encomenda!
                </Typography>
              </>
            )}
          </div>
        )}
      </Container>
    </AppPage>
  );
};

export default OrderPage;
