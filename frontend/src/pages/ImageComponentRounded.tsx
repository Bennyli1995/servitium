import React, { useState, useEffect } from 'react';

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
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div>
      {imageSrc && <img src={imageSrc} className="w-24 h-24 rounded-full mx-auto"
      alt="Loaded from URL" />}
    </div>
  );
};

export default ImageComponent;
