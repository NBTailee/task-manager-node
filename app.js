const connectFunction = require("./db/connect");
const express = require("express");
const morgan = require("morgan");
const routes = require("./Routes/routes");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;

// libs setup
dotenv.config({ path: __dirname + "/.env" });
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));

// Routes use
app.use("/api/tasks", routes);

// connect DB
const start = async () => {
  const { LOCAL_ADDRESS = "0.0.0.0" } = process.env;
  try {
    await connectFunction(process.env.MONGO_URI);
    app.listen(PORT, LOCAL_ADDRESS, () => {
      console.log(`app is running successfully on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
