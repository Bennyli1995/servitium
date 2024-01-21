import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import searchIcon from "../assets/Search.svg";

const SearchBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect to login or show a message if not authenticated
      navigate("/login");
      return;
    }
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
      <input
        type="search"
        className="w-full rounded-full border border-neutral-300 pl-10 pr-4 py-3 text-neutral-700 focus:border-blue-500 focus:ring-0 bg:[#FBB35A]"
        placeholder="Describe your problem and we will do the rest!"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={!isAuthenticated} // Disable input if not authenticated
      />
      <button
        className="absolute inset-y-0 left-0 flex items-center pl-3"
        type="submit"
        disabled={!isAuthenticated} // Disable button if not authenticated
      >
        <img
          src={searchIcon}
          alt="Search icon"
          className={`h-5 w-5 ${
            isAuthenticated ? "text-gray-500" : "text-gray-300"
          }`}
        />
      </button>
    </form>
  );
};

export default SearchBar;
