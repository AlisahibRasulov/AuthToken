import { useEffect} from "react";
import { Navigate, useLocation, RouterProvider, createBrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users/Users";
import Signup from "./pages/Signup";
import useRefreshToken from "./hooks/useRefreshToken";
import Layout from "./components/Layout";
import { STATUS } from "./utils/utils";
import Loading from "./components/Loading";
import { useAuth } from "./contexts/auth-context";

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

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: (
            <OnlyLoggedIn redirectTo="/login">
              <Home/>
            </OnlyLoggedIn>
          )
        },
      {
          path: "login",
          element: (
            <OnlyGuests redirectTo="/">
              <Login/>
            </OnlyGuests>
          )
        },
        {
          path: "sign-up",
          element: (
            <OnlyGuests redirectTo="/">
              <Signup/>
            </OnlyGuests>
          )
        },
        {
          path: "users",
          element: (
            <OnlyLoggedIn redirectTo="/login">
              <Users/>
            </OnlyLoggedIn>
          )
        },
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
       <Toaster />
    </div>
  );
}
const OnlyLoggedIn = ({ children, redirectTo })=>{
const { isAuthenticated,status } = useAuth();
const location = useLocation();

if(status === STATUS.PENDING) return <Loading/>;

return isAuthenticated ? (
  children
) : (
  <Navigate to={redirectTo} state={{from:location}}/>
);
};

const OnlyGuests = ({children, redirectTo}) => {
const { isAuthenticated,status } = useAuth();
const location = useLocation();

if(status === STATUS.PENDING) return <Loading/>

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
