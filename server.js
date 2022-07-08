const isLocalEnv = process.env.NODE_ENV !== "production";
if (isLocalEnv) {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./route/message");

const app = express();

app.use(express.urlencoded({ extended: false }));
if (isLocalEnv) {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

// Rounting
app.use("/", indexRouter);

// Database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to mongodb"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
