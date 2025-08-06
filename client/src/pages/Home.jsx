// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const Home = ({setUser}) => {
// const navigate = useNavigate();
// const { user } = useAuth();
//   return (
//     <div>
//       Welcome <span>{user.name}</span>
//        <button  onClick={()=>{
//       navigate("/");
//       setUser(false); 
//       sessionStorage.removeItem("token")
//     }}
//     >
//       Logout
//       </button>
//     </div>
//   )
// }

// export default Home

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = ({ setUser }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-blue-600">{user.name}</span>!
        </h1>
        <button
          onClick={() => {
            navigate('/');
            setUser(false);
            sessionStorage.removeItem('token');
          }}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
