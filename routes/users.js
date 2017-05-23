const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

//Registering a new user and saving the user to database
router.post("/register", (req, res) => {
  User.register(new User(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber
    }), req.body.password, (error, user) => {
      if(error) {
        res.send(error);
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    });
});

//Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Successfully logged in!");
  console.log(req.user.username + "\n" + req.user.email);
  res.redirect("/");
});

//------- Routes below this line requires a login to be used -------

//The index you get redirected to with the user set when you've logged in
router.get("/", isLoggedIn, (req, res) => {
  res.render("index", { user: req.user});
});

//Lists all registered user in database, leaving out their password
router.get("/all", isLoggedIn, (req, res) => {
  User.find({}, "email firstName lastName phoneNumber", (error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

//Logout route
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  console.log("Successfully logged out!");
  res.redirect("/");
});

module.exports = router;