const db = require("./config");
const { Store } = require("../models");

db.once("open", async () => {
  await Store.create({
    name: "Abercrombie",
    url: "https://www.abercrombie.com/shop/us",
    image: "abercrombie.jpeg",
  });

  await Store.create({
    name: "Adidas",
    url: "https://www.abercrombie.com/shop/us",
    image: "adidas.webp",
  });

  await Store.create({
    name: "Nike",
    url: "https://www.abercrombie.com/shop/us",
    image: "nike.jpeg",
  });

  process.exit();
});
