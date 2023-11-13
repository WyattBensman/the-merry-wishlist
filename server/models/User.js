const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Checks if Password is Correct
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = model("User", userSchema);

module.exports = User;
