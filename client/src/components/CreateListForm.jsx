import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login } from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Stores from "./pages/stores";
import ListView from "./pages/ListView";

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
    element: <MainLayout />,
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
        element: <ListView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
