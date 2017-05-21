const router = require("express").Router();
const passport = require("passport");
const Car = require("../models/Car.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

router.get("/", (req, res) => {
  Car.find({}, (error, result) => {
    res.json(result);
  });
});

router.post("/addcar", isLoggedIn, (req, res) => {
  let car = new Car(req.body);

  car.save((error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

module.exports = router;