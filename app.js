require("dotenv").config();
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
const config = require("./config/config.js");
const User = require("./models/User.js");
const routes = require("./routes/routes.js");
const userRoutes = require("./routes/users.js")(User);

app.set("view engine", "pug");
app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(session({
  secret: "super secret",
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST);

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("Connection to database established!");
});

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.use("/", routes);
app.use("/users", userRoutes);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});