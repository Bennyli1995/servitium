import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import profilePicture from "../assets/User.jpeg";
import logo from "../assets/Logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-600 py-4 shadow-lg text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center">
            <img src={logo} alt="Servitium" className="h-12 w-12" />
          </Link>
        </div>

        <SearchBar />

        {/* Profile section */}
        <div className="relative">
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
            >
              Log In / Sign Up
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-white"
              >
                <img
                  src={user?.picture || profilePicture}
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 text-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
