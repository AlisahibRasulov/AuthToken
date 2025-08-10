import React from "react";

const User = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover mb-4"
        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
        alt="User Avatar"
      />
      <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
      <p className="text-gray-600 text-sm mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare
        neque quis purus tempus interdum.
      </p>
    </div>
  );
};

export default User;
