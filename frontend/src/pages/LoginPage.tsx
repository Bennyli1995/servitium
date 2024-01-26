import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <img src={logo} alt="Logo" className="h-44 w-auto mb-4" />
      <h1 className="mb-4 text-2xl font-bold">
        Please login to find home services near you
      </h1>
      <p className="mb-8">
        If you don't already have an account, click join below!
      </p>
      <button
        className="bg-yellow-500 text-white font-bold py-4 px-6 rounded mb-2"
        onClick={() => loginWithRedirect()}
      >
        Join
      </button>
    </div>
  );
};

export default LoginPage;
