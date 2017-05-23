const router = require("express").Router();
const passport = require("passport");
const Car = require("../models/Car.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

//Gets all cars in the collection and writes the response as JSON for now
router.get("/", (req, res) => {
  Car.find({}, (error, result) => {
    res.json(result);
  });
});

//Gets all cars in the collection with property "available = true", i.e available for rent
router.get("/available", (req, res) => {
  Car.find({"available": true}, (error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

//------- Routes below this line requires a login to be used -------

//Adds a car to collection
router.post("/addcar", isLoggedIn, (req, res) => {
  let car = new Car(req.body);

  car.save((error, result) => {
    if(error) res.send(error);
    res.send("Car successfully added!");
  });
});

//Updates a car in collection by ID
router.patch("/updatecar/:id", isLoggedIn, (req, res) => {
  Car.findByIdAndUpdate(req.params.id,
    {
      brand: req.body.brand,
      transmission: req.body.transmission,
      seats: req.body.seats,
      roofRack: req.body.roofRack,
      towbar: req.body.towbar,
      pricePerDay: req.body.pricePerDay,
      available: req.body.available
    },
    (error, result) => {
      if(error) res.send(error);
      res.send("Car successfully updated!");
    });
});

//Removes a car in collection by ID
router.delete("/removecar/:id", isLoggedIn, (req, res) => {
  Car.findByIdAndRemove(req.params.id, (error, result) => {
    if(error) res.send(error);
    res.send("Car successfully removed from database!");
  });
});

module.exports = router;