import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // if using react-icons

const ReviewModal = ({ workerName, isOpen, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null); // For hover state on stars
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Leave a review for {workerName}
          </h3>
          <div className="mt-2">
            <div className="flex justify-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      size={24}
                      className="cursor-pointer"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <textarea
              rows="4"
              className="mt-2 px-4 py-2 border rounded-md w-full"
              placeholder="Share details of your own experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="cancel"
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              id="submit"
              className="mx-3 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
              onClick={() => onSubmit({ rating, comment })}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
