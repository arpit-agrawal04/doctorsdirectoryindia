const mongoose = require('mongoose')

let cityScheema = mongoose.Schema({
    id: {
        type: String
    },  
    name: {
        type: String
    },
    stateId: {
        type: String
    }
})

module.exports = mongoose.model('city', cityScheema)