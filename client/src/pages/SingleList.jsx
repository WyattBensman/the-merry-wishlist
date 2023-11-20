import Item from "../components/Item";
import CreateItemForm from "../components/CreateItemForm";
import { useParams } from "react-router-dom";
import { GET_LIST } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

export default function SingleList() {
  const { listId } = useParams();

  // Fetch list data using the GET_LIST query
  const { loading, error, data, refetch } = useQuery(GET_LIST, {
    variables: { listId: listId },
  });

  useEffect(() => {
    refetch({ listId });
  }, [listId, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const { list } = data;

  return (
    <>
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-10 flex space-x-12">
        <div className="w-3/12">
          <h2 className="text-transparent text-xl">.</h2>
          <div className="border-b border-gray-300 my-4"></div>
          {/* START OF FORM */}
          <CreateItemForm listId={listId} />
        </div>
        <div className="w-9/12">
          <h2 className="text-xl font-medium">{list.title} Items</h2>
          <div className="border-b border-gray-300 my-4"></div>
          {/* ITEMS CONTAINER */}
          <div className="flex flex-wrap">
            {list.listItems.map((item) => (
              <Item
                key={item._id}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemSize={item.itemSize}
                itemUrl={item.itemUrl}
                itemId={item._id}
                listId={listId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
