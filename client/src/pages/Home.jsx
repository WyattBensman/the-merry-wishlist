import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import List from "../components/List";
import Store from "../components/Store";
import CreateListForm from "../components/CreateListForm";
import { GET_USER } from "../utils/queries";
import { DELETE_LIST, UNSAVE_STORE } from "../utils/mutations";
import AuthService from "../utils/auth";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [deleteListActive, setDeleteListActive] = useState(false);
  const [unsaveStoreActive, setUnsaveStoreActive] = useState(false);

  // GET USER
  const user = AuthService.getProfile();
  const userId = user ? user._id : null;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  // Check for loading state
  if (loading) return <p>Loading...</p>;

  // Check for error state
  if (error) {
    console.error(error);
    return <p>Error fetching user data.</p>;
  }

  // Check if data exists before destructuring
  const {
    user: { fName, lName, lists, savedStores },
  } = data || {};

  const [deleteList] = useMutation(DELETE_LIST);
  const [unsaveStore] = useMutation(UNSAVE_STORE);

  // Event Listeners
  const handleNewListClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDeleteListToggle = () => {
    setDeleteListActive(!deleteListActive);
  };

  const handleUnsaveStoreToggle = () => {
    setUnsaveStoreActive(!unsaveStoreActive);
  };

  // Database Event Listeners
  const handleDeleteList = async (listId) => {
    try {
      await deleteList({
        variables: { listId },
        refetchQueries: [{ query: GET_USER, variables: { userId } }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsaveStore = async (storeId) => {
    try {
      await unsaveStore({
        variables: { userId, storeId },
        refetchQueries: [{ query: GET_USER, variables: { userId } }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-10">
        <div className="flex flex-col justify-center items-center">
          {/* INTRODUCTION */}
          <h1 className="text-2xl text-center">
            Hello, {fName} {lName}!
          </h1>
          <p className="md:w-1/2 w-7/8 mt-4 text-center">
            Simplify your holiday wishlist by effortlessly compiling & sharing
            desired items from various websites. Make gift shopping a breeze for
            friends & family!
          </p>
        </div>

        <div className="border rounded p-8 mt-4">
          <div className="flex align-center">
            <h2 className="text-xl">My Lists</h2>
            <button
              className="italic px-2 ms-2 text-sm rounded hover:bg-green-700 hover:text-white transition ease-in-out duration-200"
              onClick={handleNewListClick}
            >
              New List
            </button>
            <button
              className={`italic px-2 text-sm ms-2 rounded ${
                deleteListActive
                  ? "bg-red-500 text-white hover:bg-red-700"
                  : "hover:bg-green-700 hover:text-white"
              } transition ease-in-out duration-200`}
              onClick={handleDeleteListToggle}
            >
              {deleteListActive ? "Cancel Delete" : "Delete List(s)"}
            </button>
          </div>
          {/* LIST ITEMS */}
          <div className="flex mt-2 mb-6">
            {lists.map((list) => (
              <List
                key={list._id}
                title={list.title}
                itemCount={list.listItems.length}
                listId={list._id}
                deleteListActive={deleteListActive}
                handleDeleteList={handleDeleteList}
              />
            ))}
          </div>
          <div className="flex">
            <h2 className="text-xl">My Stores</h2>
            <button
              className={`italic px-2 text-sm ms-2 rounded ${
                unsaveStore
                  ? "bg-red-500 text-white hover:bg-red-700"
                  : "hover:bg-green-700 hover:text-white"
              } transition ease-in-out duration-200`}
              onClick={handleUnsaveStoreToggle}
            >
              {unsaveStore ? "Cancel Unsave" : "Unsave Stores"}
            </button>
          </div>
          {/* SAVED STORES */}
          <div className="flex">
            {savedStores.map((store) => (
              <Store
                key={store._id}
                img={store.image}
                url={store.url}
                name={store.name}
                unsaveStoreActive={unsaveStoreActive}
                handleUnsaveStore={handleUnsaveStore}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && <CreateListForm handleClosePopup={handleClosePopup} />}
    </>
  );
}
