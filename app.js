var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var mongoDb = require('connect-mongo')(session);
var mongoose = require('mongoose');
var flash = require('connect-flash');
var index = require('./routes/index');

var app = express();

console.log('start');

var mongoConnection = 'mongodb://pavi:pavi123@ds035836.mlab.com:35836/logindetails';
mongoose.connect(mongoConnection, {useNewUrlParser: true});


mongoose.connection.on('connected', function () {
});

//on error
mongoose.connection.on('error', function (err) {
    console.log('Error occur in mongoose ' + err);
});

//On disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
        secret: 'qwertyuiopasdfghjkl',
        resave: false,
        saveUninitialized: false,
        store: new mongoDb({mongooseConnection: mongoose.connection}),
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    }
    )
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.session = session;
    next();
})


app.use('/', index);

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
