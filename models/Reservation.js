const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reservation = new Schema({
  carID: {type: String, required: [true, "You need the enter the ID of the reserved car."]},
  userID: {type: String, required: [true, "You need to enter the ID of the user who reserved the car"]},
  dateFrom: {type: Date, required: [true, "You need to enter the date of when the car was reserved. Format: yyyy-mm-dd"]},
  dateTo: {type: Date, required: [true, "You need to enter the date of when the car needs to be returned. Format: yyyy-mm-dd"]},
  roofRack: {type: Boolean, required: [true, "Does the user want a roof rack installed? True or false."]},
  towBar: {type: Boolean, required: [true, "Does the user want a tow bar installed? True or false."]},
  pricePerDay: {type: Number},
  totalPrice: {type: Number},
  car: {
    brand: {type: String},
    transmission: {type: String},
    seats: {type: Number},
    roofRack: {type: Boolean},
    towbar: {type: Boolean},
  },
  rentedBy: {
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phoneNumber: {type: Number}
  }
});

module.exports = mongoose.model("Reservation", Reservation);