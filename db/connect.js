const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log(
  "here...",
  path.resolve(__dirname, "../.env"),
  process.env.MONGODB_URL
);

const connectFunction = (url) => {
  mongoose.connect(url, { useNewUrlParser: true });
};

module.exports = connectFunction;
