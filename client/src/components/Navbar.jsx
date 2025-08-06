// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <div>
//       <ul>
//          <li>
//             <Link to="/home">Home</Link>
//           </li>
//           <li>
//             <Link to="/users">Users</Link>
//           </li>
//           {/* <li>
//             <Link to="/login">Login</Link>
//           </li> */}
//       </ul>
//     </div>
//   )
// }

// export default Navbar


import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hooks/useAuth';
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { logout } = useAuth()
const { isAuthenticated, token } = useSelector((state) => state.auth);

const logoutHandler = async () => {
    try {
      await axios.post
    } catch (error) {
      
    }
}

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex gap-6 text-white text-lg font-medium">
        <li>
          <Link
            to="/home"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="hover:text-yellow-300 transition duration-200"
          >
            Users
          </Link>
        </li>
        {/* <li>
          <Link
            to="/login"
            className="hover:text-yellow-300 transition duration-200"
          >
            Login
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
