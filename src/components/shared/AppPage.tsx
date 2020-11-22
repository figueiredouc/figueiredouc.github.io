import React from 'react';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from 'components/shared/Breadcrumbs';
import Carousel from 'components/shared/Carousel';
import Nav from 'components/shared/Nav';
import { useAuthContext } from 'context/AuthContext';
import { useBreadcrumbsContext } from 'context/BreadcrumbsContext';
import carouselItems from '__mocks__/carousel-items.json';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: 'inherit',
      width: '75%',
      padding: '0',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

type Props = {
  children: React.ReactElement;
  showCarousel?: boolean;
};

const AppPage: React.FC<Props> = ({ children, showCarousel }) => {
  const classes = useStyles();
  const { breadcrumbs } = useBreadcrumbsContext();
  const { isLoadingUser } = useAuthContext();

  return (
    <>
      {isLoadingUser ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Nav />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {showCarousel ? <Carousel items={carouselItems} /> : <></>}
          <Container className={classes.container}>{children}</Container>
        </>
      )}
    </>
  );
};

export default AppPage;
