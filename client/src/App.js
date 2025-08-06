// import { useEffect, useState } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Users from "./pages/Users";
// import Navbar from "./components/Navbar";
// import Signup from "./pages/Signup";

// function App() {
//    const [user, setUser] = useState(null);
//    useEffect(()=>{
//    const token = sessionStorage.getItem("token") 
//    setUser(token)
//    },[user])
//   return (
//     <div className="App">
//       {/* <Navbar/> */}
//       <Routes>
//         <Route path="/sign-up" element={<Signup />} />
//         <Route path="/" element={user ? <Navigate to="/home"/>:<Login setUser={setUser} />} />
//         <Route path="/home" element={user ? <Home setUser={setUser}/> : <Navigate to="/" />} />
//         <Route path="/users" element={<Users />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { Route, Routes, Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";
import useRefreshToken from "./hooks/useRefreshToken";

function App() {
  const [user, setUser] = useState(null);
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


  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   setUser(token);
  // }, []);

  const router = createBrowserRouter([
    {
      element
    }
  ])

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
        <Route path="/home" element={user ? <Home setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
