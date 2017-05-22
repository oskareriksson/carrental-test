const router = require("express").Router();
const passport = require("passport");
const Reservation = require("../models/Reservation.js");
const Car = require("../models/Car.js");
const User = require("../models/User.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

router.post("/rentcar", (req, res) => {
  let reservation = new Reservation(req.body);
  let selectedCar;
  let selectedUser;

  Car.findByIdAndUpdate(
    { _id: reservation.carID },
    {
      $set: {
        available: false //Sets the "available" property of our car to false 
      }
    },
    (error, result) => {
      if(error) res.send(error);
      selectedCar = result;
      console.log(selectedCar);
      
      User.find(
        {
          _id: reservation.userID
        },
        (error, result) => {
          if(error) res.send(error);
          selectedUser = result;
          console.log(selectedUser);

          let pricePerDay = selectedCar.pricePerDay;

          if(selectedCar.roofRack === true){
            pricePerDay += 50;
          }

          if(selectedCar.towbar === true){
            pricePerDay += 100;
          }

          reservation.pricePerDay = pricePerDay;

          reservation.save((error, result) => {
            res.send(result);
          });

        });
    });
});

module.exports = router;