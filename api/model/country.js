const mongoose = require('mongoose')

let countryScheema = mongoose.Schema({
    id: {
        type: String
    },  
    sortName: {
        type: String
    },
    name: {
        type: String
    },
    pinCode: {
        type: String
    }
})

module.exports = mongoose.model('country', countryScheema)