const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {type: String, required: [true, "You need to enter a firstname."]},
  lastName: {type: String, required: [true, "You need to enter a lastname."]},
  email: {type: String, required: [true, "You need to enter an email adress."]}
});

module.exports = mongoose.model("User", User);