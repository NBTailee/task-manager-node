const connectFunction = require("./db/connect");
const express = require("express");
const morgan = require("morgan");
const routes = require("./Routes/routes");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;

// libs setup
dotenv.config();
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));

// Routes use
app.use("/api/tasks", routes);

// connect DB
const start = async () => {
  try {
    await connectFunction(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is running successfully on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
