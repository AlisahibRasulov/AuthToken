// import { useSelector, useDispatch } from "react-redux";
// import { login, logout, updateUser, setAuthStatus } from "../redux/authSlice";

// export const useAuth = () => {
//     const auth = useSelector((state) => state.auth);
//     const dispatch = useDispatch();


//     return{
//     ...auth,
//     login: (user, token, expiresAt) => dispatch(login({user, token, expiresAt})),
//     logout: () => dispatch(logout()),
//     updateUser: (user) => dispatch(updateUser({user})),
//     setAuthStatus: (status) => dispatch(setAuthStatus({status})),
// };
// };

import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { login, logout, updateUser, setAuthStatus } from "../redux/authSlice";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const memoizedLogin = React.useCallback(
    (user, token, expiresAt) => dispatch(login({ user, token, expiresAt })),
    [dispatch]
  );

  const memoizedLogout = React.useCallback(() => dispatch(logout()), [dispatch]);

  const memoizedUpdateUser = React.useCallback(
    (user) => dispatch(updateUser({ user })),
    [dispatch]
  );

  const memoizedSetAuthStatus = React.useCallback(
    (status) => dispatch(setAuthStatus({ status })),
    [dispatch]
  );

  return {
    ...auth,
    login: memoizedLogin,
    logout: memoizedLogout,
    updateUser: memoizedUpdateUser,
    setAuthStatus: memoizedSetAuthStatus,
  };
};


