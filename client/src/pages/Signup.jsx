// import axios from 'axios'
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [newUser, setNewUser] = useState({
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//     //   confirmPassword: "",
//     })

//     const signUp = async () =>{
//     try{
//         const res = await axios.post("/api/auth/sign-up",newUser);
//         //  const res = await axios.post("https://fakestoreapi.com/users",newUser);

//         console.log(res.status)
//         alert("ugurlu emeliyyat......");
//         navigate("/")
//         sessionStorage.setItem("user",JSON.stringify(res.data))
//     } catch(error) {
//         console.error("Login error:", error);
//     }
//     }

//     const onHandleChange = (e) =>{
//         setNewUser({...newUser, [e.target.name]: e.target.value})
//         console.log(e.target.value)
//     }
//   return (
//     <div>
//       <input type="text" name='name' onChange={onHandleChange}/>
//       <input type="text" name='username' onChange={onHandleChange}/>
//       <input type="text" name='email' onChange={onHandleChange}/>
//       <input type="password" name='password' onChange={onHandleChange}/>
//       {/* <input type="password" name='password' onChange={onHandleChange}/> */}
//       <button onClick={signUp}>SignUp</button>
//         <li>
//         <Link to="/">Login</Link>
//       </li>
//     </div>
//   )
// }

// export default Signup

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";
import { STATUS } from "../utils/utils";
// import { setAuthStatus } from "../redux/authSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, setAuthStatus } = useAuth();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (formData.name.length < 2) newErrors.name = "Minimum 2 characters.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email.";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setAuthStatus(STATUS.PENDING);
      const res = await axios.post("/api/auth/sign-up", formData);
      const { user, token, expiresAt } = res.data;

      login(user, token, expiresAt);
      setAuthStatus(STATUS.SUCCEEDED);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error?.message || "Signup error");
      setAuthStatus(STATUS.FAILED);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Account
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onHandleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={onHandleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onHandleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onHandleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={onHandleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
