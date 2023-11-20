import { useQuery } from "@apollo/client";
import Store from "../components/Store";
import { GET_STORES } from "../utils/queries";

export default function Stores() {
  // Fetch stores using useQuery hook
  const { loading, error, data } = useQuery(GET_STORES);

  // Check for loading state
  if (loading) return <p>Loading...</p>;

  // Check for error state
  if (error) {
    console.error("Error fetching stores:", error);
    return <p>Error fetching stores.</p>;
  }

  // Destructure data
  const { stores } = data;

  return (
    <div className="mt-12 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24">
      <h1 className="text-2xl font-medium mb-2">
        Shop & save your favorite stores!
      </h1>
      <div className="flex flex-wrap">
        {stores.map((store) => (
          <Store
            key={store._id}
            storeId={store._id}
            img={store.image}
            url={store.url}
            name={store.name}
          />
        ))}
      </div>
    </div>
  );
}
