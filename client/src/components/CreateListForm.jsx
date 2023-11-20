import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";

export default function CreateListForm({ handleClosePopup, userId }) {
  const navigate = useNavigate();
  const [createList] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: GET_USER }],
    onCompleted: (data) => {
      const newListId = data.createList._id;
      // Navigate to the new list page using the generated list ID
      navigate(`/${newListId}`);
    },
  });

  const handleCreateList = async (e) => {
    e.preventDefault();

    // Access the input value
    const title = e.target.title.value;

    try {
      await createList({
        variables: { title, userId },
      });

      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
      <div className="border w-fit bg-white p-8 shadow-lg rounded">
        <div className="flex flex-col justify-center items-center px-12 py-4">
          <form onSubmit={handleCreateList}>
            <label
              htmlFor="title"
              className="block text-lg text-black font-medium"
            >
              List Title
            </label>
            <input
              name="title"
              type="text"
              className="block w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
              placeholder=""
              required
            />
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="bg-green-700 mr-2 px-2 py-1 rounded text-white font-medium hover:text-gray-200 hover:shadow-md duration-200"
              >
                Create List
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-600 px-2 py-1 rounded text-white font-medium hover:text-gray-200 hover:shadow-md duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
