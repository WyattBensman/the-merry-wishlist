import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SAVE_STORE } from "../utils/mutations";
import AuthService from "../utils/auth";

export default function Store({
  img,
  url,
  name,
  storeId,
  unsaveStoreActive,
  handleUnsaveStore,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // GET USER
  const user = AuthService.getProfile();
  const userId = user ? user.data._id : null;

  const [saveStoreMutation] = useMutation(SAVE_STORE);

  const handleSaveStore = async () => {
    try {
      await saveStoreMutation({
        variables: { userId: userId, storeId: storeId },
      });
    } catch (error) {
      console.error("Error saving store:", error);
    }
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        className="w-36 border rounded flex justify-center items-center mt-4 mr-4"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* STORE IMAGE */}
        <img
          src={`/images/${img}`}
          className={`w-100 h-100 ${
            isHovered ? "transition duration-200 filter brightness-50" : ""
          }`}
          alt="name"
        />
        {/* STORE TITLE */}
        {isHovered && (
          <Link
            to={url}
            target="_blank"
            className="absolute text-white text-xl font-medium flex flex-col items-center"
          >
            <h1 className="text-white hover:text-gray-300 transition-color duration-300 ease-in-out">
              {name}
            </h1>
          </Link>
        )}
      </div>

      {unsaveStoreActive ? (
        // Render if unsaveStore is true
        <p
          className="text-red-500 text-center font-medium text-sm mt-1 hover:text-gray-300 transition-color duration-300 ease-in-out"
          onClick={() => handleUnsaveStore(storeId)}
        >
          UNSAVE
        </p>
      ) : (
        <p
          className="text-xs text-center cursor-pointer font-light mt-1 "
          onClick={handleSaveStore}
        >
          Save Store
        </p>
      )}
    </div>
  );
}
