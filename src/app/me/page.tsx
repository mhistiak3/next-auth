import { CheckCircle } from "lucide-react";

const Profile = () => {
  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    isVerified: true,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
        {user.isVerified && (
          <div className="flex items-center justify-center text-green-500 space-x-2">
            <CheckCircle size={20} />
            <span className="text-sm">Verified</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
