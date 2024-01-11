const { connect, connection } = require("mongoose");

require("dotenv").config();

// DB Name goes at the end ------->
connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/merryWishlistDB");

connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = connection;
