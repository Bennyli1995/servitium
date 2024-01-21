import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-gray-600"
      >
        ← Back
      </button> */}
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Profile Details
          </h1>
          {isAuthenticated && user ? (
            <div>
              <img
                className="w-32 h-32 mx-auto rounded-full object-cover"
                src={user.picture}
                alt={user.name}
              />
              <div className="text-center mt-4">
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {/* Additional details */}
                <p className="text-sm text-gray-600 mt-2">
                  Nickname: {user.nickname}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">You are not logged in.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
