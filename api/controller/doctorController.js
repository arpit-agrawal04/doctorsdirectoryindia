const city = require('../model/city')
const state = require('../model/state')
const Doctor = require('../model/doctor').Doctor
const Appointment = require('../model/appointment').Appointment
var Puid = require('puid');

// get Indian State list for doctor signup form
exports.getstateDetails = async (req,res)=>{
    // find all states in india
    try {
        let result = await  state.find({countryId: "101"})
        res.json({
            success:true,
            message : result
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    }
 

}
// get Indian city list for selcted state in doctor signup form
exports.getCitiesList = async (req,res)=>{
    // find all states in india
    try {
        let result = await  city.find({stateId: req.body.stateId})
        res.json({
            success:true,
            message : result
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    }
 

}
// get list of locations from which we have doctors data
exports.getAvailableLoactions = async (req,res)=>{
    // find all states in india
    try {
        let result = await  Doctor.aggregate([{$match:{}},{$group:{
            _id:{state:'$state',city:'$city'}
        }}])
        res.json({
            success:true,
            message : result
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    }
 

}
// get list of filtered doctor for lending page 
exports.getDoctorList = async (req,res)=>{
    try {
        var query = {}
        if(req.body.location&&req.body.location !== 'All'){
            query.city = req.body.location.split(',')[0];
            query.state = req.body.location.split(',')[1];
        }
        if(req.body.sepcialityid){
            var doctorType= []
            doctorType.push(req.body.sepcialityid)
            query.doctorType = {$in:doctorType};
        }
        let result = await  Doctor.aggregate([{$match:query},{$project:{
            doctorType:1,name:1,doctor_id:1
        }}])
        res.json({
            success:true,
            message : result
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    }
 

}
// get doctor details and time slots details for booking 
exports.getDoctorBasicDetails = async (req,res)=>{
    try {
        var  aponitmentDate = new Date(new Date().setMinutes(new Date().getMinutes() - 15)).toISOString()
      await Appointment.remove({doctor_id:req.bodydoctor_id,appointment_status:null,createdAt:{$lt:aponitmentDate}})
       var date1 =new Date()
      var minDate = date1.toISOString().split('T')[0] + 'T00:00:00.000Z'
     var dateAfter7day = date1.setDate(date1.getDate() + 7)
      var maxDate = new Date(dateAfter7day).toISOString().split('T')[0] + 'T23:59:59.000Z'
        let result = await  Doctor.aggregate([{$match:{doctor_id:req.body.doctor_id}},
            {$lookup:{
                from:'appointments',
                let:{to:'$doctor_id'},
                pipeline:[
                    {
                        $match:
                        {$and:[{$expr:{
                    $eq:['$doctor_id','$$to']}},
                    {$expr:{$gt:['$appointment_date',minDate]}},{ $expr:{$lt:['$appointment_date',maxDate]}
                }]}},{
                    $project:{
                        appointment_date:1,
                        appointment_status:1,
                       

                    }
                }],
                as:'appointment'
           
        }},{
            $project:{
                appointment:1,
                time_slot_duration:1,
                day_start_time:1,
                day_end_time:1,
                name:1,
                doctorType:1

            }        }])

            const diff = ( parseInt( result[0].day_end_time.split(':')[0]) - parseInt( result[0].day_start_time.split(':')[0])) * 60 +
            parseInt(  result[0].day_end_time.split(':')[1]) - parseInt( result[0].day_start_time.split(':')[1]);
           var noOfSlotsPerday = diff / parseInt( result[0].day_end_time.split('min')[0]);
            let date = new Date().toISOString().split('T')[0] + 'T' +  result[0].day_start_time + ':00.000Z';
        
          var slotArray = []
          for ( i = 0 ; i < noOfSlotsPerday; i++) {
          date = new Date(new Date(date).setMinutes(new Date(date).getMinutes() + 20)).toISOString()
          slotArray.push(date.split('T')[1].substring(0, 5))
          }
          
          var next7DateArray = []
          var date2 = new Date()
          next7DateArray.push(new Date().toISOString().split('T')[0])
          for ( j = 0 ; j < 6; j++) {
              next7DateArray.push(new Date(date2.setDate(date2.getDate() + 1)).toISOString().split('T')[0])
          }
        res.json({
            success:true,
            message : result[0],
            slotArray,
            next7DateArray
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    }
 

}
// book a slot for booking if available
exports.selectSlotForBooking = async (req,res) => {
    try {
    
      var  date = new Date(new Date().setMinutes(new Date().getMinutes() - 15)).toISOString()
      await Appointment.remove({doctor_id:req.bodydoctor_id,appointment_status:null,createdAt:{$lt:date}})
        Appointment.findOne({appointment_date:req.body.date,doctor_id:req.bodydoctor_id},async (err,appointment)=>{
            if(!err&&!appointment){
                let      puid = new Puid()
                let     appointment_id = puid.generate()
              await  Appointment.insertMany([{appointment_date:req.body.date,doctor_id:req.body.doctor_id,appointment_id:appointment_id,appointment_status:null,createdAt:new Date().toISOString()}])
              res.json({
                success:true,
                message :appointment_id,
            })
            }else {
                res.json({
                    success:false,
                    message :'Already UnderProcess',
                })
            }
        })
   
        
     } catch (e){
         console.log(e)
         res.json({
             success:false,
             message : e
         })
     } 
}
// save patient deatils oposite to booked slot
exports.completeAppointment = async (req,res) => {
    try {
   exist =await     Appointment.findOne({appointment_id:req.body.aponitmentID})
   if(exist){
    await  Appointment.updateOne({appointment_id:req.body.aponitmentID},{$set:{patient_name:req.body.name,patinet_email:req.body.email,patinet_phone:req.body.number,appointment_status:'Open'}})
    res.json({
      success:true })
   } else {
    res.json({
        success:false,
    message:"Session Expired" })
   }
             
   
        
     } catch (e){
         console.log(e)
         res.json({
             success:false,
             message : e
         })
     } 
}
// doctor dashbord with apointment details
exports.getOpenAppointmentForDoctor = async (req,res) => {
    try {
        var date1 =new Date(req.body.date)
        var minDate = date1.toISOString().split('T')[0] + 'T00:00'
        var maxDate = date1.toISOString().split('T')[0] + 'T23:59'
        res.json({
            success:true,
        message: await Appointment.aggregate([{
            $match:{doctor_id:req.body.doctorId,$and:[{appointment_status:{$ne:null}},{appointment_date:{$gt:minDate}},{appointment_date:{$lt:maxDate}}]}
        },{
            $sort:{
                appointment_date:-1
            }
        }]) })  
        
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    } 
}
// update appointment staus to closed or cancelled
exports.ChangeApointmentStatus = async (req,res) => {
    try {
       await Appointment.updateOne({appointment_id:req.body.appointment_id},{$set:{appointment_status:req.body.status}})
        res.json({
            success:true
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    } 
}
// doctor report page api 
exports.getHistoryReportsForDoctor = async (req,res) => {
    try {
        if(req.body.filter === 'Appointment Summary Report'){
            var result = await Appointment.aggregate([
                { $match: {doctor_id:req.body.doctorId ,appointment_status:{$ne:null}} },
                { $project :{date: { $substr: [ "$appointment_date", 0, 10 ] },appointment_status:1}},
                {$group:{
                    _id:'$date',
                'total': {$sum :1},
                'open':{$sum:{ $cond: [ {$eq:['$appointment_status','Open']}, 1, 0 ] }},
                'Closed':{$sum:{ $cond: [ {$eq:['$appointment_status','Closed']}, 1, 0 ] }},
                'Cancelled':{$sum:{ $cond: [ {$eq:['$appointment_status','Cancelled']}, 1, 0 ] }},
            
                            }},{
                                $sort:{_id:-1}
                            }
            ])
            
        }else {
            var result = await Appointment.aggregate([
                { $match: {doctor_id:req.body.doctorId ,appointment_status:{$ne:null}} },
                { $project :{date: { $substr: [ "$appointment_date", 0, 10 ] },appointment_status:1,patient_name:1}},
                {$group:{
                    _id:'$date',
                'appointments': {$push: "$$ROOT"},

            
                            }},{
                                $sort:{_id:-1}
                            }
            ])
        }
        res.json({
            success:true,
            message:result
        })
    } catch (e){
        console.log(e)
        res.json({
            success:false,
            message : e
        })
    } 
}