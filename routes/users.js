const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

router.get("/", (req, res) => {
  res.render("index", { user: req.user});
});

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
  res.redirect("/");
});


module.exports = router;