const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User.js");

router.get("/", (req, res) => {
  res.render("index", { user: req.user});
});

router.post("/register", (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (error, user) => {
    if(error) {
      res.render("register", { user : user});
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/");
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = router;