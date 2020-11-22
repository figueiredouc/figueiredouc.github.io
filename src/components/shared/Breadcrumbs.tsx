import React from 'react';
import { useHistory } from 'react-router-dom';
import BreadcrumbsMaterial from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs as BreadcrumbsType } from 'context/BreadcrumbsContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbBar: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      backgroundColor: '#033860',
    },
    breadcrumbItem: {
      color: '#b7d0ec',
      fontWeight: 500,
    },
    breadcrumbSeparator: {
      width: '75%',
      margin: 'auto',
      color: '#B80C09',
      fontWeight: 600,
    },
    activeBreadC: {
      color: '#b7d0ec',
      fontWeight: 800,
    },
  })
);

type Props = {
  breadcrumbs: BreadcrumbsType;
};

const Breadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {breadcrumbs && (
        <div className={classes.breadcrumbBar}>
          <BreadcrumbsMaterial
            aria-label="breadcrumb"
            className={classes.breadcrumbSeparator}
            separator="/"
          >
            {breadcrumbs.linkedBreadcrumbs.map((breadcrumb) => (
              <Link
                key={breadcrumb.name}
                className={classes.breadcrumbItem}
                color="inherit"
                href="/"
                onClick={() => history.push(breadcrumb.path)}
              >
                {breadcrumb.name}
              </Link>
            ))}
            <Typography className={classes.activeBreadC} color="textPrimary">
              {breadcrumbs.activeBreadcrumb}
            </Typography>
          </BreadcrumbsMaterial>
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
