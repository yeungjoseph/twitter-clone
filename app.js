var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var config = require('./config');

var index = require('./routes/index');
var auth = require('./routes/auth');
var User = require('./models/user');

var app = express();

// Setup database
mongoose.connect('mongodb://localhost/portalTWIT');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Established connection portalTWIT!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session handling
app.use(session(config.session));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findById(req.session.user._id, function(err, user) {
      if (user) {
        req.user = user.toObject(); // Convert from mongoose object to JS
        delete req.user.password;
        req.session.user = user; // Refreshes the cookie header
        res.locals.user = user; // Local to views
      }
      next();
    });
  } else {
    next();
  }
});

app.use('/', auth);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
