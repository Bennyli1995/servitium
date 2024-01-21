// SearchResultsPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:5001/recommend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: query }),
          });
          const data = await response.json();
          setResults(data); // Assuming the endpoint returns an array of results
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) return <div>Loading...</div>;
  if (!results.length) return <div>No results found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Render your results here */}
      {results.map((result, index) => (
        <div key={index}>{/* Render result */}</div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
