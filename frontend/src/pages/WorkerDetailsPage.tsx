import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import profilePic from "../assets/User.jpeg";

// needs to change based on backend later
import mockData from "../Fakers/fakeServiceWorkers";

const WorkerDetails: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const worker = mockData.find((w) => `${w.worker_id}` === workerId);

  if (!worker) {
    return <div>Worker not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-gray-600 mb-4"
      >
        ← Back
      </button>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="p-8">
            <div className="text-center mb-4">
              <img
                className="w-24 h-24 rounded-full mx-auto"
                src={profilePic}
                alt="Worker profile"
              />
              <h1 className="text-xl font-bold mt-2">
                {worker.first_name} {worker.last_name}
              </h1>
              <div className="text-gray-500">
                {worker.years_exp} years of experience
              </div>
              <div className="flex justify-center items-center mt-2">
                <svg
                  className="text-yellow-400 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c-.28-.53-.761-.927-1.349-.927s-1.07.397-1.349.927L5 6.813l-5.051.73c-.588.085-1.049.51-1.2 1.092-.151.581.088 1.181.588 1.474l3.656 3.563-.863 5.037c-.098.57.151 1.139.588 1.474.438.336 1.004.397 1.479.163L10 17.25l4.53 2.381c.475.234 1.04.173 1.479-.163.438-.336.686-.905.588-1.474l-.863-5.037 3.656-3.563c.5-.293.74-.893.588-1.474-.151-.581-.612-1.007-1.2-1.092L15 6.813l-2.351-3.886z" />
                </svg>
                <span className="text-gray-600 font-bold ml-1">
                  {worker.rating}
                </span>
                <span className="text-gray-600 ml-2">${worker.rate}/h</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Description</h2>
                <p className="text-gray-700">{worker.description}</p>
              </div>
              <div className="flex space-x-2 justify-center mt-4">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 justify-center mt-8">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                  Message
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-r">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
