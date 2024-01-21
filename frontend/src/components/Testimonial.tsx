import React from "react";
import TestimonialProfile from "../assets/TestimonialProfile.png";

type TestimonialProps = {
  quote: string;
  author: string;
};

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, photo }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mx-8 flex flex-col items-center text-center">
      <div className="text-blue-600 text-4xl leading-tight mb-4">&ldquo;</div>
      <p className="text-lg sm:text-xl mb-6">"{quote}"</p>
      <img
        src={photo}
        alt={author}
        className="mb-4 h-16 w-16 rounded-full"
      />
      <h5 className="text-lg font-bold">{author}</h5>
    </div>
  );
};

export default Testimonial;
