import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profilePic from "../assets/User.jpeg";
import ReviewItem from "../components/ReviewItem";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewModal from "../components/ReviewModal";

import ImageComponentRounded from "./ImageComponentRounded";

const WorkerDetails: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated } = useAuth0();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
    date: new Date().toISOString().split("T")[0], // format as 'YYYY-MM-DD'
  });

  const handleReviewSubmit = async (review) => {
    if (isAuthenticated && user) {
      try {
        const response = await fetch("http://localhost:5001/add_review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.sub, // Auth0 user identifier
            tradespersonID: workerId,
            rating: review.rating,
            comment: review.comment,
            date: new Date().toISOString().split("T")[0],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle success, such as closing the form and showing a message
        setIsReviewModalOpen(false);
        // Refresh the reviews or show a success message...
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/service_workers`);
        const workers = await response.json();
        const selectedWorker = workers.find(
          (w) => `${w.worker_id}` === workerId
        );
        if (selectedWorker) {
          // Sort reviews by date from most recent to least recent
          selectedWorker.reviews.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        }
        setWorker(selectedWorker);
      } catch (error) {
        console.error("Failed to fetch worker details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return "No reviews";
    }

    const total = reviews.reduce((acc, review) => {
      const rating = parseFloat(review.rating);
      return acc + (isNaN(rating) ? 0 : rating);
    }, 0);

    return (total / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex justify-center items-center h-screen">
        Worker not found.
      </div>
    );
  }

  const averageRating = calculateAverageRating(worker.reviews || []);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-gray-600"
      >
        ← Back
      </button>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="p-8">
            <div className="text-center mb-4">
            <ImageComponentRounded imageUrl={worker.headshot}/>
              {/* <img
                className="w-24 h-24 rounded-full mx-auto"
                src={profilePic}
                alt="Worker profile"
              /> */}
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
                  {averageRating} / 5
                </span>
                <span className="text-gray-600 ml-3">${worker.rate}/h</span>
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
              {/* Reviews Section */}
              <div className="mt-8 bg-gray-100 p-4 rounded-lg w-full">
                <h2 className="text-lg font-bold mb-4">Reviews</h2>
                {worker.reviews.length > 0 ? (
                  worker.reviews.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                  ))
                ) : (
                  <div>No reviews yet.</div>
                )}
              </div>
              <div className="flex space-x-4 justify-center mt-8">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                  Message
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-r">
                  Book Now
                </button>
                <button
                  className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-r"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Leave a Review
                </button>
                <ReviewModal
                  workerName={worker?.first_name + " " + worker?.last_name}
                  isOpen={isReviewModalOpen}
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setIsReviewModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
