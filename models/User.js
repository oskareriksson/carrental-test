const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  username: {type: String, required: [true, "You need to enter an email adress."]},
  password: {type: String, required: [true, "A password is required to login."]},
  email: {type: String, required: [true, "Please enter a valid email adress."]},
  firstName: {type: String, required: [true, "Please enter your first name."]},
  lastName: {type: String, required: [true, "Please enter your lastname."]},
  phoneNumber: {type: Number, required: [true, "Please enter your phone number."]}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);