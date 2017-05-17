const router = require("express").Router();
const mongodb = require("mongodb");
const Car = require("../models/Car.js");

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

module.exports = router;