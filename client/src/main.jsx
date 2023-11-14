import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";

import { Login } from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Stores from "./pages/Stores";
import SingleList from "./pages/SingleList";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/signup",
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: ":listId",
        element: <SingleList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
