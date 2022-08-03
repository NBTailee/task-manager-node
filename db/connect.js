const mongoose = require("mongoose");


const connectFunction = (url) => {
  mongoose.connect(url, { useNewUrlParser: true });
};

module.exports = connectFunction;
