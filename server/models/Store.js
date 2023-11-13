const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Store = model("Store", storeSchema);

module.exports = Store;
