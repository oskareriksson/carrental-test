const router = require("express").Router();
const mongodb = require("mongodb");
const passport = require("passport");
const Car = require("../models/Car.js");
const User = require("../models/User.js");
const ReservedCar = require("../models/ReservedCar.js");

router.get("/cars", (req, res) => {
  Car.find({}, (error, result) => {
    res.json(result);
  });
});

router.post("/addcar", (req, res) => {
  let car = new Car(req.body);

  car.save((error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

router.patch("/updatecar/:id", (req, res) => {
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
      res.json(result);
    });
});

router.delete("/removecar/:id", (req, res) => {
  Car.findByIdAndRemove(req.params.id, (error, result) => {
    if(error) res.send(error);
    res.send("Car successfully removed from database!");
  });
});

router.post("/rentcar", (req, res) => {
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