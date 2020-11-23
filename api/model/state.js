const mongoose = require('mongoose')

let stateScheema = mongoose.Schema({
    id: {
        type: String
    },  
    name: {
        type: String
    },
    countryId: {
        type: String
    }
})

module.exports = mongoose.model('state', stateScheema)