import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const QueryResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  console.log(results);

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm font-semibold text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold my-4">Query Results</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.slice(0, 6).map((result, index) => (
            <div key={index} className="bg-white p-4 rounded shadow space-y-2">
              <h2 className="font-semibold text-lg">{result.name}</h2>
              <img src={result.icon} alt="Icon" className="w-10 h-10" />
              <p className="text-sm">{result.vicinity}</p>
              {result.business_status && (
                <p className="text-sm">Status: {result.business_status}</p>
              )}
              {result.rating && (
                <p className="text-sm">
                  Rating: {result.rating} ({result.user_ratings_total} reviews)
                </p>
              )}
              {result.opening_hours?.open_now !== undefined && (
                <p className="text-sm">
                  Open Now: {result.opening_hours.open_now ? "Yes" : "No"}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10">No results found.</div>
      )}
    </div>
  );
};

export default QueryResultsPage;
