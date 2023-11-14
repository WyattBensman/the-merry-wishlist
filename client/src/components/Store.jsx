import { useState } from "react";
import { Link } from "react-router-dom";

export default function Store({ img, url, name, unsaveStore }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    /* Change to be a hyperlink */
    <>
      <div
        className="w-36 border rounded flex justify-center items-center mt-4 mr-4"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* STORE IMAGE */}
        <img
          src="./images/nike.jpeg"
          className={`w-100 ${
            isHovered ? "transition duration-200 filter brightness-50" : ""
          }`}
        />
        {/* STORE TITLE */}
        {/* NEED TO CHANGE THE LINK TO TO BE THE store.url */}
        {isHovered && (
          <Link className="absolute text-white text-xl font-medium flex flex-col items-center">
            <h1 className="text-white hover:text-gray-300 transition-color duration-300 ease-in-out">
              {name}
            </h1>
          </Link>
        )}
      </div>
      {unsaveStore ? (
        // Render if unsaveStore is true
        <p className="text-red-500 text-center font-medium text-sm mt-1 hover:text-gray-300 transition-color duration-300 ease-in-out">
          UNSAVE
        </p>
      ) : (
        // Render if unsaveStore is false
        <p className="text-xs text-center font-light mt-1">Save Store</p>
      )}
    </>
  );
}
