//Module dependencies.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRoute = require('./routes/products');
var sambaRoute=require('./routes/samba');
//importing and accessing file
var restapi=require('./routes/rest_api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({  
  name: `mydemo`,
  secret: 'mydemo-app-2024',  
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: 3600000 // 10 hr
  } 
}));
//set up url

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRoute);
app.use('/samba',sambaRoute);
app.use('/api',restapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(405));
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
