const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserData = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
 
}); 
const USER = mongoose.model("UserModel",UserData)
module.exports = USER
