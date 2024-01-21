import React from "react";

// Make sure to destructure the review object to extract the properties
const ReviewItem = ({ review }) => {
  const { name, date, comment } = review; // Destructure the expected properties

  // Function to format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow space-x-4 mb-4">
      <div className="font-bold">{name}</div>
      <div className="text-sm text-gray-500">{formatDate(date)}</div>
      <p className="text-gray-700 mt-1">{comment}</p>
    </div>
  );
};

export default ReviewItem;
