import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import 'app/App.css';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Container,
  Link,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import AppPage from 'components/shared/AppPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'inherit',
      flexGrow: 1,
      paddingTop: theme.spacing(8),
      paddingLeft: 0,
      paddingRight: 0,
      '& .MuiButton-root': {
        backgroundColor: 'transparent',
      },
      '& .MuiButton-root:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
      '& .MuiTypography-subtitle1': {
        padding: theme.spacing(2, 0),
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    name: {
      color: '#033860',
    },
  })
);

const OrderSuccessPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();

  const orderId = match && match.params && match.params.id;

  return (
    <AppPage>
      <Container className={classes.root}>
        <Typography className={classes.name} variant="h5">
          O seu pedido foi efetuado com sucesso!
        </Typography>
        <Typography variant="subtitle1">{`nº da encomenda: ${orderId}`}</Typography>
        <Typography>
          <Link
            color="textSecondary"
            href="#"
            variant="body2"
            onClick={() => history.push('/')}
          >
            Voltar página inicial
          </Link>
        </Typography>
        <Typography>
          <Link
            color="textSecondary"
            href="#"
            variant="body2"
            onClick={() => {
              /* TODO */
            }}
          >
            Ver encomendas
          </Link>
        </Typography>
      </Container>
    </AppPage>
  );
};

export default OrderSuccessPage;
