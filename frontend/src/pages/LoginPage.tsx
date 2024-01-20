import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home"); // Redirect to home if already authenticated
    } else {
      setLoading(false); // Stop showing the loading indicator
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Simple spinner example using Tailwind CSS */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-2xl font-bold">Make the first move</h1>
      <p className="mb-8">Start meeting new people in your area!</p>
      <button
        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-2"
        onClick={() => loginWithRedirect()}
      >
        Join
      </button>
    </div>
  );
};

export default LoginPage;
