//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  doctor_id: String,
  user_id: String,
  name: String,
  number: String,
  email: String,
  doctorType:Array,
  time_slot_duration:String,
  day_start_time: String,
  day_end_time:String,
  city:String,
  state:String,
});
exports.Doctor = mongoose.model('doctor', userSchema );