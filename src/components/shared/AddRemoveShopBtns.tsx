import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Product, ShopCartItem } from 'types';

type Props = {
  handleCart: (item: Product | ShopCartItem, op: string) => void;
  item: ShopCartItem;
};

const AddRemoveShopBtns: React.FC<Props> = ({ handleCart, item }) => {
  return (
    <>
      <IconButton
        aria-label="remove"
        component="span"
        size="small"
        onClick={() => handleCart(item, 'remove')}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>

      <Typography variant="subtitle1">{item.quantity}</Typography>
      <IconButton
        aria-label="add"
        component="span"
        size="small"
        onClick={() => handleCart(item, 'add')}
      >
        <ControlPointIcon />
      </IconButton>
    </>
  );
};

export default AddRemoveShopBtns;
