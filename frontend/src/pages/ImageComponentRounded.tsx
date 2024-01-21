import React, { useState, useEffect } from "react";

const ImageComponent = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div>
      {imageSrc && (
        <img
          src={imageSrc}
          className="h-36 w-36 rounded-full mx-auto"
          alt="Loaded from URL"
        />
      )}
    </div>
  );
};

export default ImageComponent;
