import { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import { STATUS } from "./utils/utils";
import useRefreshToken from "./hooks/useRefreshToken";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users/Users";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Loading from "./components/Loading";

function App() {
  const { isAuthenticated, expiresAt } = useAuth();

  const refreshAccessToken = useRefreshToken();

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    let refreshAccessTokenTimerId;

    if (isAuthenticated) {
      refreshAccessTokenTimerId = setTimeout(() => {
        refreshAccessToken();
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000);
    }

    return () => {
      if (isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [expiresAt, isAuthenticated, refreshAccessToken]);
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route
          path="/"
          element={
            <OnlyLoggedIn redirectTo="/login">
              <Home />
            </OnlyLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <OnlyGuests redirectTo="/">
              <Login />
            </OnlyGuests>
          }
        />
        <Route
          path="/sign-up"
          element={
            <OnlyGuests redirectTo="/">
              <Signup />
            </OnlyGuests>
          }
        />
        <Route
          path="/users"
          element={
            <OnlyLoggedIn redirectTo="/login">
              <Users />
            </OnlyLoggedIn>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}
const OnlyLoggedIn = ({ children, redirectTo }) => {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  if (status === STATUS.PENDING) return <Loading />;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

const OnlyGuests = ({ children, redirectTo }) => {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  if (status === STATUS.PENDING) return <Loading />;

  return isAuthenticated ? (
    <Navigate to={location.state?.from?.pathname || redirectTo} />
  ) : (
    children
  );
};
OnlyLoggedIn.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
OnlyGuests.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default App;
