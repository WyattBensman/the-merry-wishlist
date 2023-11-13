const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  // Custom error for authentication failures
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  // Middleware for handling authentication
  authMiddleware: function ({ req }) {
    // Checks multiple locations where a token might be sent
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extracting the token from the header
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Verify and decode the token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Set the authenticated user data in the request object
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  // Function for creating and signing a token
  signToken: function ({ email, username, _id }) {
    // Define the payload for the token
    const payload = { email, username, _id };
    // Create and sign the token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
