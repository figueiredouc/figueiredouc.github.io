import React, { createContext, useContext, useReducer, useMemo } from 'react';
import api from 'api';
import isString from 'lodash/isString';
import { User, UserCredendials } from 'types';

type IState = {
  loggedUser?: User | null;
  isLoadingUser: boolean;
};

type AuthContext = {
  loggedUser: User | null;
  getLoggedUser: (params: UserCredendials) => Promise<void>;
  createUser: (params: UserCredendials) => Promise<void>;
  isLoadingUser: boolean;
  logout: () => void;
};

const reducer = (
  state: IState,
  action: { type: string; payload?: { data: User } }
) => {
  const { payload } = action;

  switch (action.type) {
    case 'GET_USER_START':
      return {
        isLoadingUser: true,
      };
    case 'GET_USER_SUCCESS':
      return {
        loggedUser: payload?.data,
        isLoadingUser: false,
      };
    case 'REMOVE_USER':
      return { loggedUser: null, isLoadingUser: false };
    case 'GET_USER_ERROR':
      return { loggedUser: null, isLoadingUser: false };
    default:
      return state;
  }
};

export const getInitValue = (): User | null => {
  try {
    const sessionStorageValue = localStorage.getItem('user');

    if (!isString(sessionStorageValue)) {
      localStorage.setItem('user', JSON.stringify(null));

      return null;
    }

    return JSON.parse(sessionStorageValue);
  } catch {
    return null;
  }
};

export const AuthStore = () => {
  const initialState = {
    loggedUser: getInitValue(),
    isLoadingUser: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getLoggedUser = async (params: UserCredendials) => {
    dispatch({ type: 'GET_USER_START' });

    try {
      const { data } = await api.getLoggedUser(params);

      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err,
      });
    }
  };

  const createUser = async (params: UserCredendials) => {
    dispatch({ type: 'GET_USER_START' });

    try {
      const { data } = await api.createUser(params);

      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err,
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'REMOVE_USER' });

    try {
      const serializedState = JSON.stringify(null);

      localStorage.setItem('user', serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useMemo(() => {
    try {
      const serializedState = JSON.stringify(state.loggedUser);

      localStorage.setItem('user', serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedUser]);

  return {
    isLoadingUser: state.isLoadingUser,
    loggedUser: state.loggedUser,
    getLoggedUser,
    createUser,
    logout,
  };
};

export const AuthContext = createContext<any | null>(null);

export const useAuthContext = (): AuthContext => {
  const store = useContext(AuthContext);

  if (!store) {
    throw new Error('Cannot use `useAuthContext` outside of a AuthProvider');
  }

  return store;
};

const AuthProvider = (children: any) => {
  return <AuthContext.Provider value={AuthStore()} {...children} />;
};

export default AuthProvider;
