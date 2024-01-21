import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddReviewPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userID: "", // This should probably be retrieved from the user's session or state
    tradespersonID: "",
    rating: 0,
    comment: "",
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate(-1); // Go back to the previous page
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        {/* Create form fields for userID, tradespersonID, rating, comment, and date */}
        {/* ... */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewPage;
