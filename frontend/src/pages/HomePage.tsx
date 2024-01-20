import React from "react";
import Category from "../components/Category";
import One from "../assets/One.png";
import Two from "../assets/Two.png";
import Three from "../assets/Three.png";
import Testimonial from "../components/Testimonial";

const categories = [
  { label: "Electrical" },
  { label: "Plumbing" },
  { label: "Lawning" },
  { label: "Carpentry" },
  { label: "Insurance" },
  { label: "Painting" },
];

const testimonials = [
  {
    quote:
      "NavCare made it easy for me to find someone to fix my porch. Highly recommend!",
    author: "Jane Doe",
  },
  {
    quote:
      "NavCare is different in that you get instantaneous responses, nothing else like it!",
    author: "John Doe",
  },
  {
    quote:
      "NavCare made it easy for me to find someone to fix my phone in under an hour. Best app ever!",
    author: "Josh Smith ",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Section for categories */}
      <h2 className="text-4xl font-bold text-center mt-12 mb-10 text-gray-800">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-6 rounded-lg shadow-md">
        {categories.map((category) => (
          <Category key={category.label} label={category.label} />
        ))}
      </div>

      {/* How It Works section */}
      <section className="my-16">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-12 text-gray-800">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 items-stretch">
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={One} alt="Step 1" className="mb-4 h-24 w-24" />
              <h4 className="text-xl sm:text-2xl font-semibold">
                Step 1: Choose a Service
              </h4>
              <p className="text-lg sm:text-xl">
                Select from a wide range of services suited to your needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={Two} alt="Step 2" className="mb-4 h-24 w-24" />
              <h4 className="text-xl sm:text-2xl font-semibold">
                Step 2: Book Online
              </h4>
              <p className="text-lg sm:text-xl">
                Easily book a service worker with just a few clicks.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={Three} alt="Step 3" className="mb-4 h-24 w-24" />
              <h4 className="text-xl sm:text-2xl font-semibold">
                Step 3: Get It Done
              </h4>
              <p className="text-lg sm:text-xl">
                Relax while a professional takes care of the task at hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-16 rounded-lg shadow-md">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Users Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              profilePic={testimonial.profilePic}
              companyLogo={testimonial.companyLogo}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
