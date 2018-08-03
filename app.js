var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fetchPersonRouter = require('./routes/fetch_all_person');
var addPersonGetRouter = require('./routes/add_person_get_method');
var addPersonPostRouter = require('./routes/add_person_post_method');
var counrtyRouter = require('./routes/countries');
var currencyRouter = require('./routes/currency');
var employeeRouter = require('./routes/employee');
var carsRouter = require('./routes/vehicle/cars');
var add_new_vehicleRouter = require('./routes/vehicle/add_new_vehicle');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/person', fetchPersonRouter);
app.use('/addPerson', addPersonGetRouter);
app.use('/addPersonPost', addPersonPostRouter);
app.use('/country',counrtyRouter);
app.use('/currency',currencyRouter);
app.use('/employee',employeeRouter);
app.use('/cars',carsRouter);
app.use('/add_new_vehicle',add_new_vehicleRouter);

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
