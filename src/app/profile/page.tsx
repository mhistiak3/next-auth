"use client";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define the type for the user object
interface User {
  username: string;
  email: string;
  isVerified: boolean;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
      router.push("/login");
    }finally{
      setLoading(false);
    } 
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully");
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    getUser();
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {loading ? (
        <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-lg text-center space-y-6">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-lg text-center space-y-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{user?.username || "Guest"}</h2>
            <p className="text-gray-400">
              {user?.email || "No email available"}
            </p>
          </div>

          {/* Verified Badge */}
          {user?.isVerified && (
            <div className="flex items-center justify-center text-green-500 space-x-2">
              <CheckCircle size={20} />
              <span className="text-sm">Verified</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
