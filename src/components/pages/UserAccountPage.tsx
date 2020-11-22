import React from 'react';
import { useHistory } from 'react-router-dom';
import 'app/App.css';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Container,
  Divider,
  Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AppPage from 'components/shared/AppPage';
import loggedUser from '__mocks__/loggedUser.json';

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
      '& .MuiTypography-body1': {
        paddingTop: theme.spacing(2),
      },
    },
    name: {
      color: '#033860',
    },
    divider: {
      backgroundColor: '#B80C09',
    },
    infoUser: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

const UserAccountPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppPage>
      <Container className={classes.root}>
        <div className={classes.infoUser}>
          <Typography className={classes.name} variant="h5">
            {loggedUser.name}
          </Typography>
          <Button
            startIcon={<EditIcon />}
            onClick={() => {
              history.push('/account/edit');
            }}
          >
            Editar
          </Button>
        </div>
        <Divider className={classes.divider} />
        <Typography variant="body1">
          <strong>Email: </strong> {loggedUser.email}
        </Typography>
        <Typography variant="body1">
          <strong>NIF: </strong> {loggedUser.nif}
        </Typography>
        <Typography variant="body1">
          <strong>Morada: </strong> {loggedUser.morada}
        </Typography>
        <Typography variant="body1">
          <strong>Telefone: </strong> {loggedUser.telefone}
        </Typography>
      </Container>
    </AppPage>
  );
};

export default UserAccountPage;
