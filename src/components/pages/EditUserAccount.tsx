import 'app/App.css';

import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Container,
  Divider,
  Button,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    sideText: {
      marginLeft: theme.spacing(2),
    },
    saveButton: {
      marginTop: theme.spacing(2),
      backgroundColor: fade('#660000', 0.2),
      '&:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
    },
    rootForm: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
      },
      '& .MuiFormControlLabel-root': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Password {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const EditUserAccount = () => {
  const classes = useStyles();

  const [userDetails, setUserDetails] = useState(loggedUser);

  const [passwordValues, setPasswordValues] = useState<Password>({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handlePasswordChange = (prop: keyof Password) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showConfirmPassword: !passwordValues.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (name: string, e: ChangeEvent) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };

  return (
    <AppPage>
      <Container className={classes.root}>
        <div className={classes.infoUser}>
          <Typography className={classes.name} variant="h5">
            {loggedUser.name}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <FormControl className={classes.rootForm}>
          <TextField
            fullWidth
            id="name"
            label="Nome/Empresa"
            value={userDetails.name}
            onChange={(e: ChangeEvent) => handleChange('name', e)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={userDetails.email}
            onChange={(e: ChangeEvent) => handleChange('email', e)}
          />
          <div>
            <TextField
              id="nif"
              label="NIF"
              value={userDetails.nif}
              onChange={(e: ChangeEvent) => handleChange('nif', e)}
            />
            <TextField
              className={classes.sideText}
              id="telefone"
              label="Telefone"
              value={userDetails.telefone}
              onChange={(e: ChangeEvent) => handleChange('telefone', e)}
            />
          </div>
          <TextField
            fullWidth
            id="morada"
            label="Morada"
            value={userDetails.morada}
            onChange={(e: ChangeEvent) => handleChange('morada', e)}
          />
          <FormControl className={classes.rootForm}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordValues.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              id="standard-adornment-password"
              type={passwordValues.showPassword ? 'text' : 'password'}
              value={passwordValues.password}
              onChange={handlePasswordChange('password')}
            />
          </FormControl>
          <FormControl className={classes.rootForm}>
            <InputLabel htmlFor="standard-adornment-confirm-password">
              Confirmar Password
            </InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {passwordValues.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              id="standard-adornment-confirme-password"
              type={passwordValues.showConfirmPassword ? 'text' : 'password'}
              value={passwordValues.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
            />
          </FormControl>
          <Button
            className={classes.saveButton}
            variant="outlined"
            onClick={() => {
              /* TODO */
            }}
          >
            Guardar
          </Button>
        </FormControl>
      </Container>
    </AppPage>
  );
};

export default EditUserAccount;
