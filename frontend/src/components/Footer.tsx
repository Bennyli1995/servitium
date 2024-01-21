import React from "react";
import { SocialIcon } from "react-social-icons";
import arrowUpSvg from "../assets/Arrow.svg";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-blue-700 text-gray-400">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center gap-8 mb-4 md:mb-0">
          <SocialIcon
            url="https://www.facebook.com/"
            className="hover:opacity-75"
          />
          <SocialIcon
            url="https://www.linkedin.com/"
            className="hover:opacity-75"
          />
          <SocialIcon
            url="https://www.instagram.com/"
            className="hover:opacity-75"
          />
        </div>
        <div className="text-sm text-center mt-4 md:mt-0">
          Copyright © Servitium 2024. All Rights Reserved.
        </div>
        <div className="mt-4 md:mt-0">
          <img
            src={arrowUpSvg}
            alt="Scroll to top"
            onClick={scrollToTop}
            className="h-8 w-8 cursor-pointer hover:text-white"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
