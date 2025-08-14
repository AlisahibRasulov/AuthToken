// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({setUser}) => {
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({
//     username: "",
//     password: "",
//   });

//   const login = async () => {
//     try {
//       // const res = await axios.post("http://localhost:3009/login", loginData);
//       const res = await axios.post("/api/auth/login", loginData);
//       // const res = await axios.post("https://fakestoreapi.com/auth/login", loginData);
//       console.log(res)
//       // alert("her sey bombadi qaqa!");
//       if(res.status == 200){
//         navigate("/home");
//         setUser(true)
//         alert("ugurlu emeliyyat");
//         sessionStorage.getItem("user")
//       }
//       sessionStorage.setItem("token",res.data.token)
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("istifadeci adi ve ya sifre yanlishdir")
//     }
//   };
//   const onHandleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };
//   return (
//     <div>
//       <h1>Login</h1>
//       <input type="text" name="username" onChange={onHandleChange} />
//       <input type="password" name="password" onChange={onHandleChange} />
//       <button onClick={login}>Login</button>
//       <li>
//         <Link to="/sign-up">SignUp</Link>
//       </li>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { STATUS } from "../utils/utils";
import { useAuth } from "../contexts/auth-context";
import toast from "react-hot-toast";


const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { login, setAuthStatus } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim())
      newErrors.username = "This field is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setAuthStatus(STATUS.PENDING);
      const res = await axios.post("/api/auth/login", formData);
      const { user, token, expiresAt } = res.data;
      login(user, token, expiresAt);
      setAuthStatus(STATUS.SUCCEEDED);
      navigate("/home");
      toast.success('Uğurlu əməliyyat!');

    } catch (error) {
      setAuthStatus(STATUS.PENDING);
      toast.error(error.response.data.error.message);   
      setAuthStatus(STATUS.FAILED);  
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
