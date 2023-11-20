import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

// Importing Apollo Client development error messages
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Check if in a development environment and load error messages
if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

import Navbar from "./components/Navbar";
import { useEffect } from "react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      console.log("User not authenticated - navigating to /login");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    // Return null or a loading indicator if needed
    return null;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
