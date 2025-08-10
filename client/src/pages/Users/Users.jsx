import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import User from "./User/User";

const Users = () => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const axiosUsers = async () => {
      try {
        const res = await axios.get("/api/users/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error(error, "Something went wrong.");
      }
    };
    axiosUsers();
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
