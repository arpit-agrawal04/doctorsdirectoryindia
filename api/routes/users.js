var express = require('express');
var router = express.Router();

var doctorController = require('../controller/doctorController')
var isAuth = require('../auth/auth').isAuth
/* GET users listing. */
router.post('/getstateDetails',doctorController.getstateDetails)
router.post('/getCitiesList',doctorController.getCitiesList)
router.post('/getAvailableLoactions',doctorController.getAvailableLoactions)
router.post('/getDoctorList',doctorController.getDoctorList)
router.post('/getDoctorBasicDetails',doctorController.getDoctorBasicDetails)
router.post('/selectSlotForBooking',doctorController.selectSlotForBooking)
router.post('/completeAppointment',doctorController.completeAppointment)
router.post('/getOpenAppointmentForDoctor',isAuth,doctorController.getOpenAppointmentForDoctor)
router.post('/ChangeApointmentStatus',isAuth,doctorController.ChangeApointmentStatus)
router.post('/getHistoryReportsForDoctor',isAuth,doctorController.getHistoryReportsForDoctor)
module.exports = router;
