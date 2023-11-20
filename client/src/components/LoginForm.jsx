import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Mutation Hook
  const [login] = useMutation(LOGIN_USER);

  // Handle input changes and update form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formData },
      });

      console.log("Successful Login");
      // If successful, log in the user using the received token
      Auth.login(data.login.token);
      console.log("Successful FORSURE");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="md:w-2/5 w-3/4 border rounded px-12 py-16"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-medium mb-2">Login</h1>
      <h2 className="mb-10 italic text-sm">
        Start effortlessly compiling your holiday season wishlist with ease!
      </h2>
      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-green-700 duration-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
      <div className="flex justify-center">
        <Link to="/signup" className="text-xs mt-4">
          Not a Member? Sign up today!
        </Link>
      </div>
    </form>
  );
}
