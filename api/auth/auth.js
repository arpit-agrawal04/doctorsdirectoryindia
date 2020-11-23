let secret = require('../config/config').secret
let jwt = require('jsonwebtoken')

exports.isAuth=function(req,res,next){
    
    let token = req.headers['x-access-token']
    //// console.log(req.headers,req.body)
    jwt.verify(token.split('Bearer ')[1],
        secret,(err,decToken)=>{
            console.log(err )
            if(err){
                res.json({
                    success:false,
                    message:'invalid token'
                  
                  }) 
            } else {
                //// console.log(decToken)
                next()
            }
    
        } )
}