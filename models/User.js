const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  username: {type: String, required: [true, "You need to enter an email adress."]},
  password: {type: String, required: [true, "A password is required to login."]}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);