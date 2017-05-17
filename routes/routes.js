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

module.exports = router;