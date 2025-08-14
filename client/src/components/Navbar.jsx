import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/auth-context";

const Navbar = () => {
const navigate = useNavigate();
const { isAuthenticated, token,logout } = useAuth()

const logoutHandler = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate('/login');
    } catch (error) {
      console.log("Something went wrong.", error);
    }
}

  return (
  <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo və ya Home linki */}
        <div>
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
        </div>

        {/* Menyu */}
        <ul className="flex gap-6 text-white text-lg font-medium">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/sign-up"
                  className="hover:text-yellow-300 transition duration-200"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-yellow-300 transition duration-200"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/users"
                  className="hover:text-yellow-300 transition duration-200"
                >
                  Users
                </Link>
              </li>
              {/* Əlavə olaraq Logout və ya Profile də əlavə edə bilərsən */}
              <li>
                <button
                  onClick={logoutHandler}
                  className="hover:text-yellow-300 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
