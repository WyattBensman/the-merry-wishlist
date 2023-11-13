const { connect, connection } = require("mongoose");

// DB Name goes at the end ------->
connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/merryWishlistDB");

module.exports = connection;
