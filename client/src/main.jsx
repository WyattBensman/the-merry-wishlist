import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import { AuthProvider } from "./utils/AuthContext";
import { client } from "./App";

import { Login } from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Stores from "./pages/Stores";
import SingleList from "./pages/SingleList";
import App from "./App";
import { ApolloProvider } from "@apollo/client";

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
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
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
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
