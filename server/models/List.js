const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  itemPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  itemSize: {
    type: String,
    enum: [
      "-",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "US Men 4",
      "US Men 4.5",
      "US Men 5",
      "US Men 5.5",
      "US Men 6",
      "US Men 6.5",
      "US Men 7",
      "US Men 7.5",
      "US Men 8",
      "US Men 8.5",
      "US Men 9",
      "US Men 9.5",
      "US Men 10",
      "US Men 10.5",
      "US Men 11",
      "US Men 11.5",
      "US Men 12",
      "US Men 12.5",
      "US Men 13",
      "US Women 4",
      "US Women 4.5",
      "US Women 5",
      "US Women 5.5",
      "US Women 6",
      "US Women 6.5",
      "US Women 7",
      "US Women 7.5",
      "US Women 8",
      "US Women 8.5",
      "US Women 9",
      "US Women 9.5",
      "US Women 10",
      "US Women 10.5",
      "US Women 11",
      "US Women 11.5",
      "US Women 12",
      "US Women 12.5",
      "US Women 13",
    ],
    trim: true,
  },

  itemUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const listSchema = new Schema({
  userId: {
    type: SchemaTypesObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  listItems: [itemSchema],
});

const List = model("List", listSchema);

module.exports = List;
