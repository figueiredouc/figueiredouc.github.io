import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      outline: 'none',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #B80C09',
      borderColor: '#B80C09',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 6, 3),
    },
    root: {
      display: 'flex',
      marginTop: theme.spacing(2),
    },
    sideText: {
      marginLeft: theme.spacing(2),
    },
    signUnButton: {
      marginTop: theme.spacing(2),
      backgroundColor: fade('#660000', 0.2),
      '&:hover': {
        backgroundColor: fade('#660000', 0.3),
      },
    },
    registerLink: {
      marginLeft: theme.spacing(0.5),
    },
  })
);

interface State {
  password: string;
  showPassword: boolean;
}

type ChangeType = React.ChangeEvent<HTMLInputElement>;

type Props = {
  openSignInModal: boolean;
  setOpenSignInModal: (value: boolean) => void;
  handleOpenRegister: () => void;
};

const SignUpModal: React.FC<Props> = ({
  openSignInModal,
  handleOpenRegister,
  setOpenSignInModal,
}) => {
  const classes = useStyles();
  const { getLoggedUser, loggedUser, isLoadingUser } = useAuthContext();

  const [email, setEmail] = useState<string>();

  const [passwordValues, setPasswordValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
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

  useEffect(() => {
    if (!loggedUser) return;

    setOpenSignInModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, loggedUser]);

  const handleSignIn = () => {
    if (!email || !passwordValues.password) return null;

    return getLoggedUser({
      email,
      password: passwordValues.password,
    });
  };

  return (
    <>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        className={classes.modal}
        open={openSignInModal}
        onClose={() => setOpenSignInModal(false)}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Iniciar Sessão</h2>
          <FormControl className={classes.root}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={(e: ChangeType) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.root}>
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
              onChange={handleChange('password')}
            />
          </FormControl>
          <Typography>
            <Link
              color="textSecondary"
              href="#"
              variant="caption"
              onClick={handleOpenRegister}
            >
              Esqueceu-se da password?
            </Link>
          </Typography>
          <Typography className={classes.root} variant="body2">
            Ainda nao tem conta?
            <Link
              className={classes.registerLink}
              href="#"
              onClick={handleOpenRegister}
            >
              Registe-se aqui!
            </Link>
          </Typography>
          <FormControl className={classes.root}>
            <Button
              className={classes.signUnButton}
              variant="outlined"
              onClick={() => handleSignIn()}
            >
              Iniciar Sessão
            </Button>
          </FormControl>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
