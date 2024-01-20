import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import profilePicture from "../assets/User.jpeg";
import logo from "../assets/Logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout logic goes here");
    // navigate('/signin'); // Uncomment and set to your actual sign-in route
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-600 py-4 shadow-lg text-white">
      <div className="max-w-5xl ml-48 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo and Text */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img
              className="ml-4"
              src={logo}
              alt="Servitium"
              className="h-12 w-12"
            />
          </Link>
        </div>
        <SearchBar />

        {/* Profile Picture and Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-white"
          >
            <img
              src={profilePicture}
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
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
