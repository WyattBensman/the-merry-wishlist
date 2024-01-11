const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
  },
  lName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password);
      },
      message: (props) =>
        `${props.value} is not a valid password. It must contain at least 8 characters and at least 1 number.`,
    },
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  savedStores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
});

// Hashes Password

// Checks if Password is Correct

// Create the User model
const User = model("User", userSchema);

module.exports = User;
