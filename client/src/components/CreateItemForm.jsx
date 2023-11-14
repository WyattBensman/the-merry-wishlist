import { useState } from "react";

export default function CreateItemForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    itemSize: "",
    itemUrl: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowMessage(true);
    setFormData({
      itemName: "",
      itemPrice: "",
      itemSize: "",
      itemUrl: "",
    });

    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/* NAME */}
      <label htmlFor="itemName" className="block text-lg text-black">
        Description
      </label>
      <input
        name="itemName"
        value={formData.itemName}
        onChange={handleInputChange}
        type="text"
        placeholder=""
        className="block w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
      />
      <div className="flex my-2">
        {/* PRICE */}
        <div className="me-3 w-2/5">
          <label htmlFor="itemPrice" className="block text-lg text-black">
            Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary">
              $
            </span>
            <input
              name="itemPrice"
              value={formData.itemPrice}
              onChange={handleInputChange}
              type="text"
              placeholder=""
              className="w-full pl-6 px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
            />
          </div>
        </div>
        {/* SIZE */}
        <div className="w-3/5">
          <label htmlFor="itemSize" className="block text-lg text-black">
            Size
          </label>
          <select
            name="itemSize"
            className="w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
          >
            <option value="-">-</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
            <option value="-">-</option>
            {Array.from({ length: 19 }, (_, i) => i * 0.5 + 4).map((size) => (
              <option key={size} value={size}>
                U.S. Men's {size}
              </option>
            ))}
            <option value="-">-</option>
            {Array.from({ length: 19 }, (_, i) => i * 0.5 + 4).map((size) => (
              <option key={size} value={size}>
                U.S. Women's {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* URL */}
      <label htmlFor="itemUrl" className="block text-lg text-black">
        URL
      </label>
      <input
        name="itemUrl"
        value={formData.itemUrl}
        onChange={handleInputChange}
        type="text"
        placeholder=""
        className="block w-full px-4 py-2 border rounded-md shadow-sm text-secondary focus:outline-none"
      />
      <div className="flex justify-center mt-4">
        {!showMessage ? (
          <button
            type="submit"
            className="bg-red-600 px-12 py-2 rounded text-white font-medium hover:text-gray-200 hover:shadow-md duration-200"
          >
            Add New Item
          </button>
        ) : (
          <h3 className="text-xl text-green-700 italic">Successfully Added!</h3>
        )}
      </div>
    </form>
  );
}
