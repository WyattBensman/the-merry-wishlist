import { useState } from "react";
import { Link } from "react-router-dom";

export default function List({
  listId,
  title,
  itemCount,
  deleteListActive,
  handleDeleteList,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col mr-4 ">
      <Link
        to={`/${listId}`}
        className={`w-52 px-5 py-3 border rounded transition duration-200 ${
          !deleteListActive ? "hover:shadow-md" : ""
        } bg-white`}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* TITLE */}
        <h1 className="text-center mb-0 font-medium">{title}</h1>
        {/* ITEM COUNT */}
        <p className="text-center mt-0 italic text-sm text-gray-600">
          {itemCount} Items
        </p>
      </Link>
      {deleteListActive && (
        <p
          className="text-red-500 cursor-pointer text-center font-medium text-sm mt-1 hover:text-gray-300 transition-color duration-300 ease-in-out"
          onClick={() => handleDeleteList(listId)}
        >
          DELETE
        </p>
      )}
    </div>
  );
}
