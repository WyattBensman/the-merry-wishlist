import { Link } from "react-router-dom";

export function LoginForm() {
  return (
    <form className="md:w-2/5 w-3/4 border rounded px-12 py-16">
      <h1 className="text-4xl font-medium mb-2">Login</h1>
      <h2 className="mb-10 italic text-sm">
        Start effortlessly compiling your holiday season wishlist with ease!
      </h2>
      {/* Email */}
      <div className="mb-4">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* Password */}
      <div className="mb-4">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:green-3 focus:ring-green-300"
            required
          />
        </div>
        <label
          for="remember"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Remember me
        </label>
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
