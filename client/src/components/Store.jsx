import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SAVE_STORE, UNSAVE_STORE } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import AuthService from "../utils/auth";

export default function Store({ img, url, name, storeId, unsaveStoreActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const [saveStoreActive, setSaveStoreActive] = useState(false);

  // GET USER
  const user = AuthService.getProfile();
  const userId = user ? user.data._id : null;

  // GET USER data to check if the current store is in the savedStores array
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  useEffect(() => {
    if (!loading && data && data.user) {
      const savedStoreIds = data.user.savedStores.map((store) => store._id);
      setSaveStoreActive(savedStoreIds.includes(storeId));
    }
  }, [loading, data, storeId]);

  const [saveStoreMutation] = useMutation(SAVE_STORE, {
    refetchQueries: [{ query: GET_USER, variables: { userId } }],
  });

  const [unsaveStoreMutation] = useMutation(UNSAVE_STORE, {
    refetchQueries: [{ query: GET_USER, variables: { userId } }],
  });

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSaveStore = async () => {
    try {
      await saveStoreMutation({ variables: { userId, storeId } });
      setSaveStoreActive(true);
    } catch (error) {
      console.error("Error saving store:", error);
    }
  };

  const handleUnsaveStore = async () => {
    try {
      await unsaveStoreMutation({ variables: { storeId } });
      setSaveStoreActive(false);
    } catch (error) {
      console.error("Error unsaving store:", error);
    }
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
        />
        {/* STORE TITLE */}
        {isHovered && (
          <Link
            to={url}
            target="_blank"
            className="absolute text-white text-xl font-medium flex flex-col items-center"
          >
            <h1 className="text-white hover:text-gray-300 duration-300 ease-in-out">
              {name}
            </h1>
          </Link>
        )}
      </div>
      {saveStoreActive ? (
        <p
          className="text-red-500 text-center font-light text-xs mr-4 mt-1 hover:text-gray-300 duration-300 ease-in-out cursor-pointer"
          onClick={handleUnsaveStore}
        >
          UNSAVE
        </p>
      ) : (
        <p
          className="text-xs text-center cursor-pointer font-light mr-4 mt-1 hover:text-green-700 duration-300 ease-in-out"
          onClick={handleSaveStore}
        >
          SAVE
        </p>
      )}
    </div>
  );
}
