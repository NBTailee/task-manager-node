const mongoose = require("mongoose");

const connectFunction = (url) => {
  mongoose.connect(url);
};

module.exports = connectFunction;
