import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import EditUserAccount from 'components/pages/EditUserAccount';
import LandingPage from 'components/pages/LandingPage';
import OrderPage from 'components/pages/OrderPage';
import OrderSuccessPage from 'components/pages/OrderSuccessPage';
import ProductDetails from 'components/pages/ProductDetails';
import Products from 'components/pages/Products';
import UserAccountPage from 'components/pages/UserAccountPage';
import PrivateRoute from 'components/shared/PrivateRoute';
import { useAuthContext } from 'context/AuthContext';

const AppRouter = () => {
  const defaultRoute = '/';
  const { loggedUser } = useAuthContext();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={LandingPage} path="/" />

        <PrivateRoute
          exact
          component={UserAccountPage}
          hasAccess={!isEmpty(loggedUser)}
          path="/account"
        />

        <PrivateRoute
          exact
          component={EditUserAccount}
          hasAccess={!isEmpty(loggedUser)}
          path="/account/edit"
        />

        <Route
          exact
          component={Products}
          path="/products/:categoryId?/:subCategoryId?"
        />

        <Route exact component={ProductDetails} path="/product/:id" />

        <Route exact component={OrderPage} path="/order" />

        <PrivateRoute
          exact
          component={OrderSuccessPage}
          hasAccess={!isEmpty(loggedUser)}
          path="/order/:id"
        />

        <Redirect exact from="/" to={defaultRoute} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
