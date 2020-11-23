//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
    appointment_id: String,
    appointment_date: String,
    doctor_id: String,
    patient_name: String,
    createdAt:{type:Date,default:new Date().toISOString()},
    patinet_email:String,
    patinet_phone: String,
    appointment_status:{type:String},
  });
  exports.Appointment = mongoose.model('appointment', userSchema );