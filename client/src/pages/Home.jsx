import { useAuth } from "../contexts/auth-context";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-blue-600">{user.name}</span>!
        </h1>
      </div>
    </div>
  );
};

export default Home;
