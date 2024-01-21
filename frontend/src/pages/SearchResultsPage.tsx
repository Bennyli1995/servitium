import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import profilePic from "../assets/User.jpeg"; // Update the import path as necessary

const SearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prompt = useParams();
  const query = new URLSearchParams(location.search).get("query");
  const [recommendedWorkers, setRecommendedWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const recResponse: any = await fetch("http://localhost:5001/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        
        let recData: any = await recResponse.json();

        if (isMounted) {
          const recDataResponse = recData.response;
          const workersResponse = await fetch(
            "http://localhost:5001/service_workers"
          );
          const workersData = await workersResponse.json();
          const filteredWorkers = workersData.filter((worker) =>
            recDataResponse.includes(worker.worker_id)
          );
          setRecommendedWorkers(filteredWorkers);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchRecommendations();
    }

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [prompt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recommendedWorkers.length) {
    return <div>No recommendations found for your query.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {recommendedWorkers.map((worker) => (
        <div
          key={worker.worker_id}
          className="p-4 mb-4 border rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg"
          onClick={() => navigate(`/worker/${worker.worker_id}`)}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={worker.headshot || profilePic}
                alt={`${worker.first_name} ${worker.last_name}`}
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate">
                {worker.first_name} {worker.last_name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {worker.years_exp} years of experience
              </p>
            </div>
            <div>
              {/* Star rating and number */}
              <svg
                className="text-yellow-400 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c-.28-.53-.761-.927-1.349-.927s-1.07.397-1.349.927L5 6.813l-5.051.73c-.588.085-1.049.51-1.2 1.092-.151.581.088 1.181.588 1.474l3.656 3.563-.863 5.037c-.098.57.151 1.139.588 1.474.438.336 1.004.397 1.479.163L10 17.25l4.53 2.381c.475.234 1.04.173 1.479-.163.438-.336.686-.905.588-1.474l-.863-5.037 3.656-3.563c.5-.293.74-.893.588-1.474-.151-.581-.612-1.007-1.2-1.092L15 6.813l-2.351-3.886z" />
              </svg>
              <span className="ml-1">
                {worker.reviews.length
                  ? worker.reviews[0].rating
                  : "No Ratings"}
              </span>
            </div>
            <div className="text-lg">
              <span className="text-gray-900 font-medium">${worker.rate}</span>
              <span className="text-gray-600">/h</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
