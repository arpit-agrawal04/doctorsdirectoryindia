var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientUrl = require('./config/config').clientURl
const { CLIENT_DEV_URL, NODE_ENV, CLIENT_INDEX_FILE } = require('./config/config')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: '*',
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist/client')));
console.log(path.join(__dirname, '../client/dist'))

app.use('/auth', indexRouter);
app.use('/users', usersRouter);

app.get('*', function(req, res) {
  // If response not send redirect to angular app
  if (!res._headers.etag) {
      if (NODE_ENV == 'production') {
          res.sendFile(path.resolve(__dirname + `/../client/dist/client/${CLIENT_INDEX_FILE}`));
      } else {
          res.redirect(301, CLIENT_DEV_URL+req.originalUrl || '/');
      }
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
