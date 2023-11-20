import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../utils/auth";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <nav className="bg-green-700 border-gray-200 md:flex px-4 py-6 sm:px-8 md:px-16 lg:px-20 xl:px-24">
      <div className="w-full relative flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold self-center text-white text-2xl font-semibold whitespace-nowrap"
        >
          <h1>Merry Christmas</h1>
        </Link>
        {/* Toggle Button */}
        <button
          className="flex justify-end text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div
        className={
          "md:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")
        }
        id="example-navbar-danger"
      >
        {/* NavBar Items */}
        <ul className="font-medium text-white flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
          <li>
            <NavLink
              href="/"
              className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 md:border-0 md:p-0"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stores"
              className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 md:border-0 md:p-0"
            >
              Stores
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 pl-3 pr-4 rounded text-red-400 hover:text-gray-300 md:border-0 md:p-0"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
