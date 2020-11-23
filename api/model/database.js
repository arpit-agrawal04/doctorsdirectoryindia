const { mongoURL } = require('../config/config')
const mongoose = require('mongoose')

// When Successfully Connected to database

mongoose.connect(mongoURL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', (err, connection) => {
    console.log('Database is now connected!');
});


// On error in database connection
mongoose.connection.on('error', (error) => {
    console.log('Error in Database connection ==> ', error);
});