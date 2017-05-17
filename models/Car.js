const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Car = new Schema({
  brand: {type: String, required: [true, "You need to add the brand of the car."]},
  transmission: {type: String, required: [true, "You need to select manual/automatic transmission."]},
  seats: {type: Number, min: 2, max: 7, required: [true, "You need to enter the amount of seats in the car."]},
  roofRack: {type: Boolean, required: [true, "Does the car have a roofrack available? True or false."]},
  towbar: {type: Boolean, required: [true, "Does the car have a towbar available? True or false."]},
  pricePerDay: {type: Number, min: 500, max: 2000, required: [true, "You need to enter the daily price of renting the car."]},
  available: {type: Boolean, required: [true, "Is the car available? True or false."]}
});

module.exports = mongoose.model("Car", Car);