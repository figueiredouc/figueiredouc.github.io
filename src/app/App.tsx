import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import 'app/App.css';
import AppRouter from 'app/AppRouter';
import defaultTheme from 'assets/Theme';
import Footer from 'components/shared/Footer';
import AuthProvider from 'context/AuthContext';
import BreadcrumbsProvider from 'context/BreadcrumbsContext';
import ShopCartProvider from 'context/ShopCartContext';

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <ShopCartProvider>
          <BreadcrumbsProvider>
            <AppRouter />
          </BreadcrumbsProvider>
        </ShopCartProvider>
      </AuthProvider>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
