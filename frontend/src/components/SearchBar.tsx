import React from "react";
import searchIcon from "../assets/search.svg"; // Make sure the path to your search icon is correct

const SearchBar: React.FC = () => {
  return (
    <div className="flex-1 max-w-lg relative">
      <input
        type="search"
        className="w-full rounded-full border border-neutral-300 pl-10 pr-4 py-3 text-neutral-700 focus:border-blue-500 focus:ring-0"
        placeholder="Search for services that you require..."
        aria-label="Search"
      />
      <button
        className="absolute inset-y-0 left-0 flex items-center pl-3"
        type="button"
      >
        <img
          src={searchIcon}
          alt="Search icon"
          className="h-5 w-5 text-gray-500"
        />
      </button>
    </div>
  );
};

export default SearchBar;
