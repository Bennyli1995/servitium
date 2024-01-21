import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profilePic from "../assets/User.jpeg";
import ImageComponent from "./ImageComponent";

const CategoryPage: React.FC = () => {
  const { categoryLabel } = useParams();
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      setIsLoading(true);
      try {
        // Adjust the URL according to your server configuration
        const response = await fetch(
          `http://localhost:5001/service_workers/${categoryLabel}`
        );
        const data = await response.json();
        const filteredWorkers = data.filter(
          (worker) => worker.trade.toLowerCase() === categoryLabel.toLowerCase()
        );
        setWorkers(filteredWorkers);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
        // Handle any errors here
      }
      setIsLoading(false);
    };

    fetchWorkers();
  }, [categoryLabel]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl text-center font-bold text-gray-800 my-6">
        {categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}
      </h1>
      {/* Iterate over the workers to display them */}
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-600"
        >
          ← Back
        </button>
        {workers.map((worker) => (
          <div
            key={worker.worker_id}
            className="p-4 border rounded-lg shadow-md bg-white"
            onClick={() => navigate(`/worker/${worker.worker_id}`)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <ImageComponent imageUrl={worker.headshot}/>
                {/* <img
                  src={profilePic}
                  alt={`${worker.first_name} ${worker.last_name}`}
                  className="h-12 w-12 rounded-fullx"
                /> */}
              </div>
              {/* <ImageComponent imageUrl={worker.headshot} /> */}
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">
                  {worker.first_name} {worker.last_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {worker.years_exp} years of experience
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <svg
                  className="text-yellow-400 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c-.28-.53-.761-.927-1.349-.927s-1.07.397-1.349.927L5 6.813l-5.051.73c-.588.085-1.049.51-1.2 1.092-.151.581.088 1.181.588 1.474l3.656 3.563-.863 5.037c-.098.57.151 1.139.588 1.474.438.336 1.004.397 1.479.163L10 17.25l4.53 2.381c.475.234 1.04.173 1.479-.163.438-.336.686-.905.588-1.474l-.863-5.037 3.656-3.563c.5-.293.74-.893.588-1.474-.151-.581-.612-1.007-1.2-1.092L15 6.813l-2.351-3.886z" />
                </svg>
                <span className="ml-1">{worker.rating}</span>
              </div>
              <div className="text-lg">
                <span className="text-gray-900 font-medium">
                  ${worker.rate}
                </span>
                <span className="text-gray-600">/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
