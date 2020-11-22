import React from 'react';
import { Route } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

type Props = {
  component: any;
  hasAccess: boolean;
  exact?: boolean;
  path: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    warningMessage: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
  })
);

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  hasAccess = false,
  exact = false,
  path = '/',
}) => {
  const classes = useStyles();

  const renderedComponent = () =>
    hasAccess ? (
      <Component />
    ) : (
      <div className={classes.warningMessage}>
        <WarningIcon />
        <Typography className={classes.warningMessage} variant="body2">
          Por favor inicie sessão!
        </Typography>
      </div>
    );

  return <Route component={renderedComponent} exact={exact} path={path} />;
};

export default PrivateRoute;
