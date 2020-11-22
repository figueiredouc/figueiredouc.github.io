import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAuthContext } from 'context/AuthContext';
import { User } from 'types';

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
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
      },
      '& .MuiFormControlLabel-root': {
        marginTop: theme.spacing(2),
      },
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
  })
);

interface Password {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SignUpModal: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const { createUser, loggedUser, isLoadingUser } = useAuthContext();

  const [checkedB, setCheckedB] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<User>();

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
    const newUserDetails: User = { ...userDetails, [name]: e.target.value };

    setUserDetails(newUserDetails);
  };

  const handleSignUp = () => {
    if (
      userDetails &&
      userDetails.email &&
      passwordValues.password &&
      passwordValues.confirmPassword
    )
      createUser({
        email: userDetails.email,
        password: passwordValues.password,
      });
  };

  useEffect(() => {
    if (!loggedUser) return;

    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, loggedUser]);

  return (
    <Modal
      aria-describedby="simple-modal-description"
      aria-labelledby="simple-modal-title"
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={classes.paper}>
        <FormControl className={classes.root}>
          <h2 id="transition-modal-title">Registe-se!</h2>
          <TextField
            fullWidth
            id="name"
            label="Nome/Empresa"
            value={userDetails?.name}
            onChange={(e: ChangeEvent) => handleChange('name', e)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={userDetails?.email}
            onChange={(e: ChangeEvent) => handleChange('email', e)}
          />
          <div>
            <TextField
              id="nif"
              label="NIF"
              value={userDetails?.nif}
              onChange={(e: ChangeEvent) => handleChange('nif', e)}
            />
            <TextField
              className={classes.sideText}
              id="telefone"
              label="Telefone"
              value={userDetails?.telefone}
              onChange={(e: ChangeEvent) => handleChange('telefone', e)}
            />
          </div>
          <TextField
            fullWidth
            id="morada"
            label="Morada"
            value={userDetails?.morada}
            onChange={(e: ChangeEvent) => handleChange('morada', e)}
          />
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
              onChange={handlePasswordChange('password')}
            />
          </FormControl>
          <FormControl className={classes.root}>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedB}
                color="primary"
                name="checkedB"
                onChange={() => setCheckedB(!checkedB)}
              />
            }
            label="Aceito os termos e condições."
          />
          <Button
            className={classes.signUnButton}
            variant="outlined"
            onClick={() => handleSignUp()}
          >
            Criar conta
          </Button>
        </FormControl>
      </div>
    </Modal>
  );
};

export default SignUpModal;
