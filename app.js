const express = require("express");
let app = express();
const server = require("http").Server(app);
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const pug = require("pug");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routes = require("./routes/routes.js");
const config = require("./config/config.js");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(session({
  secret: "super secret",
  resave: true,
  saveUninitialized: false
}));

app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use("/", routes);

mongoose.Promise = global.Promise;
mongoose.connect(config.url, () => {
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("Connection to database established!");
});