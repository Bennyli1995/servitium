import React from "react";
import { useLocation } from "react-router-dom";

const QueryResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">Query Results</h1>
      console.log(results);
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold">{result.name}</h2>
              <p>{result.vicinity}</p>
              {/* Additional result details */}
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
