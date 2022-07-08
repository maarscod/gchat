const isLocalEnv = process.env.NODE_ENV !== "production";
if (isLocalEnv) {
  require("dotenv").config();
}

const { format: json2lua } = require("lua-json");
const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./route/index");

const app = express();

app.use(express.urlencoded({ extended: false }));
if (isLocalEnv) {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

// Rounting
app.use("/", authenticator, indexRouter);

// Database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to mongodb"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

//
function authenticator(req, res, next) {
  const SECRET = process.env.SECRET;
  if (req.query.secret === SECRET) return next();
  res.send(
    json2lua({
      result: {
        success: false,
        message: "Authentication failed",
      },
    })
  );
}
