import { Link } from "react-router-dom";
import React from "react";
import Electrical from "../assets/Electrical.png";
import Insurance from "../assets/Insurance.png";
import Lawning from "../assets/Lawn.png";
import Painting from "../assets/Painting.png";
import Plumbing from "../assets/Plumbing.png";
import Carpentry from "../assets/Carpentry.png";

// Define an enum for category labels
export enum CategoryLabel {
  Electrical = "Electrical",
  Insurance = "Insurance",
  Lawning = "Lawning",
  Painting = "Painting",
  Plumbing = "Plumbing",
  Carpentry = "Carpentry",
}

// Map labels to images
const categoryImages: { [key in CategoryLabel]: string } = {
  [CategoryLabel.Electrical]: Electrical,
  [CategoryLabel.Insurance]: Insurance,
  [CategoryLabel.Lawning]: Lawning,
  [CategoryLabel.Painting]: Painting,
  [CategoryLabel.Plumbing]: Plumbing,
  [CategoryLabel.Carpentry]: Carpentry,
};

type CategoryProps = {
  label: CategoryLabel;
};

const Category: React.FC<CategoryProps> = ({ label }) => {
  // Get the correct image based on the label
  const imageSrc = categoryImages[label];
  const path = `/category/${label.toLowerCase()}`;

  return (
    <Link
      to={path}
      className="flex flex-col items-center p-4 hover:bg-blue-300 rounded-lg cursor-pointer"
    >
      <img src={imageSrc} alt={label} className="mb-2 h-32 w-32" />
      <span className="text-md font-medium">{label}</span>
    </Link>
  );
};

export default Category;
