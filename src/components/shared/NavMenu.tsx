import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles,
  makeStyles,
  fade,
  withStyles,
} from '@material-ui/core/styles';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PopoverCart from 'components/shared/PopoverCart';
import SearchBar from 'components/shared/SearchBar';
import SignInModal from 'components/shared/SignInModal';
import SignUpModal from 'components/shared/SignUpModal';
import { useAuthContext } from 'context/AuthContext';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    backgroundColor: '#a7acc4',
  },
})((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    elevation={3}
    getContentAnchorEl={null}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: fade('#660000', 0.3),
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) =>
  createStyles({
    flex: {
      display: 'flex',
      '& .MuiList-padding': { padding: 0 },
      '& .MuiButton-root': {
        backgroundColor: fade('#660000', 0.2),
      },
      '& .MuiButton-root:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
    },
    cartBtn: {
      marginRight: theme.spacing(1),
    },
  })
);

const NavMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { loggedUser, logout } = useAuthContext();

  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);

  const [anchorPop, setAnchorPop] = React.useState<null | HTMLElement>(null);

  const handleOpenRegister = () => {
    setOpenSignInModal(false);
    setOpenRegisterModal(true);
  };

  const handleLogout = () => {
    logout();
    setAnchorMenu(null);
    history.push('/');
  };

  return (
    <div className={classes.flex}>
      <SearchBar />
      {!loggedUser ? (
        <Button
          color="inherit"
          startIcon={<AccountCircleIcon />}
          onClick={() => setOpenSignInModal(true)}
        >
          Iniciar Sessão
        </Button>
      ) : (
        <>
          <Button
            className={classes.cartBtn}
            color="inherit"
            startIcon={<ShoppingCart />}
            onClick={(e) => setAnchorPop(e.currentTarget)}
          >
            Carrinho
          </Button>
          <PopoverCart anchorPop={anchorPop} setAnchorPop={setAnchorPop} />
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="inherit"
            startIcon={<AccountCircleIcon />}
            onClick={(e) => setAnchorMenu(e.currentTarget)}
          >
            A minha conta
          </Button>
        </>
      )}
      <StyledMenu
        keepMounted
        anchorEl={anchorMenu}
        id="customized-menu"
        open={Boolean(anchorMenu)}
        onClose={() => setAnchorMenu(null)}
      >
        <StyledMenuItem onClick={() => history.push('/account')}>
          <ListItemText primary="Perfil" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/orders')}>
          <ListItemText primary="Encomendas" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleLogout()}>
          <ListItemText primary="Terminar sessão" />
        </StyledMenuItem>
      </StyledMenu>
      <SignInModal
        handleOpenRegister={handleOpenRegister}
        openSignInModal={openSignInModal}
        setOpenSignInModal={setOpenSignInModal}
      />
      <SignUpModal open={openRegisterModal} setOpen={setOpenRegisterModal} />
    </div>
  );
};

export default NavMenu;
