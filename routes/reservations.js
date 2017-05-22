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

      let pricePerDay = selectedCar.pricePerDay;

      reservation.car.brand = selectedCar.brand;
      reservation.car.transmission = selectedCar.transmission;
      reservation.car.seats = selectedCar.seats;
      reservation.car.roofRack = selectedCar.roofRack;
      reservation.car.towbar = selectedCar.towbar;

      User.find(
        {
          _id: reservation.userID
        },
        (error, result) => {
          if(error) res.send(error);
          selectedUser = result;
          
          reservation.rentedBy.firstName = selectedUser[0].firstName;
          reservation.rentedBy.lastName = selectedUser[0].lastName;
          reservation.rentedBy.email = selectedUser[0].email;
          reservation.rentedBy.phoneNumber = selectedUser[0].phoneNumber;

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