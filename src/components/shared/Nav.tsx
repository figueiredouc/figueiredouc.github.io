import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import logo from 'assets/logo.png';
import BurgerMenu from 'components/shared/BurgerMenu';
import NavMenu from 'components/shared/NavMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: { display: 'flex' },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      backgroundColor: '#b7d0ec',
      alignItems: 'center',
    },
    header: {
      height: theme.spacing(10),
      width: '75%',
      justifyContent: 'space-between',
      padding: 0,
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',

      '& > img': {
        paddingTop: theme.spacing(1),
      },
    },
    divider: {
      backgroundColor: '#B80C09',
      width: '88%',
    },
    dividerMargin: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

const Nav = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.header}>
            <div className={classes.logoContainer}>
              <BurgerMenu />
              <img alt="cmai" height="50px" src={logo} />
            </div>
            <NavMenu />
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.dividerMargin}>
        <Divider className={classes.divider} />
      </div>
    </>
  );
};

export default Nav;
