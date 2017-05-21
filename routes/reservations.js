const router = require("express").Router();
const mongodb = require("mongodb");
const passport = require("passport");
const ReservedCar = require("../models/ReservedCar.js");
const Car = require("../models/Car.js");
const User = require("../models/User.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

router.post("/rentcar", isLoggedIn, (req, res) => {
  let reservedCar = new ReservedCar(req.body);

  reservedCar.save((error, result) => {
    if(error) res.send(error);

    let serverResponse = result;
    let selectedCar;
    let pricePerDay = serverResponse.pricePerDay;

    Car.find(
      {
        _id: new mongodb.ObjectID(serverResponse.carID)
      },
      (error, result) => {
        if(error) res.send(error);
        selectedCar = result;
        return selectedCar;
      });

    if(serverResponse.roofRack === true){
      pricePerDay += 200;
      return pricePerDay;
    }

    if(serverResponse.towBar === true){
      pricePerDay += 150;
      return pricePerDay;
    }

    pricePerDay += selectedCar.pricePerDay;

    console.log(pricePerDay);

    selectedCar.available = false;

    res.send(serverResponse);

  });
});

module.exports = router;