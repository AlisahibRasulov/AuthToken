// import React from 'react'
import * as React from 'react';
import PropTypes from 'prop-types';

import { STATUS } from '../utils/utils';

const initialState = {
  user: {},
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: STATUS.PENDING,
};

const AuthContext = React.createContext({
    ...initialState,
    login:(user = {},token = "", expiresAt = "") => {},
    logout: () => {},
    updateUser: () => {},
    setAuthStatus: () => {},    
})

const authReducer = (action, state) => {
  switch (action.type) {
    case "login": {
    return{
      user: action.payload.user,
      token: action.payload.token,
      expiresAt: action.payload.expiresAt,
      isAuthenticated: true,
      tokenChecking: false,
      status: STATUS.SUCCEEDED,
    };
    }
    case "logout": {
      return{
        ...initialState,
        status: STATUS.IDLE,
      };
    }
    case "updateUser": {
      return{
        ...state,
        user: action.payload.user,
      };
    }
    case "status": {
      return{
        ...state,
        status: action.payload.status,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

