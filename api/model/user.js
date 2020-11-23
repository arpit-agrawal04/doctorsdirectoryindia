//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_id: String,
  name: String,
  email: String,
  password: String,
  createdAt:{type:String,default:new Date().toISOString()}

});
exports.User = mongoose.model('user', userSchema );