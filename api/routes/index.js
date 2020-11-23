var express = require('express');
var router = express.Router();
var User = require('../model/user').User
var Doctor = require('../model/doctor').Doctor
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
var Puid = require('puid');
let secret = require('../config/config').secret
/* GET home page. */
router.post('/signup', function(req, res) {
//  console.log(req.body)
req.body.email=req.body.email.trim().toLowerCase()
User.find({email:req.body.email},(err,exsists)=>{
if(err){
  // console.log(err)
}else{
 
  if(exsists[0]==undefined){
    // console.log(exsists,"check for id")
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // console.log(hash)
      if(!err){
        puid = new Puid(false);
        req.body.user_id =puid.generate()
        req.body.password=hash
        User.updateOne({email:req.body.email},{$set:req.body},{upsert:true,multi:false,new:true},async (err,success)=>{
          if(err){
            // console.log(err)
          }else{
            puid = new Puid(false);
            req.body.doctor_id =puid.generate()
            Doctor.updateOne({email:req.body.email},{$set:req.body},{upsert:true,multi:false,new:true},async (err,success)=>{
              if(err){
                // console.log(err)
              }else{
           
              res.json({
                success:true,
                message:'done'
              })
            }
          })
        
          }
        });

      }
      // Store hash in database
    });
  }else{
    res.json({
      success:false,
      message:'email already Exists'
    
    })
  }
  

}
})

});
router.post('/loginUser', function(req, res) {
   
  req.body.email=req.body.email.trim().toLowerCase()
  User.find({email:req.body.email},{user_id :1,password:1,name:1},(err,exsists)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(req.body,exsists[0])
    if(exsists[0]==undefined){
      res.json({
        success:false,
        message:'Please enter valid credential'
      
      })
     
    }else{

      bcrypt.compare(req.body.password,exsists[0].password,(err,matched)=>{
        if(!err && matched){
          jwt.sign({username: req.body.email},
            secret,
            { expiresIn: '24h' },async (err,token)=>{
        
              var data ={
                token:token,
                userData:   await Doctor.findOne({user_id:exsists[0].user_id},{doctor_id:1})
              }
            
              res.json({
                success:true,
                message:data
              
              })
            } )
        }else{
          res.json({
            success:false,
            message:'Please enter valid credential'
          
          })
        }
      })
    }
  }
});
  
  });
module.exports = router;

